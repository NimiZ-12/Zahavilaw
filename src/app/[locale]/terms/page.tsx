import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalContent from "@/components/LegalContent";

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
    path: "/terms",
    title: dict.legal.terms.title,
    description: dict.legal.terms.metaDescription,
    brandName: dict.brand.name,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const page = dict.legal.terms;
  const trail = [{ name: page.title, path: "/terms" }];

  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/terms",
    name: page.title,
    description: page.metaDescription,
    trail,
  });

  return (
    <>
      <JsonLd data={graph} />
      <LegalContent
        page={page}
        breadcrumbs={
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
          />
        }
      />
    </>
  );
}
