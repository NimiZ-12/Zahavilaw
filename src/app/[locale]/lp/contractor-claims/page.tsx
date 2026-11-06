import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { buildGraph, faqNode, serviceNode, videoNode } from "@/lib/schema";
import { lpContractorClaims } from "@/i18n/lp-contractor-claims";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CampaignLanding from "@/components/lp/CampaignLanding";

/**
 * Campaign landing page for claims against contractors (late delivery and construction defects).
 * Linked from the Search ads and from the practice-area page and articles,
 * not the main navigation.
 *
 * Hebrew only. See the note at the top of src/i18n/lp-page.ts for why
 * this route is not bilingual, and what that means for hreflang.
 */

const PATH = "/lp/contractor-claims";

export function generateStaticParams() {
  return [{ locale: "he" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "he") return {};
  const dict = await getDictionary("he");
  const { meta } = lpContractorClaims;
  const url = localePath("he", PATH);

  return {
    title: meta.title,
    description: meta.description,
    // Self-canonical with no `languages` map: the page exists in Hebrew only,
    // so an hreflang pair would point at a URL with no English content.
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title: meta.title,
      description: meta.description,
      url,
      locale: "he_IL",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function ContractorClaimsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "he") notFound();

  const dict = await getDictionary("he");
  const content = lpContractorClaims;
  const area = dict.practiceAreas.items.find((a) => a.slug === content.area);

  const trail = [
    { name: content.breadcrumb.area, path: content.breadcrumb.areaPath },
    { name: content.breadcrumb.current, path: PATH },
  ];

  const graph = buildGraph({
    locale: "he",
    dict,
    path: PATH,
    lastReviewed: content.lawCheckedAt,
    name: content.meta.title,
    description: content.meta.description,
    trail,
    nodes: [
      ...(area ? [serviceNode("he", area, dict)] : []),
      faqNode("he", PATH, content.faq),
      // The embedded video's VideoObject, with the same thumbnail the
      // visible card shows - same pattern as the article pages.
      ...(content.video
        ? [
            videoNode({
              id: content.video.id,
              title: content.video.title,
              uploadDate: content.video.uploadDate,
              duration: content.video.duration,
              thumbnailUrl: `https://img.youtube.com/vi/${content.video.id}/hqdefault.jpg`,
            }),
          ]
        : []),
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
            {content.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gold-400">
            {content.hero.lead}
          </p>
        </div>
      </section>

      <CampaignLanding
        content={content}
        phone={dict.contact.phone}
        lawCheckedPrefix={dict.common.lawCheckedPrefix}
      />
    </>
  );
}
