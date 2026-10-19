import type { Locale } from "@/i18n/config";

/**
 * One muted line stating when the page's legal content was last checked
 * against current law ("הדין נבדק נכון ליום ...").
 *
 * Rendered only on pages that carry `lawCheckedAt`, directly above the
 * "not legal advice" disclaimer (or in its place in templates without one).
 * The prefix text lives in the dictionaries (`common.lawCheckedPrefix`);
 * only the date formatting lives here. Never set `lawCheckedAt` without an
 * actual legal review - see the rule in SEO-GUIDELINES.md.
 */
export default function LawCheckedNote({
  date,
  locale,
  prefix,
  className = "",
}: {
  /** ISO date (YYYY-MM-DD) the law was last reviewed. */
  date: string;
  locale: Locale;
  prefix: string;
  className?: string;
}) {
  const [y, m, d] = date.split("-");
  const formatted =
    locale === "he"
      ? `${Number(d)}.${Number(m)}.${y}`
      : new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        });
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      {prefix} {formatted}.
    </p>
  );
}
