/**
 * Single GSAP entry point: plugins are registered exactly once here.
 * Always import gsap / ScrollTrigger / SplitText from this module.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

function register(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

register();

export { gsap, ScrollTrigger, SplitText, useGSAP };
