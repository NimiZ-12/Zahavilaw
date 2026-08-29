import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, serviceNode, personNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { images } from "@/lib/images";
import HeroImagePreload from "@/components/HeroImagePreload";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { practiceAreaIcons } from "@/lib/practice-icons";
import ClientsMarquee from "@/components/ClientsMarquee";

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
    path: "/",
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    brandName: dict.brand.name,
  });
}

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

  // The homepage carries the full entity set: the firm, its site, every
  // service and both attorneys. Inner pages then reference these by @id.
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/",
    name: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    nodes: [
      ...practiceAreas.items.map((area) => serviceNode(typedLocale, area, dict)),
      ...dict.team.members.map((m) => personNode(typedLocale, m, dict)),
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <HeroImagePreload src={images.hero} />
      {/* ----------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Full-bleed background photograph — navy shows through if it fails. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images.hero}')` }}
        />
        {/* Scrim: darken toward the bottom where the panel and stats sit. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/25"
        />
        {/* Gold dot-grid accent, echoing the reference's geometric motif. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-10 end-8 hidden h-28 w-36 opacity-70 md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, var(--gold) 1.5px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="container-x relative flex min-h-[34rem] items-end py-16 lg:min-h-[40rem]">
          {/* Solid navy panel holding the headline — the prestige reference look. */}
          <div className="animate-rise w-full max-w-xl bg-navy/95 p-8 shadow-2xl ring-1 ring-white/10 sm:p-10">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              <span aria-hidden className="h-px w-8 bg-gold-400/50" />
              {home.hero.eyebrow}
            </span>
            <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.14] text-white sm:text-5xl">
              {home.hero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/75">
              {home.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
          <dl className="container-x grid grid-cols-3 gap-y-8 py-10">
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

      {/* ------------------------------------------------------- Client logos */}
      <ClientsMarquee clients={home.clients} />

      {/* -------------------------------------------------------------- Why us */}
      <section className="section relative overflow-hidden bg-navy">
        {/* Building-lobby photo behind this section, tinted with a navy overlay
            like the hero so the content stays readable. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.55]"
          style={{ backgroundImage: "url('/lobby.jpg')" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/40"
        />
        <div className="container-x relative">
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
              );
            })}
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
