import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath, navItems } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    // Top-level pages.
    for (const item of navItems) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, item.path)}`,
        lastModified,
        changeFrequency: item.path === "/" ? "weekly" : "monthly",
        priority: item.path === "/" ? 1 : 0.8,
      });
    }

    // Individual practice areas.
    const dict = await getDictionary(locale);
    for (const area of dict.practiceAreas.items) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, `/practice-areas/${area.slug}`)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Individual team-member profiles.
    for (const member of dict.team.members) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, `/team/${member.slug}`)}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }

    // Court-ruling reader pages.
    for (const group of dict.publications.groups) {
      for (const ruling of group.rulings ?? []) {
        entries.push({
          url: `${SITE_URL}${localePath(locale, `/publications/rulings/${ruling.slug}`)}`,
          lastModified,
          changeFrequency: "yearly",
          priority: 0.5,
        });
      }
    }

    // Legal pages.
    for (const path of ["/privacy", "/accessibility"]) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return entries;
}
