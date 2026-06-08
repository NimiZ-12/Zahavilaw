import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * An infinite, auto-scrolling strip of client logos. The track contains two
 * identical copies of the list so the CSS marquee can loop seamlessly; the
 * duplicate is hidden from assistive tech. Logos with a `logo` image path
 * render as images; until a real logo file is supplied we fall back to a
 * styled text wordmark so the strip never looks broken.
 */
export default function ClientsMarquee({
  clients,
}: {
  clients: Dictionary["home"]["clients"];
}) {
  if (clients.items.length === 0) return null;

  // Two copies for the seamless loop.
  const loop = [...clients.items, ...clients.items];

  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="container-x">
        <h2 className="flex items-center justify-center gap-4 text-center text-sm font-semibold uppercase tracking-wider text-muted">
          <span aria-hidden className="h-px w-10 bg-border" />
          {clients.title}
          <span aria-hidden className="h-px w-10 bg-border" />
        </h2>
      </div>

      <div
        className="marquee group relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="marquee-track items-center gap-16 px-8">
          {loop.map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              className="flex shrink-0 items-center justify-center"
              aria-hidden={i >= clients.items.length}
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="whitespace-nowrap text-xl font-semibold text-navy/55 transition hover:text-navy">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
