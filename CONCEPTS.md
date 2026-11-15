# CONCEPTS — Maryna Oksenichenko · Video & Audio Editor

Constraint that shapes everything: **we have no footage yet.** Concepts are judged on how
good they look _today_ with placeholders and how much better they get when the showreel
and samples arrive. Every concept must also pass the 5-second test: what she edits (podcasts,
interviews, courses, ads), for whom, and why to trust her (100% JSS · 5.0★ · 14 reviews), plus the CTA.

All fonts are free on Fontsource (`@fontsource-variable/*`).

---

## A — "Timeline"

**Idea.** The page _is_ her Premiere timeline. A thin sticky ruler with live timecode
(`00:00:12:04`) runs along the top. A red playhead moves across it as you scroll. Each
section is a clip on a track: V1 holds the content, A1 shows a quiet waveform strip, and
markers label each chapter ("SERVICES", "WORK", "REVIEWS"). Moving between sections is a
_cut_: one frame of black, then the next clip snaps in.

**Mood.** Precise, calm, professional, like an editor's suite at 2 a.m., organised.
**Convinces.** Course creators / SaaS and podcasters most: they buy _reliability and
structure_. Brands are moderately convinced; real estate less so.

**Palette.**

| Token    | HEX       | Use                                                     |
| -------- | --------- | ------------------------------------------------------- |
| ink      | `#0E0F12` | background (edit-suite dark)                            |
| panel    | `#17191E` | cards / tracks                                          |
| line     | `#2A2D35` | rules, track dividers                                   |
| paper    | `#ECEAE4` | primary text                                            |
| muted    | `#8B8F99` | secondary text, timecode                                |
| playhead | `#FF3B30` | playhead, CTA, markers (one hot colour, used sparingly) |
| clip-v   | `#5B7CFA` | video-track accents                                     |
| clip-a   | `#3DDC97` | audio-track accents / waveforms                         |

**Fonts.** Display: _Inter Tight Variable_ (tight, heavy, 700–800). Text: _Inter Variable_.
Timecode / labels: _JetBrains Mono Variable_ (tabular numerals for running timecode).

**Signature motion.** A scroll-linked playhead (GSAP ScrollTrigger `scrub`) with a timecode
counter driven by scroll progress. Section changes use a one-frame "cut" (clip-path wipe
of 80 ms, no long fades). Native scroll, smoothed by Lenis; no scroll-jacking.

**Sections + animation.**

1. Hero: V1 shows the poster/loop in a "program monitor" frame. The headline arrives as SplitText words that _snap in on beats_ (staggered cuts, not fades). The playhead starts at 00:00:00:00.
2. Trust bar: the stats appear as clip labels on a track; the counters roll like timecode. Numbers are server-rendered and final, never "0".
3. Services: 7 clips on stacked tracks. Hovering one "trims" it open to show its deliverables.
4. Selected work: a bin/grid of clips with credit lines (Format · Runtime · Turnaround); filter tabs by group.
5. Before/after: a split monitor (color). The audio A/B shows the waveform on A1.
6. Reviews: subtitle-style captions, with the quote "typed" in like a caption track.
7. Process: 4 markers on the ruler: brief → first cut → revisions → delivery.
8. Tools: an "Effects panel" list of tools and skill tags.
9. About: photo in a monitor frame, with Poznań / languages as metadata.
10. Contact: the playhead hits the end and an "EXPORT" button turns into "Hire on Upwork".

**Hero, first 3 s.**

- 0.0 s — black frame. Timecode `00:00:00:00` is visible; the poster is already painted (LCP).
- 0.3 s — the ruler draws left→right; the playhead appears.
- 0.6–1.4 s — the headline cuts in word by word ("Podcasts, / interviews / and courses — / edited / and on time.") on a 120 ms rhythm.
- 1.5 s — the subline and CTAs fade/slide 8 px. The muted loop starts if allowed; the poster stays if not.
- 2.0–3.0 s — the trust bar's numbers lock in. The timecode keeps running slowly at idle.

**Risks.** The UI could feel like a "software" pastiche or get too busy, so we need strict
restraint: one accent, lots of black. The timecode must be `aria-hidden`. It works
beautifully _without footage_, because the interface itself is the visual.

---

## B — "Waveform"

**Idea.** Audio first. The page is a mixing console: a large live waveform runs through the hero,
and level meters (VU) in the margin bounce with scroll velocity. Every section is a "track" with
a fader. It leads with her strongest _proven_ niche: podcast audio cleanup (Dan R.'s review).

**Mood.** Warm, intimate, studio-like.
**Convinces.** Podcasters strongly. Course creators somewhat. Weak for brands and real estate
(they buy visuals).

**Palette.** `#111014` ink · `#1C1A20` panel · `#F3EEE6` paper · `#9A93A3` muted ·
`#FFB800` meter amber (accent) · `#FF5A3C` clip/peak red · `#7AE0C3` "clean signal" green.

**Fonts.** Display: _Fraunces Variable_ (soft serif, optical size). Text: _Inter Variable_.
Labels: _IBM Plex Mono_.

**Signature motion.** A canvas/SVG waveform whose amplitude is driven by scroll velocity.
The meters peak on fast scroll. The audio before/after is the hero moment: noisy waveform → clean waveform.

**Sections.** Hero (waveform + headline) · Trust (meter-style stats) · Services (channel strips) ·
Work (episode list, Spotify-style) · Before/after (A/B toggle front and centre) · Reviews · Process ·
Tools · About · Contact ("Go on air").

**Hero, first 3 s.** 0 s: flat line. 0.4 s: the line breathes into a waveform. 0.8–1.6 s: the headline
is written along the waveform. 2 s: the meters settle, CTA visible. 3 s: idle shimmer.

**Risks.** It undersells the video work (she's a _video_ editor first by title). A canvas
animation hurts INP/battery. Without the real before/after audio its centrepiece is empty, and
the moodboard found even top audio houses present their work as video.

---

## C — "Cinematic cut"

**Idea.** The site is a film. Full-bleed frames, 2.39:1 letterbox bars that open and close
between sections, hard cuts and match cuts (a shape at the end of one section becomes the
first frame of the next), subtle film grain, and a big drag slider for the color-grade before/after.

**Mood.** Premium, moody, cinematic.
**Convinces.** Brands / social ads and real estate (they buy _look_). Podcasters and course
creators less so: it can read as "too fancy / too expensive" for a $20–40/hr buyer.

**Palette.** `#0A0A0A` black · `#F5F1EA` paper · `#A39E94` muted · `#E8B04B` tungsten gold
(accent) · `#2E6F73` teal shadow (grade).

**Fonts.** Display: _Fraunces Variable_ italic or _Oswald Variable_ (condensed title-card
style). Text: _Inter Variable_. Labels: _JetBrains Mono_.

**Signature motion.** Letterbox bars (`scaleY`) closing/opening as section "cuts", match-cut
transitions with View Transitions, a grain overlay (static SVG noise, CSS-animated offset).

**Sections.** Hero (full-bleed reel) · Trust (title-card) · Services (7 full-bleed "scenes") ·
Work (film strip) · Before/after (huge grade slider) · Reviews (subtitles over black) · Process
(storyboard) · Tools · About · Contact ("Roll credits").

**Hero, first 3 s.** 0 s: letterboxed black. 0.5 s: the bars part and the poster/reel shows. 1 s: the
title card cuts in. 2 s: the subline appears as a subtitle. 3 s: CTA.

**Risks.** **It depends entirely on footage we don't have.** With placeholders it looks like
an empty cinema. It's the heaviest (full-bleed video everywhere hurts LCP and data use), and
the most "agency" feel, which can scare budget-conscious Upwork buyers and fight the 5-second clarity test.

---

## Recommendation — **A "Timeline", with C's cuts and B's audio A/B**

1. A is the only concept that looks finished **without footage** (the interface is the visual), and it
   says "editor" faster than anything: every Upwork buyer has seen a timeline.
2. It fits her top buyers (podcasters, course creators/SaaS): structure, reliability, on-time delivery
   (the playhead _is_ a deadline). From C we borrow the one-frame hard cuts, the full-bleed
   frames that appear once the reel exists, and the color slider. From B, only the waveform before/after for audio.
3. It keeps CWV safe: one hero loop, no canvas, scroll-linked transforms only, and it scales up when
   the showreel arrives, without a redesign.
