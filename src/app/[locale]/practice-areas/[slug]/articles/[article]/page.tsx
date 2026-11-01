import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { buildGraph, personNode, articleNode, faqNode } from "@/lib/schema";
import { articles, getArticle } from "@/i18n/articles";
import {
  articlesHub,
  articleAreas,
  type ArticleAreaKey,
} from "@/i18n/articles/hub";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleView from "@/components/articles/ArticleView";

/**
 * A department article page: /he/practice-areas/<area>/articles/<slug>.
 * Serves the real-estate and commercial articles; labor-law articles keep
 * their original home under /he/articles. Hebrew only, self-canonical,
 * no hreflang - the same contract as the labor-law article pages.
 */

export function generateStaticParams() {
  return articles
    .filter((g) => g.area !== "labor-law")
    .map((g) => ({ locale: "he", slug: g.area, article: g.slug }));
}

function resolve(slug: string, articleSlug: string) {
  const article = getArticle(articleSlug);
  if (!article || article.area === "labor-law" || article.area !== slug)
    return null;
  return article;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; article: string }>;
}): Promise<Metadata> {
  const { locale, slug, article: articleSlug } = await params;
  const article = resolve(slug, articleSlug);
  if (locale !== "he" || !article) return {};
  const dict = await getDictionary("he");
  const url = localePath("he", `${articleAreas[article.area].path}/articles/${article.slug}`);
  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: dict.brand.name,
      title: article.meta.title,
      description: article.meta.description,
      url,
      locale: "he_IL",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: article.meta.title,
        },
      ],
    },
  };
}

export default async function DepartmentArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; article: string }>;
}) {
  const { locale, slug, article: articleSlug } = await params;
  const article = resolve(slug, articleSlug);
  if (!isLocale(locale) || locale !== "he" || !article) notFound();

  const dict = await getDictionary("he");
  const area = articleAreas[article.area as ArticleAreaKey];
  const path = `${area.path}/articles/${article.slug}`;
  const trail = [
    { name: area.name, path: area.path },
    { name: articlesHub.breadcrumb.current, path: area.articlesPath },
    { name: article.shortName, path },
  ];

  // The author's full Person node rides along so the Article's author @id
  // resolves inside this page's own graph.
  const author = dict.team.members.find((m) => m.slug === article.author);

  const graph = buildGraph({
    locale: "he",
    dict,
    path,
    lastReviewed: article.lawCheckedAt,
    name: article.h1,
    description: article.meta.description,
    trail,
    nodes: [
      ...(author ? [personNode("he", author, dict)] : []),
      articleNode({
        locale: "he",
        path,
        headline: article.h1,
        description: article.meta.description,
        authorSlug: article.author,
        datePublished: article.published,
        dateModified: article.updated,
      }),
      faqNode("he", path, article.faq),
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
          {/* Kicker above the h1, client-specified. Same visual language as
              the Eyebrow labels in the body, tuned to the navy hero: the
              gold-400 tint is the established accent for text on navy. */}
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-gold-400">
            <span aria-hidden className="h-px w-6 bg-gold-400/50" />
            {area.kicker}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight text-gold-400 sm:text-5xl">
            {article.h1}
          </h1>
        </div>
      </section>

      <ArticleView
        article={article}
        phone={dict.contact.phone}
        lawCheckedPrefix={dict.common.lawCheckedPrefix}
      />
    </>
  );
}
