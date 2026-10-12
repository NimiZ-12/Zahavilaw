import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { heebo } from "../fonts";
import {
  locales,
  localeDirection,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lpProtectedPeriod } from "@/i18n/lp-protected-period";
import { lpSeverancePay } from "@/i18n/lp-severance-pay";
import { lpHearing } from "@/i18n/lp-hearing";
import { lpUnpaidWages } from "@/i18n/lp-unpaid-wages";
import { SITE_URL, localePath } from "@/lib/routes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityWidget from "@/components/AccessibilityWidget";

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
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: ["/og-image.jpg"],
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

  // Locale-less path -> display name, for the floating WhatsApp button's
  // pre-filled opener ("I arrived from the X page"). Short strings only -
  // rulings and other deep pages resolve via their section's prefix.
  const waPages: Record<string, string> = {
    "": dict.nav.home,
    "/about": dict.nav.about,
    "/practice-areas": dict.nav.practiceAreas,
    "/team": dict.nav.team,
    "/publications": dict.nav.publications,
    "/faq": dict.nav.faq,
    "/contact": dict.nav.contact,
    "/careers": dict.nav.careers,
    "/privacy": dict.footer.privacy,
    "/terms": dict.footer.terms,
    "/accessibility": dict.footer.accessibility,
    ...Object.fromEntries(
      dict.practiceAreas.items.map((a) => [`/practice-areas/${a.slug}`, a.title]),
    ),
    ...Object.fromEntries(
      dict.team.members.map((m) => [`/team/${m.slug}`, m.name]),
    ),
    // Hebrew-only campaign landing pages, named by their breadcrumb labels.
    // Server-side import: only these four short names reach the client.
    "/lp/protected-period": lpProtectedPeriod.breadcrumb.current,
    "/lp/severance-pay": lpSeverancePay.breadcrumb.current,
    "/lp/hearing": lpHearing.breadcrumb.current,
    "/lp/unpaid-wages": lpUnpaidWages.breadcrumb.current,
  };

  return (
    <html
      lang={typedLocale}
      dir={localeDirection[typedLocale]}
      className={`${heebo.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background">
        <Analytics />
        {/* Structured data is emitted per page (see src/lib/schema.ts) so each
            route carries the schema types that match its content. */}
        <Header locale={typedLocale} nav={dict.nav} brandName={dict.brand.short} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
        <WhatsAppButton
          label={dict.contact.whatsappFloatingLabel}
          pages={waPages}
          template={dict.contact.whatsappPrefill}
          genericTemplate={dict.contact.whatsappPrefillGeneric}
          adMarker={dict.contact.whatsappAdMarker}
        />
        <CookieConsent locale={typedLocale} t={dict.cookies} />
        <AccessibilityWidget />
        <SpeedInsights />
      </body>
    </html>
  );
}
