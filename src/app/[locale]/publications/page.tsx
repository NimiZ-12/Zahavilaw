import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, videoNode } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { images } from "@/lib/images";
import HeroBackdrop from "@/components/HeroBackdrop";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import VideoCard from "@/components/VideoCard";
import { articles } from "@/i18n/articles";
import {
  articleAreas,
  articlesHub,
  type ArticleAreaKey,
} from "@/i18n/articles/hub";

/**
 * Per-department image for the "Articles" cards below, reusing the photos
 * already serving this page. Wills-estates has no agreed photo yet (its own
 * brief will set one); until then its card renders without an image, like a
 * news card without one.
 */
const ARTICLE_AREA_IMAGES: Record<ArticleAreaKey, string | null> = {
  "labor-law": images.articleFields.labor,
  "real-estate": images.articleFields.realEstate,
  commercial: images.articleFields.commercial,
  "family-law": images.articleFields.family,
  litigation: images.ruling,
  "wills-estates": null,
};

/**
 * Maps an article's legal-field label to one of a small set of neutral stock
 * photos. Keeps cards visual without ever reusing imagery from the news
 * sources themselves (copyright + duplicate-content concerns).
 */
function fieldImage(field?: string): string | null {
  if (!field) return null;
  if (field.includes("עבודה") || field.includes("Labor")) return images.articleFields.labor;
  if (field.includes("מקרקע") || field.includes("Real Estate")) return images.articleFields.realEstate;
  if (field.includes("משפחה") || field.includes("Family")) return images.articleFields.family;
  if (field.includes("ייצוגי") || field.includes("Class Action")) return images.articleFields.classAction;
  if (field.includes("לשון הרע") || field.includes("Defamation")) return images.articleFields.defamation;
  if (field.includes("מסחרי") || field.includes("Commercial")) return images.articleFields.commercial;
  return null;
}

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
    path: "/publications",
    title: dict.publications.title,
    description: dict.publications.subtitle,
    brandName: dict.brand.name,
  });
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { publications } = dict;

  const typedLocale = locale as Locale;

  // The "Articles" section (Hebrew only): one card per department that has
  // published articles, in articleAreas order; three sample articles per
  // card, in index.ts order (7.11 brief).
  const articleAreaCards = (Object.keys(articleAreas) as ArticleAreaKey[])
    .map((key) => {
      const deptArticles = articles.filter((g) => g.area === key);
      return {
        key,
        area: articleAreas[key],
        count: deptArticles.length,
        samples: deptArticles.slice(0, 3).map((g) => g.shortName),
        photo: ARTICLE_AREA_IMAGES[key],
      };
    })
    .filter((c) => c.count > 0);

  const trail = [{ name: publications.title, path: "/publications" }];
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/publications",
    pageType: "CollectionPage",
    name: publications.title,
    description: publications.subtitle,
    trail,
    nodes: publications.groups.flatMap((g) => (g.videos ?? []).map(videoNode)),
  });

  return (
    <>
      <JsonLd data={graph} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <HeroBackdrop
          src={images.publications}
          opacity="opacity-60"
          priority
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
            eyebrow={publications.eyebrow}
            title={publications.title}
            subtitle={publications.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x space-y-16">
          {publications.groups.map((group) => (
            <div key={group.heading}>
              <h2 className="text-2xl">{group.heading}</h2>
              {"videos" in group && group.videos && group.videos.length > 0 && (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.videos.map((v) => (
                    <li key={v.id}>
                      <VideoCard
                        id={v.id}
                        title={v.title}
                        date={v.date}
                        playLabel={publications.playVideo}
                        credit={v.credit}
                        creditLabel={publications.videoCredit}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {"rulings" in group && group.rulings && group.rulings.length > 0 && (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.rulings.map((ruling) => (
                    <li key={ruling.slug}>
                      <Link
                        href={localePath(locale, `/publications/rulings/${ruling.slug}`)}
                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                      >
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={images.ruling}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-navy/0" />
                          <span className="absolute bottom-3 right-3 rtl:right-3 ltr:left-3 inline-flex rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-600">
                            {group.heading}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-7">
                          <h3 className="flex-1 text-lg leading-snug text-navy">
                            {ruling.title}
                          </h3>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
                            {publications.readRuling}
                            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {group.items.length === 0 &&
              !("videos" in group && group.videos?.length) &&
              !("rulings" in group && group.rulings?.length) ? (
                <p className="mt-6 text-muted">{publications.empty}</p>
              ) : group.items.length > 0 ? (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item, i) => {
                    const photo = fieldImage(item.field);
                    const card = (
                      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md">
                        {photo && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image
                              src={photo}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/0 to-navy/0" />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-7">
                        {item.field && (
                          <span className="mb-3 inline-flex w-fit rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-600">
                            {item.field}
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gold-600">
                          <span>{item.source}</span>
                          {item.date && (
                            <>
                              <span aria-hidden className="text-muted/50">
                                •
                              </span>
                              <span className="text-muted">{item.date}</span>
                            </>
                          )}
                        </div>
                        <h3 className="mt-3 text-lg leading-snug text-navy">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                            {item.excerpt}
                          </p>
                        )}
                        {item.href && (
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
                            {publications.readMore}
                            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                          </span>
                        )}
                        {item.sponsored && (
                          <p className="mt-2 text-[11px] leading-none text-muted/60">
                            {publications.sponsoredLabel}
                          </p>
                        )}
                        </div>
                      </article>
                    );
                    return (
                      <li key={`${item.title}-${i}`}>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block h-full"
                          >
                            {card}
                          </a>
                        ) : (
                          card
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ))}

          {typedLocale === "he" && articleAreaCards.length > 0 && (
            <div>
              <h2 className="text-2xl">
                {articlesHub.publicationsSection.heading}
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articleAreaCards.map(({ key, area, count, samples, photo }) => (
                  <li key={key}>
                    <Link
                      href={localePath("he", area.articlesPath)}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                    >
                      {photo && (
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={photo}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-navy/0" />
                          <span className="absolute bottom-3 right-3 rtl:right-3 ltr:left-3 inline-flex rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-600">
                            {area.name}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-7">
                        {!photo && (
                          <span className="mb-3 inline-flex w-fit rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold-600">
                            {area.name}
                          </span>
                        )}
                        <h3 className="text-lg leading-snug text-navy">
                          {area.sectionLinkLabel}
                        </h3>
                        <ul className="mt-3 flex-1 space-y-1.5">
                          {samples.map((name) => (
                            <li
                              key={name}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <span
                                aria-hidden
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                              />
                              {name}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-600">
                          {articlesHub.publicationsSection.allTemplate.replace(
                            "{n}",
                            String(count),
                          )}
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
