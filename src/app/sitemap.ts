import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath, navItems } from "@/lib/routes";

/**
 * Every entry carries `alternates.languages`, which Next renders as
 * `xhtml:link rel="alternate" hreflang=…` inside the sitemap. Without it the
 * sitemap lists the Hebrew and English URLs as unrelated pages and Google has
 * to infer the pairing from the page markup alone.
 */
function entry(
  path: string,
  locale: (typeof locales)[number],
  lastModified: Date,
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
    lastModified,
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    const dict = await getDictionary(locale);

    // Top-level pages from the main navigation.
    for (const item of navItems) {
      entries.push(entry(item.path, locale, lastModified));
    }

    // Secondary pages that are linked from the footer rather than the nav.
    entries.push(entry("/careers", locale, lastModified));

    for (const area of dict.practiceAreas.items) {
      entries.push(entry(`/practice-areas/${area.slug}`, locale, lastModified));
    }

    for (const member of dict.team.members) {
      entries.push(entry(`/team/${member.slug}`, locale, lastModified));
    }

    for (const group of dict.publications.groups) {
      for (const ruling of group.rulings ?? []) {
        entries.push(
          entry(`/publications/rulings/${ruling.slug}`, locale, lastModified),
        );
      }
    }

    for (const path of ["/privacy", "/accessibility", "/terms"]) {
      entries.push(entry(path, locale, lastModified));
    }
  }

  // Campaign landing pages. These exist in Hebrew only, so they are listed
  // once and without `alternates`: an hreflang pair here would point Google
  // at an English URL that carries no English content.
  entries.push({
    url: `${SITE_URL}${localePath("he", "/lp/protected-period")}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  return entries;
}
