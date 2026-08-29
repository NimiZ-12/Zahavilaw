"use client";

import { WhatsappLogoIcon } from "./Icons";
import { whatsappLink } from "@/lib/contact";

export default function WhatsAppButton({ label }: { label: string }) {
  function handleClick() {
    window.gtag?.("event", "contact_lead", { method: "whatsapp" });
  }
  return (
    <a
      href={whatsappLink}
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
