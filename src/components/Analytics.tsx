"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, getServerConsent, subscribeToConsent } from "@/lib/consent";

/* Google Analytics 4 (gtag.js) and Google Ads conversion tracking.
 *
 * Both share the same gtag.js loader and dataLayer. Nothing is requested
 * until three things hold:
 *   1. the visitor has actively accepted analytics cookies (see CookieConsent
 *      and src/lib/consent.ts) - required by the Privacy Protection Law,
 *   2. at least one measurement id is configured, and
 *   3. the site is not flagged noindex, so the staging/preview deployment
 *      (SITE_NOINDEX=true) never pollutes the data with internal traffic.
 *
 * Declining means no gtag.js request is ever made, not merely a suppressed
 * cookie. */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const noindex = process.env.SITE_NOINDEX === "true";

  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsent,
    getServerConsent,
  );

  if (noindex || (!gaId && !adsId) || consent !== "granted") return null;

  const loaderId = gaId || adsId;
  const configCalls = [gaId, adsId]
    .filter(Boolean)
    .map((id) => `gtag('config', '${id}');`)
    .join("\n          ");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
          });
          ${configCalls}
        `}
      </Script>
    </>
  );
}
