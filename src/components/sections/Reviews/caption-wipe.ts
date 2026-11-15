/**
 * Reviews signature: each quote line is wiped in left→right like a subtitle cue
 * hitting the screen (clip-path only). Text stays in the DOM and readable to
 * assistive tech the whole time (SplitText `aria: "none"` adds no aria-hidden /
 * aria-label), and the split is reverted as soon as the wipe finishes.
 *
 * Quotes carry `data-caption`; their initial hidden state is CSS-gated on
 * html.js-motion, so without JS or under reduced motion they are simply visible.
 */
import { gsap, SplitText } from "../../../lib/gsap";
import { duration, ease, mq, stagger, trigger } from "../../../lib/motion";

let mm: gsap.MatchMedia | null = null;
let splits: SplitText[] = [];

function wipe(el: HTMLElement): void {
  const split = SplitText.create(el, {
    type: "lines",
    tag: "span",
    aria: "none",
    autoSplit: true,
    onSplit: (self) =>
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: trigger.reveal, once: true },
          // revert() also undoes this timeline's inline opacity, so mark the quote as done:
          // the CSS gate ([.js-motion_&:not([data-caption-done])]) then keeps it visible.
          onComplete: () => {
            el.setAttribute("data-caption-done", "");
            self.revert();
          },
        })
        .set(el, { opacity: 1 })
        .fromTo(
          self.lines,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: duration.base,
            ease: ease.trim,
            stagger: stagger.beat,
          },
        ),
  });
  splits.push(split);
}

function teardown(): void {
  splits.forEach((s) => s.revert());
  splits = [];
  mm?.revert();
  mm = null;
}

function setup(): void {
  teardown(); // idempotent: never split or wipe the same quote twice
  const quotes = document.querySelectorAll<HTMLElement>("[data-caption]");
  if (quotes.length === 0 || !document.documentElement.classList.contains("js-motion")) return;

  mm = gsap.matchMedia();
  mm.add(mq.motionOk, () => {
    quotes.forEach(wipe);
  });
}

let initialized = false;

export function initCaptionWipe(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener("astro:page-load", () => {
    // Line breaks depend on the webfont — measure after fonts are in.
    void document.fonts.ready.then(setup);
  });
  document.addEventListener("astro:before-swap", teardown);
}
