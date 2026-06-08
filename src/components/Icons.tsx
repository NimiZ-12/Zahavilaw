import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <path d="M12 15v2" />
  </svg>
);

export const WhatsappIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.65-4.8a8 8 0 1 1 3.4 3.32L3 21Z" />
    <path d="M8.5 9.5c.2 2 2 3.8 4 4 .6.06 1.2-.4 1.4-1l.2-.6-1.8-.8-.6.7c-.7-.3-1.3-.9-1.6-1.6l.7-.6-.8-1.8-.6.2c-.6.2-1 .8-.9 1.4Z" />
  </svg>
);

/** The official WhatsApp glyph (filled), for brand-accurate buttons/badges. */
export const WhatsappLogoIcon = (p: IconProps) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 448 512"
    fill="currentColor"
    aria-hidden
    {...p}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  // Points in the inline-start→end reading direction via CSS flipping.
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Two-tone (navy + gold) geometric marks for the practice-area cards. Each is
// built from two flat shapes — a navy primary form and a gold accent — on a
// shared 40×40 grid so the set reads as one consistent family.

type MarkProps = SVGProps<SVGSVGElement>;

const mark = {
  width: 28,
  height: 28,
  viewBox: "0 0 40 40",
  fill: "none",
  "aria-hidden": true,
};

export const FamilyLawIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <circle cx="16" cy="20" r="11" fill="var(--color-navy)" />
    <circle cx="26" cy="20" r="9" fill="var(--color-gold-400)" />
  </svg>
);

export const RealEstateIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <rect x="6" y="14" width="11" height="20" fill="var(--color-navy)" />
    <rect x="20" y="20" width="11" height="14" fill="var(--color-gold-400)" />
  </svg>
);

export const LaborLawIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <rect x="6" y="12" width="28" height="22" rx="3" fill="var(--color-navy)" />
    <rect x="16" y="6" width="8" height="8" rx="2" fill="var(--color-navy)" />
    <rect x="6" y="20" width="28" height="5" fill="var(--color-gold-400)" />
  </svg>
);

export const LitigationIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <polygon points="20,5 35,18 5,18" fill="var(--color-navy)" />
    <rect x="9" y="20" width="4" height="12" fill="var(--color-gold-400)" />
    <rect x="18" y="20" width="4" height="12" fill="var(--color-gold-400)" />
    <rect x="27" y="20" width="4" height="12" fill="var(--color-gold-400)" />
    <rect x="6" y="33" width="28" height="3" fill="var(--color-navy)" />
  </svg>
);

export const CommercialIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="var(--color-navy)" />
    <polygon points="20,14 28,26 12,26" fill="var(--color-gold-400)" />
  </svg>
);

export const WillsEstatesIcon = (p: MarkProps) => (
  <svg {...mark} {...p}>
    <rect x="9" y="6" width="18" height="26" rx="1" fill="var(--color-navy)" />
    <circle cx="27" cy="29" r="7" fill="var(--color-gold-400)" />
  </svg>
);
