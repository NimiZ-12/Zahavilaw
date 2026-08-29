import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { SITE_URL, localeAlternates, localePath } from "./routes";

/**
 * Builds a page's metadata: title, description, self-canonical, hreflang
 * alternates and a per-page Open Graph / Twitter card.
 *
 * Without this the layout's site-wide Open Graph block leaks onto every
 * subpage, so `og:title` and `og:url` describe the homepage no matter which
 * page is shared. Every route should use this rather than hand-rolling
 * `alternates`.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  brandName,
  image = "/og-image.jpg",
  type = "website",
}: {
  locale: Locale;
  /** Locale-less path, e.g. "/about". */
  path: string;
  title: string;
  description: string;
  brandName: string;
  image?: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const url = localePath(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: localeAlternates(path),
    },
    openGraph: {
      type,
      siteName: brandName,
      title,
      description,
      url,
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}
