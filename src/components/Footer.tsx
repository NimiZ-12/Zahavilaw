import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, navItems } from "@/lib/routes";
import { wazeLink } from "@/lib/contact";
import Logo from "./Logo";
import { PhoneIcon, MailIcon, PinIcon, LockIcon } from "./Icons";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const { footer, nav, brand, contact, practiceAreas } = dict;

  return (
    <footer className="mt-auto bg-navy text-white/80">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo locale={locale} name={brand.name} variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label={footer.quickLinks}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {footer.quickLinks}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.path)}
                    className="text-white/60 transition-colors hover:text-gold-400"
                  >
                    {nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Practice areas */}
          <nav aria-label={footer.practiceAreas}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {footer.practiceAreas}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {practiceAreas.items.slice(0, 6).map((area) => (
                <li key={area.slug}>
                  <Link
                    href={localePath(locale, `/practice-areas/${area.slug}`)}
                    className="text-white/60 transition-colors hover:text-gold-400"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {footer.contact}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`tel:${contact.phone}`} className="hover:text-gold-400" dir="ltr">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-gold-400">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={wazeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors hover:text-gold-400"
                >
                  {contact.addressLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex border-t border-white/10 pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gold-400">
            <LockIcon className="h-3.5 w-3.5" />
            {footer.secure}
          </span>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/40">
          {footer.disclaimer}
        </p>
        <div className="mt-4 flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. {footer.rights}.
          </p>
          <nav className="flex items-center gap-4" aria-label={footer.quickLinks}>
            <Link
              href={localePath(locale, "/privacy")}
              className="transition-colors hover:text-gold-400"
            >
              {footer.privacy}
            </Link>
            <Link
              href={localePath(locale, "/accessibility")}
              className="transition-colors hover:text-gold-400"
            >
              {footer.accessibility}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
