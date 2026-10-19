/* ----------------------------------------------------------------------------
   IndexNow submitter - tells Bing (and through it ChatGPT/Copilot, plus
   Yandex, Seznam and Naver; Google ignores the protocol) which URLs changed,
   instead of waiting for the next crawl.

   Usage:
     node scripts/indexnow.mjs [--since YYYY-MM-DD] [--dry-run]

   - --since defaults to two days ago (UTC). A sitemap entry is submitted
     when its <lastmod> is on or after that date. The sitemap's dates are
     real (the `updated` field in article/landing-page modules, PAGE_DATES
     for the rest), so only pages that actually changed are sent - never
     the whole sitemap: resubmitting unchanged URLs looks like spam.
   - Hebrew pages only (/he...), matching the project's standing rule of
     not requesting indexing for the English twins.
   - --dry-run prints what would be sent without calling the API. The
     SITE_ORIGIN env var points the sitemap fetch at a local build for
     testing (the agent environment cannot reach the live site).

   Runs automatically after every production deploy via
   .github/workflows/indexnow.yml; exits 0 without sending when nothing
   changed. The key is public by design - it only proves the request comes
   from the site's owner - so nothing here is a secret.
---------------------------------------------------------------------------- */

const HOST = "www.zahavilaw.com";
const KEY = "96e9047e9fc62cc8f058225e1afe1c60";
const ORIGIN = process.env.SITE_ORIGIN || `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function parseArgs(argv) {
  const args = { since: null, dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--since") args.since = argv[++i];
    else if (argv[i] === "--dry-run") args.dryRun = true;
    else {
      console.error(`Unknown argument: ${argv[i]}`);
      process.exit(2);
    }
  }
  if (args.since === null) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 2);
    args.since = d.toISOString().slice(0, 10);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.since)) {
    console.error(`--since must be YYYY-MM-DD, got: ${args.since}`);
    process.exit(2);
  }
  return args;
}

async function main() {
  const { since, dryRun } = parseArgs(process.argv);
  const sinceMs = Date.parse(`${since}T00:00:00Z`);

  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) {
    console.error(`Fetching sitemap failed: ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();

  const urls = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) || []) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (!loc || !lastmod) continue;
    const path = new URL(loc).pathname;
    if (path !== "/he" && !path.startsWith("/he/")) continue;
    if (Date.parse(lastmod) < sinceMs) continue;
    // Submit the canonical production URL even when the sitemap was read
    // from a local build.
    urls.push(`https://${HOST}${path}`);
  }

  if (urls.length === 0) {
    console.log(`No Hebrew URLs changed since ${since}; nothing to submit.`);
    return;
  }

  console.log(`${urls.length} URL(s) changed since ${since}:`);
  for (const u of urls) console.log(`  ${u}`);

  if (dryRun) {
    console.log("Dry run - not submitting.");
    return;
  }

  const post = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  console.log(`IndexNow response: ${post.status}`);
  // 200 = submitted, 202 = accepted (key validation pending). Anything
  // else (e.g. 422: URL not on host / key not found) fails the run.
  if (post.status !== 200 && post.status !== 202) {
    console.error(await post.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
