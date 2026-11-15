/**
 * Hero signature moment — "the first 3 seconds" + one edit pass.
 *
 *   0.0 s  black; eyebrow + ruler timecode already painted
 *   0.3 s  monitor frame hard-cuts in, mini-ruler draws, playhead appears
 *   0.42 s timeline lanes wipe in, staggered
 *   (h1, subline, CTAs and proof are static: visible at first paint for LCP)
 *   0.8 s  edit pass: title cards hard-cut on V1 every CARD_HOLD_S while the playhead
 *          crosses the timeline and the monitor timecode runs; then rests on the final card.
 *
 * The pass plays only while the hero visual is on screen and the tab is visible, runs once
 * (4 s total, under WCAG 2.2.2's 5 s) and never loops. Reduced motion: nothing runs; the
 * server-rendered rest frame is what everyone without motion sees.
 */
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { duration, ease, mq, stagger } from "../../../lib/motion";
import { formatTimecode } from "../../ui/timecode";
import { CARD_HOLD_S } from "./hero-data";

/** Beat sheet, in seconds from page load. */
const HERO_BEAT = {
  monitorIn: 0.3,
  tracksIn: 0.42,
  passIn: 0.8,
} as const;

/** The pass runs only while the whole monitor is on screen (it waits below the fold on mobile). */
const PASS_TRIGGER = { start: "bottom bottom", end: "bottom top" } as const;

/** clip-path states: vertical "cut" (concept C) and left→right "wipe" (ruler draws). */
const CLIP = {
  cutClosed: "inset(0% 0% 100% 0%)",
  wipeClosed: "inset(0% 100% 0% 0%)",
  open: "inset(0% 0% 0% 0%)",
} as const;

const all = (root: ParentNode, selector: string): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(selector));

const defined = (el: HTMLElement | undefined): el is HTMLElement => el !== undefined;

function buildPass(root: HTMLElement): gsap.core.Timeline {
  const shots = all(root, "[data-hero-card]:not([data-hero-card='final'])");
  const finalCard = root.querySelector<HTMLElement>("[data-hero-card='final']") ?? undefined;
  const clips = all(root, "[data-hero-clip]");
  const timecode = root.querySelector<HTMLElement>("[data-hero-tc]");
  const playhead = root.querySelector<HTMLElement>("[data-hero-playhead]");

  const segments = clips.length;
  const runtime = segments * CARD_HOLD_S;

  // Rewind the rest frame to frame 0: first card up, first V1 clip lit, playhead at 0.
  gsap.set([...shots, finalCard].filter(defined), { autoAlpha: 0 });
  gsap.set([shots[0], clips[0]].filter(defined), { autoAlpha: 1 });
  if (playhead) gsap.set(playhead, { "--hero-p": 0 });
  if (timecode) timecode.textContent = formatTimecode(0);

  const pass = gsap.timeline({ paused: true });

  if (playhead) pass.to(playhead, { "--hero-p": 1, duration: runtime, ease: ease.scrub }, 0);
  if (timecode) {
    const clock = { s: 0 };
    pass.to(
      clock,
      {
        s: runtime,
        duration: runtime,
        ease: ease.scrub,
        onUpdate: () => {
          timecode.textContent = formatTimecode(clock.s);
        },
      },
      0,
    );
  }

  // Hard cuts: zero-duration sets on the beat, no dissolves.
  for (let i = 1; i <= segments; i++) {
    const at = i * CARD_HOLD_S;
    const outgoing = [shots[i - 1], clips[i - 1]].filter(defined);
    const incoming = [i < segments ? shots[i] : finalCard, clips[i]].filter(defined);
    if (outgoing.length) pass.set(outgoing, { autoAlpha: 0 }, at);
    if (incoming.length) pass.set(incoming, { autoAlpha: 1 }, at);
  }

  return pass;
}

function build(root: HTMLElement): () => void {
  const stage = root.querySelector<HTMLElement>("[data-hero-stage]") ?? root;
  const pass = buildPass(root);

  let armed = false;
  let inView = false;
  const sync = (): void => {
    if (armed && inView && !document.hidden) pass.play();
    else pass.pause();
  };

  gsap
    .timeline()
    .fromTo(
      all(root, "[data-hero-in='cut']"),
      { opacity: 1, clipPath: CLIP.cutClosed },
      { clipPath: CLIP.open, duration: duration.frame, ease: ease.scrub, clearProps: "clipPath" },
      HERO_BEAT.monitorIn,
    )
    .fromTo(
      all(root, "[data-hero-in='ruler']"),
      { opacity: 1, clipPath: CLIP.wipeClosed },
      { clipPath: CLIP.open, duration: duration.base, ease: ease.cut, clearProps: "clipPath" },
      HERO_BEAT.monitorIn,
    )
    .fromTo(
      all(root, "[data-hero-in='playhead']"),
      { opacity: 0 },
      { opacity: 1, duration: duration.frame, ease: ease.scrub },
      HERO_BEAT.monitorIn,
    )
    .fromTo(
      all(root, "[data-hero-in='track']"),
      { opacity: 1, clipPath: CLIP.wipeClosed },
      {
        clipPath: CLIP.open,
        duration: duration.base,
        ease: ease.cut,
        stagger: stagger.list,
        clearProps: "clipPath",
      },
      HERO_BEAT.tracksIn,
    )
    .call(
      () => {
        armed = true;
        sync();
      },
      undefined,
      HERO_BEAT.passIn,
    );

  const st = ScrollTrigger.create({
    trigger: stage,
    start: PASS_TRIGGER.start,
    end: PASS_TRIGGER.end,
    onToggle: (self) => {
      inView = self.isActive;
      sync();
    },
  });
  inView = st.isActive;

  document.addEventListener("visibilitychange", sync);
  return () => document.removeEventListener("visibilitychange", sync);
}

let mm: gsap.MatchMedia | null = null;

function teardown(): void {
  mm?.revert();
  mm = null;
}

function setup(): void {
  teardown();
  const root = document.querySelector<HTMLElement>("[data-hero]");
  if (!root) return;
  mm = gsap.matchMedia();
  mm.add(mq.motionOk, () => build(root));
}

let initialized = false;

export function initHeroSequence(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener("astro:page-load", setup);
  document.addEventListener("astro:before-swap", teardown);
}
