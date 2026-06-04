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
  }

  return entries;
}
