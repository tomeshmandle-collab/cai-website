# CAI Website — Design Specification

The four approved design images are the **visual truth**. This file turns them into rules and values the agent can build from. Where this file and a design image disagree, follow the image and note the decision in `tech.md`'s changelog.

Design images (kept in `design/reference/`):

| File | Shows |
|---|---|
| `home_webpage_desktop_version.png` | Home, desktop |
| `home_webpage_mobile_version.png` | Home, mobile (four screens side by side) |
| `teams_webpage_desktop_version.png` | Team, desktop |
| `teams_webpage_mobile_version.png` | Team, mobile (three screens side by side) |

> The images are small (about 760–810 px wide), so exact spacing cannot be measured from them. Values below are close estimates for a 1440 px desktop and a 390 px phone. **Match the images visually first; then tune the tokens.** All tunable values live in `src/styles/tokens.css`.

---

## 1. Character of the design

Dark, calm, premium. Near-black page, soft purple and magenta light, glowing glass cubes and particle waves as the single visual motif. Big airy headings, small quiet body text, thin lines, generous space. A serif italic accent word is the signature touch ("Artificial Intelligence", "One centre.").

**Deliberate choice:** the glowing, particle-heavy look is intentional and approved, even though the earlier blueprint warned against "glowing blobs". Do not "tone it down" or replace it.

## 2. Design tokens

All values go in `src/styles/tokens.css` as CSS custom properties. Components never use raw colours, sizes, or fonts.

### 2.1 Colour

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#05060a` | Page background (near-black with a faint blue tint) |
| `--color-bg-deep` | `#000000` | Footer and deepest areas |
| `--color-surface` | `rgba(255,255,255,0.035)` | Card fill |
| `--color-surface-hover` | `rgba(255,255,255,0.06)` | Card hover |
| `--color-border` | `rgba(255,255,255,0.10)` | Card and pill borders |
| `--color-border-strong` | `rgba(255,255,255,0.22)` | Hover borders, outline buttons |
| `--color-text` | `#ffffff` | Headings, nav |
| `--color-text-muted` | `rgba(255,255,255,0.68)` | Body copy |
| `--color-text-faint` | `rgba(255,255,255,0.48)` | Captions, inactive stepper items |
| `--color-purple` | `#a52df5` | Hero "AI", active glows, stepper node ring |
| `--color-purple-soft` | `#a65be0` | "COMMUNITY FIRST" eyebrow, link underline in section 01 |
| `--color-magenta` | `#e040d8` | Italic serif accent words, eyebrows, card links, member roles |
| `--color-magenta-soft` | `#c957c4` | Small section eyebrows on Home ("What we do" etc.) |
| `--color-button-bg` | `#ffffff` | Primary pill button |
| `--color-button-text` | `#14122b` | Text on the white pill button (deep indigo) |
| `--color-icon-tile` | `rgba(120,70,220,0.22)` | Rounded square behind Home card icons |

### 2.2 Typography

Two families, self-hosted (Fontsource), with fallbacks.

| Role | Family | Fallback | Notes |
|---|---|---|---|
| Sans (UI, headings, body) | **Figtree** | `system-ui, sans-serif` | Closest open-source match to the design's geometric sans. Weights 300, 400, 500, 600 |
| Serif (accent) | **Newsreader** (display optical size, regular + italic) | `Georgia, serif` | Closest match to the design's classic serif. Used for italic accent words and for the whole Team page headings and the "Centre for" line |

> If, after Phase 1, a family does not look close to the design, change only the two family tokens. Do not scatter font names in components.

| Token | Desktop (≥1024) | Mobile | Style |
|---|---|---|---|
| `--text-hero` | clamp(48px, 6vw, 88px) | 44–52px | Sans, weight 300, uppercase, line-height 1.02 ("DISCOVER WITH AI") |
| `--text-h2` | clamp(32px, 3.4vw, 48px) | 30–34px | Sans, weight 400 (Home section titles) |
| `--text-h2-serif` | clamp(34px, 3.6vw, 52px) | 32–36px | Serif, weight 400 (Team titles, "Centre for", "Many roles.") |
| `--text-accent` | same size as its heading | | Serif **italic**, `--color-magenta` |
| `--text-lead` | 17–18px | 16px | Sans 400, muted (hero subline) |
| `--text-body` | 15–16px | 14–15px | Sans 400, muted, line-height 1.6 |
| `--text-small` | 13–14px | 13px | Card text |
| `--text-eyebrow` | 12–13px | 12px | Uppercase, letter-spacing 0.14em (Team uses wider 0.18em), or sentence case on Home small eyebrows ("What we do") |
| `--text-corner` | 11–12px | 11px | Uppercase, letter-spacing 0.2em, weight 400 (hero corner texts) |
| `--text-stepper` | 13px | 13px | Uppercase, letter-spacing 0.06em; numbers 15–16px |

### 2.3 Spacing, shape, depth

| Token | Value |
|---|---|
| `--space-1…8` | 4, 8, 12, 16, 24, 32, 48, 72, 112 px scale |
| `--container` | max-width 1240px (content), side padding 24px mobile / 40px tablet / 64px desktop |
| `--radius-pill` | 999px (nav, buttons, pills) |
| `--radius-card` | 16px |
| `--radius-icon-tile` | 12px |
| `--shadow-button` | `0 8px 30px rgba(255,255,255,0.12)` (soft white glow under the white button) |
| `--glow-purple` | `0 0 24px rgba(165,45,245,0.55)` (stepper active node, hovers) |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)`; durations 180ms (hover), 600–800ms (reveal) |

### 2.4 Breakpoints

| Name | Range | Layout summary |
|---|---|---|
| Mobile | < 768 px | One column, hamburger menu, carousels, compact stepper |
| Tablet | 768–1023 px | Mobile structure with two-column card grids and larger type |
| Desktop | ≥ 1024 px | Full layout, sticky side stepper, nav pill |

## 3. Shared components

### 3.1 Header
- Left: logo slot (about 44 px high) + two-line wordmark "Centre for / Artificial Intelligence" (white, 15–16 px, weight 500). Wordmark can be turned off in `site.json`.
- Centre (desktop): dark rounded **nav pill** (`--color-surface`, 1px border, blur). Items: Home, About us, Team, Projects, Events, More ⌄. 14 px, white. Active item is brighter with a subtle underline or glow.
- Right (desktop): white pill button "Get started →".
- Position: absolute over the hero on Home and Team (transparent), becomes sticky with a dark blurred background after scrolling past the hero. On blank pages it is the same sticky header.
- Mobile: logo + wordmark left, hamburger right. No pill, no button in the bar.

### 3.2 More dropdown (desktop)
Opens under the "More" item: a dark panel with the same border/blur as the nav pill, rounded 16 px, five links stacked (Achievements, AI Updates, Idea Box, Collaborate, Contact). Item hover: lighter background. Opens on click and Enter/Space; closes on Escape, outside click, or focus leaving. Chevron rotates when open.

### 3.3 Mobile menu
Full-screen overlay, `--color-bg` at ~96% with blur. Large stacked links (24–28 px) with generous spacing; "More" expands inline to show its five links indented; "Get started →" white pill at the bottom; close (X) button in the same place as the hamburger. Focus is trapped inside; Escape closes; page scroll is locked while open; opens with a short fade and slide.

### 3.4 Buttons and links
- **Primary pill:** white fill, indigo text, arrow icon (→) after the label, `--shadow-button`. Height 44–48 px, padding 0 22px. Hover: lifts 2 px, glow grows. Active: scale 0.98. Focus: 2px white ring with 3px offset.
- **Outline pill (not currently used on built pages, defined for later):** transparent fill, `--color-border-strong`.
- **Text link with arrow:** label + arrow, 1px underline. Colour by context: white (Explore projects), purple-soft (Explore Projects in section 01), magenta (card links). Hover: underline thickens, arrow moves 3 px right.

### 3.5 Section eyebrow
Small label with a short thin line after it (about 60 px), above each heading. Colours: "COMMUNITY FIRST" uses `--color-purple-soft`; other Home eyebrows use `--color-magenta-soft`; Team eyebrows are uppercase magenta with wider spacing.

### 3.6 Side stepper
A vertical rail with numbered circular nodes and labels.
- **Desktop (≥1024):** lives in its own sticky left column (about 200 px wide) so it **never overlaps cards** (the design overlaps them; this is fixed). Sticks while its page area is in view. Appears after the hero on Home; starts at the first section on Team.
- Active step: white-filled node with the number in dark purple, soft purple glow, label in white with a thin glowing underline beneath it. Inactive: dark node with a thin ring, number and label in `--color-text-faint`.
- The rail line between nodes is 1–2 px, light grey; a purple/white fill grows to the active node.
- Behaviour: highlights the section nearest the viewport centre (IntersectionObserver); clicking a step smooth-scrolls to its section (instant if reduced motion). Updates the URL hash without jumping.
- **Below 1024:** the compact in-section version from the mobile design: the stepper sits at the top of each section showing the list with the current step emphasised, not sticky.
- Counting: Home has 4 steps, Team has 2 steps. Each label appears once.

### 3.7 Footer
Black (`--color-bg-deep`), four columns separated by thin vertical lines on desktop: (1) logo, wordmark, tagline, social icons; (2) Navigate; (3) Get in Touch with email, phone, address icons; (4) Our Affiliation with the affiliation logo and three text lines. A thin horizontal line, then the copyright on the left and the three legal links on the right. Mobile: single column in the order shown in the mobile design (logo + tagline + socials, Navigate, Get in Touch, Our Affiliation, copyright, legal links). Navigate links show an arrow on mobile.
- Social icons are circular outline buttons, shown only if their URL is set.
- Footer logo slot and the affiliation logo slot are separate images (see `assets.md`).

### 3.8 Cards
- **Standard card (Ways to engage, Team function cards):** `--color-surface` fill, 1px `--color-border`, radius 16 px, padding 22–28 px. Hover (only if it has a link): border → `--color-border-strong`, surface → `--color-surface-hover`, lift 2 px.
- **Home icon tile:** 44–48 px rounded square in `--color-icon-tile` holding a white 22–24 px icon.
- **Team function card icon:** larger outline icon (28–32 px), white stroke, no tile.
- **What we do items (Home desktop):** four columns separated by thin vertical dividers, no card boxes; on mobile they become stacked cards with an arrow.

### 3.9 Member card (Team) — one fixed size
- Fixed width and a **4:5 portrait ratio** for every card in every group (suggested 200 px × 250 px on desktop; two cards visible side by side on a 390 px phone).
- Photo fills the card, cropped to the ratio, **black-and-white**, with a dark gradient rising from the bottom for legibility. Optional per-person focus point (`focus` in JSON).
- Text over the gradient, bottom-left: **Full Name** (white, 14–15 px, weight 500), **role** (magenta, 12–13 px), **function** (grey, 11–12 px).
- Arrow in the bottom-right only if the member has a `link`. Hover: photo zooms 1.03, arrow nudges right.
- Missing photo: neutral dark placeholder portrait with a soft silhouette, same size.
- Group header: title on the left, count on the right (desktop); title with prev/next buttons and a count (mobile).

### 3.10 Carousel (Team, mobile)
Native horizontal scroll with snap, no heavy library. Prev/next circular outline buttons scroll one card; dots below reflect the position; buttons disable at the ends. Swipe works naturally. On desktop the same groups render as static wrapped grids.

## 4. Home page layout

### 4.1 Hero (100 vh, min 640 px)
- Header on top. Centred block: eyebrow "CENTRE FOR AI —", the headline, the subline, the "See it in action →" button.
- Headline: "DISCOVER" over "WITH AI"; line 2 is white-to-light-grey with **AI** in `--color-purple`.
- Corner texts: top-left (2 lines) with a thin vertical bar; bottom-left (4 lines) with a bar; right side (3 lines) with a bar; "Scroll" with a small vertical line and end dots at the bottom-right. On mobile only top-left and bottom-left appear, plus "Scroll".
- Artwork: layered wave and cubes (see `assets.md`). The wave crosses the whole width low in the hero and rises on the right where the cubes cluster. Mobile hero: text on top, artwork occupies the lower half.

### 4.2 Section 01 — Who we are
Two columns on desktop: stepper column, then text column (eyebrow, heading, paragraph about 62 characters wide, link) with artwork on the right (cube on a dark ridge with a cool beam of light from the top right). Mobile: heading and paragraph stacked, artwork below.

### 4.3 Section 02 — What we do
Eyebrow and two-line heading on the left; short intro text at the far right, top-aligned. Below, four equal columns with thin vertical dividers: icon tile, title, text. Particle wave and a column of small cubes at the far right edge. Mobile: heading, intro, then four stacked cards each with an arrow at the bottom.

### 4.4 Section 03 — Our projects
Left: eyebrow, heading, large cube artwork with particle wave behind it. Right: intro text, "Explore projects →" link, then the **timeline**: a vertical line with dots, each entry showing status label (magenta), title (white), summary (muted), and meta line. With no projects: one dot on the rail with the "Launching soon" badge, title and text.
Mobile: heading, intro, link, cube artwork, then the timeline.

### 4.5 Section 04 — Ways to engage
Eyebrow and heading on the left, intro on the right, four cards in one row (desktop) or stacked (mobile). Each card: icon tile, title, text, magenta link with arrow pinned to the card bottom. Particle waves glow in the bottom corners.

## 5. Team page layout

### 5.1 Hero
Left: top-left corner text with a bar; pill "● OUR PEOPLE ●" (thin magenta-tinted outline); three-line serif heading ("The team behind / Centre for / *Artificial Intelligence*"); subline; "Scroll to meet the team →" white button. Right: large thin **arc** graphic (two crossing curves like an eye shape) with glowing dots at crossings and the words PEOPLE / DRIVE / POSSIBILITIES in wide-spaced caps. Faint soft glows at the far left and right. Mobile: heading and subline on top, arc and words below.
The arc is drawn as inline SVG, not an image.

### 5.2 Section 01 — Our structure
Stepper column + content. Eyebrow (magenta caps), serif heading, intro on the right. Eight function cards in a 4×2 grid (desktop) or 2×4 (mobile), each with outline icon, title, description. On mobile each card has a small arrow only if it has a link.

### 5.3 Section 02 — The team
Eyebrow "CURRENT TEAM · 2026–27", serif heading, intro on the right. Then the five groups described in 3.9 / 3.10. Group spacing about 56 px.

### 5.4 Bottom of page
The Past Teams section is removed. The page ends with the team section, a soft particle-wave band, then the footer.

## 6. Interaction states (applies everywhere)

| State | Rule |
|---|---|
| Hover | 180 ms transition; links underline thickens; cards brighten border; buttons lift 2 px with larger glow |
| Focus-visible | 2 px white outline, 3 px offset, plus a faint purple glow; never removed |
| Active/pressed | scale 0.98 |
| Disabled | 40% opacity, no pointer events (carousel buttons at the ends) |
| Reveal on scroll | fade and rise 16 px over 700 ms, once; staggered 60–80 ms between siblings; off when the visitor prefers reduced motion |
| Ambient motion | very slow drift (20–40 s loops) on particle and glow layers; off for reduced motion; paused when the tab is hidden |

## 7. Empty and edge states
- **Projects:** "Launching soon" state on Home (see `content.md`).
- **Member photo missing:** placeholder portrait.
- **Social URL missing:** icon hidden.
- **Logo missing:** neutral placeholder mark in the slot.
- **Very long names/roles:** wrap to two lines, never overflow the card.
- **Blank pages:** header, hidden page title, empty main, footer.

## 8. Accessibility details
- One `h1` per page (hero heading; blank pages use a visually hidden one).
- Landmarks: header, nav, main, footer; skip link first in the tab order.
- Decorative art: `alt=""` and `aria-hidden`. Photos: alt text from the member's name and role.
- Contrast: body text on the near-black background must pass AA; muted text stays at or above the token values here.
- Carousel buttons have labels (Previous/Next); dots are not the only way to navigate.
- All motion respects `prefers-reduced-motion`.

## 9. Known issues in the designs that are fixed on purpose

| Issue in the image | Decision |
|---|---|
| Team stepper repeats "The team" and has two "03" | Three steps, each once |
| Stepper labels overlap cards on Home desktop | Stepper in its own column |
| Overlapping/clipped sentences in Technical Projects and Projects intro | Use the complete versions listed in `content.md` |
| Role text "Vice & Social Media Head" and "Event & Outreach Head" | "Tech & Social Media Vice Head", "Events & Outreach Head" |
| Member cards are different widths in different rows | One fixed card size |
| Past Teams section | Removed for now |
| Sample projects with placeholder names | Replaced by "Launching soon" |
| Two different logo marks in the images (they are placeholders) | Single logo slot filled by your upload |
| Footer copyright "2025" | Automatic current year |
