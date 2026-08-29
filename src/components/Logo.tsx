import Image from "next/image";
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
      <Image
        src="/logo.webp"
        alt=""
        aria-hidden
        width={471}
        height={240}
        className="h-9 w-auto"
        // Next 16 deprecated `priority` in favour of `preload`.
        preload
      />
      <span className={`font-serif text-lg font-semibold leading-tight ${textColor}`}>
        {name}
      </span>
    </Link>
  );
}
