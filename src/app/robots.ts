import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/routes";

/** Answer-engine and AI crawlers. Listing them explicitly rather than relying
 *  on the `*` rule makes the firm's content eligible to be cited in AI
 *  answers (AEO/GEO), and states the intent for anyone auditing the site. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  // While previewing (SITE_NOINDEX=true), keep the whole site out of search
  // engines so the unfinished version is never indexed.
  if (process.env.SITE_NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // `host` is omitted deliberately: it is a Yandex extension that Google
    // ignores, and host canonicalisation is already handled by the redirect
    // from the apex domain to www plus the self-canonical on every page.
  };
}
