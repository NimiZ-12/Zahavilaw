import Script from "next/script";

/**
 * Negishot accessibility widget (negishot.co.il). Replaced the Enable widget
 * on 13.10.2026 at the client's request; every trace of Enable (script, CSP
 * entries, accessibility-statement wording) was removed with it.
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
 * The widget code is public - it appears in the page source of every site
 * that uses Negishot - so it lives here rather than in an environment
 * variable.
 */
const NEGISHOT_SCRIPT =
  "https://negishot.co.il/cdn/widget.php?code=NGS_F20ED1A66EE8";

export default function AccessibilityWidget() {
  return (
    <Script
      id="negishot-accessibility"
      src={NEGISHOT_SCRIPT}
      strategy="afterInteractive"
    />
  );
}
