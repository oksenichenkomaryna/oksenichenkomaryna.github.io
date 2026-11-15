/**
 * Homepage chapters = timeline markers in the ruler nav + section ids (lead-owned).
 * Order here is the order on the page. `nav: false` sections get no ruler marker.
 */
import { hasBeforeAfter } from "../components/sections/BeforeAfter/samples";

const allChapters = [
  { id: "services", label: "Services", nav: true },
  { id: "work", label: "Work", nav: true },
  { id: "before-after", label: "Before/After", nav: true },
  { id: "reviews", label: "Reviews", nav: true },
  { id: "process", label: "Process", nav: true },
  { id: "tools", label: "Tools", nav: false },
  { id: "about", label: "About", nav: true },
  { id: "contact", label: "Contact", nav: true },
] as const;

export type ChapterId = (typeof allChapters)[number]["id"];

/** Chapters whose content currently exists (before/after appears once real samples are added). */
const enabled: Record<ChapterId, boolean> = {
  services: true,
  work: true,
  "before-after": hasBeforeAfter,
  reviews: true,
  process: true,
  tools: true,
  about: true,
  contact: true,
};

export const chapters = allChapters.filter((c) => enabled[c.id]);

/** "02 — Work" style marker for a chapter, numbered by page order. */
export function markerFor(id: ChapterId): string {
  const i = chapters.findIndex((c) => c.id === id);
  return `${String(i + 1).padStart(2, "0")} — ${chapters[i]?.label ?? id}`;
}
