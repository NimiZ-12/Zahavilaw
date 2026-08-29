"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import {
  getConsent,
  getServerConsent,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent";

/**
 * Cookie banner. Shown only until the visitor makes a choice; both buttons
 * are equally prominent so declining is no harder than accepting.
 *
 * The server snapshot is "unset", so the banner is in the server HTML and a
 * first-time visitor sees it immediately rather than after hydration. A
 * returning visitor's stored choice is read on hydration and the banner is
 * removed then.
 */
export default function CookieConsent({
  locale,
  t,
}: {
  locale: Locale;
  /** Only the banner strings: this component sits in the layout, so any
   *  prop it takes is serialized into every page's payload. */
  t: Dictionary["cookies"];
}) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsent,
    getServerConsent,
  );

  // "unset" on the server too, so the markup matches on hydration and the
  // banner is hidden again the moment a choice is stored.
  if (consent !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy text-white shadow-2xl"
    >
      <div className="container-x flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-title" className="text-sm font-semibold text-white">
            {t.title}
          </p>
          <p id="cookie-body" className="mt-1.5 text-sm leading-relaxed text-white/70">
            {t.body}{" "}
            <Link
              href={localePath(locale, "/privacy")}
              className="underline underline-offset-2 hover:text-gold-400"
            >
              {t.policyLink}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
