# SEO Indexation Fix Report — zahavilaw.com

_Last updated: July 2026. Production host: `https://www.zahavilaw.com`._

## 1. Legacy redirect map (all permanent, percent-encoded + raw, ± trailing slash)

| Old WordPress URL | Destination |
|---|---|
| /עורך-דין-פיטורים | /he/practice-areas/labor-law |
| /פיטורים-בלי-שימוע | /he/practice-areas/labor-law |
| /עורך-דין-דיני-עבודה | /he/practice-areas/labor-law |
| /זכויות-עובדים | /he/practice-areas/labor-law |
| /זכויות-מעסיקים | /he/practice-areas/labor-law (no dedicated employers page exists) |
| /מניעת-פיטורים | /he/practice-areas/labor-law |
| /ייצוג-בבית-הדין-לעבודה | /he/practice-areas/labor-law |
| /אודות | /he/about |
| /עוד-רון-זהבי | /he/team/ron-zahavi |
| /עוד-ענת-זהבי | /he/team/anat-zahavi |
| /צור-קשר | /he/contact |
| /תחומי-התמחות | /he/practice-areas |
| /מידע-מקצועי | /he/publications (owner's decision) |
| /סיפורי-הצלחה | /he/publications (owner's decision — rulings section serves as case results) |
| /wp-content/*, /wp-admin/*, /wp-json/*, /feed, /category/*, /tag/* | /he |

Implementation: `next.config.ts` `redirects()`, `permanent: true`. Sources are
percent-encoded (Googlebot/browsers request the encoded form; Next matches the
encoded pathname). Trailing-slash requests resolve through Next's built-in
slash normalization (one extra permanent hop) — Google follows this fine.

## 2. Indexable URL inventory (= sitemap contents)

`app/sitemap.ts` generates ~52 URLs, absolute `https://www.zahavilaw.com`, both
locales: home, about, practice-areas index + 6 practice areas, team index + 2
member profiles, publications + 9 court-ruling pages, contact, privacy,
accessibility. Excluded: API routes, redirecting legacy URLs.

## 3. Changes made in this pass

1. **Locale redirect is now permanent** — `src/proxy.ts` sends 308 (was 307)
   when adding the `/he`/`/en` prefix, so `/` → `/he` passes full authority.
2. **WordPress leftover catch-alls** — `/wp-content/*`, `/wp-admin/*`,
   `/wp-json/*`, `/feed`, `/category/*`, `/tag/*` → `/he`, permanent.
3. **Correct per-page hreflang** — every page now emits `he`/`en`/`x-default`
   alternates pointing at its own translated path (previously the layout
   pointed every page's alternates at the two homepages).
4. **Meta descriptions for ruling pages** — factual, derived from the ruling
   title (the only pages that lacked a description).
5. **`scripts/verify-indexation.mjs`** — automated post-deploy verifier (see §4).

Previously completed (earlier passes): the 14 legacy 301/308 redirects, sitemap
expansion, robots.txt with sitemap reference, self-canonicals, and host
canonicalization (`zahavilaw.com` → `www`, verified in the Vercel dashboard).

## 4. Verification

Run against production after deploy:

```bash
node scripts/verify-indexation.mjs                    # production
node scripts/verify-indexation.mjs https://zahavilaw.vercel.app
```

Asserts: every legacy variant → permanent-only chain → 200 at the expected
path; every sitemap URL → 200, no noindex (header or meta), self-canonical;
robots.txt allows crawl and references the sitemap. Non-zero exit on failure.

Latest run: see terminal output committed alongside this change (run on the
`zahavilaw.vercel.app` deploy; production is network-restricted from the
agent environment — re-run locally against production to confirm).

## 5. Manual steps for Ron

1. **Google Search Console** (property already verified):
   - Submit sitemap: `https://www.zahavilaw.com/sitemap.xml`.
   - Pages/Coverage → old 404 group → **Validate Fix**.
   - URL Inspection → **Request Indexing** for `/he`,
     `/he/practice-areas/labor-law`, `/he/about`, `/he/contact`.
   - Recommended: add a property for the full host
     `https://www.zahavilaw.com/` (root verification file is already live) —
     the current property covers only `/he/`.
2. **Vercel dashboard**: nothing new — domain redirect (`zahavilaw.com` → www,
   http → https) already verified correct.

## Honest scope note

Code can make the site perfectly indexable, but it cannot make Google index
it. After this fix the remaining variables are the Search Console steps above
and Google's own re-crawl cadence, which typically takes days to weeks.
