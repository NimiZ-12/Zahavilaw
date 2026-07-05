import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeAlternates, localePath } from "@/lib/routes";
import LegalContent from "@/components/LegalContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.legal.accessibility.title,
    description: dict.legal.accessibility.metaDescription,
    alternates: {
      canonical: localePath(locale, "/accessibility"),
      languages: localeAlternates("/accessibility"),
    },
  };
}

export default async function AccessibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  return <LegalContent page={dict.legal.accessibility} />;
}
