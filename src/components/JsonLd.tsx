import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SITE_URL, localePath } from "@/lib/routes";

/**
 * Emits LegalService structured data so Google can show rich results
 * (name, address, phone, areas served) for the firm.
 */
export default function JsonLd({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { brand, contact, practiceAreas } = dict;

  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: brand.name,
    description: dict.meta.defaultDescription,
    url: `${SITE_URL}${localePath(locale, "/")}`,
    telephone: contact.phone,
    email: contact.email,
    image: `${SITE_URL}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressCountry: "IL",
    },
    areaServed: { "@type": "Country", name: "Israel" },
    priceRange: "₪₪",
    knowsLanguage: ["he", "en"],
    serviceType: practiceAreas.items.map((a) => a.title),
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in the document.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
