import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  // While previewing (SITE_NOINDEX=true), keep the whole site out of search
  // engines so the unfinished version is never indexed.
  if (process.env.SITE_NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
