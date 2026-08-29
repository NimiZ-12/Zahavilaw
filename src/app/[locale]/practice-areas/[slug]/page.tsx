import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrackableLink from "@/components/TrackableLink";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, faqNode, serviceNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon, CheckIcon } from "@/components/Icons";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const dict = await getDictionary(locale);
    for (const area of dict.practiceAreas.items) {
      params.push({ locale, slug: area.slug });
    }
  }
  return params;
}

async function getArea(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  const area = dict.practiceAreas.items.find((a) => a.slug === slug);
  return { dict, area };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { dict, area } = await getArea(locale, slug);
  if (!area) return {};
  return pageMetadata({
    locale,
    path: `/practice-areas/${slug}`,
    title: area.title,
    description: area.summary,
    brandName: dict.brand.name,
  });
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const { dict, area } = await getArea(typedLocale, slug);
  if (!area) notFound();

  const { practiceAreas } = dict;
  const path = `/practice-areas/${slug}`;
  const trail = [
    { name: practiceAreas.title, path: "/practice-areas" },
    { name: area.title, path },
  ];

  // Service describes what the firm offers here; FAQPage exposes the
  // questions already on the page as a rich result.
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path,
    name: area.title,
    description: area.summary,
    trail,
    nodes: [
      serviceNode(typedLocale, area, dict),
      ...(area.faq?.length ? [faqNode(typedLocale, path, area.faq)] : []),
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <section className="border-b border-border bg-navy text-white">
        <div className="container-x py-16 sm:py-20">
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <Link
            href={localePath(typedLocale, "/practice-areas")}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold-400"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {practiceAreas.backToAll}
          </Link>
          <h1 className="mt-6 max-w-3xl text-4xl text-gold-400 sm:text-5xl">
            {area.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gold-400/70">
            {area.summary}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted">{area.description}</p>

            <h2 className="mt-10 text-2xl">{practiceAreas.inThisArea}</h2>
            <ul className="mt-6 space-y-4">
              {area.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-muted">{point}</span>
                </li>
              ))}
            </ul>
            {area.faq && area.faq.length > 0 && (
              <section className="mt-12" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl">
                  {practiceAreas.faqTitle}
                </h2>
                <div className="mt-6 space-y-6">
                  {area.faq.map((item) => (
                    <article
                      key={item.q}
                      className="rounded-xl border border-border bg-surface p-6"
                    >
                      <h3 className="text-base font-semibold text-navy">{item.q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pl-6">
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-8">
              <h2 className="text-xl">{practiceAreas.needHelp}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {dict.contact.subtitle}
              </p>
              <ButtonLink
                href={localePath(typedLocale, "/contact")}
                variant="primary"
                className="mt-6 w-full"
              >
                {dict.nav.cta}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </ButtonLink>
              <div className="mt-6 border-t border-border pt-6 text-sm">
                <TrackableLink
                  href={`tel:${dict.contact.phone}`}
                  method="phone"
                  className="font-medium text-navy hover:text-gold"
                  dir="ltr"
                >
                  {dict.contact.phone}
                </TrackableLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
