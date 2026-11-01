import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { buildGraph } from "@/lib/schema";
import { articles } from "@/i18n/articles";
import {
  articlesHub,
  articleAreas,
  type ArticleAreaKey,
} from "@/i18n/articles/hub";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowIcon } from "@/components/Icons";

/**
 * Articles page of a practice-area department (real-estate, commercial).
 * Labor-law keeps its original section at /he/articles, so it is excluded
 * here. Hebrew only, like the rest of the articles content: self-canonical
 * and no hreflang alternates. The route exists only for departments that
 * have at least one published article.
 */

/** Department keys served by this route: every area except labor-law. */
function deptKeys(): ArticleAreaKey[] {
  return (Object.keys(articleAreas) as ArticleAreaKey[]).filter(
    (k) => k !== "labor-law" && articles.some((g) => g.area === k),
  );
}

export function generateStaticParams() {
  return deptKeys().map((slug) => ({ locale: "he", slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dept = deptKeys().find((k) => k === slug);
  if (locale !== "he" || !dept) return {};
  const hub = articleAreas[dept].hub!;
  const url = localePath("he", `${articleAreas[dept].path}/articles`);
  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: (await getDictionary("he")).brand.name,
      title: hub.title,
      description: hub.description,
      url,
      locale: "he_IL",
      images: [
        { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: hub.title },
      ],
    },
  };
}

export default async function DepartmentArticlesPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dept = deptKeys().find((k) => k === slug);
  if (!isLocale(locale) || locale !== "he" || !dept) notFound();

  const area = articleAreas[dept];
  const hub = area.hub!;
  const deptArticles = articles.filter((g) => g.area === dept);
  const path = `${area.path}/articles`;

  const dict = await getDictionary("he");
  const trail = [
    { name: area.name, path: area.path },
    { name: articlesHub.breadcrumb.current, path },
  ];

  const graph = buildGraph({
    locale: "he",
    dict,
    path,
    pageType: "CollectionPage",
    name: hub.title,
    description: hub.description,
    trail,
    nodes: [
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}${localePath("he", path)}#itemlist`,
        itemListElement: deptArticles.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: g.h1,
          url: `${SITE_URL}${localePath("he", `${path}/${g.slug}`)}`,
        })),
      },
    ],
  });

  return (
    <>
      <JsonLd data={graph} />

      <section className="border-b border-border bg-navy text-white">
        <div className="container-x py-16 sm:py-20">
          <Breadcrumbs
            locale="he"
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <h1 className="mt-6 max-w-4xl text-4xl leading-tight text-gold-400 sm:text-5xl">
            {hub.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gold-400">
            {hub.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2">
            {deptArticles.map((g) => (
              <li key={g.slug}>
                <Link
                  href={localePath("he", `${path}/${g.slug}`)}
                  className="group block h-full rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                >
                  <h2 className="text-lg leading-snug text-navy group-hover:text-gold-600">
                    {g.h1}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {g.answer}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {g.shortName}
                    <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
