import Script from "next/script";

/* Google Analytics 4 (gtag.js).
 *
 * Loads only when a measurement id is configured via NEXT_PUBLIC_GA_ID *and*
 * the site is not flagged as noindex — so the staging/preview deployment
 * (SITE_NOINDEX=true) never pollutes the analytics data with internal traffic.
 * Until the env var is set, this renders nothing. */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const noindex = process.env.SITE_NOINDEX === "true";
  if (!gaId || noindex) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
