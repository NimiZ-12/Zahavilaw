import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. Pair it with `breadcrumbNode()` from
 * src/lib/schema.ts so the rendered trail and the BreadcrumbList structured
 * data always describe the same path — Google cross-checks the two.
 *
 * `trail` excludes Home (prepended here) and ends with the current page,
 * which is rendered as plain text rather than a link.
 */
export default function Breadcrumbs({
  locale,
  homeLabel,
  navLabel,
  trail,
  tone = "light",
}: {
  locale: Locale;
  homeLabel: string;
  navLabel: string;
  trail: Crumb[];
  /** "light" sits on a pale background, "dark" on the navy hero. */
  tone?: "light" | "dark";
}) {
  const items: Crumb[] = [{ name: homeLabel, path: "/" }, ...trail];
  const base = tone === "dark" ? "text-white/60" : "text-muted";
  const link =
    tone === "dark"
      ? "hover:text-gold-400 transition-colors"
      : "hover:text-gold-600 transition-colors";
  const current = tone === "dark" ? "text-white/90" : "text-navy";

  return (
    <nav aria-label={navLabel} className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span className={current} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={localePath(locale, crumb.path)} className={link}>
                    {crumb.name}
                  </Link>
                  <span aria-hidden className="opacity-50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
