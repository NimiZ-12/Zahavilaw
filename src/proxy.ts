import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

/**
 * Adds a locale prefix to any path that doesn't already have one.
 * Picks the locale from the `Accept-Language` header, defaulting to Hebrew.
 */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase());
    for (const lang of preferred) {
      const base = lang.split("-")[0];
      if ((locales as readonly string[]).includes(base)) {
        return base;
      }
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  // 308 (permanent) so search engines pass authority through the locale hop;
  // the default 307 marks the redirect temporary and dilutes indexing signals.
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
