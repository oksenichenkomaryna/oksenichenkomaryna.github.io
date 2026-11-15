/**
 * Content collections — portfolio of Maryna Oksenichenko (Video & Audio Editor).
 *
 * SOURCE OF TRUTH: client-assets/FACTS.md. Every claim in src/content/** must be
 * traceable to a line in that file. Unknowns are modelled as `needs-asset` /
 * optional fields and listed in CONTENT.md → GAPS.
 */
import { defineCollection, reference } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "kebab-case slug");

/** ISO month, e.g. "2024-12". */
const isoMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "ISO month YYYY-MM");

/** Skill tags exactly as listed on her Upwork profile (FACTS.md → Skills). */
export const skillTag = z.enum([
  "Video Intro & Outro",
  "Audio Post Production",
  "Audio Editing",
  "Video Color Correction",
  "Video Design",
  "Adobe Premiere Pro",
  "YouTube",
  "Testimonial Video",
  "Adobe Photoshop",
  "Education",
  "Corporate Video",
  "Podcast",
  "Rotoscoping",
  "After Effects",
]);

export const audience = z.enum(["podcasters", "brands", "real-estate", "educators", "saas"]);

/**
 * Media slot. Until the client supplies files every slot is `needs-asset`;
 * once delivered it flips to `ready` and must carry a poster + alt text.
 */
const media = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("needs-asset"),
    /** What exactly we need from the client for this slot. */
    request: z.string().min(1),
  }),
  z.object({
    status: z.literal("ready"),
    poster: z.string().min(1),
    clip: z.string().min(1).optional(),
    captions: z.string().min(1).optional(),
    alt: z.string().min(1),
  }),
]);

/** Pointer back to the FACTS.md line(s) a piece of content is derived from. */
const factBasis = z.array(z.string().min(1)).min(1);

const range = z
  .object({ min: z.number().positive(), max: z.number().positive() })
  .refine((r) => r.min <= r.max, "min must be <= max");

/* ------------------------------------------------------------------ */
/* site — singleton (id: "main")                                       */
/* ------------------------------------------------------------------ */

const site = defineCollection({
  loader: file("src/content/site.json"),
  schema: z.object({
    name: z.object({ full: z.string().min(1), short: z.string().min(1) }),
    /** TODO(client): pending decision — full name vs Upwork display name. */
    nameDisplay: z.enum(["full", "short"]),
    nameDisplayPending: z.boolean(),
    jobTitle: z.string().min(1),
    upworkTitle: z.string().min(1),
    location: z.object({ city: z.string(), country: z.string() }),
    languages: z.array(z.string().min(1)).min(1),
    experienceYears: z.number().int().positive(),
    rate: z.object({
      amount: z.number().positive(),
      currency: z.literal("USD"),
      unit: z.enum(["hour", "project"]),
      /** Must stay false until client approves showing the rate. */
      show: z.boolean(),
    }),
    upworkUrl: z.url(),
    verified: z.boolean(),
    photo: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
  }),
});

/* ------------------------------------------------------------------ */
/* positioning — singleton (id: "main")                                */
/* ------------------------------------------------------------------ */

const wordCount = (s: string): number => s.trim().split(/\s+/).filter((w) => /\w/.test(w)).length;
const maxWords = (n: number) =>
  z.string().min(1).refine((s) => wordCount(s) <= n, `must be ${n} words or fewer`);

const positioning = defineCollection({
  loader: file("src/content/positioning.json"),
  schema: z.object({
    eyebrow: z.string().min(1),
    headline: maxWords(8),
    subline: maxWords(25),
    alternatives: z
      .array(z.object({ headline: maxWords(8), angle: z.string().min(1) }))
      .min(2)
      .max(3),
    fiveSecond: z.object({
      what: z.string().min(1),
      forWhom: z.string().min(1),
      why: z.string().min(1),
      line: z.string().min(1),
    }),
    cta: z.object({
      primary: z.object({ label: z.string().min(1), link: reference("links") }),
      secondary: z.object({ label: z.string().min(1), href: z.string().startsWith("#") }),
    }),
    about: z.array(z.string().min(1)).min(1),
    factBasis,
  }),
});

/* ------------------------------------------------------------------ */
/* services                                                            */
/* ------------------------------------------------------------------ */

const services = defineCollection({
  loader: file("src/content/services.json"),
  schema: z.object({
    id: slug,
    order: z.number().int().positive(),
    title: z.string().min(1),
    description: z.string().min(1).max(140),
    deliverables: z.array(z.string().min(1)).min(3).max(4),
    audience: z.array(audience).min(1),
    relatedSkills: z.array(skillTag).min(1),
    media: media.optional(),
    factBasis,
  }),
});

/* ------------------------------------------------------------------ */
/* caseStudies — discriminated by category                             */
/* ------------------------------------------------------------------ */

const caseStudyBase = {
  id: slug,
  order: z.number().int().positive(),
  featured: z.boolean(),
  title: z.string().min(1),
  /** "stated" = category follows directly from FACTS.md; "assumed" = editorial grouping, confirm with client. */
  categoryBasis: z.enum(["stated", "assumed"]),
  brief: z.string().min(1),
  whatSheDid: z.array(z.string().min(1)).min(2).max(5),
  output: z.string().min(1),
  relatedReview: reference("reviews").optional(),
  relatedServices: z.array(reference("services")).min(1),
  media,
  factBasis,
};

const caseStudy = z.discriminatedUnion("category", [
  z.object({
    ...caseStudyBase,
    category: z.literal("interviews"),
    cameraAngles: range.optional(),
    runtimeMinutes: range.optional(),
    turnaround: z.string().optional(),
  }),
  z.object({
    ...caseStudyBase,
    category: z.literal("podcasts"),
    recordingPlatform: z.string().optional(),
    scope: z.array(z.enum(["video", "audio"])).min(1),
  }),
  z.object({
    ...caseStudyBase,
    category: z.literal("ads-social"),
    format: z.enum(["short-clips", "faceless"]),
    source: z.string().optional(),
  }),
  z.object({
    ...caseStudyBase,
    category: z.literal("courses-tutorials"),
    batch: z
      .object({
        count: z.number().int().positive(),
        minutesEach: z.number().positive(),
        turnaroundDays: z.number().int().positive(),
      })
      .optional(),
  }),
]);

const caseStudies = defineCollection({
  loader: file("src/content/case-studies.json"),
  schema: caseStudy,
});

/* ------------------------------------------------------------------ */
/* reviews — VERBATIM, never edit quote text                           */
/* ------------------------------------------------------------------ */

const reviews = defineCollection({
  loader: file("src/content/reviews.json"),
  schema: z.object({
    id: slug,
    quote: z.string().min(1),
    author: z.string().min(1),
    projectTitle: z.string().min(1),
    date: isoMonth,
    rating: z.number().int().min(1).max(5),
    source: z.literal("Upwork"),
    verbatimNote: z.string().optional(),
  }),
});

/* ------------------------------------------------------------------ */
/* skills — grouped                                                    */
/* ------------------------------------------------------------------ */

const skills = defineCollection({
  loader: file("src/content/skills.json"),
  schema: z.object({
    id: slug,
    order: z.number().int().positive(),
    group: z.enum(["Tools", "Video", "Audio", "Motion & Design", "Formats & Industries"]),
    note: z.string().optional(),
    items: z
      .array(
        z.object({
          label: z.string().min(1),
          /** Upwork tag this item maps to, when it is one. */
          tag: skillTag.optional(),
          source: z.enum(["profile", "skill-tag", "service"]),
        }),
      )
      .min(1),
  }),
});

/* ------------------------------------------------------------------ */
/* stats                                                               */
/* ------------------------------------------------------------------ */

const stats = defineCollection({
  loader: file("src/content/stats.json"),
  schema: z.object({
    id: slug,
    order: z.number().int().positive(),
    value: z.number().nonnegative(),
    decimals: z.number().int().min(0).max(2),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    label: z.string().min(1),
    detail: z.string().optional(),
    source: z.enum(["Upwork", "Profile"]),
  }),
});

/* ------------------------------------------------------------------ */
/* links                                                               */
/* ------------------------------------------------------------------ */

const links = defineCollection({
  loader: file("src/content/links.json"),
  schema: z.object({
    id: slug,
    platform: z.enum(["upwork", "facebook", "instagram", "linkedin", "youtube", "vimeo", "email"]),
    url: z.url(),
    label: z.string().min(1),
    ariaLabel: z.string().min(1),
    rel: z.array(z.enum(["me", "noopener", "noreferrer", "external"])),
    primary: z.boolean(),
  }),
});

/* ------------------------------------------------------------------ */
/* process                                                             */
/* ------------------------------------------------------------------ */

const processSteps = defineCollection({
  loader: file("src/content/process.json"),
  schema: z.object({
    id: z.enum(["brief", "first-cut", "revisions", "delivery"]),
    order: z.number().int().min(1).max(4),
    title: z.string().min(1),
    body: z.string().min(1).max(200),
    proof: reference("reviews").optional(),
    factBasis,
  }),
});

export const collections = {
  site,
  positioning,
  services,
  caseStudies,
  reviews,
  skills,
  stats,
  links,
  process: processSteps,
};
