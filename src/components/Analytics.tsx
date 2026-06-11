import Script from "next/script";

/* Google Analytics 4 (gtag.js) and Google Ads conversion tracking.
 *
 * Both share the same gtag.js loader and dataLayer. Each loads only when its
 * id is configured via NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GOOGLE_ADS_ID *and*
 * the site is not flagged as noindex — so the staging/preview deployment
 * (SITE_NOINDEX=true) never pollutes the data with internal traffic.
 * Until at least one env var is set, this renders nothing. */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const noindex = process.env.SITE_NOINDEX === "true";
  if (noindex || (!gaId && !adsId)) return null;

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
          ${configCalls}
        `}
      </Script>
    </>
  );
}
