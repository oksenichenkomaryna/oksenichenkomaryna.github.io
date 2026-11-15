/**
 * Motion tokens for GSAP. Mirrors the `--ease-*` and `--duration-*` tokens in
 * src/styles/global.css (@theme). Change both together.
 */

/** GSAP ease names; CSS equivalents are noted for each. */
export const ease = {
  /** --ease-cut: cubic-bezier(0.165, 0.84, 0.44, 1) */
  cut: "power3.out",
  /** --ease-trim: cubic-bezier(0.215, 0.61, 0.355, 1) */
  trim: "power2.out",
  /** --ease-snap: cubic-bezier(0.19, 1, 0.22, 1) */
  snap: "expo.out",
  /** --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1) */
  inOut: "power2.inOut",
  /** Scroll-linked motion must be linear so it tracks the scroll position 1:1. */
  scrub: "none",
} as const;

/** Durations in seconds (GSAP units); CSS mirrors are in ms. */
export const duration = {
  /** --duration-frame: 80ms — a one-frame hard cut */
  frame: 0.08,
  /** --duration-fast: 160ms */
  fast: 0.16,
  /** --duration-base: 320ms */
  base: 0.32,
  /** --duration-slow: 640ms */
  slow: 0.64,
  /** --duration-reveal: 900ms */
  reveal: 0.9,
} as const;

/** Stagger intervals in seconds; `beat` is the headline "cut on the beat" rhythm. */
export const stagger = {
  beat: 0.12,
  list: 0.06,
  chars: 0.02,
} as const;

/** Small distances in px for entrance offsets (kept subtle on purpose). */
export const distance = {
  nudge: 8,
  rise: 24,
} as const;

/** Frame rate used for the decorative timecode readout. */
export const TIMECODE_FPS = 25;

/** ScrollTrigger start/end presets. */
export const trigger = {
  reveal: "top 85%",
  section: "top top",
  sectionEnd: "bottom top",
  /** End of a scroll-scrubbed sequence inside a section. */
  scrubEnd: "bottom center",
} as const;

/** Media queries for gsap.matchMedia — keep in sync with --breakpoint-* tokens. */
export const mq = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
} as const;

export type EaseToken = keyof typeof ease;
export type DurationToken = keyof typeof duration;

/** Virtual runtime (seconds) the homepage "plays" across — ruler timecode, end-of-sequence marks. */
export const SEQUENCE_RUNTIME_S = 90;
