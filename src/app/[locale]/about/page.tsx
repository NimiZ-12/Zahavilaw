import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type TeamMember } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import { pageMetadata } from "@/lib/metadata";
import { buildGraph, faqNode, personNode } from "@/lib/schema";
import { images } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroBackdrop from "@/components/HeroBackdrop";
import SectionHeading from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { ArrowIcon } from "@/components/Icons";
import { practiceAreaIcons } from "@/lib/practice-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: dict.about.title,
    description: dict.about.lead,
    brandName: dict.brand.name,
  });
}

/** One credential line: label plus its values, rendered only when present. */
function CredentialRow({ label, values }: { label: string; values?: string[] }) {
  if (!values || values.length === 0) return null;
  return (
    <div className="border-t border-border pt-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-navy">
        {values.join(" · ")}
      </dd>
    </div>
  );
}

function AttorneyCard({
  member,
  locale,
  labels,
  viewProfile,
}: {
  member: TeamMember;
  locale: Locale;
  labels: {
    barAdmission: string;
    education: string;
    credentials: string;
    memberships: string;
    languages: string;
  };
  viewProfile: string;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-white p-7">
      <h3 className="text-xl text-navy">{member.name}</h3>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold-600">
        {member.role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>

      <dl className="mt-6 space-y-3">
        <CredentialRow
          label={labels.barAdmission}
          values={member.barAdmission ? [member.barAdmission] : undefined}
        />
        <CredentialRow
          label={labels.education}
          values={member.education?.map((e) =>
            [e.degree, e.institution, e.year].filter(Boolean).join(", "),
          )}
        />
        <CredentialRow label={labels.credentials} values={member.credentials} />
        <CredentialRow label={labels.memberships} values={member.memberships} />
        <CredentialRow label={labels.languages} values={member.languages} />
      </dl>

      <Link
        href={localePath(locale, `/team/${member.slug}`)}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold-600"
      >
        {viewProfile}
        <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
      </Link>
    </article>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const { about, team, practiceAreas } = dict;
  const trail = [{ name: about.title, path: "/about" }];

  const graph = buildGraph({
    locale: typedLocale,
    dict,
    path: "/about",
    pageType: "AboutPage",
    name: about.title,
    description: about.lead,
    trail,
    nodes: [
      ...team.members.map((m) => personNode(typedLocale, m, dict)),
      faqNode(typedLocale, "/about", about.faq),
    ],
  });

  const credentialLabels = {
    barAdmission: about.barAdmissionLabel,
    education: about.educationLabel,
    credentials: about.credentialsLabel,
    memberships: about.membershipsLabel,
    languages: about.languagesLabel,
  };

  return (
    <>
      <JsonLd data={graph} />

      <section className="relative overflow-hidden border-b border-white/10 bg-navy">
        <HeroBackdrop
          src={images.about}
          opacity="opacity-60"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/35"
        />
        <div className="container-x relative py-16 sm:py-20">
          <Breadcrumbs
            locale={typedLocale}
            homeLabel={dict.nav.home}
            navLabel={dict.nav.breadcrumb}
            trail={trail}
            tone="dark"
          />
          <SectionHeading
            as="h1"
            eyebrow={about.eyebrow}
            title={about.title}
            subtitle={about.lead}
          />
        </div>
      </section>

      {/* ------------------------------------------------------ The story */}
      <section className="section" aria-labelledby="about-story">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="about-story" className="text-3xl">
              {about.storyTitle}
            </h2>
            <div className="mt-6 space-y-5">
              {about.body.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <ButtonLink
              href={localePath(typedLocale, "/contact")}
              variant="secondary"
              className="mt-8"
            >
              {dict.nav.cta}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </ButtonLink>
          </div>

          <aside className="lg:col-span-5" aria-labelledby="about-milestones">
            <div className="rounded-2xl border border-border bg-navy p-8 text-white">
              <h2 id="about-milestones" className="text-xl text-white">
                {about.milestonesTitle}
              </h2>
              <dl className="mt-6 space-y-6">
                {about.milestones.map((item) => (
                  <div key={item.label} className="border-t border-white/10 pt-4">
                    <dt className="font-serif text-3xl font-extrabold text-gold-400">
                      {item.value}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-white/70">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* -------------------------------------- The attorneys and licences */}
      <section className="section bg-surface" aria-labelledby="about-team">
        <div className="container-x">
          <h2 id="about-team" className="text-3xl">
            {about.teamTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {about.teamIntro}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {team.members.map((member) => (
              <AttorneyCard
                key={member.slug}
                member={member}
                locale={typedLocale}
                labels={credentialLabels}
                viewProfile={team.viewProfile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ What we handle */}
      <section className="section" aria-labelledby="about-practice">
        <div className="container-x">
          <h2 id="about-practice" className="text-3xl">
            {about.practiceTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {about.practiceIntro}
          </p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.items.map((area) => {
              const Icon = practiceAreaIcons[area.slug];
              return (
                <li key={area.slug} className="bg-white">
                  <Link
                    href={localePath(typedLocale, `/practice-areas/${area.slug}`)}
                    className="flex h-full flex-col gap-3 p-7 transition-colors hover:bg-surface"
                  >
                    {Icon && (
                      <span className="grid h-12 w-12 place-items-center rounded-lg bg-gold-soft">
                        <Icon className="h-7 w-7" />
                      </span>
                    )}
                    <h3 className="text-lg text-navy">{area.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {area.summary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- How we work */}
      <section className="section bg-surface" aria-labelledby="about-values">
        <div className="container-x">
          <h2 id="about-values" className="text-3xl">
            {about.valuesTitle}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {about.values.map((value, i) => (
              <li
                key={value.title}
                className="flex gap-4 rounded-2xl border border-border bg-white p-7"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 font-serif text-sm font-semibold text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {value.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- FAQ */}
      <section className="section" aria-labelledby="about-faq">
        <div className="container-x max-w-3xl">
          <h2 id="about-faq" className="text-3xl">
            {about.faqTitle}
          </h2>
          <div className="mt-8 space-y-6">
            {about.faq.map((item) => (
              <article
                key={item.q}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <h3 className="text-base font-semibold text-navy">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
