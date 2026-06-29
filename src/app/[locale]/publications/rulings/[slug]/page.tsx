import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { ArrowIcon } from "@/components/Icons";

/** Collects every court-ruling entry across the publications groups. */
async function getRulings(locale: Locale) {
  const dict = await getDictionary(locale);
  return dict.publications.groups.flatMap((group) => group.rulings ?? []);
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const ruling of await getRulings(locale)) {
      params.push({ locale, slug: ruling.slug });
    }
  }
  return params;
}

async function getRuling(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  const ruling = (await getRulings(locale)).find((r) => r.slug === slug);
  return { dict, ruling };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { ruling } = await getRuling(locale, slug);
  if (!ruling) return {};
  return {
    title: ruling.title,
    alternates: { canonical: localePath(locale, `/publications/rulings/${slug}`) },
  };
}

export default async function RulingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const { dict, ruling } = await getRuling(typedLocale, slug);
  if (!ruling) notFound();

  const { publications } = dict;
  const pdf = `/rulings/${slug}.pdf`;

  return (
    <>
      <section className="border-b border-border bg-navy text-white">
        <div className="container-x py-12 sm:py-16">
          <Link
            href={localePath(typedLocale, "/publications")}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold-400"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {publications.title}
          </Link>
          <h1 className="mt-5 max-w-3xl text-2xl leading-snug text-gold-400 sm:text-3xl">
            {ruling.title}
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <object
              data={pdf}
              type="application/pdf"
              className="h-[80vh] w-full"
              aria-label={ruling.title}
            >
              <div className="flex flex-col items-center gap-4 p-10 text-center">
                <p className="text-muted">
                  {typedLocale === "he"
                    ? "לא ניתן להציג את הקובץ בדפדפן זה."
                    : "This browser cannot display the file inline."}
                </p>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-600"
                >
                  {publications.readRuling}
                  <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                </a>
              </div>
            </object>
          </div>
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-600"
          >
            {publications.readRuling}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
      </section>
    </>
  );
}
