/**
 * Lenis smooth scroll, synced with gsap.ticker and ScrollTrigger.
 * - Disabled under prefers-reduced-motion (native scroll).
 * - Re-initialised on astro:page-load, destroyed on astro:before-swap (View Transitions).
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { mq } from "./motion";

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

function start(): void {
  if (lenis || window.matchMedia(mq.reduced).matches) return;

  lenis = new Lenis({ autoRaf: false, anchors: { offset: 0 } });
  lenis.on("scroll", ScrollTrigger.update);

  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function stop(): void {
  if (tick) gsap.ticker.remove(tick);
  tick = null;
  lenis?.destroy();
  lenis = null;
}

export function initSmoothScroll(): void {
  document.addEventListener("astro:page-load", start);
  document.addEventListener("astro:before-swap", stop);
  window.matchMedia(mq.reduced).addEventListener("change", (e) => (e.matches ? stop() : start()));
}
