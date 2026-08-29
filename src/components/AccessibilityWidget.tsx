import Script from "next/script";

/**
 * Enable accessibility widget (enable.co.il).
 *
 * Loaded on every page as part of the firm's compliance with the Equal Rights
 * for Persons with Disabilities Regulations and Israeli Standard IS 5568.
 *
 * Three deliberate choices:
 *
 * 1. NOT gated behind the cookie banner. Analytics and advertising wait for
 *    consent; an accessibility tool must not. A visitor who needs it has to
 *    have it available before they can interact with anything else, and any
 *    cookie it sets to remember their preferences is functional rather than
 *    tracking, so it does not require consent.
 *
 * 2. NOT gated behind SITE_NOINDEX, so it is present on the staging preview
 *    and can be reviewed before going live.
 *
 * 3. `afterInteractive` rather than `beforeInteractive`: the widget enhances
 *    a page that is already accessible on its own (semantic headings, skip
 *    link, keyboard support, AA contrast), so it must never block first paint.
 *
 * The licence id is public - it appears in the page source of every site that
 * uses Enable - so it lives here rather than in an environment variable.
 */
const ENABLE_SCRIPT =
  "https://cdn.enable.co.il/licenses/enable-L56252t5tcus39uj-0826-83633/init.js";

export default function AccessibilityWidget() {
  return (
    <Script
      id="enable-accessibility"
      src={ENABLE_SCRIPT}
      strategy="afterInteractive"
    />
  );
}
