/* ----------------------------------------------------------------------------
   The single source of truth for which path families exist in Hebrew only.
   ---------------------------------------------------------------------------
   These pages (campaign landing pages and the articles sections) have no
   English versions: the sitemap lists them without hreflang alternates
   (hebrewOnlyEntry, which asserts against this module at build time), and
   the language switcher sends their "English" link to the English homepage
   instead of a URL that would 404.

   A NEW Hebrew-only path family must be added here; individual pages inside
   an existing family (a new landing page or article) match automatically.
   scripts/verify-site.mjs keeps its own HEBREW_ONLY_PATHS list (plain Node,
   outside the TS graph) - keep the two in step.
---------------------------------------------------------------------------- */

/** Locale-less path families that exist in Hebrew only. */
export const HEBREW_ONLY_PATTERNS: readonly RegExp[] = [
  // Campaign landing pages (src/i18n/lp-registry.ts).
  /^\/lp\/[^/]+$/,
  // Labor-law articles hub and article pages.
  /^\/articles(\/[^/]+)?$/,
  // Department articles hubs and article pages.
  /^\/practice-areas\/[^/]+\/articles(\/[^/]+)?$/,
];

/** True when the locale-less path has no English version. */
export function isHebrewOnlyPath(path: string): boolean {
  return HEBREW_ONLY_PATTERNS.some((re) => re.test(path));
}
