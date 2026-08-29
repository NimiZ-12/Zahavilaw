/**
 * Renders one structured-data block. Pass a complete graph built by
 * `src/lib/schema.ts` — each page emits exactly one of these so every node
 * resolves against the same `@id` namespace.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in the document.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
