import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-600 shadow-sm shadow-gold/20",
  secondary:
    "bg-navy text-white hover:bg-navy-700",
  ghost:
    "bg-transparent text-navy ring-1 ring-border hover:bg-surface hover:ring-gold/40",
};

const sizeClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${sizeClasses} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
