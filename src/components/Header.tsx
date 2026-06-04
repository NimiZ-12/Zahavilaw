"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, navItems } from "@/lib/routes";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { ButtonLink } from "./Button";
import { MenuIcon, CloseIcon } from "./Icons";

export default function Header({
  locale,
  nav,
  brandName,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  brandName: string;
}) {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    const full = localePath(locale, path);
    return path === "/" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {nav.skipToContent}
      </a>

      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Logo locale={locale} name={brandName} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={nav.menu}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={localePath(locale, item.path)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-gold"
                  : "text-navy/80 hover:text-gold"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} />
          <ButtonLink href={localePath(locale, "/contact")} variant="primary">
            {nav.cta}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={nav.menu}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-white lg:hidden"
          onClick={() => setOpen(false)}
        >
          <nav className="container-x flex flex-col gap-1 py-4" aria-label={nav.menu}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={localePath(locale, item.path)}
                className={`rounded-md px-3 py-3 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-surface text-gold"
                    : "text-navy hover:bg-surface"
                }`}
              >
                {nav[item.key]}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <LanguageSwitcher locale={locale} />
              <ButtonLink href={localePath(locale, "/contact")} variant="primary">
                {nav.cta}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
