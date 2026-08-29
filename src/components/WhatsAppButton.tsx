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
      /* Pinned to the physical right, not the logical end. The Enable
         accessibility widget sits at the bottom-left in both locales and its
         position is set in Enable's own dashboard, not here - so using `end-6`
         would put this button back on top of it in Hebrew (RTL). */
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <WhatsappLogoIcon className="h-7 w-7" />
    </a>
  );
}
