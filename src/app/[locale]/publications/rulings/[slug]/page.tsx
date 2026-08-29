import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { articleNode, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowIcon } from "@/components/Icons";

/** Collects every court-ruling entry across the publications groups. */
async function getRulings(locale: Locale) {
  const dict = await getDictionary(locale);
  return dict.publications.groups.flatMap((group) => group.rulings ?? []);
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const ruling of await getRulings(locale)) {
      params.push({ locale, slug: ruling.slug });
    }
  }
  return params;
}

async function getRuling(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  const ruling = (await getRulings(locale)).find((r) => r.slug === slug);
  return { dict, ruling };
}

function describe(dict: Awaited<ReturnType<typeof getDictionary>>, title: string) {
  const t = dict.publications.rulingPage;
  return `${t.metaPrefix}${title}${t.metaSuffix}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { dict, ruling } = await getRuling(locale, slug);
  if (!ruling) return {};
  return pageMetadata({
    locale,
    path: `/publications/rulings/${slug}`,
    title: ruling.title,
    description: describe(dict, ruling.title),
    brandName: dict.brand.name,
    type: "article",
  });
}

export default async function RulingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const { dict, ruling } = await getRuling(typedLocale, slug);
  if (!ruling) notFound();

  const { publications } = dict;
  const t = publications.rulingPage;
  const pdf = `/rulings/${slug}.pdf`;
  const path = `/publications/rulings/${slug}`;
  const trail = [
    { name: publications.title, path: "/publications" },
    { name: ruling.title, path },
  ];

  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path,
    name: ruling.title,
    description: describe(dict, ruling.title),
    trail,
    nodes: [
      articleNode({
        locale: typedLocale,
        path,
        headline: ruling.title,
        description: describe(dict, ruling.title),
      }),
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <section className="border-b border-border bg-navy text-white">
        <div className="container-x py-12 sm:py-16">
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <Link
            href={localePath(typedLocale, "/publications")}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold-400"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {publications.title}
          </Link>
          <h1 className="mt-5 max-w-3xl text-2xl leading-snug text-gold-400 sm:text-3xl">
            {ruling.title}
          </h1>
        </div>
      </section>

      <article className="section">
        <div className="container-x">
          {/* Text before the viewer: the PDF itself is not indexable, so the
              page needs prose of its own to be worth crawling. */}
          <div className="max-w-3xl">
            <h2 className="text-2xl">{t.aboutTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.about}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.disclaimer}</p>
          </div>

          <h2 className="mt-12 text-2xl">{t.documentTitle}</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <iframe src={pdf} title={ruling.title} className="h-[80vh] w-full" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-navy"
            >
              {t.openInNewTab}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <a
              href={pdf}
              download
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-navy"
            >
              {t.download}
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
