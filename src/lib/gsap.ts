/**
 * Single GSAP entry point: plugins are registered exactly once here.
 * Always import gsap / ScrollTrigger / SplitText from this module.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

function register(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

register();

// Kept free of React on purpose: a shared useGSAP import shipped React core to every page.
export { gsap, ScrollTrigger, SplitText };
