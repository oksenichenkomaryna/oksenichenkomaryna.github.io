# PLAN — Maryna Oksenichenko · Video & Audio Editor portfolio

Lead: creative director / architect (main session). Subagents: Opus, `model: "opus"`.
Every subagent result is reviewed by the lead before integration. **Ownership rule:** no two
agents edit the same file concurrently; `src/styles/global.css`, `src/lib/motion.ts`,
`astro.config.mjs`, `package.json` and `src/layouts/*` are **lead-owned**.

Source of truth for facts: the client brief (mirrored in `client-assets/FACTS.md`).
Nothing may be invented. Anything unknown → listed as a gap and asked.

## Inputs found (Phase 0)

| Input                            | Status                                                                 |
| -------------------------------- | ---------------------------------------------------------------------- |
| Photo                            | ✅ `client-assets/maryna-photo.webp` (500×500, outdoor, natural light) |
| Showreel / video samples         | ❌ missing                                                             |
| Before/after audio, color frames | ❌ missing                                                             |
| `reviews.md`, `links.md`         | ❌ missing (only 2 reviews + Facebook known)                           |
| Contact email, custom domain     | ❌ missing                                                             |
| GitHub repo                      | ✅ empty repo initialised, `main` pushed, write access OK              |

## Phases

| #   | Phase              | Who                                                        | Parallel?                                 | Output                                                                   | Gate                                          |
| --- | ------------------ | ---------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| 0   | Plan + scaffold    | Lead                                                       | —                                         | PLAN.md, Astro scaffold, `.gitignore`, `.nojekyll`, FACTS.md             | `astro check` passes · commit `chore:`        |
| 1   | Content & research | content-strategist ∥ reference-researcher                  | ✅                                        | `src/content/**`, `src/content.config.ts`, `CONTENT.md` · `moodboard.md` | **STOP** → name / price / gaps questions      |
| 2   | Concept            | Lead only                                                  | —                                         | `CONCEPTS.md` (A Timeline / B Waveform / C Cinematic cut)                | **STOP** → client picks                       |
| 3   | Design system      | Lead (tokens, motion, layout, Lenis) + 1 component-builder | sequential: tokens first, then components | `global.css`, `motion.ts`, `src/components/ui/*`, `/styleguide`          | check + build · commit `feat:`                |
| 4   | Build sections     | 3–4 section builders                                       | ✅ (disjoint folders)                     | `src/components/sections/<Section>/*`, `/work/[slug]`                    | lead integrates `index.astro` · check + build |
| 5   | Review             | perf ∥ a11y ∥ seo ∥ code ∥ content auditors (read-only)    | ✅                                        | findings `[Severity][Category] file:line · problem · fix`                | lead fixes Critical/Major, re-run once        |
| 6   | Final & deploy     | Lead                                                       | —                                         | Actions deploy, live checks, deliverables                                | live site verified                            |

## Subagent briefs (self-contained; each returns summary + changed files)

### Phase 1

- **content-strategist** — may touch: `src/content.config.ts`, `src/content/**`, `CONTENT.md`.
  Builds typed collections (positioning, services, caseStudies, reviews, skills, stats, links)
  with Zod schemas from `client-assets/FACTS.md` only. Placeholders for missing media are
  typed `optional()` with `status: "needs-asset"`. Outputs gap list.
  Acceptance: `npx astro check` passes; every claim traceable to FACTS.md; reviews verbatim.
- **reference-researcher** — may touch: `moodboard.md` only. 8–10 real portfolios
  (editors / motion / post houses): reel presentation, before/after, services, CTAs,
  motion; borrow / avoid; conversion notes for Upwork buyers. Acceptance: real URLs, no
  fabricated sites, concrete takeaways mapped to sections.

### Phase 3

- **component-builder** — may touch: `src/components/ui/**`, `src/pages/styleguide.astro`.
  Uses only tokens from `global.css`; requests new tokens from lead.

### Phase 4 (groups, disjoint folders)

- **builder-hero-trust**: Hero, TrustBar
- **builder-services-work**: Services, SelectedWork, `/work/[slug]`
- **builder-proof**: BeforeAfter section, Reviews, Process
- **builder-about-contact**: Tools & skills, About, Contact, Footer social

Builder rules: `.astro` by default; React islands only for interaction (`client:visible`);
GSAP only inside `useGSAP({ scope })`, co-located `useXAnimation.ts`; transform/opacity/
clip-path only; initial state before paint; re-init on `astro:page-load`, cleanup on
`astro:before-swap`; no magic numbers (tokens + `motion.ts`); no edits to lead-owned files.

### Phase 5 (read-only auditors)

perf-auditor · a11y-auditor · seo-auditor · code-reviewer · content-checker — briefs per the
original spec; each reports findings only, the lead applies fixes.

## Global acceptance criteria

- `astro check`, `astro build`, `prettier --check .` → zero errors/warnings
- LCP = hero poster; CLS < 0.05; no video bytes below the fold until interaction/visibility
- Reduced motion & Save-Data: all content visible, posters only
- One h1, landmarks, visible focus, keyboard-operable video controls, captions for speech
- Every claim traceable to FACTS.md
- Deployed via GitHub Actions to https://oksenichenkomaryna.github.io
