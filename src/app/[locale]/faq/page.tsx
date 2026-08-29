import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, faqNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon } from "@/components/Icons";

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
    path: "/faq",
    title: dict.faqPage.title,
    description: dict.faqPage.subtitle,
    brandName: dict.brand.name,
  });
}

function QuestionList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-6 space-y-5">
      {items.map((item) => (
        <article
          key={item.q}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <h3 className="text-base font-semibold text-navy">{item.q}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
        </article>
      ))}
    </div>
  );
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { faqPage, practiceAreas } = dict;
  const trail = [{ name: faqPage.title, path: "/faq" }];

  // One FAQPage node covering every question shown on this page: the general
  // ones plus each practice area's, so the whole page is eligible as a rich
  // result rather than only part of it.
  const allQuestions = [
    ...faqPage.general,
    ...practiceAreas.items.flatMap((area) => area.faq ?? []),
  ];

  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/faq",
    pageType: "FAQPage",
    name: faqPage.title,
    description: faqPage.subtitle,
    trail,
    nodes: [faqNode(typedLocale, "/faq", allQuestions)],
  });

  const areasWithFaq = practiceAreas.items.filter((a) => a.faq && a.faq.length > 0);

  return (
    <>
      <JsonLd data={graph} />

      <section className="border-b border-border bg-navy">
        <div className="container-x py-16 sm:py-20">
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <SectionHeading
            as="h1"
            eyebrow={faqPage.eyebrow}
            title={faqPage.title}
            subtitle={faqPage.subtitle}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="faq-general">
        <div className="container-x max-w-3xl">
          <h2 id="faq-general" className="text-3xl">
            {faqPage.generalTitle}
          </h2>
          <QuestionList items={faqPage.general} />
        </div>
      </section>

      <section className="section bg-surface" aria-labelledby="faq-by-area">
        <div className="container-x max-w-3xl">
          <h2 id="faq-by-area" className="text-3xl">
            {faqPage.byAreaTitle}
          </h2>
          <div className="mt-10 space-y-12">
            {areasWithFaq.map((area) => (
              <section key={area.slug} aria-labelledby={`faq-${area.slug}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 id={`faq-${area.slug}`} className="text-2xl text-navy">
                    {area.title}
                  </h3>
                  <Link
                    href={localePath(typedLocale, `/practice-areas/${area.slug}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold-600"
                  >
                    {practiceAreas.learnMore}
                    <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </div>
                <div className="mt-5 space-y-5">
                  {area.faq!.map((item) => (
                    <article
                      key={item.q}
                      className="rounded-xl border border-border bg-white p-6"
                    >
                      <h4 className="text-base font-semibold text-navy">{item.q}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-cta">
        <div className="container-x">
          <div className="rounded-2xl border border-border bg-navy p-10 text-center text-white">
            <h2 id="faq-cta" className="text-2xl text-white">
              {faqPage.stillHaveQuestions}
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
              {faqPage.stillHaveQuestionsBody}
            </p>
            <ButtonLink
              href={localePath(typedLocale, "/contact")}
              variant="primary"
              className="mt-7"
            >
              {dict.nav.cta}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
