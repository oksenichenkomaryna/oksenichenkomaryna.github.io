/**
 * Attribute-driven entrance motion, shared by all .astro sections (no per-section JS).
 *
 *   data-reveal="cut"   → hard cut: clip-path snaps open in ~one frame + tiny settle (concept C)
 *   data-reveal="rise"  → fade + 24px rise
 *   data-reveal="beat"  → SplitText words cut in on the beat (headlines)
 *   data-reveal-group   → on a parent: the [data-reveal] elements inside it stagger
 *
 * Initial hidden state comes from CSS (html.js-motion [data-reveal] { opacity: 0 }) so there
 * is no flash. Under reduced motion html.js-motion is absent → everything is visible and
 * this module does nothing.
 */
import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { distance, duration, ease, mq, stagger, trigger } from "./motion";

type RevealKind = "cut" | "rise" | "beat";

/** Font shorthand used to await the display face before splitting headings. */
const DISPLAY_FONT = '800 1em "Inter Tight Variable"';

let ctx: gsap.Context | null = null;
let splits: SplitText[] = [];

function kindOf(el: Element): RevealKind {
  const v = el.getAttribute("data-reveal");
  return v === "cut" || v === "beat" ? v : "rise";
}

function animate(el: HTMLElement, delay = 0): gsap.core.Timeline {
  const tl = gsap.timeline({ delay });
  const kind = kindOf(el);

  if (kind === "beat") {
    const split = SplitText.create(el, { type: "words", mask: "words", aria: "auto" });
    splits.push(split);
    tl.set(el, { opacity: 1 }).from(split.words, {
      yPercent: 100,
      duration: duration.slow,
      ease: ease.snap,
      stagger: stagger.beat,
    });
  } else if (kind === "cut") {
    tl.fromTo(
      el,
      { opacity: 1, clipPath: "inset(0 0 100% 0)" },
      // clearProps: a leftover inline clip-path would clip shadows and hover lifts.
      {
        clipPath: "inset(0 0 0% 0)",
        duration: duration.frame,
        ease: ease.scrub,
        clearProps: "clipPath",
      },
    ).from(el, { y: distance.nudge, duration: duration.base, ease: ease.cut }, 0);
  } else {
    tl.fromTo(
      el,
      { opacity: 0, y: distance.rise },
      { opacity: 1, y: 0, duration: duration.reveal, ease: ease.cut },
    );
  }
  return tl;
}

function setup(): void {
  teardown(); // idempotent: a fast navigation can queue two setups behind font loading
  if (!document.documentElement.classList.contains("js-motion")) return;
  if (window.matchMedia(mq.reduced).matches) return;

  ctx = gsap.context(() => {
    const groups = new Set<Element>();
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const group = el.parentElement?.closest("[data-reveal-group]");
      if (group) {
        groups.add(group);
        return;
      }
      const tl = animate(el).pause();
      if (el.hasAttribute("data-reveal-now")) {
        tl.play();
      } else {
        ScrollTrigger.create({
          trigger: el,
          start: trigger.reveal,
          once: true,
          onEnter: () => tl.play(),
        });
      }
    });

    groups.forEach((group) => {
      const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
      ScrollTrigger.create({
        trigger: group,
        start: trigger.reveal,
        once: true,
        // Created later than setup → add to ctx so astro:before-swap reverts it too.
        onEnter: () => ctx?.add(() => items.forEach((el, i) => animate(el, i * stagger.list))),
      });
    });
  });
}

function teardown(): void {
  splits.forEach((s) => s.revert());
  splits = [];
  ctx?.revert();
  ctx = null;
}

let initialized = false;

export function initReveal(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener("astro:page-load", () => {
    // SplitText measures words: wait for the display face only (not every font file).
    void document.fonts.load(DISPLAY_FONT).then(setup, setup);
  });
  document.addEventListener("astro:before-swap", teardown);
  // Reduced motion switched on mid-session → drop all reveal motion (content stays visible).
  window.matchMedia(mq.reduced).addEventListener("change", (e) => {
    if (e.matches) teardown();
  });
}
