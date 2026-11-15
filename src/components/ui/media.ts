/** Aspect ratios shared by MediaPlaceholder and VideoPlayer so a swap is zero-CLS. */
export const ratioVariants = {
  "16/9": "aspect-video",
  "9/16": "aspect-9/16",
  "1/1": "aspect-square",
  "4/5": "aspect-4/5",
} as const;

export type MediaRatio = keyof typeof ratioVariants;

/** A poster is either an imported asset (optimised by astro:assets) or a URL string. */
export type Poster = ImageMetadata | string;

export interface CaptionTrack {
  src: string;
  srclang: string;
  label: string;
}

export type VideoSource =
  | { kind: "loop"; webm?: string; mp4: string; poster: Poster; alt: string }
  | { kind: "embed"; provider: "youtube" | "vimeo"; id: string; title: string; poster: Poster }
  | {
      kind: "file";
      mp4: string;
      webm?: string;
      poster: Poster;
      captions?: CaptionTrack[];
      title: string;
    };

/** Privacy-friendly embed URLs; built at render time so the client only reads a data attribute. */
export function embedUrl(provider: "youtube" | "vimeo", id: string): string {
  const safeId = encodeURIComponent(id);
  return provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${safeId}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${safeId}?autoplay=1&dnt=1`;
}
