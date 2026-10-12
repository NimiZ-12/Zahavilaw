"use client";

import type { ReactNode } from "react";
import { useCameFromAd } from "@/components/lp/shared";

export default function TrackableLink({
  href,
  adHref,
  method,
  children,
  className,
  target,
  rel,
  dir,
}: {
  href: string;
  /** Used instead of `href` when the page URL carries ?src= (a paid-ad
   *  landing) - lets a WhatsApp link swap in its "(ad)"-marked opener. */
  adHref?: string;
  method: "whatsapp" | "phone";
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  dir?: string;
}) {
  const fromAd = useCameFromAd();
  const finalHref = adHref && fromAd ? adHref : href;
  function handleClick() {
    window.gtag?.("event", "contact_lead", { method });
  }
  return (
    <a
      href={finalHref}
      className={className}
      target={target}
      rel={rel}
      dir={dir}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
