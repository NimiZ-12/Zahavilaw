#!/usr/bin/env node
/**
 * Pre-launch audit. Run against a production build before going live:
 *
 *   npm run build && npx next start -p 3000
 *   node scripts/preflight.mjs                     # localhost:3000
 *   node scripts/preflight.mjs https://www.zahavilaw.com
 *
 * Complements verify-site.mjs (which checks page structure). This one checks
 * that nothing is broken or orphaned for anyone arriving from outside:
 * legacy URLs, internal links, assets, PDFs, videos and outbound links.
 *
 * Exits non-zero on any failure.
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

let fails = 0;
let checks = 0;
const notes = [];

function ok(cond, label, detail = "") {
  checks += 1;
  if (!cond) {
    fails += 1;
    console.log(`  FAIL  ${label}${detail ? ` - ${detail}` : ""}`);
  }
  return cond;
}

async function head(path) {
  try {
    const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
    return { status: res.status, location: res.headers.get("location"), headers: res.headers };
  } catch (e) {
    return { status: 0, error: String(e) };
  }
}

/** Follows redirects manually so we can assert the whole chain is permanent. */
async function chase(path, max = 5) {
  const hops = [];
  let current = path;
  for (let i = 0; i < max; i++) {
    const r = await head(current);
    hops.push({ path: current, status: r.status });
    if (r.status >= 300 && r.status < 400 && r.location) {
      current = r.location.startsWith("http") ? new URL(r.location).pathname : r.location;
      continue;
    }
    break;
  }
  return hops;
}

console.log(`\nPre-launch audit of ${BASE}\n${"=".repeat(64)}`);

/* ------------------------------------------------ 1. legacy WP redirects -- */
console.log("\n1. Legacy WordPress URLs (Google still has these indexed)\n");

const LEGACY = [
  ["/עורך-דין-פיטורים", "/he/practice-areas/labor-law"],
  ["/פיטורים-בלי-שימוע", "/he/practice-areas/labor-law"],
  ["/עורך-דין-דיני-עבודה", "/he/practice-areas/labor-law"],
  ["/זכויות-עובדים", "/he/practice-areas/labor-law"],
  ["/זכויות-מעסיקים", "/he/practice-areas/labor-law"],
  ["/מניעת-פיטורים", "/he/practice-areas/labor-law"],
  ["/ייצוג-בבית-הדין-לעבודה", "/he/practice-areas/labor-law"],
  ["/אודות", "/he/about"],
  ["/עוד-רון-זהבי", "/he/team/ron-zahavi"],
  ["/עוד-ענת-זהבי", "/he/team/anat-zahavi"],
  ["/צור-קשר", "/he/contact"],
  ["/תחומי-התמחות", "/he/practice-areas"],
  ["/מידע-מקצועי", "/he/publications"],
  ["/סיפורי-הצלחה", "/he/publications"],
];

for (const [slug, expected] of LEGACY) {
  for (const variant of [encodeURI(slug), `${encodeURI(slug)}/`]) {
    const hops = await chase(variant);
    const final = hops[hops.length - 1];
    const allPermanent = hops
      .slice(0, -1)
      .every((h) => h.status === 301 || h.status === 308);
    ok(final.status === 200, `${slug} lands on a live page`, `ended ${final.status}`);
    ok(allPermanent, `${slug} chain is permanent only`, hops.map((h) => h.status).join(" -> "));
    ok(
      final.path === expected,
      `${slug} lands on the right page`,
      `got ${final.path}`,
    );
  }
}

// WordPress leftovers that must not 404.
for (const p of ["/wp-content/uploads/x.jpg", "/wp-admin/", "/wp-json/wp/v2/posts", "/feed", "/category/news", "/tag/x"]) {
  const hops = await chase(p);
  const final = hops[hops.length - 1];
  ok(final.status === 200, `WP leftover ${p} is caught`, `ended ${final.status}`);
}

/* ---------------------------------------------- 2. crawl every sitemap URL */
console.log("\n2. Every page, every internal link\n");

const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
const sitemapXml = await sitemapRes.text();
const pages = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname,
);

const internalTargets = new Set();
const externalLinks = new Map(); // href -> pages that link to it
const assets = new Set();

for (const page of pages) {
  const res = await fetch(`${BASE}${page}`);
  if (!ok(res.status === 200, `${page} is live`, `status ${res.status}`)) continue;
  const html = await res.text();

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith("/")) internalTargets.add(href.split("#")[0]);
    else if (href.startsWith("http")) {
      if (!externalLinks.has(href)) externalLinks.set(href, []);
      externalLinks.get(href).push(page);
    }
  }
  // srcset holds several candidates, each "<url> <descriptor>", comma
  // separated. Splitting only on the first space keeps the descriptor of
  // every candidate but the first glued to the URL, so split the list first.
  for (const m of html.matchAll(/\bsrc="([^"]+)"/g)) {
    const src = m[1].trim();
    if (src.startsWith("/") && !src.startsWith("/_next/static")) assets.add(src);
  }
  for (const m of html.matchAll(/\bsrcSet="([^"]+)"/gi)) {
    for (const candidate of m[1].split(",")) {
      const src = candidate.trim().split(/\s+/)[0];
      if (src.startsWith("/") && !src.startsWith("/_next/static")) assets.add(src);
    }
  }
}

console.log(`   crawled ${pages.length} pages`);
console.log(`   found ${internalTargets.size} distinct internal link targets`);

for (const target of [...internalTargets].sort()) {
  if (target.startsWith("/_next") || target === "") continue;
  const hops = await chase(target);
  const final = hops[hops.length - 1];
  ok(
    final.status === 200,
    `internal link ${target}`,
    `ended ${final.status} via ${hops.map((h) => h.status).join(">")}`,
  );
}

/* -------------------------------------------------------- 3. assets, PDFs */
console.log("\n3. Assets and court-ruling PDFs\n");

for (const asset of [...assets].sort()) {
  // Un-escape HTML entities only. The `url=` parameter of /_next/image is
  // deliberately percent-encoded; percent-decoding it here would corrupt the
  // query string and make a working image look like a 400.
  const url = asset.replace(/&amp;/g, "&");
  const r = await head(url);
  ok(r.status === 200, `asset ${url.slice(0, 70)}`, `status ${r.status}`);
}

const rulingSlugs = [...sitemapXml.matchAll(/\/publications\/rulings\/([a-z-]+)</g)].map(
  (m) => m[1],
);
for (const slug of [...new Set(rulingSlugs)]) {
  const r = await head(`/rulings/${slug}.pdf`);
  ok(r.status === 200, `PDF /rulings/${slug}.pdf`, `status ${r.status}`);
  if (r.status === 200) {
    ok(
      (r.headers.get("content-type") || "").includes("pdf"),
      `PDF ${slug} served as application/pdf`,
      r.headers.get("content-type") || "",
    );
  }
}

/* --------------------------------------------------- 4. outbound linkage */
console.log("\n4. Outbound links (articles, video, maps)\n");

const byHost = new Map();
for (const [href, pagesLinking] of externalLinks) {
  const host = new URL(href).host;
  if (!byHost.has(host)) byHost.set(host, []);
  byHost.get(host).push({ href, pages: pagesLinking });
}
for (const [host, entries] of [...byHost].sort()) {
  console.log(`   ${host}: ${entries.length} link(s)`);
  notes.push(...entries.map((e) => `${host}  ${e.href}`));
}
// Every external link must open safely.
const homeHtml = await (await fetch(`${BASE}/he/publications`)).text();
const unsafeTargets = [...homeHtml.matchAll(/<a[^>]*target="_blank"[^>]*>/g)].filter(
  (m) => !/rel="[^"]*noopener/.test(m[0]),
);
ok(unsafeTargets.length === 0, "external links use rel=noopener", `${unsafeTargets.length} missing`);

/* ------------------------------------------------------------- 5. videos */
const videoIds = [...new Set([...homeHtml.matchAll(/\/vi\/([A-Za-z0-9_-]{11})\//g)].map((m) => m[1]))];
console.log(`   YouTube videos referenced: ${videoIds.length} (${videoIds.join(", ")})`);
ok(videoIds.length > 0, "publications page references videos");

/* ------------------------------------------------------- 6. indexability */
console.log("\n5. Indexability\n");

const robots = await (await fetch(`${BASE}/robots.txt`)).text();
ok(!/^Disallow: \/$/m.test(robots), "robots.txt does NOT block the whole site");
ok(robots.includes("Sitemap:"), "robots.txt points at the sitemap");

const homeRes = await fetch(`${BASE}/he`);
const homeHead = await homeRes.text();
ok(
  !/<meta name="robots"[^>]*noindex/i.test(homeHead),
  "homepage is NOT noindex  <-- SITE_NOINDEX must be unset in production",
);
ok(
  !(homeRes.headers.get("x-robots-tag") || "").includes("noindex"),
  "no X-Robots-Tag noindex header",
);

const canonical = homeHead.match(/<link rel="canonical" href="([^"]+)"/);
ok(!!canonical, "homepage has a canonical");
if (canonical) console.log(`   canonical: ${canonical[1]}`);

/* -------------------------------------------------------------- summary */
console.log(`\n${"=".repeat(64)}`);
console.log("\nOutbound links to verify by hand (agent network cannot reach them):");
for (const n of [...new Set(notes)].sort()) console.log(`   ${n}`);

console.log(`\n${checks - fails}/${checks} checks passed`);
if (fails > 0) {
  console.log(`${fails} FAILED\n`);
  process.exit(1);
}
console.log("Pre-launch audit clean.\n");
