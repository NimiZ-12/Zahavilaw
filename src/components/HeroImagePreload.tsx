import { preconnect, preload } from "react-dom";

/**
 * The banner images are applied as CSS `background-image`, so the browser
 * only discovers them after layout — far too late for a good LCP. Rendering
 * this next to a hero emits <link rel="preconnect"/preload"> tags in <head>
 * so the image download starts with the HTML response.
 */
export default function HeroImagePreload({ src }: { src: string }) {
  preconnect("https://images.unsplash.com");
  preload(src, { as: "image", fetchPriority: "high" });
  return null;
}
