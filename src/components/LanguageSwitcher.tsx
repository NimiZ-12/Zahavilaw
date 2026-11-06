"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/config";
import { isHebrewOnlyPath } from "@/lib/hebrew-only";

/** Swaps the locale segment of the current path while keeping the page.
 *  Pages that exist in Hebrew only have no counterpart to swap to, so
 *  their non-Hebrew link goes to that locale's homepage instead of a URL
 *  that would answer 404. */
function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the current locale.
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    const rest = segments.length > 2 ? `/${segments.slice(2).join("/")}` : "";
    if (target !== "he" && isHebrewOnlyPath(rest)) {
      return `/${target}`;
    }
    segments[1] = target;
    return segments.join("/") || "/";
  }
  return `/${target}`;
}

export default function LanguageSwitcher({
  locale,
  variant = "dark",
}: {
  locale: Locale;
  variant?: "dark" | "light";
}) {
  const pathname = usePathname() || `/${locale}`;
  const base = variant === "light" ? "text-white/70" : "text-muted";
  const active = variant === "light" ? "text-white" : "text-navy";

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-1 opacity-30">|</span>}
          {loc === locale ? (
            <span className={`font-medium ${active}`} aria-current="true">
              {localeLabel[loc]}
            </span>
          ) : (
            <Link
              href={swapLocale(pathname, loc)}
              className={`${base} transition-colors hover:text-gold`}
              hrefLang={loc}
            >
              {localeLabel[loc]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
