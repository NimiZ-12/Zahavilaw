/* ----------------------------------------------------------------------------
   Quarterly legal-review report.
   ---------------------------------------------------------------------------
   Reads every page that carries a lawCheckedAt date (from the live site's
   rendered pages, same approach as verify-site.mjs - plain Node cannot
   import the TS content modules) and prints a Markdown table: page, URL,
   last review date, days elapsed. Used by the legal-review-reminder
   workflow to fill the quarterly GitHub Issue.

   Usage: node scripts/legal-review-report.mjs
   SITE_ORIGIN overrides the crawled origin for local testing.
---------------------------------------------------------------------------- */

const ORIGIN = process.env.SITE_ORIGIN || "https://www.zahavilaw.com";
const LAW_PREFIX = {
  he: "הדין נבדק נכון ליום",
  en: "The law was reviewed as of",
};
const MONTHS = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
};

async function main() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) {
    console.error(`Fetching sitemap failed: ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter(
      (p) =>
        /^\/he\/lp\//.test(p) ||
        /^\/he\/articles\/.+/.test(p) ||
        /^\/(he|en)\/practice-areas\/.+/.test(p) ||
        /^\/(he|en)\/faq$/.test(p),
    );

  const rows = [];
  for (const path of paths) {
    const page = await fetch(`${ORIGIN}${path}`);
    if (!page.ok) continue;
    const body = await page.text();
    const locale = path.startsWith("/en") ? "en" : "he";
    // React interleaves "<!-- -->" between adjacent text nodes.
    const m =
      locale === "he"
        ? body.match(
            new RegExp(`${LAW_PREFIX.he}(?:<!-- -->|\\s)*(\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})`),
          )
        : body.match(
            new RegExp(`${LAW_PREFIX.en}(?:<!-- -->|\\s)*(\\d{1,2}) ([A-Za-z]+) (\\d{4})`),
          );
    let checked = null;
    if (m) {
      checked =
        locale === "he"
          ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]))
          : new Date(Date.UTC(+m[3], (MONTHS[m[2]] || 1) - 1, +m[1]));
    }
    const title = (body.match(/<title>([^<]*)<\/title>/) || [])[1] || path;
    rows.push({ path, title: title.split("|")[0].trim(), checked });
  }

  console.log("| עמוד | כתובת | נבדק לאחרונה | ימים שחלפו |");
  console.log("|---|---|---|---|");
  for (const r of rows) {
    const date = r.checked
      ? `${r.checked.getUTCDate()}.${r.checked.getUTCMonth() + 1}.${r.checked.getUTCFullYear()}`
      : "אין תאריך";
    const days = r.checked
      ? String(Math.round((Date.now() - r.checked.getTime()) / 86400000))
      : "-";
    console.log(`| ${r.title} | ${ORIGIN}${r.path} | ${date} | ${days} |`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
