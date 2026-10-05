# CAI Website — Product Requirements Document (PRD)

**Project:** Official website of CAI — Centre for Artificial Intelligence, Kirori Mal College, University of Delhi
**Release in scope:** Release 1a — Home page and Team page, fully functional and responsive
**Owner:** Head of the AI Implementation department (technical lead of this build)
**Companion files:** `design.md`, `content.md`, `tech.md`, `assets.md`, `phase.md`, `future_scope.md`, `AGENTS.md`

---

## 1. Purpose

Give CAI a professional, long-lived public identity: who the centre is, what it does, who runs it, and how to get involved. The site is also an institutional record that future teams will inherit and extend.

## 2. Audiences and what each should take away

| Audience | Should understand within about 30 seconds |
|---|---|
| Students (primary) | What CAI is, that it is open to them, and how to join or attend |
| Faculty | The centre is organised, serious and student-led with clear functions |
| Companies and organisations | CAI exists, is structured, and has a route to collaborate |
| General visitors | What AI-at-CAI means and where to go next |

## 3. Goals

1. Ship two polished, fully working pages (Home, Team) that match the approved designs on desktop and mobile.
2. Keep **all content in editable JSON** so a non-programmer can update text, team members, and counts without touching code.
3. Make every future page a drop-in: every linked-but-unbuilt page already exists as a blank page that can be replaced later.
4. Use the supplied visual asset sheet as the only source of imagery; invent no extra artwork.
5. Be fast, accessible, and maintainable for years by successive teams.

## 4. Non-goals (explicitly out of scope for this release)

- Designing or building About, Projects, Events, Achievements, AI Updates, Idea Box, Collaborate, Contact, Join, or legal pages (they exist as blank pages only).
- AI Updates automation, external APIs, feeds, or scraping.
- Backend, database, login, admin dashboard, or any server code.
- Working forms (Idea Box, Collaborate, Contact, Join).
- Past Teams / team archive (removed for now).
- Real project listings (Home shows a "Launching soon" state).
- Analytics, cookies, or tracking.
- Light theme. The site is dark-only for now.

## 5. Scope

### 5.1 Pages

| Route | Status | Notes |
|---|---|---|
| `/` Home | **Build** | Hero + 4 stepped sections |
| `/team` Team | **Build** | Hero + 3 stepped sections |
| `/about`, `/projects`, `/events`, `/achievements`, `/ai-updates`, `/idea-box`, `/collaborate`, `/contact`, `/join`, `/privacy`, `/terms`, `/cookies` | **Blank page** | Shared header and footer, empty main area, hidden page title, not indexed |

### 5.2 Facts and decisions fixed for this release

- College name shown in copy: **Kirori Mal College** (changeable in one place).
- The statement "Delhi University's first AI-based learning and innovation ecosystem" is **verified** and used as written.
- Team: **15 core members, 8 functions**. Members may be unnamed for now; the design's text ("Full Name") is kept as placeholder.
- The Team page stepper counts each step once: Our structure, The team, The collective.
- Projects section shows **"Launching soon"** until real projects exist.
- Footer contact and affiliation texts stay as in the design for now.
- The header/footer logo and the footer affiliation logo are **uploaded by the owner**; reserved slots with placeholders ship first.
- **Current approved designs take priority** over any earlier planning document.

## 6. Functional requirements

### 6.1 Global

| ID | Requirement |
|---|---|
| G-1 | Shared layout with header (logo, nav pill, "Get started" button) and footer on every page, including blank pages. |
| G-2 | Desktop nav: Home, About us, Team, Projects, Events, More (dropdown). Active page is indicated. |
| G-3 | "More" dropdown lists Achievements, AI Updates, Idea Box, Collaborate, Contact; opens by click or keyboard, closes on Escape or outside click. |
| G-4 | Mobile: hamburger opens a full-screen menu with the same links, "More" expanding inline, "Get started" at the bottom, close button, Escape to close, focus kept inside while open, page scroll locked while open. |
| G-5 | Every internal link resolves to a real page (live or blank). No 404s from site navigation. |
| G-6 | Logo slot (header and footer) and affiliation-logo slot (footer) read image files from the brand folder and show a neutral placeholder if the file is missing. |
| G-7 | Footer: tagline, social icons (shown only when a URL is set), Navigate, Get in Touch, Our Affiliation, copyright with automatic year, legal links. |
| G-8 | All text, links, numbers, and image names come from JSON in `src/content/`. No hard-coded copy in components. |
| G-9 | Blank pages are excluded from search engines and the sitemap until switched to `live` in `pages.json`. |
| G-10 | A skip-to-content link, visible focus states, and reduced-motion support everywhere. |

### 6.2 Home

| ID | Requirement |
|---|---|
| H-1 | Hero: eyebrow, headline "DISCOVER WITH AI" (AI in accent colour), subline, "See it in action" button that smooth-scrolls to *What we do*, corner texts, scroll indicator, layered artwork from the asset sheet. |
| H-2 | Four sections with ids `who-we-are`, `what-we-do`, `our-projects`, `ways-to-engage`. |
| H-3 | Side stepper (01–04) appears after the hero: sticky on desktop in its own column, highlights the section in view, scrolls to a section when clicked; compact in-section version below 1024 px as in the mobile design. |
| H-4 | *Who we are*: eyebrow, two-line heading (second line italic serif accent), body paragraph, "Explore Projects" link. |
| H-5 | *What we do*: heading, intro, four cards. Arrows on the cards appear on mobile only (as designed) and link to their blank pages. |
| H-6 | *Our projects*: heading, intro, link, and a timeline area. With no projects it shows the "Launching soon" state with the large cube artwork. With projects it lists them with status, name, summary and, for active ones, department and member count. |
| H-7 | *Ways to engage*: heading, intro, four cards with links to `/join`, `/events`, `/idea-box`, `/collaborate`. |

### 6.3 Team

| ID | Requirement |
|---|---|
| T-1 | Hero: pill "OUR PEOPLE", three-line heading with italic accent line, computed subline, "Scroll to meet the team" button, corner text, arc graphic with the words PEOPLE / DRIVE / POSSIBILITIES. |
| T-2 | Stepper with three steps: Our structure, The team, The collective (counted once). |
| T-3 | *Our structure*: eyebrow computed from the number of functions; eight function cards (4×2 desktop, 2×4 mobile). Cards are static unless a card has a link. |
| T-4 | *The team*: five groups (Leadership & Advisory; Tech & Social Media; AI Implementation & AI Board; Events & Outreach; Finance & Operations), each with a title, a count, and member cards. |
| T-5 | **One fixed card size** for every member card (4:5 photo ratio). Desktop: left-aligned wrap. Mobile: swipe carousel with previous/next buttons and dots. |
| T-6 | Member card shows photo (black-and-white, cropped to ratio, optional focus point), name, role in accent colour, function in grey. An arrow appears only if the member has a link. |
| T-7 | A missing photo shows a placeholder portrait; the page never breaks. |
| T-8 | Counts ("Fifteen people", "eight functions", "15", "8", group counts) are computed from the data. |
| T-9 | *The collective*: eyebrow, heading with accent, body text with the people count, side words (desktop), stat cards (mobile). |
| T-10 | Adding a member = add one JSON entry and drop one photo file. Counts update automatically. |

## 7. Non-functional requirements

| Area | Requirement |
|---|---|
| Responsive | Mobile < 768 px, tablet 768–1023 px, desktop ≥ 1024 px. No horizontal scrolling at any width from 320 px. |
| Performance | Lighthouse (mobile) targets: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Hero artwork under about 500 KB on desktop and 250 KB on mobile after optimisation. Images lazy-loaded below the fold. |
| Accessibility | WCAG 2.1 AA intent: contrast, keyboard operation, focus states, semantic landmarks, alt text, reduced motion, no information by colour alone. |
| Browser support | Current Chrome, Edge, Safari (including iOS), Firefox. |
| Maintainability | Content/design separation, tokens, reusable components, documented recipes in `future_scope.md`. |
| Privacy | No cookies, no tracking, no third-party requests (fonts self-hosted). |
| SEO | Page titles, descriptions, canonical URLs, sitemap (live pages only), social share tags. |

## 8. Success criteria (definition of done for Release 1a)

1. Home and Team match the approved designs on desktop and mobile in a side-by-side check.
2. Every link in the header, footer, and page content leads to a working page.
3. Changing any text or team member by editing JSON alone is reflected on the site after a rebuild.
4. Swapping the logo and affiliation logo requires only replacing image files.
5. Build passes with no errors; Lighthouse targets are met on the deployed site.
6. Site works on a real phone and a real desktop browser, keyboard-only, with reduced-motion enabled.
7. The site is deployed to a public URL and updates automatically when the repository changes.

## 9. Constraints and assumptions

- Built by a small student team, with the AI agent (Antigravity) writing most code. The owner is not a professional front-end developer; instructions and code must stay readable.
- The visual source is one traced SVG; quality is limited by it. Artwork is layered and softened rather than stretched.
- The two earlier blueprint documents are background only; where they conflict with this PRD or the designs, this PRD and the designs win (for example plain HTML/CSS/JS was replaced by Astro).

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Artwork looks soft on large screens | Layered composition, smoothing already applied to web files, cap display sizes, optional AI upscaling test later |
| Agent drifts from designs or hard-codes text | `AGENTS.md` rules, per-phase acceptance checks, one phase per conversation |
| Heavy images slow the site | Optimisation pipeline, size budgets, lazy-loading, mobile art-direction |
| Placeholder content goes live by accident | Clear "Placeholder" list in `content.md`, final content pass in Phase 5 |
| Future teams rebuild instead of extending | `future_scope.md` plus `pages.json` and content schemas |

## 11. Open items (do not block the build)

- Real contact email, phone, address, social links, affiliation text.
- Your logo files (header/footer, affiliation).
- Real team names, photos, roles, and profile links.
- Confirmation of the Technical Projects card sentence and of the footer "More" link target.
- Domain name for the deployed site.
