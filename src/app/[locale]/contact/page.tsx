import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { images } from "@/lib/images";
import HeroBackdrop from "@/components/HeroBackdrop";
import { whatsappLink, WHATSAPP_NUMBER_DISPLAY, wazeLink } from "@/lib/contact";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, WhatsappIcon } from "@/components/Icons";
import TrackableLink from "@/components/TrackableLink";

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
    path: "/contact",
    title: dict.contact.title,
    description: dict.contact.subtitle,
    brandName: dict.brand.name,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { contact } = dict;

  const details = [
    {
      icon: PhoneIcon,
      label: contact.phoneLabel,
      value: contact.phone,
      href: `tel:${contact.phone}`,
      ltr: true,
      method: "phone" as const,
    },
    {
      icon: WhatsappIcon,
      label: contact.whatsappLabel,
      value: WHATSAPP_NUMBER_DISPLAY,
      href: whatsappLink,
      ltr: true,
      method: "whatsapp" as const,
    },
    {
      icon: MailIcon,
      label: contact.emailLabel,
      value: contact.email,
      href: `mailto:${contact.email}`,
      ltr: true,
    },
    {
      icon: PinIcon,
      label: contact.addressLabel,
      value: contact.addressLines,
      href: wazeLink,
    },
    { icon: ClockIcon, label: contact.hoursLabel, value: contact.hours },
  ];

  const trail = [{ name: contact.title, path: "/contact" }];
  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/contact",
    pageType: "ContactPage",
    name: contact.title,
    description: contact.subtitle,
    trail,
  });

  return (
    <>
      <JsonLd data={graph} />
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <HeroBackdrop
          src={images.contact}
          opacity="opacity-60"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <SectionHeading
            as="h1"
            eyebrow={contact.eyebrow}
            title={contact.title}
            subtitle={contact.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl">{contact.detailsTitle}</h2>
            <ul className="mt-8 space-y-6">
              {details.map((d) => {
                const Icon = d.icon;
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{d.label}</span>
                      <span
                        className="block font-medium text-navy"
                        dir={d.ltr ? "ltr" : undefined}
                      >
                        {Array.isArray(d.value)
                          ? d.value.map((line, i) => (
                              <span key={i} className="block">
                                {line}
                              </span>
                            ))
                          : d.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={d.label}>
                    {d.href && "method" in d ? (
                      <TrackableLink
                        href={d.href}
                        method={d.method as "phone" | "whatsapp"}
                        className="flex items-center gap-4 transition-colors hover:text-gold-600"
                        {...(d.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {content}
                      </TrackableLink>
                    ) : d.href ? (
                      <a
                        href={d.href}
                        className="flex items-center gap-4 transition-colors hover:text-gold-600"
                        {...(d.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm sm:p-9">
              <h2 className="text-xl">{contact.form.title}</h2>
              <div className="mt-6">
                <ContactForm locale={typedLocale} dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
