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

// React islands that need useGSAP import it from "@gsap/react" locally — keeping it out of this
// shared module avoids shipping React core to every page (perf audit).
export { gsap, ScrollTrigger, SplitText };
