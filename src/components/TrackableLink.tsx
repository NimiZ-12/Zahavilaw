"use client";

import type { ReactNode } from "react";

export default function TrackableLink({
  href,
  method,
  children,
  className,
  target,
  rel,
  dir,
}: {
  href: string;
  method: "whatsapp" | "phone";
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  dir?: string;
}) {
  function handleClick() {
    window.gtag?.("event", "contact_lead", { method });
  }
  return (
    <a href={href} className={className} target={target} rel={rel} dir={dir} onClick={handleClick}>
      {children}
    </a>
  );
}
