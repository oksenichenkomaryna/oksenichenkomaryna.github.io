# Phase 4 — shared builder brief (read fully before coding)

Project: portfolio for **Maryna Oksenichenko**, freelance video & audio editor (Poznań, PL).
Goal: an Upwork buyer understands in 5 s _what she edits_ and _why hire her_, then is convinced
by work + reviews, then clicks **Hire on Upwork**. The site itself must feel _edited_: cuts,
rhythm, timing.

Concept (chosen): **A "Timeline"** + C's one-frame hard cuts + B's waveform only for audio A/B.
Read `CONCEPTS.md` §A and the Recommendation. Mood: precise, calm, pro edit suite. Lots of ink,
ONE hot accent (playhead red), mono timecode/labels, V1 (clip-v blue) / A1 (clip-a green) track
accents. Restraint beats decoration.

## Facts & content — never invent

- Source of truth: `client-assets/FACTS.md`. All copy comes from the content collections in
  `src/content/*.json` (schemas in `src/content.config.ts`) — read them via
  `getCollection` / `getEntry` from `astro:content`. Don't hardcode copy that exists there.
  Small UI microcopy (button labels, captions) is fine if it makes no new factual claim.
- Reviews are verbatim (incl. the typo "fast an efficient"). No invented clients, metrics, results.
- Name: full "Maryna Oksenichenko". Rate: show "from $20/hr" (site.rate.show + display "from").
- Buyer priority order: podcasters → course creators/SaaS → brands/social ads → real estate.

## NO FOOTAGE EXISTS YET — critical design constraint

All media are `status: "needs-asset"`. Do **not** build walls of "MEDIA OFFLINE" boxes — that
reads as unfinished. Rules:

- Use `MediaPlaceholder` only where a real media slot clearly belongs (e.g. one hero monitor,
  the case-study page header). Elsewhere design **typographic / timeline-UI** cards that look
  complete without media (clip cards with metadata: format, runtime, turnaround, deliverables).
- Components must accept real media later with zero layout change: branch on
  `media.status === "ready"` → `VideoPlayer` / image; else the typographic or placeholder state.
- Never show fake footage or fake before/after results as if they were hers.

## Stack & where things are

Astro 7 static + View Transitions (`<ClientRouter/>` in BaseLayout), React 19 islands only when
interactive (`client:visible` preferred), Tailwind v4, GSAP 3.15, Lenis, TS strict.
`trailingSlash: "always"` → internal links end with `/` (e.g. `/work/podcast-static-cleanup/`,
`/#work`).

Read before coding (DO NOT EDIT — lead-owned):

- `src/styles/global.css` — all tokens (`@theme`). Only these colors exist: ink, panel,
  panel-raised, line, paper, muted, playhead, playhead-hover, clip-v, clip-a, white, black.
  Text: text-label, text-body-sm, text-body, text-lead, text-h3, text-h2, text-display.
  Spacing: p-gutter / px-gutter, py-section, h-ruler; max-w-content, max-w-prose.
  Radii xs/sm/md/lg/pill; shadow-panel, shadow-playhead; z via `z-(--z-overlay)`;
  eases `ease-cut|ease-trim|ease-snap|ease-in-out`; durations `duration-(--duration-fast)` etc.
- `src/lib/motion.ts` (GSAP tokens), `src/lib/gsap.ts` (import gsap/ScrollTrigger/SplitText/useGSAP
  ONLY from here), `src/lib/reveal.ts`, `src/lib/chapters.ts`, `src/lib/smooth-scroll.ts`
- `src/layouts/BaseLayout.astro`, `src/layouts/PageLayout.astro` (ruler + footer; use for pages)
- `src/components/chrome/TimelineRuler.astro`
- `src/components/ui/*` — base components. USE them; don't duplicate: Section (id, marker, tone),
  Heading (level/size/eyebrow; give it `id={`${sectionId}-title`}`), Button (primary/secondary/
  ghost; external), Card (track video/audio/none; interactive), Tag, Timecode, Icon, SocialLinks,
  StarRating, MediaPlaceholder, VideoPlayer (loop/embed/file), BeforeAfter (React island).
  Need a change in a ui component? Don't edit it — report it as a request.
- `/styleguide/` shows all of them (dev server: `npx astro dev --port 4330` — port 4321 is used by
  ANOTHER project of the user; never touch it. Kill your own server when done).

## Motion system (use it — no per-section animation code unless it's a signature moment)

- Entrance motion is attribute-driven via `src/lib/reveal.ts`:
  `data-reveal="cut"` (one-frame hard cut — default for blocks/cards),
  `data-reveal="rise"`, `data-reveal="beat"` (SplitText word cuts — headlines),
  `data-reveal-group` on a parent to stagger its `[data-reveal]` children,
  `data-reveal-now` to play on load instead of on scroll (hero only).
  Initial hidden state is CSS-gated on `html.js-motion` (absent under reduced motion / no JS),
  so content is always visible without JS.
- Signature moments that need their own code: .astro `<script>` with vanilla TS + GSAP inside
  `gsap.context()` (or `gsap.matchMedia()` with `mq.motionOk`), init on `astro:page-load`,
  `ctx.revert()` on `astro:before-swap`, idempotent. React islands: `useGSAP({ scope })`,
  handlers via `contextSafe`, logic in a co-located `useXAnimation.ts`.
  (Lead decision: .astro + vanilla GSAP is preferred over React for non-interactive motion to
  avoid hydration cost — performance outranks wow.)
- Animate only transform / opacity / clip-path. No layout thrash. All values from motion.ts.
- Reduced motion: everything fully visible and static. Respect `html.save-data` (posters only).

## Tailwind rules (strict — reviewers will check)

- Tokens only; no hex/px in markup. Arbitrary values (`w-[37px]`) only with an adjacent
  comment explaining why.
- Typed variant maps (`const x = {...} as const` + `keyof typeof`), clsx for conditionals; no long
  className ternaries; never build class names dynamically (`bg-${c}`) — use maps or CSS vars
  (`style="--progress: 0.4"` + `scale-x-(--progress)`).
- A class group repeated 3+ times → extract a component (in your own folder). No `@apply`.
- `motion-safe:` / `motion-reduce:` for CSS transitions.

## Accessibility & semantics

- Exactly one `<h1>` per page (hero owns it on home). Sections use Section + Heading h2.
- Real links/buttons, visible focus (base styles), keyboard operable, decorative things
  `aria-hidden`, timecode decorative. Lists are lists. Contrast via tokens only (muted text is
  OK on ink/panel; never white text on playhead — use text-ink).
- External links: `target="_blank" rel="noopener"` + sr-only "(opens in new tab)"
  (Button `external` does this). Social profile links: `rel="me noopener"`.

## Code quality

TS strict, no `any`, `as const`, discriminated unions, typed Props interfaces, small components,
no dead code / console logs, co-locate `Component.astro` + `useComponentAnimation.ts` / helpers.

## Ownership — you may ONLY create/edit files in the folders named in your task.

`src/pages/index.astro` is integrated by the lead — don't edit it. Each section component must
work standalone: `<Hero />`, `<Services marker="01 — Services" />` etc. Accept `marker?: string`
and pass it to `Section`. Section ids MUST match `src/lib/chapters.ts`.

To preview your sections, you may create a throwaway page `src/pages/preview-<yourname>.astro`
(routed at `/preview-<yourname>/`) using PageLayout, and you MUST delete it before you finish.

## Verify before returning

`npx astro check` (0 errors/warnings/hints), `npx astro build` passes,
`npx prettier --write <your folders>` then `npx prettier --check <your folders>`.
Note: other builders work in parallel; if check fails ONLY in someone else's folder, report it,
don't fix it.

## Return

Summary (what you built, key design/motion decisions), token or ui-component requests,
known limitations, exact list of created/changed files. Do not commit.
