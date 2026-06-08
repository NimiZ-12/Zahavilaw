import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

type Clients = Dictionary["home"]["clients"];

/** One full set of logos. Two of these sit side by side inside the track. */
function LogoGroup({ items, hidden }: { items: Clients["items"]; hidden?: boolean }) {
  return (
    <ul
      className="marquee-group flex min-w-full shrink-0 items-center justify-around gap-16 px-8"
      aria-hidden={hidden}
    >
      {items.map((client, i) => (
        <li
          key={`${client.name}-${i}`}
          className="flex shrink-0 items-center justify-center"
        >
          {client.logo ? (
            <Image
              src={client.logo}
              alt={client.name}
              width={160}
              height={56}
              className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="whitespace-nowrap text-xl font-semibold text-navy/55 transition hover:text-navy">
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * An infinite, auto-scrolling strip of client logos. The track holds two
 * identical groups, each at least the full container width; translating the
 * track by -50% scrolls exactly one group, so the loop is always seamless —
 * with no blank gap, even on very wide screens. The second group is hidden
 * from assistive tech. Logos with a `logo` image path render as images; until
 * a real logo file is supplied we fall back to a styled text wordmark.
 */
export default function ClientsMarquee({ clients }: { clients: Clients }) {
  if (clients.items.length === 0) return null;

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
        <div className="marquee-track flex w-max">
          <LogoGroup items={clients.items} />
          <LogoGroup items={clients.items} hidden />
        </div>
      </div>
    </section>
  );
}
