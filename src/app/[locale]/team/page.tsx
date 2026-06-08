import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { images } from "@/lib/images";
import SectionHeading from "@/components/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.team.title,
    description: dict.team.subtitle,
    alternates: { canonical: localePath(locale, "/team") },
  };
}

/** Build initials for the avatar placeholder, e.g. "רון זהבי" → "רז". */
function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const { team } = dict;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${images.team}')` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow={team.eyebrow}
            title={team.title}
            subtitle={team.subtitle}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="flex flex-col rounded-xl border border-border bg-white p-7 text-center transition-shadow hover:shadow-md"
            >
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy font-serif text-2xl font-semibold text-gold-400">
                {initials(member.name)}
              </span>
              <h2 className="mt-5 text-xl">{member.name}</h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
