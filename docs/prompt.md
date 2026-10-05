# CAI Website — Your Step-by-Step Prompt Guide

This file is for **you**, not for the AI. It says exactly what to upload, where it goes, which model to pick, and which prompt to paste, in order. Follow it top to bottom.

> The prompts are written for Antigravity. Menu names in Antigravity change between versions; if a button is not where I say, ask the agent "where do I find X?" or search the Antigravity docs.

---

## 1. How the whole process works (read once)

1. **One phase = one new conversation.** Start a fresh agent chat for each prompt group below (0, 1A, 1B, …). Long chats get confused.
2. **Paste the prompt exactly.** Replace only the parts in `[square brackets]`.
3. **The agent reads `AGENTS.md` by itself** (it is in the project root). Every prompt also tells it which documents to read.
4. **Check the result yourself** using the "You check" list under each prompt. Do not move on until it passes.
5. **Commit and tag** after each phase (the agent will give you the commands, or ask it: "commit with the suggested message and tell me the tag command").
6. **If something is wrong, use a fix prompt** from section 7 instead of starting over.
7. **Never skip a phase** and never let the agent "also do the next phase".

---

## 2. Everything you need to upload, and where it goes

### 2.1 What you have (from this pack and from earlier)

| What | Where it comes from |
|---|---|
| `AGENTS.md`, `README.md`, `prompt.md` | this pack |
| `docs/` (PRD, design, content, tech, assets, phase, future_scope) | this pack |
| `content-seed/` (4 JSON files) | this pack |
| 4 design images (`home_webpage_desktop_version.png`, `home_webpage_mobile_version.png`, `teams_webpage_desktop_version.png`, `teams_webpage_mobile_version.png`) | your original upload |
| `asset_sheet_vector_transparent.svg` | your original upload |
| `cai-assets` folder (`web/`, `masters/`, `slice_assets.py`, `README.txt`, preview, manifest) | the assets zip |
| Your CAI logo, your affiliation logo | you (can wait until Phase 5, or add now) |
| Team photos | you (Phase 5) |

### 2.2 Folder to prepare **before** Phase 0

Create an empty folder called `cai-website` on your computer. Put this inside it, **exactly like this**:

```
cai-website/
├── AGENTS.md                       ← only this file at the top level
└── _incoming/
    ├── README.md
    ├── prompt.md                   (optional, for your own reference)
    ├── docs/                       ← PRD.md, design.md, content.md, tech.md, assets.md, phase.md, future_scope.md
    ├── content-seed/               ← site.json, pages.json, home.json, team.json
    ├── design/
    │   └── reference/              ← the 4 design PNGs (keep the file names)
    ├── source/
    │   └── asset_sheet_vector_transparent.svg
    ├── cai-assets/                 ← the unzipped folder: web/, masters/, slice_assets.py, ...
    └── brand/                      ← OPTIONAL now: cai-logo.svg (or .png) and affiliation-logo.svg (or .png)
```

The Phase 0 agent moves everything from `_incoming` to its final place. You do not need to move anything else by hand.

### 2.3 Where files end up (for your understanding)

| File | Final place |
|---|---|
| Design PNGs | `design/reference/` |
| SVG | `assets-source/asset_sheet_vector_transparent.svg` |
| `masters/` | `assets-source/masters/` |
| `web/` contents | `src/assets/art/` |
| `slice_assets.py` | `scripts/slice_assets.py` |
| Logos | `src/assets/brand/cai-logo.*` and `src/assets/brand/affiliation-logo.*` |
| Team photos | `src/assets/team/firstname-lastname.jpg` |
| Content JSON | `src/content/` (copied from `content-seed/` in Phase 1A) |

### 2.4 Logo file rules

- Name them exactly `cai-logo.svg` (or `.png`/`.webp`) and `affiliation-logo.svg` (or `.png`/`.webp`).
- Transparent background. Light or white version works best on the dark site.
- If your logo already includes the words "Centre for Artificial Intelligence", tell the agent in Phase 5 so it turns off the text beside it.

---

## 3. One-time setup you do yourself

1. **Install Node.js (current LTS) and Git.** Check in a terminal: `node -v` and `git -v` both print a version.
2. **GitHub:** create a repository named `cai-website` (private is fine). Do not add a README or .gitignore in GitHub.
3. **Vercel:** create a free account and choose "Continue with GitHub". You will connect the repository in Phase 0 after the first push.
4. **Antigravity:** open the `cai-website` folder as your workspace (File → Open Folder). Check that the Rules area shows `AGENTS.md` as active; if it does not, tell the agent: "Make sure AGENTS.md is applied as a workspace rule."

---

## 4. Which model to use when

| Phase | Model and level | Mode (if your Antigravity shows Planning / Fast) |
|---|---|---|
| 0 Setup | Flash 3.8 · medium | Fast |
| 1A Content system | **Pro 3.1 · high** | Planning |
| 1B Layout shell | Flash 3.8 · high | Planning |
| 2A Home hero + stepper | **Pro 3.1 · high** | Planning |
| 2B, 2C Home sections | Flash 3.8 · high | Planning |
| 2D Home mobile pass | Flash 3.8 · high | Fast |
| 3A Team hero | Flash 3.8 · high | Planning |
| 3B Team cards + carousel | **Pro 3.1 · high** | Planning |
| 3C Team finish | Flash 3.8 · medium | Fast |
| 4A Design review (no edits) | **Pro 3.1 · high** | Planning |
| 4B Apply fixes | Flash 3.8 · high | Fast |
| 4C Accessibility and speed audit | **Pro 3.1 · high** | Planning |
| 5 Real content | Flash 3.7 · low | Fast |
| 6 Launch | Flash 3.8 · medium | Fast |
| Tiny edits (a word, one JSON value) | Flash 3.6 or 3.7 · low | Fast |

How to decide in the moment:
- **Same mistake twice?** Move up one step: Flash high → Pro low → Pro high. Do not argue a third time with the same model.
- **Hit a usage limit on 3.8?** Continue with 3.7 at the same level.
- **Save Pro for the moments marked in bold.** Everything else runs well on Flash.
- This table is my judgement of how the tiers compare, not a benchmark. If a model surprises you, trust what you see.

### Attaching images in a prompt
In the chat box, type `@` and pick the file (or drag the image in). When a prompt says **Attach**, attach those exact files so the agent sees them, even though they are also in the workspace.

---

## 5. The prompts, phase by phase

### PHASE 0 — Setup and first deploy
**Model:** Flash 3.8 · medium **Attach:** nothing

```
We are starting Phase 0 of the CAI website. Read AGENTS.md. Everything I supplied is in the folder `_incoming` (docs, design images, content seed, source SVG, artwork, optional brand logos). Read `_incoming/docs/PRD.md`, `_incoming/docs/tech.md` (especially sections 1 and 2) and the Phase 0 section of `_incoming/docs/phase.md`.

Do Phase 0 only:
1. Scaffold an Astro + TypeScript project in this folder with static output, using npm. Do not delete or overwrite `_incoming`. If the Astro command refuses a non-empty folder, scaffold in a temporary subfolder and move the files up.
2. Create the folder structure from docs/tech.md section 2.
3. Move files out of `_incoming` into their final places: AGENTS.md stays in the root; README.md to the root; docs to `docs/`; design PNGs to `design/reference/`; the SVG to `assets-source/`; `cai-assets/masters` to `assets-source/masters/`; the contents of `cai-assets/web` to `src/assets/art/`; `slice_assets.py` to `scripts/`; content-seed to `content-seed/` in the root; any brand logos to `src/assets/brand/`. Keep `cai-assets/README.txt` and the preview image in `docs/assets-reference/`. When everything is moved and checked, tell me `_incoming` is empty and can be deleted.
4. Add a proper .gitignore (node_modules, dist, .astro, .vercel, OS files). Do not ignore assets-source.
5. Install Fontsource packages for Figtree and Newsreader.
6. Make `npm run dev` and `npm run build` work with a minimal placeholder home page that says "CAI — coming soon" and nothing else.
7. Initialise git if needed and make the first commit with the message: chore: scaffold astro project and project structure.

Show me a short plan first, then do it. At the end, give me: what changed, the exact commands to connect this folder to my GitHub repository and push, and how to check that `npm run build` works. Do not build any design yet. Do not touch the stack or add other dependencies.
```

**You do after:** push to GitHub with the commands it gives. In Vercel choose "Add New → Project", import `cai-website`, keep the detected Astro settings, click Deploy. Tag: `git tag phase-0` then `git push --tags`.

**You check**
- The Vercel link opens and shows the placeholder.
- The folder tree looks like `docs/tech.md` section 2. `_incoming` is gone or empty.
- `assets-source/` exists and nothing in `src/` mentions it.

---

### PHASE 1A — Content system and tokens
**Model:** Pro 3.1 · high **Attach:** nothing

```
We are starting Phase 1A of the CAI website. Read AGENTS.md, docs/PRD.md, docs/tech.md (sections 3, 4 and 6), docs/content.md (section 0 and the conventions), docs/design.md section 2 (design tokens), and the Phase 1A section of docs/phase.md. Phase 0 is finished.

Do Phase 1A only:
1. Create src/styles/tokens.css, base.css and utilities.css exactly from design.md section 2: colours, type scale, spacing, radii, shadows, breakpoints, motion, visible focus styles and reduced-motion rules. Load the self-hosted fonts (Figtree and Newsreader) with font-display swap and set up the fallbacks.
2. Copy the four JSON files from `content-seed/` into `src/content/`. Do not change their content.
3. Write src/content/config.ts with Zod schemas that match those JSON files exactly. Optional fields must be optional (href, link, url, photo). A broken or missing field must fail `npm run build` with a message naming the file and the field.
4. Write the helpers in src/lib: content.ts (typed loaders), counts.ts (people count, function count, number-to-words for 1 to 30 in the capitalised, lower-case and upper-case forms, and a function that fills templates such as {PeopleWord}, {people}, {functionsWord}, {FUNCTIONSWORD}, {PEOPLEWORD}, {currentYear} as listed in content.md section 0), images.ts (resolve a team photo or brand logo by file name using import.meta.glob with a placeholder fallback), and pages.ts (route registry helpers).
5. Create neutral placeholder files: a logo mark, an affiliation logo mark and a member portrait silhouette, in the same dark style.
6. Prove it works: write a small temporary test page or script that prints people 15, functions 8, "Fifteen", "eight", and the filled hero subline for the Team page. Then delete the test.

Show me a short plan first. Do not build any visible page sections or the header and footer yet. When done, tell me what you changed, what you checked, and anything you were unsure about. Suggested commit message: feat: design tokens, content schemas and helpers.
```

**You check**
- Ask the agent to show you `src/content/` and `src/lib/counts.ts`.
- Break a field on purpose: in `team.json` change `"role"` to `"rolee"` for one member, run `npm run build`; it should fail naming that file. Undo the change.
- `npm run build` passes again.

---

### PHASE 1B — Layout shell, header, footer, blank pages
**Model:** Flash 3.8 · high **Attach:** `home_webpage_desktop_version.png`, `home_webpage_mobile_version.png`

```
We are starting Phase 1B of the CAI website. Read AGENTS.md, docs/PRD.md section 6.1, docs/design.md sections 3.1 to 3.4 and 3.7 and section 7, docs/tech.md sections 3 to 5, and the Phase 1B section of docs/phase.md. Phase 1A is finished. The attached images show the header and footer.

Do Phase 1B only:
1. BaseLayout.astro with head, SEO and share tags, skip link, header, main, footer.
2. Header: logo slot (use the placeholder if no logo file exists), wordmark (respect brand.showWordmark), nav pill, "More" dropdown, and the "Get started" button. Generate all links from src/content/pages.json. Transparent over the hero, sticky with a blurred dark background after scrolling.
3. More dropdown (click and keyboard, Escape and outside click close it) and the mobile menu overlay (focus trap, Escape, scroll lock, "More" expands inline, "Get started" at the bottom).
4. Footer with the four columns and bottom row from the design, social icons hidden when their url is empty, the affiliation logo slot with placeholder, automatic copyright year, and the legal links. On mobile follow the order in the mobile image.
5. Create every blank page listed in pages.json that does not exist yet. Each blank page uses BaseLayout, has an empty main area plus a visually hidden h1 taken from pages.json, is marked noindex, and is left out of the sitemap. Generate sitemap.xml (live pages only) and robots.txt.
6. Make temporary simple Home and Team pages (just a heading) so navigation works. They will be replaced in later phases.

Show me a short plan first. Use only tokens and JSON content. When done, tell me what you changed, how you checked it at 390, 768 and 1440 px, and what still differs from the images. Suggested commit message: feat: layout shell, navigation, footer and blank pages.
```

**You check (do these yourself)**
- Open the site at full width and in a narrow window. Compare header and footer to the design images.
- Click **every** link in the header, the More dropdown, the mobile menu, and the footer. Each must open a page (blank pages show only header and footer).
- Press Tab repeatedly: you can see where the focus is and reach everything. Press Escape with a menu open: it closes.
- Tag: `git tag phase-1`.

---

### PHASE 2A — Home hero, artwork layers, stepper
**Model:** Pro 3.1 · high **Attach:** `home_webpage_desktop_version.png`, `home_webpage_mobile_version.png`

```
We are starting Phase 2A of the CAI website. Read AGENTS.md, docs/PRD.md section 6.2, docs/design.md sections 2, 3.5, 3.6 and 4.1 and section 6, docs/assets.md (all of it, especially sections 4 and 5), docs/content.md section 2.1 and 2.2, and the Phase 2A section of docs/phase.md. Phase 1 is finished. The attached images are the visual truth.

Do Phase 2A only:
1. Build the ArtLayer component: it places one piece of artwork from src/assets/art with position, size, opacity, blend mode, optional mask or fade, optional slow drift, separate settings per breakpoint, empty alt text and aria-hidden. Drift must stop for reduced motion and when the tab is hidden.
2. Build the Home hero from home.json: eyebrow, the headline DISCOVER / WITH AI (AI in the purple accent), subline, the "See it in action" button that smooth-scrolls to #what-we-do, the corner texts with thin vertical bars, and the Scroll indicator. Compose the hero artwork from several pieces as described in assets.md section 4 (desktop and mobile). No rectangle edges may be visible and no piece may be stretched beyond the limits in assets.md section 5.
3. Build the Stepper component (sticky rail in its own column on desktop, compact version below 1024 px) and stepper.ts: highlights the section nearest the middle of the screen, scrolls on click, updates the hash, respects reduced motion. Make it reusable for the Team page. Add reveal.ts for fade-and-rise on scroll.
4. Add empty placeholder sections with the ids who-we-are, what-we-do, our-projects and ways-to-engage below the hero (just the headings from home.json for now) so the stepper can be tested.

Show me a short plan first. Compare with the images at 390, 768 and 1440 px and tell me honestly what still differs, especially how soft the artwork looks. Suggested commit message: feat(home): hero, artwork layers and stepper.
```

**You check**
- Hero looks like the design on a wide screen and on a phone-width window. No visible boxes or hard edges on the art.
- Scroll down: the stepper highlights the right step; clicking a step scrolls there; the stepper never covers text.
- Turn on "reduce motion" in your computer settings: the movement stops.

---

### PHASE 2B — Who we are, What we do
**Model:** Flash 3.8 · high **Attach:** `home_webpage_desktop_version.png`, `home_webpage_mobile_version.png`

```
We are starting Phase 2B of the CAI website. Read AGENTS.md, docs/design.md sections 3.5, 3.8, 4.2 and 4.3, docs/assets.md sections 4 and 5, docs/content.md sections 2.3 and 2.4, and the Phase 2B section of docs/phase.md. Phase 2A is finished.

Do Phase 2B only: build Section 01 (Who we are) and Section 02 (What we do) from home.json, replacing the placeholder headings for those two sections. Use the existing Stepper, ArtLayer, SectionHeading, Eyebrow, TextLink and Icon components and create small new ones only if needed. Place each section's artwork as described in assets.md. What we do: four columns with thin dividers on desktop; stacked cards with an arrow at the bottom on mobile (the arrow links to the card's href; no arrow on desktop). All text must come from the JSON and match content.md exactly.

Show me a short plan first. Compare with the images at 390, 768 and 1440 px and tell me what still differs. Suggested commit message: feat(home): who we are and what we do sections.
```

**You check:** text matches `content.md` word for word; art never covers text; the desktop stepper does not overlap the four columns.

---

### PHASE 2C — Projects timeline, Ways to engage
**Model:** Flash 3.8 · high **Attach:** `home_webpage_desktop_version.png`, `home_webpage_mobile_version.png`

```
We are starting Phase 2C of the CAI website. Read AGENTS.md, docs/design.md sections 3.5, 3.8, 4.4 and 4.5, docs/assets.md sections 4 and 5, docs/content.md sections 2.5 and 2.6, and the Phase 2C section of docs/phase.md. Phase 2B is finished.

Do Phase 2C only:
1. Section 03 (Our projects): heading, intro, link, the large cube artwork with its wave, and the timeline. Because projects.items in home.json is empty, show the "Launching soon" state (badge, title, text) on the timeline rail. When items exist, render them with status label, name, summary and, for active ones, "Dept: ... N members". Do NOT use the design's sample projects.
2. Section 04 (Ways to engage): heading, intro and four cards, each with icon tile, title, text and a magenta link with arrow pinned to the bottom; links go to /join, /events, /idea-box and /collaborate. Add the bottom-corner artwork.
3. Test the projects switch: temporarily add one sample item to home.json, confirm the section changes, then remove it.

Show me a short plan first. All text from JSON, matching content.md. Compare with the images at 390, 768 and 1440 px. Suggested commit message: feat(home): projects timeline and ways to engage.
```

**You check:** you see "Launching soon" now. Click all four cards' links; each opens a page.

---

### PHASE 2D — Home mobile and tablet pass
**Model:** Flash 3.8 · high **Attach:** `home_webpage_mobile_version.png`

```
We are starting Phase 2D of the CAI website. Read AGENTS.md, docs/design.md sections 2.4 and 4, docs/assets.md section 4 (mobile table), and the Phase 2D section of docs/phase.md. Phases 2A to 2C are finished.

Compare the whole Home page, section by section, against the attached mobile design at 390 px, then fix spacing, order, type scale, stepper behaviour and artwork crops. Then make the tablet range (768 to 1023 px) use the mobile structure with two-column card grids and larger type. Check widths 320, 390, 768, 1024 and 1440: there must be no horizontal scrolling at any of them.

Fix only Home layout issues. Tell me what you changed and what still differs. Suggested commit message: fix(home): mobile and tablet layout.
```

**You check:** open the site on your real phone (same Wi-Fi, or the Vercel preview). Scroll the whole page. Tag: `git tag phase-2`.

---

### PHASE 3A — Team hero and arc
**Model:** Flash 3.8 · high **Attach:** `teams_webpage_desktop_version.png`, `teams_webpage_mobile_version.png`

```
We are starting Phase 3A of the CAI website. Read AGENTS.md, docs/PRD.md section 6.3, docs/design.md sections 3.6, 5.1 and 6, docs/assets.md section 4 (Team), docs/content.md sections 3.1 and 3.2, and the Phase 3A section of docs/phase.md. Phase 2 is finished.

Do Phase 3A only: replace the temporary Team page with the real hero from team.json: corner text with a bar, the OUR PEOPLE pill, the three-line serif heading with the italic magenta accent line, the subline built from the data with the counts-and-words helper (it must read "Fifteen people, eight functions, one centre — meet the operating body running CAI this year."), and the "Scroll to meet the team" button that scrolls to #the-team. Build the ArcGraphic as inline SVG (two crossing arcs with glowing nodes and the words PEOPLE / DRIVE / POSSIBILITIES), using the orb pieces from the artwork only for glows. Add the Stepper with exactly three steps: 01 OUR STRUCTURE, 02 THE TEAM, 03 THE COLLECTIVE. Add empty section placeholders with those ids.

Show me a short plan first. Compare with the images at 390, 768 and 1440 px. Suggested commit message: feat(team): hero, arc graphic and stepper.
```

**You check:** the subline numbers come from data; the stepper shows three steps, each once.

---

### PHASE 3B — Functions, members, carousel
**Model:** Pro 3.1 · high **Attach:** `teams_webpage_desktop_version.png`, `teams_webpage_mobile_version.png`

```
We are starting Phase 3B of the CAI website. Read AGENTS.md, docs/PRD.md section 6.3, docs/design.md sections 3.8, 3.9, 3.10, 5.2 and 5.3, docs/content.md sections 3.3 and 3.4, and the Phase 3B section of docs/phase.md. Phase 3A is finished.

Do Phase 3B only:
1. Section 01 (Our structure): eyebrow from the function count, heading, intro, and the eight function cards (4 by 2 on desktop, 2 by 4 on mobile) from team.json. Cards are static unless they have an href.
2. Section 02 (The team): eyebrow with the current year, heading, intro from the data, and the five groups from team.json with the computed count beside each group title.
3. MemberCard with ONE fixed size and a 4:5 photo ratio, used for every member in every group at every breakpoint. Black-and-white photo from src/assets/team (resolved by file name with the placeholder portrait as fallback), dark gradient at the bottom, name, role in magenta, function in grey, and an arrow only if the member has a link. Optional focus point for the crop.
4. Desktop: groups as left-aligned wrapped grids. Mobile: swipe carousel using native scroll-snap with previous/next buttons and dots (carousel.ts), buttons disabled at the ends.

Prove the data rules: (a) the five group counts are 5, 3, 2, 2, 3; (b) temporarily add a 16th member in team.json and check that the group count and every "people" number and word update with no code change, then remove it; (c) temporarily set one member's photo to a file that does not exist and check the placeholder appears without errors, then undo.

Show me a short plan first. Compare with the images at 390, 768 and 1440 px. Suggested commit message: feat(team): function grid, member cards and carousel.
```

**You check:** every card is exactly the same size; swipe/arrow buttons work on a phone-width window; all 15 cards say "Full Name".

---

### PHASE 3C — Collective, page bottom, Team mobile pass
**Model:** Flash 3.8 · medium **Attach:** `teams_webpage_desktop_version.png`, `teams_webpage_mobile_version.png`

```
We are starting Phase 3C of the CAI website. Read AGENTS.md, docs/design.md sections 5.4 and 5.5, docs/content.md sections 3.5 and 3.6, docs/assets.md section 4 (Team) and the Phase 3C section of docs/phase.md. Phase 3B is finished.

Do Phase 3C only: build Section 03 (The collective): eyebrow, heading "Many roles." with "One centre." in italic magenta serif, body text with the people count from the data, the three wide-spaced side words on desktop (FIFTEEN PEOPLE / EIGHT FUNCTIONS / ONE CENTRE, computed), and the four stat cards on mobile (15 People, 8 Functions, 1 Centre, and the "A shared purpose" card). Add the soft wave band at the bottom of the page above the footer. There is no Past Teams section anywhere. Then compare the whole Team page with the mobile image at 390 px and fix any differences; check 320, 390, 768, 1024 and 1440 px for horizontal scrolling.

Show me a short plan first. Suggested commit message: feat(team): collective section and mobile pass.
```

**You check:** every number on the page equals the data; no Past Teams anywhere. Tag: `git tag phase-3`.

---

### PHASE 4A — Design comparison (review only)
**Model:** Pro 3.1 · high **Attach:** all four design images

```
This is Phase 4A of the CAI website. Read AGENTS.md, docs/design.md and docs/content.md. Do NOT edit any code or content in this task.

Run the site, and compare every section of Home and Team with the attached design images at 390, 768 and 1440 px. Write docs/review-design.md with a table: page, section, viewport, difference, severity (must / should / nice), and the file to change. Include text differences from content.md, spacing and type-scale differences, artwork problems (visible edges, softness, wrong crop), stepper behaviour, and anything that looks wrong. Be honest and specific; do not praise. End with the 10 most important fixes in order.
```

**You check:** read the review; add anything you notice yourself at the bottom ("My notes").

---

### PHASE 4B — Apply fixes
**Model:** Flash 3.8 · high **Attach:** nothing

```
This is Phase 4B of the CAI website. Read AGENTS.md and docs/review-design.md. Fix every item marked "must" and "should", plus my notes at the bottom of the review. Work in order of importance. Keep to the rules in AGENTS.md. For each fix, say which file changed. At the end list anything you skipped and why, and tick the items in the review file that are done. Suggested commit message: fix: design review issues.
```

---

### PHASE 4C — Accessibility and performance
**Model:** Pro 3.1 · high **Attach:** nothing

```
This is Phase 4C of the CAI website. Read AGENTS.md, docs/PRD.md section 7 and docs/tech.md section 8. Audit and fix:
1. Accessibility: keyboard-only walkthrough of both pages (header, dropdown, mobile menu, stepper, carousels), heading order, landmarks, skip link, focus visibility, alt text, colour contrast of muted text, reduced-motion behaviour.
2. Performance: image sizes and formats, lazy-loading, layout shift, JavaScript size, font loading, delivered size of the hero artwork on desktop and mobile.
3. Run Lighthouse (mobile) for the Home and Team pages and record the scores in docs/review-quality.md, with the problems found and what you fixed.
Fix what you can without changing the design; list anything that needs my decision. Targets: Performance 85+, Accessibility 95+, Best Practices 95+, SEO 95+. Suggested commit message: fix: accessibility and performance.
```

**You check:** open `docs/review-quality.md`; scores meet the targets or it explains why not. Tag: `git tag phase-4`.

---

### PHASE 5 — Real content and assets
**Model:** Flash 3.7 · low **Attach:** your logo files and photos (or put them in the folders first, section 2.3)

Do this when you have the real material. You can run it in several small rounds.

**5.1 Logos**
```
Phase 5, logos. I have put cai-logo.[svg or png] and affiliation-logo.[svg or png] in src/assets/brand/. Replace the placeholders with them in the header, the footer and the affiliation block. My logo [already contains / does not contain] the words "Centre for Artificial Intelligence", so set brand.showWordmark to [false / true]. Check them at header and footer sizes on the dark background at 390 and 1440 px and tell me if either looks too small, too large or low contrast. Change nothing else.
```

**5.2 Contact, socials, affiliation**
```
Phase 5, contact details. Update src/content/site.json with these values and nothing else:
Email: [...]
Phone: [...]
Address lines: [...] / [...]
Affiliation name: [...]  Line 1: [...]  Line 2: [...]
LinkedIn: [url or leave empty]  Instagram: [url or leave empty]  X: [url or leave empty]  YouTube: [url or leave empty]
Footer "More" link should go to: [/contact or another route].
```

**5.3 Team members**
```
Phase 5, team. I have put the photos in src/assets/team/. Update src/content/team.json: for each person below set name, role, function, photo (file name) and link (leave empty if none). Keep the same order and function ids. If a photo file is missing, tell me instead of guessing.
1. [Full Name] | [role] | [function id, e.g. leadership] | [photo-file.jpg] | [profile link or empty]
2. ...
(15 lines)
```
Function ids: `leadership`, `advisory`, `tech-social-media`, `ai-implementation`, `ai-board`, `events-outreach`, `finance-operations`.

**5.4 Text decisions**
```
Phase 5, text. In src/content/home.json change the Technical Projects card text to: "[exact sentence]". Then run the build and confirm docs/content.md section 2.4 matches (update the doc if needed).
```
(The two versions in the design were "…the centre's strongest evidence of what members can actually do." and "…the centre's hands-on side, where guidance turns ideas into…". Pick one or write your own.)

**You check:** search the site for "Full Name", "ABC College", "cai@college.edu" — none should remain unless you chose to keep them. Tag: `git tag phase-5`.

---

### PHASE 6 — Launch
**Model:** Flash 3.8 · medium **Attach:** nothing

```
This is Phase 6 of the CAI website. Read AGENTS.md, docs/PRD.md section 8 and docs/tech.md section 11. Check each success criterion in PRD section 8 against the project and report pass or fail with evidence. Make sure the build passes, the sitemap lists only live pages (/ and /team), blank pages are noindex, and every internal link works. Finalise README.md so a new student can run the site, edit content, add a member, replace a logo and turn a blank page into a real page. Update the changelog in docs/tech.md and refresh the open items in docs/future_scope.md. Suggested commit message: chore: launch.
```

**You do:** In Vercel, add your domain if you have one (Project → Settings → Domains). Run Lighthouse on the live URL; open it on a real phone and a laptop; Tab through it; test with reduced motion on. Tag: `git tag v1.0` and `git push --tags`.

---

## 6. Add-on tasks you may want later

**Try upscaling the hero** (Pro 3.1 · low)
```
Read docs/assets.md section 6. Take assets-source/masters/02_hero_background.png and 01a_background_top.png, run an AI upscaler or the best available method, and show me before and after crops at 100%. Only replace the files in src/assets/art if the result is clearly better. Report the new file sizes.
```

**Add a real project** (Flash 3.6 · low): "In src/content/home.json add one project: status [active], name [...], summary [...], department [...], members [N]. Change nothing else."

**Make a blank page real** — use the template at the end of `docs/future_scope.md`.

---

## 7. Fix-it prompts (copy when something is wrong)

**It does not match the design**
```
Compare [section name] on [Home/Team] with the attached [image name] at [390 / 768 / 1440] px. List the differences, then fix them. Only change [section]. Do not change text or tokens unless a difference is in them.
```

**Text is hard-coded or wrong**
```
Find any text in components that is not coming from src/content/*.json and move it to the correct JSON file (update the schema and docs/content.md too). Then check that every text on [page] matches docs/content.md exactly.
```

**Build fails**
```
npm run build fails with this message: [paste]. Find the cause, fix it, and explain in plain language what went wrong. Do not change unrelated files.
```

**Artwork problem**
```
The artwork in [section] shows [visible rectangle edges / looks stretched / looks too soft / hides text]. Read docs/assets.md sections 5 and 6 and fix it using layering, masks and smaller display sizes. Do not generate new artwork.
```

**The agent went beyond the phase**
```
You changed files outside the current phase ([phase]). List every file you touched beyond it and revert those changes, then continue with only the current phase.
```

**Something broke and I want to go back**
```
Show me the last 5 commits. Then revert the last commit safely (use git revert, not reset), explain what that undid, and confirm the build passes.
```

**Agent keeps getting the same thing wrong:** switch to the next model up (section 4) and start a **new** conversation with: "Read AGENTS.md and docs/phase.md. The task is [task]. A previous attempt got [problem] wrong because [reason]. Fix only that."

---

## 8. Troubleshooting

| Problem | What to do |
|---|---|
| `npm` or `node` not found | Reinstall Node LTS and reopen the terminal |
| Vercel build fails | Open the build log, copy the error, use the "Build fails" prompt |
| Fonts look different from the design | Tell the agent; only the two font tokens in `tokens.css` should change |
| A photo does not show | The file name in `team.json` must match the file in `src/assets/team/` exactly, including `.jpg` |
| The site looks fine on desktop but wrong on phone | Use the mobile fix-it prompt with the mobile image attached |
| Agent says it cannot see an image | Re-attach it with `@` or drag it in; it must be attached to the message |
| Quota reached | Continue with the next lower model (3.8 → 3.7) at the same level |
| Antigravity ignores the rules | Ask: "Confirm that AGENTS.md is active as a workspace rule and summarise it in five lines" |

---

## 9. Checklist before you tell anyone the site is live

- [ ] Every link in header, dropdown, mobile menu, footer and page content opens a page
- [ ] Home and Team match the designs on desktop and phone
- [ ] No "Full Name", "ABC College" or placeholder email/phone left (unless you chose to keep them)
- [ ] Your logos show correctly in header, footer and affiliation block
- [ ] Lighthouse scores meet the targets on the live URL
- [ ] You tested on a real phone and with the keyboard only
- [ ] The repository has the tags `phase-0` to `phase-5` and `v1.0`
- [ ] You know where to edit text (`src/content/`) and how to add a member (`README.md`)
