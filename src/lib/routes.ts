import type { Locale } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.zahavilaw.com";

/** Build a locale-prefixed internal path, e.g. localePath("en", "/about"). */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * hreflang alternates for a page that exists in both locales.
 * Pass the locale-less path (e.g. "/about"); Hebrew doubles as x-default.
 */
export function localeAlternates(path = "/") {
  return {
    he: localePath("he", path),
    en: localePath("en", path),
    "x-default": localePath("he", path),
  };
}

/** The site's top-level navigation, used by the header and footer. */
export const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "practiceAreas", path: "/practice-areas" },
  { key: "team", path: "/team" },
  { key: "publications", path: "/publications" },
  { key: "faq", path: "/faq" },
  { key: "contact", path: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
