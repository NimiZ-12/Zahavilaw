import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates, localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import HeroImagePreload from "@/components/HeroImagePreload";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon } from "@/components/Icons";
import { practiceAreaIcons } from "@/lib/practice-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.practiceAreas.title,
    description: dict.practiceAreas.subtitle,
    alternates: {
      canonical: localePath(locale, "/practice-areas"),
      languages: localeAlternates("/practice-areas"),
    },
  };
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { practiceAreas } = dict;

  return (
    <>
      <HeroImagePreload src={images.practiceAreas} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${images.practiceAreas}')` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow={practiceAreas.eyebrow}
            title={practiceAreas.title}
            subtitle={practiceAreas.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.items.map((area) => {
            const AreaIcon = practiceAreaIcons[area.slug];
            return (
            <Link
              key={area.slug}
              href={localePath(typedLocale, `/practice-areas/${area.slug}`)}
              className="group flex flex-col rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
            >
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-gold-soft ring-1 ring-border transition-colors group-hover:ring-gold/40">
                <AreaIcon className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-xl transition-colors group-hover:text-gold">
                {area.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {area.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                {practiceAreas.learnMore}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
