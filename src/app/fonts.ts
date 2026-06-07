import { Heebo } from "next/font/google";

/** Body, UI and heading font — clean, bold, highly legible in Hebrew and Latin. */
export const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "800"],
  display: "swap",
  variable: "--font-heebo",
});
