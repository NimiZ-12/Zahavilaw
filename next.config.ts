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
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://images.unsplash.com https://img.youtube.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""} https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com",
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
  { key: "X-Frame-Options", value: "DENY" },
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
  },
  async redirects() {
    return [
      // Legacy/crawled Hebrew-slug URLs that Google indexed before the
      // locale-prefixed routing (/he/practice-areas/...) was established.
      { source: "/עורך-דין-דיני-עבודה", destination: "/he/practice-areas/labor", permanent: true },
      { source: "/עורך-דין-דיני-עבודה/", destination: "/he/practice-areas/labor", permanent: true },
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
