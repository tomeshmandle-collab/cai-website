# CAI Website — Build Phases

Work **one phase at a time**, in a **fresh agent conversation per phase**. Do not start a phase until the previous one passes its acceptance check and is committed and tagged. The exact prompts to paste are in `prompt.md` (same numbering). The agent ticks the boxes below as it finishes.

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done and checked

## Model plan at a glance

Models available: Gemini Flash 3.6, 3.7, 3.8 (low / medium / high) and Gemini Pro 3.1 (low / high).

| Phase | Task | Model and level | Why |
|---|---|---|---|
| 0 | Setup, scaffold, first deploy | Flash 3.8 · medium | Mostly mechanical steps |
| 1A | Content system: schemas, loaders, helpers, tokens | **Pro 3.1 · high** | Foundation; mistakes spread everywhere |
| 1B | Layout shell: header, menus, footer, blank pages | Flash 3.8 · high | Clear spec, some accessibility logic |
| 2A | Home hero, artwork layers, stepper | **Pro 3.1 · high** | Hardest visual and interaction work |
| 2B | Who we are, What we do | Flash 3.8 · high | Reuses components |
| 2C | Projects timeline, Ways to engage | Flash 3.8 · high | Reuses components |
| 2D | Home mobile and tablet pass | Flash 3.8 · high | Spec-driven adjustments |
| 3A | Team hero, arc graphic | Flash 3.8 · high | Self-contained graphic |
| 3B | Function grid, member cards, groups, carousel | **Pro 3.1 · high** | Fixed-size cards, counts, carousel behaviour |
| 3C | Collective section, page bottom, Team mobile pass | Flash 3.8 · medium | Light work |
| 4A | Design comparison review (review only) | **Pro 3.1 · high** | Careful judgement |
| 4B | Apply fixes from the review | Flash 3.8 · high | Execution |
| 4C | Accessibility and performance audit | **Pro 3.1 · high** | Needs reasoning across the code |
| 5 | Real content, logos, photos | Flash 3.7 · low | Data and file swaps |
| 6 | Deploy, Lighthouse, handover | Flash 3.8 · medium | Checklist work |
| Any | Tiny text or JSON edits | Flash 3.6 or 3.7 · low | Cheapest is enough |

**Rules of thumb** (my judgement, not a benchmark): within Flash, a higher version number is assumed stronger; Pro 3.1 is assumed to reason more deeply than Flash. If a model gets the same thing wrong twice, move up one step (Flash high → Pro low → Pro high) instead of re-explaining a third time. If you hit a usage limit on 3.8, continue with 3.7 at the same level. Use Pro only where the table says so, to save quota.

---

## Phase 0 — Setup and first deploy

**Goal:** an empty Astro project with the right folders, all documents and assets in place, rules active, and a live (empty) site on Vercel.

**You do first (not the agent):** create the GitHub repository and the Vercel account/project link, as described in `prompt.md`.

Tasks
- [x] Scaffold the Astro + TypeScript project in the repository root.
- [x] Create the folder structure in `tech.md` section 2.
- [x] Place documents in `docs/`, design PNGs in `design/reference/`, the SVG and masters in `assets-source/`, WebP art in `src/assets/art/`, `slice_assets.py` in `scripts/`.
- [x] Put `AGENTS.md` and `README.md` in the root.
- [x] Add `.gitignore` (node_modules, dist, .astro, .vercel, OS files).
- [x] Install fonts (Figtree, Newsreader) through Fontsource.
- [x] Confirm `npm run dev` and `npm run build` work.
- [ ] Push to GitHub; confirm Vercel deploys the empty site.

Acceptance
- [ ] A public Vercel URL loads (even if nearly empty).
- [x] `assets-source/` is **not** referenced anywhere in `src/`.
- [x] Folder tree matches `tech.md`.

Commit: `chore: scaffold astro project and project structure` · Tag: `phase-0`

---

## Phase 1 — Foundation

### 1A — Content system and design tokens
Tasks
- [x] `src/styles/tokens.css`, `base.css`, `utilities.css` from `design.md` section 2 (colours, type, spacing, radii, shadows, breakpoints, motion, focus, reduced motion).
- [x] Copy `content-seed/*.json` into `src/content/`.
- [x] `src/content/config.ts` with Zod schemas that match the seed files exactly.
- [x] `src/lib/content.ts`, `counts.ts` (people count, function count, number-to-words for 1–30, template filling), `images.ts` (photo/brand resolver with placeholder fallback via `import.meta.glob`), `pages.ts`.
- [x] Neutral placeholder images/SVGs for: logo, affiliation logo, member portrait.

Acceptance
- [x] `npm run build` passes; deliberately breaking a JSON field makes the build fail with a clear message (then undo).
- [x] `counts.ts` returns people 15, functions 8, "Fifteen", "eight".
- [x] No component hard-codes colours or sizes.

Commit: `feat: design tokens, content schemas and helpers` 

### 1B — Layout shell and blank pages
Tasks
- [x] `BaseLayout.astro` (head, SEO tags, skip link, header, main, footer).
- [x] Header: logo slot, wordmark (respecting `showWordmark`), nav pill, More dropdown, "Get started" button; transparent on top, sticky blurred after scroll.
- [x] Mobile menu overlay with focus trap, Escape, scroll lock, inline More.
- [x] Footer with all four columns, socials hidden when empty, automatic year, legal links.
- [x] All 12 blank pages created from the registry, each with a hidden `<h1>`, `noindex`, and left out of the sitemap.
- [x] `sitemap.xml` and `robots.txt`.
- [x] Temporary simple Home and Team pages so navigation works.

Acceptance
- [x] Every link in the header, dropdown, mobile menu, and footer opens a page (no 404).
- [x] Keyboard: Tab reaches everything; Escape closes dropdown and menu; focus visible.
- [x] Layout matches the design images for header and footer at 390, 768, 1440 px.
- [x] Blank pages show header, footer, and nothing in between.

Commit: `feat: layout shell, navigation, footer and blank pages` · Tag: `phase-1`

---

## Phase 2 — Home page

### 2A — Hero, artwork layers, stepper
- [x] `ArtLayer` component (position, size, opacity, blend mode, mask, drift, breakpoint variants, `alt=""`).
- [x] Hero per `design.md` 4.1 and `assets.md` section 4 (desktop and mobile compositions).
- [x] Corner texts, eyebrow, headline with AI accent, subline, button scrolling to `#what-we-do`, scroll indicator.
- [x] `Stepper` component (desktop sticky rail in its own column; compact version below 1024) and `stepper.ts` (active step, click to scroll, hash update).
- [x] `reveal.ts`.

Acceptance
- [x] Hero looks like the design on desktop and mobile; no visible edges on any artwork piece.
- [x] Stepper highlights the right step while scrolling and never overlaps content.
- [x] Reduced-motion setting disables drift and reveal.

Commit: `feat(home): hero, artwork layers and stepper`

### 2B — Who we are, What we do
- [x] Section 01 and Section 02 per `design.md` 4.2–4.3 with content from `home.json`; section artwork per `assets.md`.
- [x] What we do: four columns with dividers on desktop, stacked cards with arrows on mobile.

Acceptance
- [x] Text matches `content.md` exactly; artwork does not cover text.

Commit: `feat(home): who we are and what we do sections`

### 2C — Projects, Ways to engage
- [x] Projects timeline with the "Launching soon" state, and rendering of real items when `items` is not empty (test with one sample item, then remove it).
- [x] Ways to engage: four cards with working links.

Acceptance
- [x] Section shows "Launching soon" now; adding a sample item in `home.json` switches it automatically; remove the sample afterwards.
- [x] All card links go to existing pages.

Commit: `feat(home): projects timeline and ways to engage`

### 2D — Home mobile and tablet pass
- [x] Compare each section with `home_webpage_mobile_version.png`; fix spacing, order, type scale, artwork crops.
- [x] Tablet (768–1023 px): mobile structure with two-column cards.

Acceptance
- [x] No horizontal scroll from 320 px upward; every section checked at 320, 390, 768, 1024, 1440 px.

Commit: `fix(home): mobile and tablet layout` · Tag: `phase-2`

---

## Phase 3 — Team page

### 3A — Hero and arc
- [x] Team hero per `design.md` 5.1 with computed subline, corner text, pill, button to `#the-team`.
- [x] `ArcGraphic` as inline SVG (two crossing arcs, glowing nodes, three words).
- [x] Stepper with three steps (reuse the component).

Acceptance
- [x] Subline reads "Fifteen people, eight functions, one centre — …" from the data.
- [x] Stepper shows 01 Our structure, 02 The team, 03 The collective, each once.

Commit: `feat(team): hero, arc graphic and stepper`

### 3B — Functions, members, carousel
- [x] Function grid (4×2 desktop, 2×4 mobile) from `team.json`.
- [x] `MemberCard` with **one fixed size**, 4:5 ratio, black-and-white photo, gradient, text, optional arrow, placeholder portrait.
- [x] `MemberGroup` with title and computed count; wrapped grid on desktop; swipe carousel with buttons and dots on mobile (`carousel.ts`).
- [x] Groups exactly as in `team.json` (counts 5, 3, 2, 2, 3).

Acceptance
- [x] All 15 cards are the same size in every group and every breakpoint.
- [x] Adding a 16th member in `team.json` updates the group count, "people" numbers and words with no code change (then remove it).
- [x] Adding a photo named in JSON shows it; removing the file shows the placeholder, no errors.

Commit: `feat(team): function grid, member cards and carousel`

### 3C — Page bottom, mobile pass
- [x] Scope decision: Section 03 (The collective) intentionally removed; Finance & Operations is retained as the final group inside Section 02 (The team); stepper has 2 steps (01 Our structure, 02 The team) with Section 02 active through all groups.
- [x] Compare with `teams_webpage_mobile_version.png` and fix: 2x4 function grid, card padding & typography, carousel swipe & snap, dots & arrows, zero horizontal scroll from 320 px up.

Acceptance
- [x] Counts shown everywhere equal the data (15 people / 8 functions).
- [x] Layout checked at 320, 390, 768, 1024, 1440 px.

Commit: `feat(team): mobile pass and finalize phase 3` · Tag: `phase-3`

---

## Phase 4 — Quality

### 4A — Design comparison (review only, no edits)
- [x] Agent compares the running site with all four design images section by section and writes `docs/review-design.md`: each difference, severity, and the file to change.

### 4B — Apply fixes
- [x] Fix every item marked "must" or "should" in the review; list what was skipped and why.

### 4C — Accessibility and performance
- [x] Keyboard-only walkthrough; heading order; landmarks; alt text; contrast; focus visibility; reduced motion.
- [x] Image sizes, lazy-loading, layout shift, JavaScript size, font loading; Lighthouse mobile run with scores recorded in `docs/review-quality.md`.

Acceptance
- [x] Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on the Home and Team pages.
- [x] No console errors on any page.

Commit: `fix: design review and quality pass` · Tag: `phase-4`

---

## Phase 5 — Real content and assets (do when you have them)

- [ ] Upload `cai-logo.*` and `affiliation-logo.*` to `src/assets/brand/`; set `showWordmark` correctly.
- [ ] Replace contact email, phone, address, affiliation text in `site.json`; add social URLs.
- [ ] Replace "Full Name" entries with real names; add photos to `src/assets/team/`; set `photo` for each; add `link` where a profile exists.
- [ ] Confirm the Technical Projects sentence and the footer "More" link target.
- [ ] Add a share image (1200 × 630) if available.

Acceptance
- [ ] No "Full Name", "ABC College", "cai@college.edu" placeholders remain unless intentionally kept.
- [ ] Logos look right on the dark background at header and footer sizes.

Commit: `content: real names, photos, logos and contact details` · Tag: `phase-5`

---

## Phase 6 — Launch

- [ ] Final production build on Vercel; custom domain connected if available.
- [ ] Lighthouse on the live URL; test on a real phone and a real laptop; keyboard and reduced-motion check.
- [ ] README finalised (how to edit content, add a member, swap a logo, replace a blank page).
- [ ] `tech.md` changelog updated; `future_scope.md` open items refreshed.

Acceptance
- [ ] All items in `PRD.md` section 8 are true.

Commit: `chore: launch` · Tag: `v1.0`
