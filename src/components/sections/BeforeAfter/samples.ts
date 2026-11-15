/**
 * Before/after proof samples (color correction + audio cleanup).
 *
 * NEVER fill these with stock, generated or someone else's material: they must be Maryna's own
 * work, used with the client's permission (see CONTENT.md → GAPS #3 and #5).
 *
 * HOW TO FILL
 * 1. Put the files in /public/media/before-after/ , e.g.
 *      public/media/before-after/color-before.jpg   (16:9, same frame, ≤ 1920 px wide, ~200 KB)
 *      public/media/before-after/color-after.jpg
 *      public/media/before-after/podcast-static-before.mp3   (10–15 s, same excerpt both sides)
 *      public/media/before-after/podcast-static-after.mp3
 * 2. Flip the sample to `status: "ready"` and reference the files by their public URL
 *    (without "/public"):
 *
 *      export const colorSample: ColorSample = {
 *        status: "ready",
 *        before: { src: "/media/before-after/color-before.jpg", alt: "Interview frame, flat log footage" },
 *        after: { src: "/media/before-after/color-after.jpg", alt: "Same frame after color correction" },
 *        note: "Sony S-Log3 → Rec.709, skin tones matched across 2 cameras",
 *      };
 *
 *      export const audioSample: AudioSample = {
 *        status: "ready",
 *        before: { src: "/media/before-after/podcast-static-before.mp3", label: "Raw" },
 *        after: { src: "/media/before-after/podcast-static-after.mp3", label: "Cleaned" },
 *        note: "Background static reduced, voices kept natural",
 *      };
 *
 *    `note` is one short technical line, and it must be true for that exact sample.
 * 3. `hasBeforeAfter` turns true automatically; the section (and its ruler marker) can be shown.
 */

export interface ImageFrame {
  src: string;
  alt: string;
}

export interface AudioClip {
  src: string;
  label: string;
}

export type ColorSample =
  | { status: "needs-asset" }
  | { status: "ready"; before: ImageFrame; after: ImageFrame; note: string };

export type AudioSample =
  | { status: "needs-asset" }
  | { status: "ready"; before: AudioClip; after: AudioClip; note: string };

export const colorSample: ColorSample = { status: "needs-asset" };

export const audioSample: AudioSample = { status: "needs-asset" };

const isReady = (sample: ColorSample | AudioSample): boolean => sample.status === "ready";

/** True when at least one sample is real. When false, hide the section and its nav marker. */
export const hasBeforeAfter: boolean = isReady(colorSample) || isReady(audioSample);
