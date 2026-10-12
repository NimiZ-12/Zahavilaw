import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import { buildGraph } from "@/lib/schema";
import { guides } from "@/i18n/guides";
import { guidesHub } from "@/i18n/guides/hub";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowIcon } from "@/components/Icons";

/**
 * Hub page of the labor-law guides section. Hebrew only (client-approved
 * deviation from the bilingual rule, like /lp/), and dark until the first
 * approved guide is published: with an empty guides list this route 404s,
 * so merging the infrastructure changes nothing visible.
 */

const PATH = "/guides";

export function generateStaticParams() {
  return guides.length > 0 ? [{ locale: "he" }] : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "he" || guides.length === 0) return {};
  const { meta } = guidesHub;
  const url = localePath("he", PATH);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: (await getDictionary("he")).brand.name,
      title: meta.title,
      description: meta.description,
      url,
      locale: "he_IL",
      images: [
        { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: meta.title },
      ],
    },
  };
}

export default async function GuidesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "he" || guides.length === 0) notFound();

  const dict = await getDictionary("he");
  const trail = [
    { name: guidesHub.breadcrumb.area, path: guidesHub.breadcrumb.areaPath },
    { name: guidesHub.breadcrumb.current, path: PATH },
  ];

  const graph = buildGraph({
    locale: "he",
    dict,
    path: PATH,
    pageType: "CollectionPage",
    name: guidesHub.meta.title,
    description: guidesHub.meta.description,
    trail,
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
            {guidesHub.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gold-400">
            {guidesHub.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={localePath("he", `${PATH}/${g.slug}`)}
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

      <section className="border-t border-border bg-surface">
        <div className="container-x py-10">
          <p className="text-xs leading-relaxed text-muted">
            {guidesHub.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
