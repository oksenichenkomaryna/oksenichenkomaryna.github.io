/**
 * Case-study helpers shared by the Work section and /work/[slug]/:
 * category labels, credit lines (derived from the discriminated union), sorting,
 * media → VideoSource mapping and review date formatting.
 */
import type { CollectionEntry } from "astro:content";
import type { VideoSource } from "../../ui/media";

export type CaseStudy = CollectionEntry<"caseStudies">;
type CaseData = CaseStudy["data"];
export type Category = CaseData["category"];

/** Display order of the filter = buyer priority. */
export const categories = [
  { id: "podcasts", label: "Podcasts", track: "audio" },
  { id: "interviews", label: "Interviews", track: "video" },
  { id: "ads-social", label: "Ads & Social", track: "video" },
  { id: "courses-tutorials", label: "Courses & Tutorials", track: "video" },
] as const satisfies readonly { id: Category; label: string; track: "video" | "audio" }[];

type CategoryMeta = (typeof categories)[number];

export function categoryMeta(id: Category): CategoryMeta {
  const meta = categories.find((c) => c.id === id);
  if (!meta) throw new Error(`Unknown case-study category: ${id}`);
  return meta;
}

export const caseHref = (id: string): string => `/work/${id}/`;

/** Featured first, then data `order`. */
export function sortForGrid(items: CaseStudy[]): CaseStudy[] {
  return [...items].sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.order - b.data.order,
  );
}

export const sortByOrder = (items: CaseStudy[]): CaseStudy[] =>
  [...items].sort((a, b) => a.data.order - b.data.order);

export interface Credit {
  label: string;
  value: string;
}

const formatRange = (r: { min: number; max: number }, unit: string): string =>
  r.min === r.max ? `${r.min} ${unit}` : `${r.min}–${r.max} ${unit}`;

const scopeLabels = { audio: "Audio", video: "Video" } as const;
const formatLabels = { "short-clips": "Short clips", faceless: "Faceless" } as const;

/** Credit-line metadata, only from fields present in the data. */
export function creditsFor(data: CaseData): Credit[] {
  switch (data.category) {
    case "interviews":
      return [
        data.runtimeMinutes && { label: "Runtime", value: formatRange(data.runtimeMinutes, "min") },
        data.cameraAngles && { label: "Cameras", value: formatRange(data.cameraAngles, "cams") },
        data.turnaround && { label: "Turnaround", value: data.turnaround },
      ].filter((c): c is Credit => Boolean(c));
    case "podcasts":
      return [
        data.recordingPlatform && { label: "Recorded on", value: data.recordingPlatform },
        { label: "Scope", value: data.scope.map((s) => scopeLabels[s]).join(" + ") },
      ].filter((c): c is Credit => Boolean(c));
    case "ads-social":
      return [
        { label: "Format", value: formatLabels[data.format] },
        data.source && { label: "Source", value: data.source },
      ].filter((c): c is Credit => Boolean(c));
    case "courses-tutorials":
      return data.batch
        ? [
            { label: "Batch", value: `${data.batch.count} × ${data.batch.minutesEach} min` },
            {
              label: "Turnaround",
              value: `${data.batch.turnaroundDays} ${data.batch.turnaroundDays === 1 ? "day" : "days"}`,
            },
          ]
        : [];
  }
}

/** Ready media → VideoSource (loop when a clip exists, poster-only otherwise → null). */
export function videoSourceFor(media: CaseData["media"]): VideoSource | null {
  if (media.status !== "ready" || !media.clip) return null;
  return { kind: "loop", mp4: media.clip, poster: media.poster, alt: media.alt };
}

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2024-12" → "Dec 2024". */
export function formatMonth(isoMonth: string): string {
  return monthFormat.format(new Date(`${isoMonth}-01T00:00:00Z`));
}
