/**
 * Process signature: a playhead scrubs along the process ruler, tied 1:1 to scroll
 * (ScrollTrigger scrub, linear ease, transform only). Horizontal on md+, vertical below.
 * Each playhead is a full-size layer inside an overflow-hidden track, so translating it
 * by 0→100% of its own size moves the line from the first marker to the end of the ruler.
 * Reduced motion: nothing runs; the playhead rests at the start, all steps are visible.
 */
import { gsap } from "../../../lib/gsap";
import { ease, mq, trigger } from "../../../lib/motion";

let mm: gsap.MatchMedia | null = null;

function teardown(): void {
  mm?.revert();
  mm = null;
}

function setup(): void {
  teardown(); // idempotent: never stack two scrubs on the same playhead
  const root = document.querySelector<HTMLElement>("[data-process]");
  if (!root) return;

  mm = gsap.matchMedia();
  mm.add({ motionOk: mq.motionOk, md: mq.md }, (context) => {
    const { motionOk, md } = context.conditions ?? {};
    if (!motionOk) return;

    const head = root.querySelector<HTMLElement>(
      md ? "[data-playhead='x']" : "[data-playhead='y']",
    );
    if (!head) return;

    gsap.fromTo(head, md ? { xPercent: 0 } : { yPercent: 0 }, {
      ...(md ? { xPercent: 100 } : { yPercent: 100 }),
      ease: ease.scrub,
      scrollTrigger: { trigger: root, start: trigger.reveal, end: trigger.scrubEnd, scrub: true },
    });
  });
}

let initialized = false;

export function initProcessScrub(): void {
  if (initialized) return;
  initialized = true;
  document.addEventListener("astro:page-load", setup);
  document.addEventListener("astro:before-swap", teardown);
}
