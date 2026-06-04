import "./globals.css";

/**
 * The locale-specific layout under `[locale]` renders the <html> and <body>
 * tags so it can set the correct `lang` and `dir`. This root layout simply
 * forwards its children.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
