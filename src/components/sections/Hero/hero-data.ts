/**
 * Hero "program monitor + timeline" data. Labels are UI microcopy that mirror real
 * services in src/content/services.json (ids checked at build time in Hero.astro).
 */
import { placeholderWaveform } from "../../ui/waveform";

/**
 * Each title card holds for 25 frames (1 s @ 25 fps). Four cards → the whole pass lasts
 * 4 s and then rests on the final card, so it stays under WCAG 2.2.2's 5 s limit.
 */
export const CARD_HOLD_S = 1;

/** Title cards cut on V1, in buyer-priority order (podcasters → courses → brands). */
export const titleCards = [
  { word: "Podcasts", clip: "Podcast", service: "podcast-editing" },
  { word: "Interviews", clip: "Interview", service: "multicamera-editing" },
  { word: "Courses", clip: "Course", service: "online-course-editing" },
  { word: "Social ads", clip: "Social ad", service: "social-video-ads" },
] as const;

/** Final resting frame (non-factual microcopy echoing the headline). */
export const finalCard = { lines: ["Edited.", "On time."] } as const;

export type ClipKind = "video" | "audio";

export interface TimelineClipData {
  /** 0–1 position on the sequence. */
  start: number;
  end: number;
  label?: string;
  /** Waveform amplitudes (0–1) for audio clips. */
  bars?: readonly number[];
  /** V1 clips light up while the playhead crosses them. */
  highlight?: boolean;
}

export interface TrackData {
  id: "V2" | "V1" | "A1" | "A2";
  kind: ClipKind;
  /** Secondary tracks are dropped on small screens to keep the mobile timeline calm. */
  secondary: boolean;
  clips: readonly TimelineClipData[];
}

const segments = titleCards.length;
const dialogue = placeholderWaveform("clean");
const barsPerSegment = Math.floor(dialogue.length / segments);
/** Music bed sits lower in the mix than dialogue. */
const MUSIC_LEVEL = 0.45;
const music = [...dialogue].reverse().map((v) => v * MUSIC_LEVEL);

export const tracks: readonly TrackData[] = [
  {
    id: "V2",
    kind: "video",
    secondary: true,
    clips: [
      { start: 0.06, end: 0.22, label: "Green screen" },
      { start: 0.5, end: 0.7, label: "Tutorial" },
      { start: 0.79, end: 0.97, label: "Real estate" },
    ],
  },
  {
    id: "V1",
    kind: "video",
    secondary: false,
    clips: titleCards.map((card, i) => ({
      start: i / segments,
      end: (i + 1) / segments,
      label: card.clip,
      highlight: true,
    })),
  },
  {
    id: "A1",
    kind: "audio",
    secondary: false,
    clips: titleCards.map((_, i) => ({
      start: i / segments,
      end: (i + 1) / segments,
      bars: dialogue.slice(i * barsPerSegment, (i + 1) * barsPerSegment),
    })),
  },
  {
    id: "A2",
    kind: "audio",
    secondary: true,
    clips: [
      { start: 0, end: 0.47, label: "Music", bars: music.slice(0, 34) },
      { start: 0.53, end: 1, label: "Music", bars: music.slice(38) },
    ],
  },
];

/**
 * Pre-paint gate for hero elements choreographed by hero-sequence.ts. Same contract as
 * [data-reveal] in global.css: hidden only while html.js-motion is set (JS on, motion OK),
 * so no-JS and reduced-motion visitors always see the full static frame.
 * Arbitrary variant: `in-[.js-motion]` = "inside html.js-motion"; no token variant exists.
 */
export const heroGate = "in-[.js-motion]:opacity-0";
