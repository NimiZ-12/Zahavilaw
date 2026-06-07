import type { LegalPage } from "@/i18n/dictionaries";
import SectionHeading from "./SectionHeading";

/* Renders a structured legal document (privacy policy, accessibility
   statement) from the dictionary so both languages stay in lockstep. */
export default function LegalContent({ page }: { page: LegalPage }) {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-x py-16 sm:py-20">
          <SectionHeading as="h1" title={page.title} subtitle={page.intro} />
          <p className="mt-6 text-sm text-muted">{page.lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-xl text-navy">{section.heading}</h2>
              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted marker:text-gold">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
