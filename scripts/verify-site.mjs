#!/usr/bin/env node
/**
 * Structural audit of a running build.
 *
 *   npm run build && npx next start -p 3000
 *   node scripts/verify-site.mjs                    # defaults to localhost:3000
 *   node scripts/verify-site.mjs http://localhost:3200
 *
 * Walks every URL in the sitemap and asserts the things this rebuild is
 * supposed to guarantee. Exits non-zero if any check fails, so it can gate a
 * deploy. This checks structure, not visual design - the client reviews the
 * look on the Vercel preview.
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

/**
 * Locale-specific pages: routes that deliberately exist in one language only.
 * Campaign landing pages are the case - they are the destination for a video
 * or an ad in one language, and publishing a translated twin nobody maintains
 * would point hreflang at a page with no real content.
 *
 * Every entry here is exempt from the hreflang-pair assertions and from
 * nothing else. Keep the list short: a page belongs here only when the
 * single-locale decision is documented in the route itself.
 */
const HEBREW_ONLY_PATHS = new Set(["/he/lp/protected-period"]);

let failures = 0;
let checks = 0;

function check(ok, label, detail = "") {
  checks += 1;
  if (!ok) {
    failures += 1;
    console.log(`  FAIL  ${label}${detail ? ` - ${detail}` : ""}`);
  }
  return ok;
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.status < 400 ? await res.text() : "";
  return { status: res.status, body, headers: res.headers };
}

function countTags(html, tag) {
  return (html.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length;
}

/** Heading levels in document order, so we can spot a skipped level. */
function headingLevels(html) {
  return [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
}

function jsonLdBlocks(html) {
  return [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )].map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return null;
    }
  });
}

function typesIn(graph) {
  const out = [];
  for (const node of graph?.["@graph"] ?? []) {
    const t = node["@type"];
    if (Array.isArray(t)) out.push(...t);
    else if (t) out.push(t);
  }
  return out;
}

console.log(`\nVerifying ${BASE}\n${"=".repeat(60)}`);

/* ---------------------------------------------------------- sitemap ---- */
const sitemap = await get("/sitemap.xml");
check(sitemap.status === 200, "GET /sitemap.xml", `status ${sitemap.status}`);
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(urls.length > 0, "sitemap contains URLs");

const hreflangCount = (sitemap.body.match(/hreflang=/g) || []).length;
// Bilingual entries carry three alternates each; the locale-specific ones
// above carry none, by design.
const bilingualUrls = urls.filter(
  (u) => !HEBREW_ONLY_PATHS.has(new URL(u).pathname),
);
check(
  hreflangCount >= bilingualUrls.length * 3,
  "every bilingual sitemap entry has he/en/x-default alternates",
  `${hreflangCount} alternates for ${bilingualUrls.length} bilingual URLs`,
);
console.log(`sitemap: ${urls.length} URLs, ${hreflangCount} hreflang alternates`);

/* ------------------------------------------------------------ robots ---- */
const robots = await get("/robots.txt");
check(robots.status === 200, "GET /robots.txt", `status ${robots.status}`);
check(robots.body.includes("Sitemap:"), "robots.txt references the sitemap");
check(!robots.body.includes("Host:"), "robots.txt has no non-standard Host directive");

/* ----------------------------------------------------------- llms.txt --- */
const llms = await get("/llms.txt");
check(llms.status === 200, "GET /llms.txt", `status ${llms.status}`);
check(llms.body.startsWith("#"), "llms.txt starts with a title heading");
for (const section of ["## Key facts", "## Attorneys", "## Practice areas", "## Questions and answers"]) {
  check(llms.body.includes(section), `llms.txt has "${section}"`);
}
check(!/[–—]/.test(llms.body), "llms.txt has no long dashes");

/* ------------------------------------------------------------- pages ---- */
const paths = urls.map((u) => new URL(u).pathname);
console.log(`\nChecking ${paths.length} pages...\n`);

const seenSchemaTypes = new Set();
let pagesWithFaqContent = 0;
let pagesWithFaqSchema = 0;

for (const path of paths) {
  const page = await get(path);
  const label = path;

  if (!check(page.status === 200, `${label} returns 200`, `status ${page.status}`)) continue;
  const html = page.body;

  // --- headings -------------------------------------------------------
  const h1 = countTags(html, "h1");
  check(h1 === 1, `${label} has exactly one h1`, `found ${h1}`);

  const levels = headingLevels(html);
  let skipped = null;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      skipped = `h${levels[i - 1]} -> h${levels[i]}`;
      break;
    }
  }
  check(!skipped, `${label} heading hierarchy has no skipped level`, skipped ?? "");

  // --- metadata -------------------------------------------------------
  check(/<link rel="canonical"/.test(html), `${label} has a canonical link`);
  // Match the <link rel="alternate"> tags only. The header's language switcher
  // also carries an hreflang attribute, on an <a>, which is not a signal to
  // search engines about this page's translations.
  const altLinks = (html.match(/<link[^>]*hreflang=[^>]*>/gi) || []).join(" ");
  if (HEBREW_ONLY_PATHS.has(path)) {
    check(
      altLinks === "",
      `${label} is Hebrew only and emits no hreflang alternates`,
    );
  } else {
    check(
      /hreflang="he"/i.test(altLinks) && /hreflang="en"/i.test(altLinks),
      `${label} has hreflang pair`,
    );
  }
  check(/<meta name="description"/.test(html), `${label} has a meta description`);
  check(/property="og:title"/.test(html), `${label} has og:title`);

  // --- structured data ------------------------------------------------
  const blocks = jsonLdBlocks(html);
  check(blocks.length === 1, `${label} emits exactly one JSON-LD block`, `found ${blocks.length}`);
  check(blocks[0] !== null, `${label} JSON-LD parses`);
  if (blocks[0]) {
    const types = typesIn(blocks[0]);
    types.forEach((t) => seenSchemaTypes.add(t));
    check(types.includes("LegalService"), `${label} graph includes the firm`);
    check(types.includes("WebSite"), `${label} graph includes WebSite`);
    if (path !== "/he" && path !== "/en") {
      check(types.includes("BreadcrumbList"), `${label} graph includes BreadcrumbList`);
    }

    // Every visible Q&A block must carry FAQPage schema. Test the rendered
    // text, not the raw HTML: the RSC payload embedded in <script> tags
    // carries dictionary strings the page never displays.
    const rendered = html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, " ");
    const hasFaqContent =
      /Frequently Asked|שאלות נפוצות|שאלות על המשרד|Questions about the firm|שאלות כלליות|General questions/.test(
        rendered,
      );
    if (hasFaqContent) {
      pagesWithFaqContent += 1;
      if (check(types.includes("FAQPage"), `${label} Q&A block has FAQPage schema`)) {
        pagesWithFaqSchema += 1;
      }
    }
  }

  // --- images ---------------------------------------------------------
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const missingAlt = imgs.filter((tag) => !/\balt=/.test(tag));
  check(missingAlt.length === 0, `${label} every <img> has an alt attribute`, `${missingAlt.length} missing`);

  // --- language ------------------------------------------------------
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ");
  const longDashes = (visibleText.match(/[–—]/g) || []).length;
  check(longDashes === 0, `${label} has no long dashes in visible text`, `${longDashes} found`);
}

/* ------------------------------------------------- contact form rules --- */
for (const [locale, privacyWord, termsWord] of [
  ["he", "מדיניות הפרטיות", "תקנון האתר"],
  ["en", "Privacy Policy", "Terms of Use"],
]) {
  const contact = await get(`/${locale}/contact`);
  const html = contact.body;
  const consentInput = html.match(/<input[^>]*name="consent"[^>]*>/);
  check(!!consentInput, `${locale} contact form has a consent checkbox`);
  if (consentInput) {
    check(!/\bchecked\b/.test(consentInput[0]), `${locale} consent checkbox is unchecked by default`);
  }
  check(
    new RegExp(`href="/${locale}/privacy"[^>]*>${privacyWord}`).test(html),
    `${locale} consent links "${privacyWord}" to the privacy page`,
  );
  check(
    new RegExp(`href="/${locale}/terms"[^>]*>${termsWord}`).test(html),
    `${locale} consent links "${termsWord}" to the terms page`,
  );
}

/* --------------------------------------------------------- API guards --- */
const noOrigin = await fetch(`${BASE}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "a", phone: "1", email: "a@b.co", consent: true }),
});
check(noOrigin.status === 403, "POST /api/contact without Origin is rejected", `status ${noOrigin.status}`);

const noConsent = await fetch(`${BASE}/api/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: BASE,
    "x-real-ip": `10.99.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
  },
  body: JSON.stringify({ name: "a", phone: "1", email: "a@b.co", consent: false }),
});
check(noConsent.status === 422, "POST /api/contact without consent is rejected", `status ${noConsent.status}`);

/* --------------------------------------------------- security headers --- */
const home = await get("/he");
for (const header of [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
]) {
  check(home.headers.has(header), `security header ${header} present`);
}

/* ----------------------------------------------------------- summary --- */
console.log(`\n${"=".repeat(60)}`);
console.log(`schema types seen: ${[...seenSchemaTypes].sort().join(", ")}`);
console.log(`Q&A blocks with FAQPage schema: ${pagesWithFaqSchema}/${pagesWithFaqContent}`);
console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures > 0) {
  console.log(`${failures} FAILED\n`);
  process.exit(1);
}
console.log("All checks passed.\n");
