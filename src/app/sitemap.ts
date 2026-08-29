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
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap[number] {
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
      entries.push(
        entry(
          item.path,
          locale,
          lastModified,
          item.path === "/" ? "weekly" : "monthly",
          item.path === "/" ? 1 : 0.8,
        ),
      );
    }

    // Secondary pages that are linked from the footer rather than the nav.
    entries.push(entry("/careers", locale, lastModified, "monthly", 0.6));

    for (const area of dict.practiceAreas.items) {
      entries.push(
        entry(`/practice-areas/${area.slug}`, locale, lastModified, "monthly", 0.7),
      );
    }

    for (const member of dict.team.members) {
      entries.push(entry(`/team/${member.slug}`, locale, lastModified, "yearly", 0.5));
    }

    for (const group of dict.publications.groups) {
      for (const ruling of group.rulings ?? []) {
        entries.push(
          entry(
            `/publications/rulings/${ruling.slug}`,
            locale,
            lastModified,
            "yearly",
            0.5,
          ),
        );
      }
    }

    for (const path of ["/privacy", "/accessibility", "/terms"]) {
      entries.push(entry(path, locale, lastModified, "yearly", 0.3));
    }
  }

  return entries;
}
