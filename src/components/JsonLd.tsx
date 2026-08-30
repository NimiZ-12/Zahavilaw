/**
 * Renders one structured-data block. Pass a complete graph built by
 * `src/lib/schema.ts` — each page emits exactly one of these so every node
 * resolves against the same `@id` namespace.
 */
export default function JsonLd({ data }: { data: unknown }) {
  // A closing-script-tag sequence inside any string value would terminate
  // the tag early and let the rest of the value run as markup. Escaping every
  // "<" as a unicode escape keeps the payload identical JSON while making
  // breakout impossible, so a future content edit can never turn this block
  // into an XSS sink.
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Structured data must be raw JSON in the document.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
