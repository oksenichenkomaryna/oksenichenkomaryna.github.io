# Moodboard: reference research for a video/audio editor portfolio

Researched 2026-11-15. Every site below returned HTTP 200 and its HTML source was downloaded and inspected for `<video>` attributes, embeds, fonts, navigation, headings and CTA text. **Method limit:** I read source code and visible text. I did not watch the pages render in a browser. Motion notes come from code (GSAP/Lenis present, CSS marquee and hover rules) or from the site's own markup. Points I could not check are marked _unverified_.

**Could not verify, so left out:** workeditorial.com (no response), cutandrun.tv (redirects to an unrelated domain), factorystudios.co.uk (HTTP 520), littlewingcolor.com (no response), weeditpodcasts.com (no response). Wave Studios and Buck render with client-side JS, so for them I describe only the text and structure that came back.

---

## 1. Reference table

| #      | Name                   | URL                                           | Type                                                             | Reel presentation                                                                                                                                                     | Before/after                                                                                | Primary CTA                                                                                                           | Perf smell                                                                                                       |
| ------ | ---------------------- | --------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1      | Trim Editing           | https://trimediting.com                       | Editorial studio (London)                                        | Grid of 32 `<video autoplay muted loop playsinline preload="none" poster=…>` tiles; Vimeo embed on the project page sits behind cookie consent                        | None                                                                                        | "Contact" in nav only                                                                                                 | Low/medium: 32 loops, but `preload="none"` + posters                                                             |
| 2      | Whitehouse Post        | https://whitehousepost.com                    | Editorial + post (LDN/NY/CHI/LA)                                 | 3× **1080p** Vimeo progressive MP4 `autoplay loop muted`, no poster, no preload hint                                                                                  | None                                                                                        | "Contact" in nav                                                                                                      | **High**: three 1080p MP4s autoplay on load                                                                      |
| 3      | Cosmo Street Editorial | https://www.cosmostreet.com                   | Editorial studio                                                 | 720p hero autoplay loop. Featured cards swap a thumbnail for a hover video (desktop ≥992px only, static on mobile). "Click to play" labels                            | None                                                                                        | "Contact" in nav                                                                                                      | Medium: 8 videos `preload="auto"`. Webflow placeholder text left in ("This is some text inside of a div block.") |
| 4      | Thomas Grove Carter    | https://thomasgrovecarter.com                 | Individual editor (Trim)                                         | Static thumbnail grid (16 imgs, no video on the index). Project page = Vimeo iframe `?autoplay=1`                                                                     | None                                                                                        | Email/Instagram/Twitter in footer                                                                                     | Very low                                                                                                         |
| 5      | Harbor                 | https://harborpicturecompany.com              | Post house (color, sound, VFX, editorial)                        | One 1080p Vimeo MP4 hero, `autoplay loop muted playsinline`, no poster                                                                                                | None                                                                                        | "Contact" (first nav item)                                                                                            | Medium: one 1080p hero, no poster                                                                                |
| 6      | Light Iron             | https://www.lightiron.com                     | Color & finishing house                                          | Still-led (81 imgs, 0 video tags in source). Hero credits "Color by Ian Vertovec"                                                                                     | None (credit lines instead)                                                                 | "Get In Touch" + phone + address                                                                                      | Low. Has `prefers-reduced-motion` rules                                                                          |
| 7      | Company 3              | https://www.company3.com                      | Colorist/post house                                              | Navigation by artist tier (Senior Colorists / Colorists / Finishing / Sound). "My Reel" pages                                                                         | None on the home page                                                                       | "Contact"                                                                                                             | Low on home (WordPress 4.9: dated stack)                                                                         |
| 8      | Wave Studios           | https://wavestudios.com                       | **Audio post** (NY, BAFTA/Oscar-winning per meta)                | Work list = video spots credited to the mixer ("Apple, Introducing the New iPhone 18 Pro / Aaron Reynolds and Austin Ferreira"). Player is JS-rendered (_unverified_) | n/a                                                                                         | _unverified_                                                                                                          | JS-rendered                                                                                                      |
| 9      | Sonic Union            | https://www.sonicunion.com                    | **Audio** (music + sound design)                                 | "Engineer Reels" page per person. Services: Sound Design, Final Mix, Dolby Atmos, VO Casting                                                                          | n/a                                                                                         | `holler@sonicunion.com`                                                                                               | Squarespace, ~1 MB HTML                                                                                          |
| 10     | Paragon Productions    | https://www.paragonproductions.co             | Production + post. **Awwwards Honorable Mention** (Oct 2026)     | 6 autoplay muted loops (1×1080p, 5×720p)                                                                                                                              | None                                                                                        | "SEE OUR WORK" (hero), "Contact Us", closing "Got Something Worth Chasing? / Drop Us A Line"                          | **High**: 6 autoplay MP4s. Webflow + GSAP + Lenis                                                                |
| 11     | Production Portugal    | https://productionportugal.com                | Production service. **Awwwards HM + Developer Award** (Oct 2026) | Two-layer hero video crossfade plus a "next video preview". 7 videos, `aria-hidden="true"` on decorative ones                                                         | B&W video section (`.black-n-white`)                                                        | "[ CONTACT US ]" bracket buttons, "Skip the Hesitation. Come Say Hi"                                                  | Medium/high (`preload="auto"`), **but** 11 `prefers-reduced-motion` hooks                                        |
| 12     | Ordinary Folk / BUCK   | https://www.ordinaryfolk.co · https://buck.co | Motion design studios                                            | OF: 9 autoplay muted loops, some with webp posters. BUCK: JS-rendered case grid, title + one-line outcome per case                                                    | None                                                                                        | BUCK: office links "LA→ NY→ SYD→…", newsletter                                                                        | OF medium                                                                                                        |
| **C1** | ROCKLITE (Peter John)  | https://rocklitesgrades.carrd.co              | **Freelance colorist, conversion-led**                           | Still before/after pairs grouped by use case                                                                                                                          | **Yes**: labelled BEFORE/AFTER per look ("Founder Talking Head Grade, for SaaS & AI Demos") | "Get a Free 10s Test Grade" ("Send me 10–30s of footage. I'll send back a graded test in 24hrs"), "Response in 24hrs" | Very low (Carrd)                                                                                                 |
| **C2** | Resonate Recordings    | https://resonaterecordings.com                | Podcast production agency                                        | One background `autoplay muted loop` video, `role="presentation"`                                                                                                     | n/a                                                                                         | "Book a call" (nav + hero) + "See our work"; inline **Calendly** embed                                                | Medium (GTM, 96 imgs). Stat counters show **"0 +" without JS**                                                   |
| **C3** | Just Keep Podcasting   | https://justkeeppodcasting.com                | Solo podcast VA/editor                                           | Static; "View Portfolio"                                                                                                                                              | n/a                                                                                         | Two paths: "Book a Discovery Call" **and** "Get Started Without a Call"; 3-step "Connect → Paperwork → Breathe Easy"  | Medium: Elementor, 4 Google font families, Google Form iframe                                                    |
| **C4** | Vidchops               | https://vidchops.com                          | Video-editing subscription (YouTube/shorts)                      | Sales VSL with timestamps ("1:10 – The one question…")                                                                                                                | n/a                                                                                         | "Yes! Give Me An Editor Now" / "Book A Call With Expert", **repeated ~8×**; "Unlock Pricing"                          | Heavy (Roboto loaded 3×, emoji headings). Cautionary example                                                     |

---

## Per-site notes

### 1. Trim Editing (editorial studio)

- **Reel:** No single showreel. The home page is the reel: a wall of muted loop tiles. Each tile lists **Client / Director / Editor / Production Company / Agency** ("Foot Locker, Director Kim Gehrig, Editor Tom Lindsay, Production Company Somesuch"). The full piece plays as a Vimeo embed on the project page, gated behind cookie consent.
- **Services:** None listed. Trim sells a roster ("Editors", UK/US).
- **Nav:** Editors · UK · US · Contact. Very minimal.
- **Motion:** The video itself is the motion. No GSAP/Lenis found.
- **Upwork buyer:** Convinced by brand names and credit lines. Confused by the missing services, prices and process, and the page never says who it's for.
- **Perf:** A good pattern to copy: `preload="none"` + poster on every loop.

### 2. Whitehouse Post (editorial)

- **Reel:** 3 full-bleed 1080p loops. The work list pairs **Brand / Editor / Title**.
- **Copy:** The meta line is the clearest one-liner seen in the set: "Editing & Post Production is what we do. London, New York, Chicago & Los Angeles is where we do it." It covers what, where and who in one sentence.
- **Nav:** Editors · About · Digital · News · Contact. Labels are doubled in markup ("Editors Editors"), which suggests a text-roll hover effect.
- **Fonts:** Custom `Inkina` + CSS-variable primary/secondary (exact faces not identifiable).
- **Perf:** Three 1080p progressive MP4s with no poster is a heavy first load. Avoid.

### 3. Cosmo Street (editorial)

- **Reel:** 720p autoplay hero. Featured cards show a thumbnail that crossfades (600ms) to the hover video on desktop and **stays static on tablet/mobile**, a sensible choice. CSS marquee (`marquee-horizontal 40s linear infinite`).
- **Credits:** Editor / Brand / Production / Director per card.
- **QA smell:** Visible Webflow placeholder text in the markup, and "Click to play" repeated 17× per card. It looks unfinished to anyone using a screen reader or reading the page without JS.
- **Has** a `prefers-reduced-motion` rule.

### 4. Thomas Grove Carter (individual editor)

- Closest to "one person, a big body of work." Name as H1, then 3 categories (Commercial / Music Video / Short Film) + About. Each title states its own format ("Nike – Dribble To Survive · Commercial"). Project page = Vimeo player.
- **Upwork buyer:** Credible (Apple, Nike, Olivia Rodrigo), but there is **no CTA beyond an email icon**, no services and no rates. This works for an agency-represented editor and fails for a freelancer.
- Built on Fabrik (portfolio SaaS). Very fast.

### 5. Harbor (post house)

- A single hero loop + only 6 nav items (Entertainment / Advertising / Culture / Press / Magazine / Careers). **Contact is the first link.**
- Services are spelled out in the meta/SEO copy rather than in the UI: "Dailies, Color, Sound, ADR, VFX, Offline Editorial, and Delivery".
- **Fonts:** Söhne + Söhne Mono (Klim, paid), Migra (Pangram Pangram display serif), Beni (condensed display). Söhne Mono is used for technical labels, a "timecode" register.
- Shares a front-end pattern with Whitehouse Post: same Vimeo progressive-redirect `<video>` markup with `disablepictureinpicture`. Probably the same developer.

### 6. Light Iron (color house)

- **Credibility via named people + filmography**: "Ian Vertovec, Co-Founder, Colorist. Lessons in Chemistry, Forever, Gone Girl."
- **Testimonials with role + project**: "Tami Reiker, ASC, Cinematographer, One Night in Miami…" The pattern to steal for Reviews: quote + name + role + project.
- Services as cards with a one-line benefit each ("Dailies: In-facility, near-set, and remote options to start your post during production").
- Font: **Inter Display** + system mono. Has reduced-motion handling.

### 7. Company 3 (colorist house)

- IA is organised **by people tier** (Senior Colorists / Colorists / Finishing) and by medium (Features / TV / Commercials / Sound). Has per-artist "My Reel" and "Look Development" pages.
- WordPress 4.9: the industry leader runs on a dated stack. Reputation does the selling. A freelancer can't rely on that.

### 8. Wave Studios (audio post)

- Even an Oscar-winning **audio** house presents its work as **video spots credited to the mixer**, with category tabs (TV & Cinema / Short Films / Feature Films). I found no waveform UI in the source (page is JS-rendered, so _partially unverified_).
- Key insight: audio buyers still judge from picture + sound, so the work is shown as videos.

### 9. Sonic Union (audio)

- Services named in plain trade terms: Sound Design, Final Mix, Dolby Atmos, VO Casting, Sonic Identity. Has a per-engineer "Engineer Reels" page.
- Contact = playful email `holler@…`. Squarespace, Roboto/Poppins.

### 10. Paragon Productions (Awwwards HM)

- Hero: "Always In PURSUIT" + "SEE OUR WORK". Services split into **Creative / Production / Post**, each with 3–4 sub-items ("Editorial · Sound Design · Color · VFX & Motion").
- Has a Testimonials section (client names: Purdue, New York Bakery, Formula 4…). Closing CTA: "Got Something Worth Chasing? Drop Us A Line".
- Motion: Webflow + GSAP + Lenis smooth scroll, ticker "ALWAYS IN PURSUIT //" repeated, kinetic repeated words ("Post Post Post…"). Repeated words read badly to a screen reader unless set `aria-hidden`.
- 6 autoplay MP4s, no `preload="none"`. Heavy.

### 11. Production Portugal (Awwwards HM + Developer Award)

- Hero video crossfade with a "next video preview" tile, a **cut-to-next** mechanic (relevant to concept C).
- Bracketed labels `[ WORK ] [ CONTACT US ]` give a technical / slate feel. Logo letters wobble on hover (GSAP), also on keyboard **focus**, which is a good a11y detail.
- **11 `prefers-reduced-motion` hooks**, and decorative videos marked `aria-hidden="true"`. This is the a11y benchmark in the set.
- Copy is about client feelings: "clarity, calm, and clever problem-solving. That's something you'll feel on set."

### 12. Ordinary Folk / BUCK (motion)

- Ordinary Folk: "Hi. We are Ordinary Folk. We love good work." Disarming, but it says nothing about what they make. Loops with webp posters. Circular XX (Lineto, paid).
- BUCK: case cards = **title + one-sentence outcome** ("J.P. Morgan Payments Creative Expression: A unique brand expression for a legendary institution."). Mabry (Colophon, paid).

### C1. ROCKLITE (freelance colorist, conversion)

- The most directly relevant reference. The positioning names the buyer: "Colorist for SaaS, AI & Brand Films. I turn flat footage into premium, fundable video."
- Before/after is **grouped by buyer use case**: "Founder Talking Head Grade, for SaaS & AI Demos. Clean skin tones, controlled background, brand-consistent contrast."
- **Risk-reversal offer**: free 10s test grade, 24h turnaround, "Response in 24hrs."
- Weak points: Carrd template look, generic closing paragraph, no reviews.

### C2. Resonate Recordings (podcast agency, conversion)

- Hero: "Your podcast shouldn't be another thing your team has to manage." This is pain-first. The CTA pair is "Book a call" + "See our work".
- Sections: Trusted by (logos) → 3-step "01 Strategy / 02 Production / 03 Growth" → "Who Chooses Resonate" segments ("Launching a new podcast" / "Growing an existing podcast") → services → inline Calendly.
- Line to borrow: "Handled by a team that knows your show, **not a new freelancer each season**." Flip it for a freelancer as "one editor who knows your show."
- **Bug:** the stat counters read "0 + episodes" in the HTML until JS animates them. If JS fails or a crawler reads the page, the claim reads as zero.
- Fonts: **Fraunces + Instrument Sans + Oswald** (all free, all on Fontsource).

### C3. Just Keep Podcasting (solo freelancer, conversion)

- Dual CTA for two buyer temperatures: "Want to talk it through? →" (Discovery call) vs "Already know you need help? →" (Get Started Without a Call).
- Process: "1. Connect, 2. Paperwork, 3. Breathe Easy". Also "Meet Your Provider", "Before You Dive In / Read FAQs", and an AI stance ("Human-Powered. AI-Assisted.").
- Too many fonts (Mulish, Plus Jakarta Sans, Instrument Serif, Homemade Apple, Noto Serif, Lato) and generic headings ("Crafted for visionaries, not copycats").

### C4. Vidchops (cautionary)

- Shows how much conversion pressure is too much: the same two CTAs ~8×, emoji headings, "Unlock Pricing" gate, VSL with timestamps. It reads cheap next to the industry references. Things worth keeping: the "1-2 Day Edits, 24-Hour Fixes" turnaround promise and "Who We Love To Serve".

---

## 2. BORROW list (mapped to our sections)

**Hero**

- One-line positioning that names the buyer + output, in the style of ROCKLITE's "Colorist for SaaS, AI & Brand Films". Ours: _"Video & podcast editor for course creators, SaaS teams and podcasters."_
- Pain-first subline (Resonate): _"Your episode, clips and ads edited, so you can keep recording."_
- CTA pair: primary "Book a call / Get a quote" + secondary "See work" (Resonate, Paragon).
- A muted loop **with poster + `preload="none"` + `playsinline`** (Trim), and a still poster on mobile and under reduced-motion (Cosmo Street, Production Portugal).
- A where/what line in Whitehouse Post's pattern: _"Editing is what I do. Podcasts, courses and ads are what I do it for."_

**Trust bar**

- Logo row titled "Trusted by" (Resonate) + one number. Render real numbers in HTML; **never** use count-ups that start at 0 (the Resonate bug).
- An "Upwork Top Rated / Job Success %" badge plays the role Light Iron gives to its "ASC" credentials for this audience.

**Services**

- Group into 3 buckets with 3–4 trade-term sub-items (Paragon: Creative / Production / Post; Sonic Union's plain terms). Ours: **Podcast** (full episode, audio cleanup, clips) · **Marketing video** (social ads, green screen, real estate) · **Education** (course modules, software tutorials, multicam interviews).
- One-line benefit per card (Light Iron service cards).

**Selected work**

- Credit-line metadata on every tile: **Client / Format / Deliverable / Turnaround** (adapted from Trim/Cosmo's Client / Director / Editor / Prod Co).
- Title + one-sentence outcome per case (BUCK).
- Filter by format (TGC: Commercial / Music Video / Short Film → ours: Podcast / Ads / Courses / Real estate).
- Hover-to-preview on desktop only, poster on touch (Cosmo Street). Full playback only on click (Vimeo/YouTube facade).

**Before/after**

- Group before/after **by buyer use case** with a one-line technical note (ROCKLITE: "Founder Talking Head Grade, for SaaS & AI Demos"). Ours: "Green screen key: raw → composite", "Podcast audio: room echo → clean", "Zoom multicam: single angle → 3-cam cut".
- For audio: an A/B toggle on the same waveform (raw vs. cleaned), so the buyer hears the difference.

**Reviews**

- Quote + name + **role** + **project** (Light Iron: "Tami Reiker, ASC, Cinematographer, One Night in Miami"). Pull Upwork review text with the star rating and job title.

**Process**

- 3 named steps (Resonate's "01 Strategy / 02 Production / 03 Growth"; Just Keep Podcasting's "Connect → Paperwork → Breathe Easy"). Ours: _Send footage → First cut in 48h → Revisions & delivery_.
- Turnaround promise (Vidchops "1-2 Day Edits, 24-Hour Fixes"; ROCKLITE "24hrs").

**Tools**

- Mono "technical register" labels for tool names, timecodes and specs (Harbor's Söhne Mono; Production Portugal's `[ BRACKET ]` labels). Example: `[ PREMIERE PRO ] [ DAVINCI RESOLVE ] [ AUDITION ] [ DESCRIPT ]`.

**About**

- "Meet Your Provider" (JKP): a face + a short story. A one-line AI stance ("Human-edited, AI-assisted") answers a question buyers are asking now.

**Contact**

- Dual path for two buyer temperatures (JKP): "Book a 15-min call" **or** "Send a brief now".
- Risk reversal (ROCKLITE): **"Free 60-second test edit"** + "Reply within 24h".
- A memorable closing line (Paragon's "Got Something Worth Chasing?"; Production Portugal's "Skip the Hesitation. Come Say Hi").

---

## 3. AVOID list

| Avoid                                                                             | Seen at                                                                   | Why                                                                                 |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Multiple 1080p MP4s autoplaying on load, no poster                                | Whitehouse Post, Paragon, Harbor                                          | **Perf**: LCP/data cost on mobile. Upwork buyers often click through from a phone   |
| `preload="auto"` on below-fold loops                                              | Cosmo Street, Production Portugal                                         | **Perf**: wasted bandwidth                                                          |
| JS count-up stats that render "0" first                                           | Resonate                                                                  | **Conversion/SEO**: crawlers, previews and no-JS readers see "0 episodes"           |
| Leftover template placeholder text / repeated "Click to play" ×17                 | Cosmo Street                                                              | **A11y + trust**: screen readers read it aloud, and it looks unfinished             |
| Repeated kinetic words in the DOM ("Post Post Post…") with no `aria-hidden`       | Paragon                                                                   | **A11y**: screen-reader noise                                                       |
| No CTA beyond an email icon; no services or rates                                 | Thomas Grove Carter, Trim, Whitehouse                                     | **Conversion**: fine for agency-repped editors, fatal for a freelancer              |
| Clever hero that doesn't say what you do ("We love good work", "Re-enchantment™") | Ordinary Folk, MakeMake (ex-Rock Paper Scissors)                          | **Clarity**: fails the 5-second test                                                |
| Video players blocked until cookie consent                                        | Trim project pages                                                        | **Conversion**: the reel is the product. Use a privacy-friendly facade or self-host |
| CTA spam, emoji headings, gated pricing                                           | Vidchops                                                                  | **Trust**: reads cheap, and lands badly with SaaS/brand buyers                      |
| 5–6 font families                                                                 | Just Keep Podcasting, Heard City                                          | **Perf + cohesion**                                                                 |
| Hover-only previews with no touch fallback                                        | (Cosmo Street handles it well: static below 992px)                        | **A11y/mobile**                                                                     |
| Animating with no `prefers-reduced-motion` path                                   | Most sites. Only Production Portugal, Light Iron and Cosmo Street had one | **A11y** (vestibular)                                                               |

---

## 4. Notes per concept direction

### A, "Timeline" (playhead scrubbing on scroll)

- **Support:** Indirect. No verified reference builds the page as an NLE timeline. The closest signals are the technical registers: Harbor's Söhne Mono, Production Portugal's `[ BRACKET ]` slate labels, and the credit metadata every editorial house uses (Trim, Cosmo). GSAP + Lenis scroll stacks are standard among Awwwards winners (Paragon, Production Portugal).
- **Why it could win:** It is the one metaphor that is _about editing itself_, which makes it ownable and memorable, and it maps naturally onto Process (In → Cut → Out) and Selected work (clips as timeline segments).
- **Pitfalls:** Scroll-jacking + Lenis hurts a11y and the back button. A horizontal timeline is awkward on mobile. If the playhead is the only navigation, buyers get lost. Keep the timeline as a **decorative progress rail + section markers** with normal vertical scroll and a reduced-motion fallback.

### B, "Waveform" (audio-first)

- **Support:** Weak as a whole-site concept. Even the audio houses (Wave Studios, Sonic Union, Heard City) present work as **video spots + engineer credits** and plain service lists. None of the fetched audio sites used a waveform-driven UI.
- **Use it as a component:** the podcast before/after A/B player and level-meter micro-interactions on hover/CTA.
- **Pitfalls:** About half the buyer mix (real estate, ads, green screen) is visual, so an audio-first identity undersells it. Autoplaying audio is a no-go. Waveform canvases cost CPU.

### C, "Cinematic cut" (full-bleed, letterbox, hard cuts, grade before/after)

- **Support: strongest.** Full-bleed muted loops dominate the industry references (Whitehouse, Harbor, Trim, Paragon, Cosmo). Production Portugal's crossfade + "next video preview" is a near-direct "cut to next shot" mechanic. ROCKLITE and the colorist houses validate before/after grades as a sales tool.
- **Pitfalls:** This is where the perf failures live (multiple 1080p autoplays). It also has the pull toward mood over clarity (Harbor's UI never states services). Grain overlays + letterbox can drop text contrast. A "cinematic" look also signals film/commercial work more than podcasts/courses, so the copy must anchor it to the real buyer.
- **Recommendation:** A **C-led hybrid**. Use C's language for Hero/Work/Before-After (one poster-first loop, hard cuts between sections, letterbox as a framing device rather than a cover over text). Borrow A's mono timecode/credit labels as the typographic system. Use B only as the podcast A/B component.

---

## 5. Typography & palette observations

| Font                                                 | Where                        | Licence / availability                                                                         |
| ---------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Söhne / Söhne Mono                                   | Harbor                       | Klim, **paid**. Not on Fontsource                                                              |
| Migra                                                | Harbor                       | Pangram Pangram, free for personal use, **paid commercial**. Not on Fontsource                 |
| Circular XX                                          | Ordinary Folk                | Lineto, **paid**                                                                               |
| Mabry                                                | BUCK                         | Colophon, **paid**                                                                             |
| Forma (DJR)                                          | MakeMake                     | **paid** (Font of the Month/DJR)                                                               |
| Inter / Inter Display                                | Light Iron, ROCKLITE         | **Free, Fontsource** (`@fontsource/inter`; display optical size ships in Inter 4 variable)     |
| Fraunces                                             | Resonate                     | **Free, Fontsource** (variable serif with "soft"/"wonk" axes, good for a warm editorial voice) |
| Instrument Sans / Instrument Serif                   | Resonate / JKP               | **Free, Fontsource**                                                                           |
| Oswald                                               | Resonate                     | **Free, Fontsource** (condensed, slate-like caps)                                              |
| Plus Jakarta Sans, Mulish, Montserrat, Poppins, Lato | JKP, Heard City, Sonic Union | Free, Fontsource. Generic; avoid as the main voice                                             |
| Gothic A1                                            | ROCKLITE                     | Free, Fontsource                                                                               |

**Free substitutes for the premium "post-house" look (all on Fontsource):**

- Söhne → **Inter Tight / Geist / Hanken Grotesk**
- Söhne Mono → **JetBrains Mono / IBM Plex Mono / Geist Mono** (for timecodes, credit labels and `[ BRACKETS ]`)
- Migra/condensed display → **Fraunces** (serif drama) or **Oswald / Bebas Neue / Anton** (slate caps)

**Palette patterns observed (from the source markup; not checked against rendered colours):**

- Editorial/color houses: near-black or white UI with the footage carrying all the colour. The UI stays neutral so the grade reads true. That is the right call for a colour before/after section.
- Production Portugal's B&W video section is an intentional desaturation-to-colour device. Good for a "raw → graded" story.
- Conversion sites use warmer and brighter accents (Resonate, JKP).
- **Suggestion:** a near-black base (#0B0B0C-ish), off-white text, one "REC red" or "tally amber" accent for CTAs and the playhead, and mono labels in mid-grey. Keep the grain overlay off text layers and confirm ≥4.5:1 contrast.

---

## 6. Five-second hero clarity checklist

A first-time Upwork buyer should be able to answer all of these within 5 seconds:

1. **What do you do?** A literal role in the H1 ("Video & podcast editor"), not a metaphor.
2. **For whom?** The buyer types named: podcasters, course creators, SaaS, brands, real-estate agents.
3. **Proof?** One trust signal above the fold: Upwork rating/Job Success, a client logo row, or "X episodes / Y videos delivered", with real numbers in the HTML.
4. **What does good look like?** One poster-first muted loop (or a before/after still) showing a real deliverable. It must be visible without waiting for video to load.
5. **What do I do next?** One primary CTA ("Get a free test edit" / "Book a 15-min call") + one secondary ("See work"), both visible on a 375px screen without scrolling.
6. **Speed/risk:** a turnaround or risk-reversal line ("First cut in 48h · reply within 24h").
7. **No blockers:** no preloader, no cookie wall over the reel, no sound autoplay, and the hero still reads with `prefers-reduced-motion` and with JS disabled.
