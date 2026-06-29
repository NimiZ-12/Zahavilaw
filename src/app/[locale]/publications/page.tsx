import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import HeroImagePreload from "@/components/HeroImagePreload";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import VideoCard from "@/components/VideoCard";

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
  return {
    title: dict.publications.title,
    description: dict.publications.subtitle,
    alternates: { canonical: localePath(locale, "/publications") },
  };
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

  return (
    <>
      <HeroImagePreload src={images.publications} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${images.publications}')` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
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
                      <VideoCard id={v.id} title={v.title} date={v.date} />
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
                        className="group flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold-soft ring-1 ring-border transition-colors group-hover:ring-gold/40">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="h-5 w-5 text-gold-600"
                            aria-hidden
                          >
                            <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                            <path d="M14 3v5h5" />
                          </svg>
                        </span>
                        <h3 className="mt-4 flex-1 text-lg leading-snug text-navy">
                          {ruling.title}
                        </h3>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                          {publications.readRuling}
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                        </span>
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
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gold">
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
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                            {publications.readMore}
                            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                          </span>
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
        </div>
      </section>
    </>
  );
}
