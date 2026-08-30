import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { buildGraph, faqNode, serviceNode } from "@/lib/schema";
import { lpProtectedPeriod } from "@/i18n/lp-protected-period";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProtectedPeriodLanding from "@/components/lp/ProtectedPeriodLanding";

/**
 * Campaign landing page for the YouTube video on dismissal during a protected
 * period (pregnancy / reserve duty). Linked from the video description and
 * from the Search campaign, not from the site's navigation.
 *
 * Hebrew only. See the note at the top of src/i18n/lp-protected-period.ts for
 * why this one route is not bilingual, and what that means for hreflang.
 */

const PATH = "/lp/protected-period";

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
  const { meta } = lpProtectedPeriod;
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

export default async function ProtectedPeriodPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "he") notFound();

  const dict = await getDictionary("he");
  const content = lpProtectedPeriod;
  const laborLaw = dict.practiceAreas.items.find((a) => a.slug === "labor-law");

  const trail = [
    { name: content.breadcrumb.area, path: content.breadcrumb.areaPath },
    { name: content.breadcrumb.current, path: PATH },
  ];

  // Both tracks' questions are in the DOM at once, so the FAQPage node covers
  // all of them rather than only the visible half.
  const allQuestions = content.tracks.flatMap((track) => track.faq);

  const graph = buildGraph({
    locale: "he",
    dict,
    path: PATH,
    name: content.meta.title,
    description: content.meta.description,
    trail,
    nodes: [
      ...(laborLaw ? [serviceNode("he", laborLaw, dict)] : []),
      faqNode("he", PATH, allQuestions),
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

      <ProtectedPeriodLanding content={content} phone={dict.contact.phone} />
    </>
  );
}
