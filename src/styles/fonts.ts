/**
 * Latin-only variable fonts (perf audit: a single "ń" in "Poznań" otherwise pulls ~100 KB of
 * latin-ext; that glyph now renders from the fallback stack). Files come from @fontsource-variable;
 * the display face is preloaded because it paints the hero h1 (LCP).
 */
import interUrl from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import interTightUrl from "@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2?url";
import monoUrl from "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url";

/** fontsource's "latin" unicode-range. */
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

const faces = [
  { family: "Inter Variable", url: interUrl, weight: "100 900" },
  { family: "Inter Tight Variable", url: interTightUrl, weight: "100 900" },
  { family: "JetBrains Mono Variable", url: monoUrl, weight: "100 800" },
] as const;

export const fontFaceCss = faces
  .map(
    (f) =>
      `@font-face{font-family:"${f.family}";font-style:normal;font-display:swap;font-weight:${f.weight};src:url(${f.url}) format("woff2-variations");unicode-range:${LATIN};}`,
  )
  .join("");

/** Preloaded: the display face (hero h1 = LCP). */
export const preloadFonts = [interTightUrl] as const;
