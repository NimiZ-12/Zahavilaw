import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n/config";
import he from "./i18n/dictionaries/he";

/**
 * Dead WordPress URL families from the pre-2026 site. They have no equivalent
 * on this site, so they answer 410 Gone: redirecting them all to the homepage
 * reads as a soft 404 to Google and wastes crawl budget re-checking them.
 */
const GONE_PREFIXES = [
  "/feed",
  "/category",
  "/author",
  "/tag",
  "/wp-json",
  "/wp-content",
  "/wp-admin",
  "/pages",
];

function isGone(pathname: string): boolean {
  return GONE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Every locale-less path that actually exists on the site. Built from the
 * Hebrew dictionary - the same source of truth the sitemap uses - so a new
 * practice area, attorney, or ruling is picked up automatically. Slugs are
 * identical in both locales.
 *
 * Only these paths get the /he locale redirect. Anything else falls through
 * to the [locale] segment, whose layout calls notFound() for an unknown
 * locale - so a bad URL answers 404 in a single request instead of the old
 * redirect-then-404 chain that Search Console flagged.
 */
const KNOWN_PATHS = new Set<string>([
  "",
  "/about",
  "/practice-areas",
  "/team",
  "/publications",
  "/faq",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/accessibility",
  // Hebrew-only campaign landing page (see src/i18n/lp-protected-period.ts);
  // redirecting to /he is right for it by definition.
  "/lp/protected-period",
  ...he.practiceAreas.items.map((a) => `/practice-areas/${a.slug}`),
  ...he.team.members.map((m) => `/team/${m.slug}`),
  ...he.publications.groups.flatMap((g) =>
    (g.rulings ?? []).map((r) => `/publications/rulings/${r.slug}`),
  ),
]);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isGone(pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Old WordPress search (/?s=term) is another dead family. Scoped to
  // locale-less paths so a stray ?s= on a live page can never kill it.
  if (searchParams.has("s")) {
    return new NextResponse(null, { status: 410 });
  }

  // Root and other known paths always land on Hebrew - the firm's audience
  // and the sitemap's x-default. The old Accept-Language redirect sent
  // Googlebot (which crawls with English headers from US IPs) into the
  // English site as its main entry point, against Google's own guidance;
  // human visitors switch language with the in-site toggle.
  const clean =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  if (KNOWN_PATHS.has(clean === "/" ? "" : clean)) {
    const url = request.nextUrl.clone();
    url.pathname = `/he${clean === "/" ? "" : clean}`;
    // 308 (permanent) so search engines pass authority through the locale
    // hop; the default 307 marks the redirect temporary and dilutes signals.
    return NextResponse.redirect(url, 308);
  }

  // Unknown path: let the [locale] layout 404 it directly.
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next internals, API routes and files with an extension (assets).
    "/((?!_next|api|.*\\..*).*)",
    // The dead WordPress families again, explicitly: the catch-all above
    // skips dotted paths, but /wp-content/foo.jpg must still answer 410.
    "/feed/:path*",
    "/category/:path*",
    "/author/:path*",
    "/tag/:path*",
    "/wp-json/:path*",
    "/wp-content/:path*",
    "/wp-admin/:path*",
    "/pages/:path*",
  ],
};
