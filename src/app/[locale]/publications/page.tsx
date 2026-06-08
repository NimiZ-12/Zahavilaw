import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon } from "@/components/Icons";

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
              {group.items.length === 0 ? (
                <p className="mt-6 text-muted">{publications.empty}</p>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
