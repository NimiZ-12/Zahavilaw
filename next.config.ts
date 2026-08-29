import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * The site is statically rendered (best for SEO, speed and DoS resilience),
 * so we use a strong static-friendly CSP rather than per-request nonces.
 * It blocks the high-impact attacks — external script injection, clickjacking,
 * <base> hijacking and cross-site form posting — while allowing the inline
 * bootstrap that statically-rendered Next.js requires.
 *
 * In development we additionally allow 'unsafe-eval' and websocket connections,
 * which React Fast Refresh / HMR need; neither is emitted in production.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://challenges.cloudflare.com https://cdn.enable.co.il`,
  "style-src 'self' 'unsafe-inline' https://cdn.enable.co.il",
  "img-src 'self' blob: data: https://images.unsplash.com https://img.youtube.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://cdn.enable.co.il",
  "font-src 'self' data: https://cdn.enable.co.il",
  `connect-src 'self'${isDev ? " ws:" : ""} https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://cdn.enable.co.il https://*.enable.co.il`,
  "object-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "frame-src 'self' https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
]
  .join("; ")
  .concat(";");

/** Hardened response headers applied to every route. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Force HTTPS for two years, including subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Defense-in-depth against clickjacking (alongside frame-ancestors).
  // SAMEORIGIN still blocks cross-site framing but lets our own pages embed
  // same-origin assets such as the court-ruling PDF viewer.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers from MIME-sniffing responses.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful browser features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Isolate the browsing context.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Never advertise the framework version to attackers.
  poweredByHeader: false,
  // Allow optimizing stock photos served from Unsplash (placeholders until the
  // firm's real photography is added to /public).
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // AVIF first, WebP second: the optimizer negotiates against the browser's
    // Accept header and falls back to the original for anything older.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist — an unrestricted `quality`
    // parameter lets anyone force expensive re-encodes. 75 is the default;
    // 60 is for large decorative backgrounds.
    qualities: [60, 75, 90],
  },
  async redirects() {
    // Legacy WordPress Hebrew-slug URLs that Google indexed before the site was
    // rebuilt on locale-prefixed routing (/he/...). Each old URL 301s to its
    // closest equivalent so years of ranking authority flow to the new pages
    // instead of hitting a 404.
    //
    // IMPORTANT: Googlebot and browsers request these paths percent-encoded
    // (%D7%..), and Next.js matches `source` against that encoded pathname — a
    // raw-Hebrew source string does NOT match. Sources below are therefore
    // percent-encoded, with both trailing-slash and non-slash variants (old WP
    // URLs ended in "/"). Generated with encodeURI() of each Hebrew slug.
    return [
      // עורך-דין-פיטורים — severance/dismissal lawyer
      { source: "/%D7%A2%D7%95%D7%A8%D7%9A-%D7%93%D7%99%D7%9F-%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%A2%D7%95%D7%A8%D7%9A-%D7%93%D7%99%D7%9F-%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D/", destination: "/he/practice-areas/labor-law", permanent: true },
      // פיטורים-בלי-שימוע — dismissal without a hearing
      { source: "/%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%9C%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A2", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%9C%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A2/", destination: "/he/practice-areas/labor-law", permanent: true },
      // עורך-דין-דיני-עבודה — labor lawyer
      { source: "/%D7%A2%D7%95%D7%A8%D7%9A-%D7%93%D7%99%D7%9F-%D7%93%D7%99%D7%A0%D7%99-%D7%A2%D7%91%D7%95%D7%93%D7%94", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%A2%D7%95%D7%A8%D7%9A-%D7%93%D7%99%D7%9F-%D7%93%D7%99%D7%A0%D7%99-%D7%A2%D7%91%D7%95%D7%93%D7%94/", destination: "/he/practice-areas/labor-law", permanent: true },
      // זכויות-עובדים — employee rights
      { source: "/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D/", destination: "/he/practice-areas/labor-law", permanent: true },
      // מניעת-פיטורים — prevention of dismissal
      { source: "/%D7%9E%D7%A0%D7%99%D7%A2%D7%AA-%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%9E%D7%A0%D7%99%D7%A2%D7%AA-%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D/", destination: "/he/practice-areas/labor-law", permanent: true },
      // זכויות-מעסיקים — employer rights
      { source: "/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A1%D7%99%D7%A7%D7%99%D7%9D", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA-%D7%9E%D7%A2%D7%A1%D7%99%D7%A7%D7%99%D7%9D/", destination: "/he/practice-areas/labor-law", permanent: true },
      // אודות — about
      { source: "/%D7%90%D7%95%D7%93%D7%95%D7%AA", destination: "/he/about", permanent: true },
      { source: "/%D7%90%D7%95%D7%93%D7%95%D7%AA/", destination: "/he/about", permanent: true },
      // עוד-רון-זהבי — Ron Zahavi profile
      { source: "/%D7%A2%D7%95%D7%93-%D7%A8%D7%95%D7%9F-%D7%96%D7%94%D7%91%D7%99", destination: "/he/team/ron-zahavi", permanent: true },
      { source: "/%D7%A2%D7%95%D7%93-%D7%A8%D7%95%D7%9F-%D7%96%D7%94%D7%91%D7%99/", destination: "/he/team/ron-zahavi", permanent: true },
      // עוד-ענת-זהבי — Anat Zahavi profile
      { source: "/%D7%A2%D7%95%D7%93-%D7%A2%D7%A0%D7%AA-%D7%96%D7%94%D7%91%D7%99", destination: "/he/team/anat-zahavi", permanent: true },
      { source: "/%D7%A2%D7%95%D7%93-%D7%A2%D7%A0%D7%AA-%D7%96%D7%94%D7%91%D7%99/", destination: "/he/team/anat-zahavi", permanent: true },
      // צור-קשר — contact
      { source: "/%D7%A6%D7%95%D7%A8-%D7%A7%D7%A9%D7%A8", destination: "/he/contact", permanent: true },
      { source: "/%D7%A6%D7%95%D7%A8-%D7%A7%D7%A9%D7%A8/", destination: "/he/contact", permanent: true },
      // תחומי-התמחות — practice areas
      { source: "/%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%94%D7%AA%D7%9E%D7%97%D7%95%D7%AA", destination: "/he/practice-areas", permanent: true },
      { source: "/%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%94%D7%AA%D7%9E%D7%97%D7%95%D7%AA/", destination: "/he/practice-areas", permanent: true },
      // מידע-מקצועי — professional articles hub
      { source: "/%D7%9E%D7%99%D7%93%D7%A2-%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%D7%99", destination: "/he/publications", permanent: true },
      { source: "/%D7%9E%D7%99%D7%93%D7%A2-%D7%9E%D7%A7%D7%A6%D7%95%D7%A2%D7%99/", destination: "/he/publications", permanent: true },
      // סיפורי-הצלחה — success stories
      { source: "/%D7%A1%D7%99%D7%A4%D7%95%D7%A8%D7%99-%D7%94%D7%A6%D7%9C%D7%97%D7%94", destination: "/he/publications", permanent: true },
      { source: "/%D7%A1%D7%99%D7%A4%D7%95%D7%A8%D7%99-%D7%94%D7%A6%D7%9C%D7%97%D7%94/", destination: "/he/publications", permanent: true },
      // ייצוג-בבית-הדין-לעבודה — representation in labor court
      { source: "/%D7%99%D7%99%D7%A6%D7%95%D7%92-%D7%91%D7%91%D7%99%D7%AA-%D7%94%D7%93%D7%99%D7%9F-%D7%9C%D7%A2%D7%91%D7%95%D7%93%D7%94", destination: "/he/practice-areas/labor-law", permanent: true },
      { source: "/%D7%99%D7%99%D7%A6%D7%95%D7%92-%D7%91%D7%91%D7%99%D7%AA-%D7%94%D7%93%D7%99%D7%9F-%D7%9C%D7%A2%D7%91%D7%95%D7%93%D7%94/", destination: "/he/practice-areas/labor-law", permanent: true },
      // WordPress leftovers still crawled from the old site — send to the
      // homepage rather than letting them 404.
      { source: "/wp-content/:path*", destination: "/he", permanent: true },
      { source: "/wp-admin/:path*", destination: "/he", permanent: true },
      { source: "/wp-json/:path*", destination: "/he", permanent: true },
      { source: "/feed", destination: "/he", permanent: true },
      { source: "/category/:path*", destination: "/he", permanent: true },
      { source: "/tag/:path*", destination: "/he", permanent: true },
    ];
  },
  // Trailing-slash off keeps canonical URLs clean for SEO.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
