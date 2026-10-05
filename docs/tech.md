# CAI Website — Technical Architecture

This file holds every technical decision: stack, structure, data model, assets, deployment, and a changelog. If the real repository differs from what is written here, **the repository wins** — then update this file.

## 1. Stack (decided)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro**, static output, with TypeScript | Shared header/footer written once, every page ships as plain HTML with almost no JavaScript, content is validated at build time |
| Styling | **Plain CSS** with custom properties (tokens) and scoped component styles. **No Tailwind, no UI framework** | The design is custom; tokens map one-to-one; easy for non-experts to read |
| Interactivity | Small vanilla TypeScript modules (menu, dropdown, stepper, carousel, reveal) | No React/Vue, no animation libraries |
| Content | JSON files in `src/content/`, validated with **Astro content collections + Zod** | Editing content never touches layout code; typos fail the build with a clear message |
| Images | Astro's built-in image optimisation (`astro:assets`, `<Image>` / `<Picture>`) | Responsive sizes and modern formats automatically |
| Icons | Lucide icons as inline SVG (copied into `src/icons/`, no runtime icon library) | Crisp, themeable, zero extra requests |
| Fonts | Self-hosted via Fontsource (Figtree, Newsreader) | No third-party requests, fast, private |
| Package manager | npm | Simplest for a small team |
| Hosting | **GitHub** repository + **Vercel** (free tier), auto-deploy on every push | Matches the earlier plan; nothing to run or patch |
| Node | Current LTS | |

Use the latest stable versions available when scaffolding. Pin them in `package.json` and record the versions in the changelog.

**Rejected alternatives:** plain HTML/CSS/JS (duplicated header/footer on every page, JSON must be fetched in the browser), Next.js (server concepts the project does not need), Tailwind (extra layer on a custom design).

**Explicitly not included now:** backend, database, authentication, admin dashboard, forms, AI Updates automation or APIs. See `future_scope.md` for how each plugs in later.

## 2. Folder structure

```
cai-website/
├── AGENTS.md                     rules the AI agent reads every session
├── README.md                     how to run, edit content, deploy
├── docs/                         PRD.md, design.md, content.md, tech.md, assets.md, phase.md, future_scope.md
├── design/reference/             the four design PNGs (reference only, never shipped)
├── assets-source/
│   ├── asset_sheet_vector_transparent.svg    the 21 MB source (never imported by the site)
│   └── masters/                  full-resolution PNG cut-outs (never imported by the site)
├── scripts/
│   └── slice_assets.py           re-cuts the SVG into assets (see assets.md)
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── art/                  web-ready artwork (WebP) from the asset sheet
│   │   ├── brand/                cai-logo.*  and  affiliation-logo.*  (you upload)
│   │   └── team/                 member photos, named firstname-lastname.jpg
│   ├── content/
│   │   ├── config.ts             Zod schemas (the shape of every JSON file)
│   │   ├── site.json
│   │   ├── pages.json
│   │   ├── home.json
│   │   └── team.json
│   ├── components/
│   │   ├── layout/               Header, Nav, MoreMenu, MobileMenu, Footer, SkipLink
│   │   ├── ui/                   Button, TextLink, Eyebrow, SectionHeading, Card, IconTile, Icon
│   │   ├── stepper/              Stepper (desktop rail + compact variant)
│   │   ├── home/                 Hero, WhoWeAre, WhatWeDo, ProjectsTimeline, WaysToEngage
│   │   ├── team/                 TeamHero, FunctionGrid, MemberCard, MemberGroup, Collective, ArcGraphic
│   │   └── art/                  ArtLayer (positions and animates a slice of artwork)
│   ├── layouts/
│   │   └── BaseLayout.astro      <head>, header, footer, skip link
│   ├── lib/
│   │   ├── content.ts            typed loaders for the JSON files
│   │   ├── counts.ts             people and function counts, number-to-words
│   │   ├── images.ts             photo resolver with placeholder fallback
│   │   └── pages.ts              route registry helpers
│   ├── scripts/                  menu.ts, dropdown.ts, stepper.ts, carousel.ts, reveal.ts
│   ├── pages/
│   │   ├── index.astro           Home
│   │   ├── team.astro            Team
│   │   └── about.astro, projects.astro, events.astro, achievements.astro,
│   │       ai-updates.astro, idea-box.astro, collaborate.astro, contact.astro,
│   │       join.astro, privacy.astro, terms.astro, cookies.astro     (blank pages)
│   └── styles/
│       ├── tokens.css            colours, type, spacing, radii, shadows, breakpoints
│       ├── base.css              reset, typography, focus, reduced motion
│       └── utilities.css         container, visually-hidden, etc.
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 3. Content model

Four JSON files; the exact shapes are in `content-seed/`. The Zod schemas in `src/content/config.ts` must match them.

| File | Holds |
|---|---|
| `site.json` | brand (name, logo name, show-wordmark flag, tagline), header button, SEO defaults, footer (navigate, contact, affiliation, socials, legal, copyright text), UI strings |
| `pages.json` | one entry per route: `route`, `title`, `status` (`live` or `blank`), `nav` (`main`, `more`, or none), `order` |
| `home.json` | hero, stepper, the four sections, projects list (empty now) and its empty state |
| `team.json` | current year, hero, stepper, functions, groups, members, collective |

### Rules
- Components receive data as props; they never contain copy.
- Computed values (people count, function count, number words, copyright year) come from `src/lib/counts.ts` and the data — never typed by hand. Templates in the JSON use `{people}`, `{PeopleWord}`, etc. (see `content.md` section 0).
- Optional fields: an arrow or link renders only when its `href`/`link` is non-empty; a social icon renders only when its `url` is non-empty.
- Photo field holds a **file name** (for example `jane-doe.jpg`) resolved from `src/assets/team/`. Empty or missing file → placeholder portrait. The helper uses `import.meta.glob` so Astro can optimise each photo.
- Schema validation failures must break the build with a message naming the file and field.

### Page registry behaviour (`pages.json`)
- Header nav, More dropdown, footer links, and the sitemap are generated from it.
- `status: "blank"` → page is rendered with `<meta name="robots" content="noindex">` and left out of the sitemap.
- Changing a blank page to `live` is the only switch needed for indexing.

## 4. Pages and layout

- `BaseLayout.astro` provides: `<head>` (title, description, canonical, social tags, favicon, font preloads), skip link, `Header`, `<main id="main">` slot, `Footer`.
- **Blank page template:** each blank route file uses `BaseLayout` with an empty main and a visually hidden `<h1>` from `pages.json`. To design one later, replace only that file's body; nothing else changes.
- Home and Team compose section components and pass them content from the loaders.

## 5. Scripts (client-side JavaScript)

All small, loaded only where needed, no dependencies.

| Script | Does |
|---|---|
| `menu.ts` | Mobile menu open/close, focus trap, Escape, scroll lock, inline "More" expand |
| `dropdown.ts` | Desktop More dropdown: click/keyboard, Escape, outside click, aria-expanded |
| `stepper.ts` | IntersectionObserver for the active step, smooth scroll on click, hash update |
| `carousel.ts` | Scroll-snap helpers: previous/next buttons, dots, disabled ends |
| `reveal.ts` | Fade-and-rise on scroll, skipped for reduced motion |

Everything must work without JavaScript for reading content (menus and animations are enhancements; links still navigate).

## 6. Styling approach

- `tokens.css` is the single source for colours, type, spacing, radii, shadows, motion (see `design.md` section 2).
- Component styles are scoped inside each `.astro` file and use only tokens.
- Mobile-first media queries at 768 px and 1024 px.
- Dark theme only. No raw hex values or arbitrary pixel values in components (a few structural pixel values such as 1px borders are fine).
- Respect `prefers-reduced-motion`; pause ambient animation when the tab is hidden.

## 7. Artwork pipeline (summary — details in `assets.md`)

1. The source SVG and full-resolution masters live in `assets-source/` and are never imported by the site.
2. Web-ready WebP files from the pack's `web/` folder go into `src/assets/art/`.
3. The `ArtLayer` component places each slice with fixed position, size, opacity, blend mode, and optional slow drift, using `<Image>` for responsive output.
4. Mobile uses different crops (art direction) rather than shrinking desktop art.
5. `scripts/slice_assets.py` regenerates everything if a better source file arrives.

## 8. Performance budget

| Item | Budget |
|---|---|
| Hero art, desktop | ≤ 500 KB delivered |
| Hero art, mobile | ≤ 250 KB delivered |
| Total JavaScript | ≤ 30 KB (gzip) across the site |
| Each below-the-fold image | lazy-loaded, sized with width/height to avoid layout shift |
| Fonts | two families, WOFF2 only, `font-display: swap`, preload the primary sans |
| Lighthouse (mobile) | Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 |

Never import anything from `assets-source/`.

## 9. SEO and sharing

- Unique `<title>` and description per live page (from the JSON).
- Canonical URL, Open Graph and Twitter tags; share image configurable in `site.json` (empty for now).
- `sitemap.xml` from live pages only; `robots.txt` allows all.

## 10. Quality checks

Run before every commit that touches code:

1. `npm run build` — must pass (this also validates all JSON against the schemas).
2. `npx astro check` — type check.
3. Open the dev server and compare against the design images at 390 px, 768 px, and 1440 px.
4. Keyboard-only pass: Tab through the header, menu, stepper, and carousels.
5. Link check: every nav, footer, and in-page link resolves.

Before launch: Lighthouse on the deployed URL, a real phone test, reduced-motion test.

## 11. Deployment

- Repository on GitHub (`main` is the live branch).
- Vercel project connected to the repository; build command `npm run build`, output `dist`.
- Every push to `main` deploys; every branch gets a preview URL (use previews for risky changes).
- No secrets exist in this project. Never commit keys.
- Custom domain: later, configured in Vercel.

## 12. Git practice

- One commit per finished task with a clear message (see `phase.md` for suggested messages).
- Commit after each phase passes its acceptance check, and tag it (`phase-1`, `phase-2`, …) so any phase can be restored.
- Use a branch for experiments.

## 13. Changelog (append only; newest at the bottom)

| Date | Decision or change | Why |
|---|---|---|
| 2026-10-05 | Stack set to Astro + plain CSS + vanilla TS + JSON content collections; replaces the plain HTML/CSS/JS idea from the blueprint | Shared layout, build-time validation, no duplication |
| 2026-10-05 | Blank pages exist for every linked-but-unbuilt route, controlled by `pages.json` | No dead links; easy to replace later |
| 2026-10-05 | Past Teams removed; Projects shows "Launching soon" | No history or projects to show yet |
| 2026-10-05 | Rules file is `AGENTS.md` at the project root | Antigravity reads `AGENTS.md` as rules |
| 2026-10-05 | Phase 0 completed: Astro v5.4.2, @fontsource/figtree v5.3.0, @fontsource/newsreader v5.3.0 pinned; folder structure and assets positioned | Phase 0 setup and first deploy preparation |
