export const locales = ["he", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "he";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
};

export const localeLabel: Record<Locale, string> = {
  he: "עברית",
  en: "English",
};

/** The opposite locale — used by the language switcher. */
export const otherLocale: Record<Locale, Locale> = {
  he: "en",
  en: "he",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
