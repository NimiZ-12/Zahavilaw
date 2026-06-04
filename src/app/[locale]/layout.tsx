import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { heebo, frankRuhl } from "../fonts";
import {
  locales,
  localeDirection,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.meta.defaultDescription,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        he: "/he",
        en: "/en",
        "x-default": "/he",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.brand.name,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      locale: locale === "he" ? "he_IL" : "en_US",
      url: localePath(locale, "/"),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
    robots:
      process.env.SITE_NOINDEX === "true"
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  return (
    <html
      lang={typedLocale}
      dir={localeDirection[typedLocale]}
      className={`${heebo.variable} ${frankRuhl.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background">
        <JsonLd locale={typedLocale} dict={dict} />
        <Header locale={typedLocale} nav={dict.nav} brandName={dict.brand.short} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  );
}
