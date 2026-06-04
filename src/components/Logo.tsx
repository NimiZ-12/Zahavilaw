import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/routes";

interface LogoProps {
  locale: Locale;
  name: string;
  /** Render light text for use on the dark footer. */
  variant?: "dark" | "light";
}

export default function Logo({ locale, name, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy";

  return (
    <Link
      href={localePath(locale, "/")}
      className="group inline-flex items-center gap-2.5"
      aria-label={name}
    >
      {/* Gold diamond mark — a nod to "זהב" (gold). */}
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-md bg-gold/10 ring-1 ring-gold/30 transition-colors group-hover:bg-gold/15"
      >
        <span className="h-3 w-3 rotate-45 bg-gold" />
      </span>
      <span className={`font-serif text-lg font-semibold leading-tight ${textColor}`}>
        {name}
      </span>
    </Link>
  );
}
