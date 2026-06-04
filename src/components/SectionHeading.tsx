import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
          <span aria-hidden className="h-px w-6 bg-gold/50" />
          {eyebrow}
        </span>
      )}
      <Heading className="text-3xl leading-tight sm:text-4xl">{title}</Heading>
      {subtitle && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
