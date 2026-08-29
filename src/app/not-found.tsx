import Link from "next/link";
import { heebo } from "./fonts";
import { defaultLocale, localeDirection } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/routes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);

  return (
    <html
      lang={defaultLocale}
      dir={localeDirection[defaultLocale]}
      className={`${heebo.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <Header
          locale={defaultLocale}
          nav={dict.nav}
          brandName={dict.brand.short}
        />
        <main className="grid flex-1 place-items-center px-6 py-20">
          <div className="text-center">
            <span aria-hidden className="font-serif text-6xl font-semibold text-gold-600">
              404
            </span>
            <h1 className="mt-4 text-2xl">{dict.notFound.title}</h1>
            <p className="mx-auto mt-2 max-w-md text-muted">{dict.notFound.body}</p>
            <Link
              href={localePath(defaultLocale, "/")}
              className="mt-8 inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-600"
            >
              {dict.notFound.cta}
            </Link>
          </div>
        </main>
        <Footer locale={defaultLocale} dict={dict} />
      </body>
    </html>
  );
}
