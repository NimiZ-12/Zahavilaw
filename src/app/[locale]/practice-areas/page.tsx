import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, serviceNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
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
  return pageMetadata({
    locale,
    path: "/practice-areas",
    title: dict.practiceAreas.title,
    description: dict.practiceAreas.subtitle,
    brandName: dict.brand.name,
  });
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

  const trail = [{ name: practiceAreas.title, path: "/practice-areas" }];
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/practice-areas",
    pageType: "CollectionPage",
    name: practiceAreas.title,
    description: practiceAreas.subtitle,
    trail,
    nodes: practiceAreas.items.map((area) => serviceNode(typedLocale, area, dict)),
  });

  return (
    <>
      <JsonLd data={graph} />
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
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
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
