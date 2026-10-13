"use client";

import { usePathname } from "next/navigation";
import { WhatsappLogoIcon } from "./Icons";
import { WHATSAPP_NUMBER_E164 } from "@/lib/contact";
import { useCameFromAd } from "@/components/lp/shared";

/* ----------------------------------------------------------------------------
   Floating WhatsApp button, rendered on every page.
   ---------------------------------------------------------------------------
   The link used to open an empty chat - and the firm saw ~28 clicks a month
   produce almost no conversations: a visitor who was just fired doesn't
   know what to write in a blank window. The link now carries a pre-filled
   opener naming the page the visitor is on, and appends the ad marker when
   the URL carries a paid-ad tag (gads/dg in ?src= or ?ad=), so the firm can
   tell paid from organic leads inside WhatsApp itself, with no analytics
   involved. A page-name ?src= tag alone (e.g. on the contact page, arriving
   from a landing page organically) does not add the marker.

   `pages` maps locale-less paths to display names; unmapped paths fall back
   to the longest mapped prefix (so a ruling page reads as "Publications"),
   then to the generic opener.
---------------------------------------------------------------------------- */

export default function WhatsAppButton({
  label,
  pages,
  template,
  genericTemplate,
  adMarker,
}: {
  label: string;
  /** Locale-less path -> page display name ("" is the homepage). */
  pages: Record<string, string>;
  /** Opener with {page} and {ad} placeholders. */
  template: string;
  /** Opener with only the {ad} placeholder, for unmapped paths. */
  genericTemplate: string;
  /** Replaces {ad} when the visitor came from an ad; "" otherwise. */
  adMarker: string;
}) {
  const pathname = usePathname() ?? "/";
  const fromAd = useCameFromAd();

  // Strip the locale segment: /he/about -> /about, /he -> "".
  const path = pathname.replace(/^\/(he|en)(?=\/|$)/, "") || "";

  let pageName = pages[path];
  if (pageName === undefined && path) {
    // Longest mapped prefix, so /publications/rulings/x reads as the
    // publications page rather than falling back to the generic opener.
    const prefix = Object.keys(pages)
      .filter((key) => key && path.startsWith(`${key}/`))
      .sort((a, b) => b.length - a.length)[0];
    if (prefix) pageName = pages[prefix];
  }

  const ad = fromAd ? adMarker : "";
  const message = pageName
    ? template.replace("{page}", pageName).replace("{ad}", ad)
    : genericTemplate.replace("{ad}", ad);
  const href = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;

  function handleClick() {
    window.gtag?.("event", "contact_lead", { method: "whatsapp" });
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={handleClick}
      /* Bottom-left, stacked above the Enable accessibility icon, which owns
         the corner itself (its position is set in Enable's dashboard, not
         here). bottom-24 = 96px clears the icon with room to spare.
         `left-6` is physical, not the logical `end-6`: the widget stays on
         the left in both locales, so this button must too, otherwise it
         would swap sides in English and land back on top of it. */
      className="fixed bottom-24 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <WhatsappLogoIcon className="h-7 w-7" />
    </a>
  );
}
