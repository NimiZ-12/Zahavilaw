import { Heebo, Frank_Ruhl_Libre } from "next/font/google";

/** Body / UI font — clean, highly legible in Hebrew and Latin. */
export const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  display: "swap",
  variable: "--font-heebo",
});

/** Display / heading font — an elegant serif with full Hebrew support. */
export const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-frank",
});
