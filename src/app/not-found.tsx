import Link from "next/link";
import { heebo } from "./fonts";
import { defaultLocale, localeDirection } from "@/i18n/config";
import { localePath } from "@/lib/routes";

export default function NotFound() {
  return (
    <html
      lang={defaultLocale}
      dir={localeDirection[defaultLocale]}
      className={`${heebo.variable} h-full`}
    >
      <body className="grid min-h-full place-items-center bg-background px-6">
        <div className="text-center">
          <span className="font-serif text-6xl font-semibold text-gold">404</span>
          <h1 className="mt-4 text-2xl">העמוד לא נמצא</h1>
          <p className="mt-2 text-muted">
            ייתכן שהקישור שגוי או שהעמוד הוסר.
          </p>
          <Link
            href={localePath(defaultLocale, "/")}
            className="mt-8 inline-flex items-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-600"
          >
            חזרה לעמוד הראשי
          </Link>
        </div>
      </body>
    </html>
  );
}
