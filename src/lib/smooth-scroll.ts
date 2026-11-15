/**
 * Lenis smooth scroll, synced with gsap.ticker and ScrollTrigger.
 * - Disabled under prefers-reduced-motion (native scroll).
 * - Re-initialised on astro:page-load, destroyed on astro:before-swap (View Transitions).
 * - Owns same-page anchor links (#id and /#id on the current page): Astro's ClientRouter
 *   intercepts them but its scroll doesn't move a Lenis-managed page, so we handle them first.
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { mq } from "./motion";

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

/** Touch devices scroll natively (Lenis doesn't smooth touch by default; avoid the rAF loop). */
const COARSE_POINTER = "(hover: none) and (pointer: coarse)";

function start(): void {
  if (lenis || window.matchMedia(mq.reduced).matches || window.matchMedia(COARSE_POINTER).matches)
    return;

  lenis = new Lenis({ autoRaf: false });
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

/** Height of the sticky timeline ruler, so anchored sections aren't hidden under it. */
function rulerOffset(): number {
  return document.querySelector<HTMLElement>("[data-ruler]")?.offsetHeight ?? 0;
}

/** Same-page anchor → its target element, or null for anything else (other pages, new tabs…). */
function anchorTarget(e: MouseEvent): { link: HTMLAnchorElement; target: HTMLElement } | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return null;
  const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!link || link.target === "_blank") return null;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash)
    return null;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  return target ? { link, target } : null;
}

function onAnchorClick(e: MouseEvent): void {
  const hit = anchorTarget(e);
  if (!hit) return;
  e.preventDefault();
  e.stopPropagation(); // keep ClientRouter from also handling it
  hit.link.closest("details")?.removeAttribute("open"); // e.g. the mobile chapter menu

  const top = hit.target.getBoundingClientRect().top + window.scrollY - rulerOffset();
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: "auto" });

  // replaceState: keeps ClientRouter's history entries (and Back) intact.
  history.replaceState(history.state, "", hit.link.hash);
  // Move focus for keyboard / screen-reader users (e.g. skip link → main[tabindex=-1]).
  if (hit.target.hasAttribute("tabindex")) hit.target.focus({ preventScroll: true });
}

export function initSmoothScroll(): void {
  // Capture phase on window runs before ClientRouter's document-level click handler.
  window.addEventListener("click", onAnchorClick, { capture: true });
  document.addEventListener("astro:page-load", start);
  document.addEventListener("astro:before-swap", stop);
  window.matchMedia(mq.reduced).addEventListener("change", (e) => {
    // Only ever REMOVE the pre-paint flag mid-session: content gated on html.js-motion must never
    // become hidden after load (reveal setups ran — or bailed — at page load).
    if (e.matches) document.documentElement.classList.remove("js-motion");
    if (e.matches) stop();
    else start();
  });
}
