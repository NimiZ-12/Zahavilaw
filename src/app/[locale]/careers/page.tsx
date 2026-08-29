import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, jobPostingNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon, MailIcon } from "@/components/Icons";

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
    path: "/careers",
    title: dict.careers.title,
    description: dict.careers.subtitle,
    brandName: dict.brand.name,
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { careers } = dict;
  const trail = [{ name: careers.title, path: "/careers" }];

  // Each published opening becomes a JobPosting so it can surface in Google
  // for Jobs. With no openings the page still stands on its own as an
  // employer profile.
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/careers",
    name: careers.title,
    description: careers.subtitle,
    trail,
    nodes: careers.openings.map((opening) =>
      jobPostingNode(typedLocale, dict, opening),
    ),
  });

  const mailto = `mailto:${careers.applyEmail}?subject=${encodeURIComponent(
    careers.applyTitle,
  )}`;

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
            eyebrow={careers.eyebrow}
            title={careers.title}
            subtitle={careers.subtitle}
          />
        </div>
      </section>

      {/* --------------------------------------------- Life at the firm */}
      <section className="section" aria-labelledby="careers-culture">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="careers-culture" className="text-3xl">
              {careers.cultureTitle}
            </h2>
            <div className="mt-6 space-y-5">
              {careers.culture.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5" aria-labelledby="careers-offer">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h2 id="careers-offer" className="text-xl text-navy">
                {careers.offerTitle}
              </h2>
              <ul className="mt-6 space-y-5">
                {careers.offer.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-600">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------ Open positions */}
      <section className="section bg-surface" aria-labelledby="careers-openings">
        <div className="container-x max-w-3xl">
          <h2 id="careers-openings" className="text-3xl">
            {careers.openingsTitle}
          </h2>

          {careers.openings.length === 0 ? (
            <p className="mt-6 rounded-xl border border-border bg-white p-6 leading-relaxed text-muted">
              {careers.noOpenings}
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {careers.openings.map((opening) => (
                <article
                  key={opening.title}
                  className="rounded-2xl border border-border bg-white p-7"
                >
                  <h3 className="text-xl text-navy">{opening.title}</h3>
                  {opening.employmentType && (
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold-600">
                      {opening.employmentType}
                    </p>
                  )}
                  <p className="mt-4 leading-relaxed text-muted">
                    {opening.description}
                  </p>
                  {opening.requirements.length > 0 && (
                    <>
                      <h4 className="mt-6 text-sm font-semibold text-navy">
                        {careers.requirementsLabel}
                      </h4>
                      <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-muted marker:text-gold">
                        {opening.requirements.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- Apply */}
      <section className="section" aria-labelledby="careers-apply">
        <div className="container-x">
          <div className="rounded-2xl border border-border bg-navy p-10 text-white">
            <h2 id="careers-apply" className="text-2xl text-white">
              {careers.applyTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
              {careers.applyBody}
            </p>
            <a
              href={mailto}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              <MailIcon className="h-4 w-4" />
              {careers.applyCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
