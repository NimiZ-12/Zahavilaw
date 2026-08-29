import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, personNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { images } from "@/lib/images";
import HeroImagePreload from "@/components/HeroImagePreload";
import SectionHeading from "@/components/SectionHeading";
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
    path: "/team",
    title: dict.team.title,
    description: dict.team.subtitle,
    brandName: dict.brand.name,
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { team } = dict;

  const typedLocale = locale as Locale;
  const trail = [{ name: team.title, path: "/team" }];
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/team",
    pageType: "CollectionPage",
    name: team.title,
    description: team.subtitle,
    trail,
    nodes: team.members.map((m) => personNode(typedLocale, m, dict)),
  });

  return (
    <>
      <JsonLd data={graph} />
      <HeroImagePreload src={images.team} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${images.team}')` }}
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
            eyebrow={team.eyebrow}
            title={team.title}
            subtitle={team.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <Link
              key={member.slug}
              href={localePath(locale, `/team/${member.slug}`)}
              className="group flex flex-col rounded-xl border border-border bg-white p-7 text-center transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
            >
              <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full bg-navy ring-2 ring-gold/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/team/${member.slug}.jpg`}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                />
              </span>
              <h2 className="mt-5 text-xl transition-colors group-hover:text-gold">
                {member.name}
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold">
                {member.role}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {member.bio}
              </p>
              <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gold">
                {team.viewProfile}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
