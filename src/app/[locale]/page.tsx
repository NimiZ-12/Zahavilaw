import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon, ScaleIcon, CheckIcon } from "@/components/Icons";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { home, practiceAreas } = dict;

  return (
    <>
      {/* ----------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Background photograph — navy shows through if it fails to load. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${images.hero}')` }}
        />
        {/* Tonal overlays for legibility and classic depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/85 to-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-navy/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 end-[-10%] h-96 w-96 rounded-full bg-gold/15 blur-3xl"
        />
        <div className="container-x relative grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-12">
          <div className="animate-rise lg:col-span-8">
            {/* Classic eyebrow with a flanking gold rule. */}
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl leading-[1.12] text-white sm:text-5xl lg:text-[3.5rem]">
              {home.hero.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              {home.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={localePath(typedLocale, "/contact")} variant="primary">
                {home.hero.ctaPrimary}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </ButtonLink>
              <Link
                href={localePath(typedLocale, "/practice-areas")}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-gold/60 hover:bg-white/5 hover:text-gold-400"
              >
                {home.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-navy/50 backdrop-blur-sm">
          <dl className="container-x grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
            {home.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-semibold text-gold-400 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-white/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------------------- Why us */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow={home.intro.eyebrow}
            title={home.intro.title}
            subtitle={home.intro.body}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.intro.features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-gold/30 hover:shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Practice areas */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={home.practiceTeaser.eyebrow}
              title={home.practiceTeaser.title}
              subtitle={home.practiceTeaser.body}
            />
            <ButtonLink
              href={localePath(typedLocale, "/practice-areas")}
              variant="ghost"
              className="shrink-0"
            >
              {home.practiceTeaser.cta}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.items.map((area) => (
              <Link
                key={area.slug}
                href={localePath(typedLocale, `/practice-areas/${area.slug}`)}
                className="group flex flex-col rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-navy text-gold-400 transition-colors group-hover:bg-gold group-hover:text-white">
                  <ScaleIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl transition-colors group-hover:text-gold">
                  {area.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {area.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                  {practiceAreas.learnMore}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA band */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${images.cta}')` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/80"
        />
        <div className="container-x relative flex flex-col items-center gap-6 py-20 text-center">
          <span aria-hidden className="h-px w-12 bg-gold/50" />
          <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">
            {home.ctaBand.title}
          </h2>
          <p className="max-w-xl text-white/75">{home.ctaBand.body}</p>
          <ButtonLink href={localePath(typedLocale, "/contact")} variant="primary">
            {home.ctaBand.cta}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
