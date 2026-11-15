# CONTENT — Maryna Oksenichenko · Video & Audio Editor

Source of truth: `client-assets/FACTS.md`. Every line below is traceable to it; each data entry
carries a `factBasis` field where relevant. Data lives in `src/content/*.json`, schemas in
`src/content.config.ts`.

---

## (a) Positioning

**The 5-second test.** A buyer has to answer three questions before they scroll:

| Question  | Answer (from facts)                                                                |
| --------- | ---------------------------------------------------------------------------------- |
| What?     | Video & audio editing (Premiere Pro, After Effects, Photoshop)                     |
| For whom? | Podcasters, course creators, brands, real-estate agents, SaaS teams                |
| Why her?  | 100% Job Success · 5.0 from 14 reviews · clients say "fast" and "delivers on time" |

**One-line version:** I edit podcasts, interviews, ads and course videos for creators and brands — 100% Job Success and 5.0 from 14 reviews on Upwork.

### Headline options

| #                   | Headline (≤ 8 words)                                            | Angle              | Strength                                                                                          | Risk                                              |
| ------------------- | --------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **A (recommended)** | **Podcasts, interviews and courses — edited and on time.**      | What + reliability | Names her 3 strongest categories in the first glance; "on time" is the exact phrase from a review | Less "punchy" than B                              |
| B                   | You hit record. I deliver the finished edit.                    | Relief / outcome   | Memorable, buyer-centric                                                                          | Doesn't say _what_ she edits — relies on eyebrow  |
| C                   | Raw footage in. Clean, captioned video out.                     | Transformation     | Great setup for a before/after section                                                            | Weak until real before/after samples exist        |
| D                   | Podcasts, interviews, courses — edited fast, delivered on time. | Speed              | Backed by next-day delivery + 8 videos in 3 days                                                  | Speed-first can attract "cheapest/fastest" buyers |

**Recommendation — A**, with this stack:

- Eyebrow: `Video & Audio Editor · Premiere Pro · 6 years`
- H1: **Podcasts, interviews and courses — edited and on time.**
- Subline: _I turn raw multi-camera footage and noisy audio into clean, captioned videos and short clips — with clear communication and on-time delivery._
- CTAs: **Hire me on Upwork** (primary) · See the work (secondary, `#work`)
- Trust bar directly under: 100% Job Success · 5.0 (14 reviews) · 24 jobs · 6 years

Why A: Upwork buyers search by category ("podcast editor", "course video editor"). A headline that
repeats their search term, plus a reliability promise that a real client used in their own
words, converts better than a clever line. B is a strong secondary line for a CTA band near
the footer ("You hit record. I deliver the finished edit. → Hire me on Upwork").

---

## (b) Section copy

| Section         | Collection             | Copy                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero eyebrow    | `positioning`          | Video & Audio Editor · Premiere Pro · 6 years                                                                                                                                                                                                                                                                                                                                                                                 |
| Hero H1         | `positioning`          | Podcasts, interviews and courses — edited and on time.                                                                                                                                                                                                                                                                                                                                                                        |
| Hero subline    | `positioning`          | I turn raw multi-camera footage and noisy audio into clean, captioned videos and short clips — with clear communication and on-time delivery.                                                                                                                                                                                                                                                                                 |
| Hero CTAs       | `positioning`, `links` | Hire me on Upwork · See the work                                                                                                                                                                                                                                                                                                                                                                                              |
| Trust bar       | `stats`                | **100%** Job Success · **5.0** rating from 14 client reviews · **24** jobs completed on Upwork · **6 yrs** editing experience (Adobe Creative Cloud). Source: Upwork / profile                                                                                                                                                                                                                                                |
| Services (1)    | `services`             | **Video podcast editing** — Your long recording becomes a clean full episode plus short clips ready to post. · Full video episode, cut for pace · Audio cleanup, including background static removal · Short-form clips cut from the long episode · Intro and outro                                                                                                                                                           |
| Services (2)    | `services`             | **Video ads for social media** — Short ads that stop the scroll and show your brand's personality. · Ad edit from your raw footage and graphics · Subtitles for sound-off viewing · Color correction · Motion graphics in After Effects                                                                                                                                                                                       |
| Services (3)    | `services`             | **Green screen editing** — Clean keys and matched color, so your subject sits naturally in the new background. · Chroma key · Color grading · Rotoscoping                                                                                                                                                                                                                                                                     |
| Services (4)    | `services`             | **Multicamera editing** — Two or three cameras synced to your best mic track and cut like a show. · Camera sync to mic recording · Angle switching across 2–3 cameras · Color matching · Audio editing                                                                                                                                                                                                                        |
| Services (5)    | `services`             | **Real estate video editing** — Property footage edited into a polished video that helps the listing stand out. · Edit of your property footage · Color correction · Branded intro/outro · Audio editing                                                                                                                                                                                                                      |
| Services (6)    | `services`             | **Software & platform tutorials** — Screen recordings turned into clear tutorials your users can actually follow. · Screen-capture editing · Text highlights · Closed captions · Lower thirds and titles                                                                                                                                                                                                                      |
| Services (7)    | `services`             | **Online course editing** — Course lessons that are easy to watch, easy to follow and consistent across modules. · Text highlights · Screen captures · Closed captions · Batch delivery                                                                                                                                                                                                                                       |
| Selected work ★ | `caseStudies`          | **30-minute multi-camera interview** — 2–3 cameras synced, cut and color-matched; every requested change made. Review: Miles B.                                                                                                                                                                                                                                                                                               |
| Selected work ★ | `caseStudies`          | **Background static removed from a video podcast** — static reduced, voices kept natural, delivered on time. Review: Dan R.                                                                                                                                                                                                                                                                                                   |
| Selected work ★ | `caseStudies`          | **8 videos in 3 days** — 8 × 3-min videos with lower thirds and subtitles, one consistent look.                                                                                                                                                                                                                                                                                                                               |
| More work       | `caseStudies`          | Expert interviews, delivered next day (16–19 min) · Podcast audio + video edit from Zencastr · Zoom interview cut into short clips · Faceless video editing                                                                                                                                                                                                                                                                   |
| Reviews         | `reviews`              | "Maryna was excellent, fast an efficient and made all the changes we needed." — Miles B., _Edit together a 30 minute interview_, Dec 2024 · ★★★★★ Upwork                                                                                                                                                                                                                                                                      |
|                 |                        | "Great work ethic and delivers on time. Hope to work with her again in the future." — Dan R., _Cleanup background audio static from video podcast_, Oct 2023 · ★★★★★ Upwork                                                                                                                                                                                                                                                   |
| Process 1       | `process`              | **Brief** — Send your footage, audio and notes. I confirm length, format, captions and deadline before I cut, so we agree on the result upfront.                                                                                                                                                                                                                                                                              |
| Process 2       | `process`              | **First cut** — I sync cameras, clean the audio, cut for pace and add titles, lower thirds or subtitles. You get a first version to review, on the date we set.                                                                                                                                                                                                                                                               |
| Process 3       | `process`              | **Revisions** — Tell me what to change. I make the edits and keep you updated — no chasing, no guessing. (proof: Miles B.)                                                                                                                                                                                                                                                                                                    |
| Process 4       | `process`              | **Delivery** — Final files, ready to publish, on time. Urgent? I have delivered next-day. (proof: Dan R.)                                                                                                                                                                                                                                                                                                                     |
| Tools & skills  | `skills`               | **Tools:** Premiere Pro, After Effects, Photoshop (Adobe Creative Cloud) · **Video:** color correction, intros & outros, multicamera, green screen · **Audio:** audio post-production, audio editing · **Motion & Design:** video design, rotoscoping · **Formats:** podcasts, YouTube, testimonial videos, corporate video, education                                                                                        |
| About           | `positioning.about`    | I'm Maryna, a video and audio editor based in Poznań, Poland, with 6 years of editing in Adobe Premiere Pro, After Effects and Photoshop. / I take your raw footage, audio and graphics and shape them into videos that sound clean, look consistent and carry your brand's personality. / Communication is the core of how I work: you always know where your edit stands. I work in English, Polish, Ukrainian and Russian. |
| Final CTA       | `positioning`, `links` | You hit record. I deliver the finished edit. → Hire me on Upwork                                                                                                                                                                                                                                                                                                                                                              |
| Footer          | `site`, `links`        | Maryna Oksenichenko · Video & Audio Editor · Poznań, Poland · Upwork (verified) · Facebook                                                                                                                                                                                                                                                                                                                                    |

Notes for builders:

- Reviews are verbatim. **Do not fix "fast an efficient"** (client's typo). If it reads as our error, add a small "verbatim from Upwork" label — never edit the quote.
- `site.rate.show` is `false`. Do not render the rate.
- `site.nameDisplay` is `"full"` with `nameDisplayPending: true` — pending client decision.
- Case studies with `categoryBasis: "assumed"` (Zoom clips, 8 videos, faceless) are editorial groupings; don't present the category as a client fact.
- Rating shows as `5.0` (`decimals: 1`).
- Link `rel` arrays are hints; external links should open with `noopener`.

---

## (c) GAPS — what's missing to make the site convincing

| #   | Gap                                                                                                                  | Why it matters                                                                                                         | Priority |
| --- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | **Showreel (60–90 s)**                                                                                               | Editors are hired on what buyers _see_. Without video, the site is just a CV. Hero loses its strongest element.        | **P0**   |
| 2   | **Per-service samples** (1 clip + poster per service, 7 total)                                                       | Every service card currently has `needs-asset`. A podcaster wants to see a podcast; a realtor wants to see a property. | **P0**   |
| 3   | **Before/after audio** (static removal, 10–15 s each)                                                                | Audio cleanup is invisible without A/B. Her only audio review is about exactly this.                                   | **P0**   |
| 4   | **Permission to show client work** (and whether clients may be named)                                                | Decides whether case studies can show footage, and whether we can say "for [Brand]". Currently all anonymous.          | **P0**   |
| 5   | **Before/after color & green-screen frames**                                                                         | Proves color correction / chroma key claims in a single image.                                                         | P1       |
| 6   | **More review texts** (14 reviews exist, we have 2)                                                                  | 2 quotes look thin next to "14 reviews". 4–6 quotes, ideally one per buyer type.                                       | P1       |
| 7   | **Contact email**                                                                                                    | Some buyers (brands, agencies) won't go through Upwork first; also needed for footer/SEO schema.                       | P1       |
| 8   | **Remaining 5 Upwork portfolio item titles + files**                                                                 | Only "Testimonial video" and "Short story about the event" known. These are ready-made case studies.                   | P1       |
| 9   | **Name display decision** (full vs "Maryna O.")                                                                      | Affects hero, title tag, SEO, and consistency with Upwork profile.                                                     | P1       |
| 10  | **Case-study details**: topic of the 8 × 3-min batch, platform for faceless videos, format of Zoom clips (vertical?) | Needed to confirm the category and write sharper briefs.                                                               | P2       |
| 11  | **Other socials** (Instagram, LinkedIn, YouTube, Vimeo)                                                              | Extra trust signals; Vimeo/YouTube can host samples.                                                                   | P2       |
| 12  | **Rate display approval** ($20/hr)                                                                                   | Showing a rate pre-qualifies buyers; hidden by default until approved.                                                 | P2       |
| 13  | **Turnaround standards** (typical days per format, revision rounds included)                                         | Lets Process section promise specifics instead of "on the date we set".                                                | P2       |
| 14  | **Photo for web** (higher-res or landscape crop)                                                                     | 500×500 is fine for About; too small for a large hero portrait.                                                        | P2       |

---

## (d) Questions for the client

1. **Name:** show "Maryna Oksenichenko" or "Maryna O." on the site?
2. **Rate:** may we show $20/hr, or keep it off the site?
3. **Showreel:** do you have one? If not, can you send 6–10 of your best 5–15 s moments so we can cut a short reel?
4. **Samples:** for each of the 7 services, can you share one finished video (or excerpt) you're allowed to show publicly?
5. **Permission:** which past clients allow their work to be shown? Can any be named?
6. **Before/after:** do you still have the raw audio from the static-removal job (or a similar one)? A raw vs. final green-screen or color-graded frame?
7. **Reviews:** may we use more of your 14 Upwork reviews? Please paste the ones you like most.
8. **Portfolio:** what are the titles of the 5 other Upwork portfolio items, and can we use their files?
9. **8 videos in 3 days:** what was the topic (course, corporate, YouTube)?
10. **Faceless videos / Zoom clips:** which platform were they for, and what format (vertical/horizontal)?
11. **Contact:** which email should appear on the site? Any other profiles (Instagram, LinkedIn, YouTube, Vimeo)?
12. **Process:** typical turnaround for a podcast episode / short ad, and how many revision rounds do you usually include?
13. **Priorities:** which buyer do you most want more of — podcasters, course creators, brands, real-estate or SaaS? (We'll order services and headline accordingly.)
