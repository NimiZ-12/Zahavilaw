import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { articleNode, buildGraph, faqNode, personNode } from "@/lib/schema";
import { getGuide, guides } from "@/i18n/guides";
import { guidesHub } from "@/i18n/guides/hub";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import GuideArticle from "@/components/guides/GuideArticle";

/**
 * One labor-law guide: a page that answers a single question, written by a
 * named attorney. Hebrew only, like the hub - see src/i18n/guides/types.ts.
 */

export function generateStaticParams() {
  return guides.map((g) => ({ locale: "he", slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (locale !== "he" || !guide) return {};
  const url = localePath("he", `/guides/${guide.slug}`);
  return {
    title: guide.meta.title,
    description: guide.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: (await getDictionary("he")).brand.name,
      title: guide.meta.title,
      description: guide.meta.description,
      url,
      locale: "he_IL",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: guide.meta.title,
        },
      ],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(locale) || locale !== "he" || !guide) notFound();

  const dict = await getDictionary("he");
  const path = `/guides/${guide.slug}`;
  const trail = [
    { name: guidesHub.breadcrumb.area, path: guidesHub.breadcrumb.areaPath },
    { name: guidesHub.breadcrumb.current, path: "/guides" },
    { name: guide.shortName, path },
  ];

  // The author's full Person node rides along so the Article's author @id
  // resolves inside this page's own graph.
  const author = dict.team.members.find((m) => m.slug === guide.author);

  const graph = buildGraph({
    locale: "he",
    dict,
    path,
    name: guide.h1,
    description: guide.meta.description,
    trail,
    nodes: [
      ...(author ? [personNode("he", author, dict)] : []),
      articleNode({
        locale: "he",
        path,
        headline: guide.h1,
        description: guide.meta.description,
        authorSlug: guide.author,
        datePublished: guide.published,
        dateModified: guide.updated,
      }),
      faqNode("he", path, guide.faq),
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
            {guide.h1}
          </h1>
        </div>
      </section>

      <GuideArticle guide={guide} phone={dict.contact.phone} />
    </>
  );
}
