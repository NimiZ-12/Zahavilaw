#!/usr/bin/env node
/**
 * Post-deploy indexation verifier for zahavilaw.com.
 *
 * Usage:
 *   node scripts/verify-indexation.mjs                    # checks production
 *   node scripts/verify-indexation.mjs https://zahavilaw.vercel.app
 *
 * Asserts:
 *   1. Every legacy WordPress URL (raw Hebrew / percent-encoded, with and
 *      without trailing slash) permanently redirects and finally lands 200
 *      on its expected destination path.
 *   2. Every URL in sitemap.xml returns 200, carries no noindex (header or
 *      meta) and declares a canonical equal to itself.
 *   3. robots.txt allows crawling and references the sitemap.
 *
 * Exits non-zero when any check fails.
 */

const BASE = (process.argv[2] || "https://www.zahavilaw.com").replace(/\/$/, "");

const LEGACY = [
  ["עורך-דין-פיטורים", "/he/practice-areas/labor-law"],
  ["פיטורים-בלי-שימוע", "/he/practice-areas/labor-law"],
  ["עורך-דין-דיני-עבודה", "/he/practice-areas/labor-law"],
  ["זכויות-עובדים", "/he/practice-areas/labor-law"],
  ["מניעת-פיטורים", "/he/practice-areas/labor-law"],
  ["זכויות-מעסיקים", "/he/practice-areas/labor-law"],
  ["ייצוג-בבית-הדין-לעבודה", "/he/practice-areas/labor-law"],
  ["אודות", "/he/about"],
  ["עוד-רון-זהבי", "/he/team/ron-zahavi"],
  ["עוד-ענת-זהבי", "/he/team/anat-zahavi"],
  ["צור-קשר", "/he/contact"],
  ["תחומי-התמחות", "/he/practice-areas"],
  ["מידע-מקצועי", "/he/publications"],
  ["סיפורי-הצלחה", "/he/publications"],
];

const WP_LEFTOVERS = ["/wp-content/x.css", "/wp-admin/", "/wp-json/wp/v2/posts", "/feed", "/category/law", "/tag/law"];

const results = [];
function record(group, name, ok, detail = "") {
  results.push({ group, name, ok, detail });
}

/** Follow redirects manually so we can assert permanence of every hop. */
async function followChain(url, maxHops = 6) {
  const hops = [];
  let current = url;
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, { redirect: "manual" });
    hops.push({ url: current, status: res.status });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return { hops, final: null };
      current = new URL(loc, current).href;
    } else {
      return { hops, final: res };
    }
  }
  return { hops, final: null };
}

async function checkLegacy() {
  for (const [slug, dest] of LEGACY) {
    const variants = [
      `/${encodeURI(slug)}`,
      `/${encodeURI(slug)}/`,
      `/${slug}`, // fetch encodes the Hebrew itself — covers the "raw" form
      `/${slug}/`,
    ];
    for (const v of variants) {
      const name = `${decodeURI(v)}`;
      try {
        const { hops, final } = await followChain(BASE + v);
        const landed = final && new URL(hops[hops.length - 1].url).pathname === dest && final.status === 200;
        const allPermanent = hops
          .filter((h) => h.status >= 300 && h.status < 400)
          .every((h) => h.status === 301 || h.status === 308);
        record(
          "legacy",
          name,
          Boolean(landed && allPermanent),
          `${hops.map((h) => h.status).join("→")} → ${final ? new URL(hops[hops.length - 1].url).pathname : "?"}${allPermanent ? "" : " (non-permanent hop!)"}`,
        );
      } catch (e) {
        record("legacy", name, false, String(e.message || e));
      }
    }
  }
  for (const path of WP_LEFTOVERS) {
    try {
      const { hops, final } = await followChain(BASE + path);
      const allPermanent = hops
        .filter((h) => h.status >= 300 && h.status < 400)
        .every((h) => h.status === 301 || h.status === 308);
      record("wp-leftover", path, Boolean(final && final.status === 200 && allPermanent), hops.map((h) => h.status).join("→"));
    } catch (e) {
      record("wp-leftover", path, false, String(e.message || e));
    }
  }
}

async function checkRobotsAndSitemap() {
  let sitemapUrls = [];
  try {
    const robots = await (await fetch(`${BASE}/robots.txt`)).text();
    record("robots", "allows crawl", !/^\s*Disallow:\s*\/\s*$/m.test(robots), "no blanket Disallow: /");
    record("robots", "references sitemap", /Sitemap:\s*\S+sitemap\.xml/i.test(robots));
  } catch (e) {
    record("robots", "fetch", false, String(e.message || e));
  }
  try {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    record("sitemap", "parses & non-empty", sitemapUrls.length > 0, `${sitemapUrls.length} URLs`);
  } catch (e) {
    record("sitemap", "fetch", false, String(e.message || e));
  }
  return sitemapUrls;
}

async function checkPages(sitemapUrls) {
  for (const url of sitemapUrls) {
    // The sitemap lists production URLs; test them against BASE so the script
    // also works on preview deploys.
    const testUrl = url.replace("https://www.zahavilaw.com", BASE);
    try {
      const res = await fetch(testUrl);
      const xRobots = res.headers.get("x-robots-tag") || "";
      const html = await res.text();
      const metaNoindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
      const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || [])[1];
      const ok =
        res.status === 200 &&
        !xRobots.toLowerCase().includes("noindex") &&
        !metaNoindex &&
        canonical === url;
      record(
        "page",
        new URL(url).pathname,
        ok,
        `${res.status}${xRobots.toLowerCase().includes("noindex") || metaNoindex ? " noindex!" : ""}${canonical !== url ? ` canonical=${canonical}` : ""}`,
      );
    } catch (e) {
      record("page", url, false, String(e.message || e));
    }
  }
}

const sitemapUrls = await checkRobotsAndSitemap();
await checkLegacy();
await checkPages(sitemapUrls);

const failed = results.filter((r) => !r.ok);
console.log(`\n${"OK ".repeat(0)}Results against ${BASE}\n`);
for (const r of results) {
  console.log(`${r.ok ? "✅" : "❌"} [${r.group}] ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) {
  console.error(`\n${failed.length} FAILURES.`);
  process.exit(1);
}
