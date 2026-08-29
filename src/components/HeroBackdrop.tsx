import Image from "next/image";

/**
 * Full-bleed photograph behind a hero or feature band.
 *
 * These were CSS `background-image` divs, which the browser's preload scanner
 * cannot see (hence the separate HeroImagePreload hack) and which bypass the
 * image optimizer entirely. Rendering an actual <Image fill> instead gets
 * responsive sizing and AVIF/WebP negotiation, and lets `preload` mark the
 * one above the fold as the LCP candidate.
 *
 * `alt` is empty on purpose: every one of these sits under a navy scrim and
 * carries no information a reader would miss. Inventing descriptive alt text
 * for decoration makes screen readers worse, not better. A photograph that
 * does carry meaning should use <Image> directly with a real description.
 */
export default function HeroBackdrop({
  src,
  opacity = "opacity-100",
  priority = false,
  quality = 60,
}: {
  src: string;
  /** Tailwind opacity class applied to the image itself. */
  opacity?: string;
  /** Set on the one backdrop that is above the fold on its page. */
  priority?: boolean;
  quality?: 60 | 75 | 90;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      fill
      sizes="100vw"
      quality={quality}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      className={`pointer-events-none select-none object-cover object-center ${opacity}`}
    />
  );
}
