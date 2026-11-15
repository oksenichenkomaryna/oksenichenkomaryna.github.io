/**
 * Services helpers. Ordering lives in the data: services.json `order` follows the buyer
 * priority (podcasters → course creators/SaaS → brands/social ads → real estate).
 */
import type { CollectionEntry } from "astro:content";

type Service = CollectionEntry<"services">;
type Audience = Service["data"]["audience"][number];

export function sortByOrder(services: Service[]): Service[] {
  return [...services].sort((a, b) => a.data.order - b.data.order);
}

export const audienceLabels = {
  podcasters: "Podcasters",
  educators: "Course creators",
  saas: "SaaS",
  brands: "Brands",
  "real-estate": "Real estate",
} as const satisfies Record<Audience, string>;
