import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import HeroImagePreload from "@/components/HeroImagePreload";
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
  return {
    title: dict.about.title,
    description: dict.about.lead,
    alternates: { canonical: localePath(locale, "/about") },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { about } = dict;

  return (
    <>
      <HeroImagePreload src={images.about} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${images.about}')` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow={about.eyebrow}
            title={about.title}
            subtitle={about.lead}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            {about.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <ButtonLink
              href={localePath(typedLocale, "/contact")}
              variant="secondary"
              className="mt-4"
            >
              {dict.nav.cta}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </ButtonLink>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-navy p-8 text-white">
              <h2 className="text-xl text-white">{about.valuesTitle}</h2>
              <ul className="mt-6 space-y-6">
                {about.values.map((value, i) => (
                  <li key={value.title} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-serif text-sm font-semibold text-gold-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {value.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
