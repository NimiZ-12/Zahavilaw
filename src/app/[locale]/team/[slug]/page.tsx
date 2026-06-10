import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { practiceAreaIcons } from "@/lib/practice-icons";
import { ArrowIcon } from "@/components/Icons";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const dict = await getDictionary(locale);
    for (const member of dict.team.members) {
      params.push({ locale, slug: member.slug });
    }
  }
  return params;
}

async function getMember(locale: Locale, slug: string) {
  const dict = await getDictionary(locale);
  const member = dict.team.members.find((m) => m.slug === slug);
  return { dict, member };
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { member } = await getMember(locale, slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.role}`,
    description: member.bio,
    alternates: { canonical: localePath(locale, `/team/${slug}`) },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const { dict, member } = await getMember(typedLocale, slug);
  if (!member) notFound();

  const { team, practiceAreas } = dict;

  return (
    <>
      <section className="border-b border-border bg-navy text-white">
        <div className="container-x py-16 sm:py-20">
          <Link
            href={localePath(typedLocale, "/team")}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold-400"
          >
            <ArrowIcon className="h-4 w-4 -scale-x-100 rtl:scale-x-100" />
            {team.backToTeam}
          </Link>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white/10 font-serif text-3xl font-semibold text-gold-400 ring-1 ring-gold-400/30">
              {initials(member.name)}
            </span>
            <div>
              <h1 className="text-4xl text-gold-400 sm:text-5xl">{member.name}</h1>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-gold-400/70">
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            {member.about.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border bg-surface p-8">
              <h2 className="text-xl">{team.areasOfPractice}</h2>
              <ul className="mt-6 space-y-4">
                {member.practiceAreaSlugs.map((slug) => {
                  const area = practiceAreas.items.find((a) => a.slug === slug);
                  const AreaIcon = practiceAreaIcons[slug];
                  if (!area || !AreaIcon) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={localePath(typedLocale, `/practice-areas/${slug}`)}
                        className="group flex items-center gap-3 rounded-lg border border-border bg-white p-3 transition-colors hover:border-gold/40"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-soft ring-1 ring-border transition-colors group-hover:ring-gold/40">
                          <AreaIcon className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-medium text-navy transition-colors group-hover:text-gold">
                          {area.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
