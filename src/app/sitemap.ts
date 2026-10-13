import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { landingPages } from "@/i18n/lp-registry";
import { articles } from "@/i18n/articles";
import { SITE_URL, localePath, navItems } from "@/lib/routes";

/**
 * Real last-modified dates per locale-less path. A sitemap in which every
 * URL "changed today" on every deploy is a signal Google learns to ignore,
 * so dates are maintained by hand here and updated only when a page's
 * CONTENT actually changes. Landing pages and articles carry their own
 * `updated` field in their content modules instead.
 *
 * The 2026-08-30 default is the site relaunch date.
 */
const RELAUNCH = "2026-08-30";
const PAGE_DATES: Record<string, string> = {
  "/about": "2026-08-31", // profile buttons + firm-in-numbers figures
  "/publications": "2026-10-12", // media videos and articles added through Oct
  "/practice-areas/labor-law": "2026-10-12", // linked FAQ entries to the landing pages
  "/faq": "2026-10-05", // linked protected-period question
};

function dateFor(path: string): Date {
  return new Date(`${PAGE_DATES[path === "/" ? "" : path] ?? RELAUNCH}T00:00:00Z`);
}

/**
 * Every bilingual entry carries `alternates.languages`, which Next renders as
 * `xhtml:link rel="alternate" hreflang=…` inside the sitemap. Without it the
 * sitemap lists the Hebrew and English URLs as unrelated pages and Google has
 * to infer the pairing from the page markup alone.
 */
function entry(
  path: string,
  locale: (typeof locales)[number],
): MetadataRoute.Sitemap[number] {
  // Crawl budget goes to the Hebrew pages that bring clients: Hebrew home
  // 1.0/weekly, other Hebrew pages 0.8/monthly, English uniformly 0.3/yearly.
  // English stays in the sitemap and indexable - lower priority only.
  const isHome = path === "/" || path === "";
  const priority = locale === "he" ? (isHome ? 1 : 0.8) : 0.3;
  const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
    locale === "he" ? (isHome ? "weekly" : "monthly") : "yearly";
  return {
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: dateFor(path),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        he: `${SITE_URL}${localePath("he", path)}`,
        en: `${SITE_URL}${localePath("en", path)}`,
        "x-default": `${SITE_URL}${localePath("he", path)}`,
      },
    },
  };
}

/** A Hebrew-only entry (campaign landing page or article): listed once,
 *  without `alternates` - an hreflang pair would point Google at an English
 *  URL that carries no English content. */
function hebrewOnlyEntry(
  path: string,
  updated: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${localePath("he", path)}`,
    lastModified: new Date(`${updated}T00:00:00Z`),
    changeFrequency: "monthly",
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const dict = await getDictionary(locale);

    // Top-level pages from the main navigation.
    for (const item of navItems) {
      entries.push(entry(item.path, locale));
    }

    // Secondary pages that are linked from the footer rather than the nav.
    entries.push(entry("/careers", locale));

    for (const area of dict.practiceAreas.items) {
      entries.push(entry(`/practice-areas/${area.slug}`, locale));
    }

    for (const member of dict.team.members) {
      entries.push(entry(`/team/${member.slug}`, locale));
    }

    for (const group of dict.publications.groups) {
      for (const ruling of group.rulings ?? []) {
        entries.push(entry(`/publications/rulings/${ruling.slug}`, locale));
      }
    }

    for (const path of ["/privacy", "/accessibility", "/terms"]) {
      entries.push(entry(path, locale));
    }
  }

  // Campaign landing pages (Hebrew only), from the shared registry.
  for (const { path, content } of landingPages) {
    entries.push(hebrewOnlyEntry(path, content.updated, 0.6));
  }

  // Articles hub + articles (Hebrew only). The hub exists only once the first
  // approved article is in; its date is the newest article's.
  if (articles.length > 0) {
    const newest = articles
      .map((g) => g.updated)
      .sort()
      .at(-1)!;
    entries.push(hebrewOnlyEntry("/articles", newest, 0.7));
    for (const g of articles) {
      entries.push(hebrewOnlyEntry(`/articles/${g.slug}`, g.updated, 0.7));
    }
  }

  return entries;
}
