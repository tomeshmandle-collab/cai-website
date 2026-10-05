# AGENTS.md — CAI Website

You are helping build the official website of CAI (Centre for Artificial Intelligence, Kirori Mal College, University of Delhi). The owner is a student, not a professional front-end developer. Keep code simple, readable, and well named. Explain what you did in plain language.

## Read first, every session
1. `docs/PRD.md` (what and why)
2. `docs/tech.md` (stack, structure, rules)
3. The current phase in `docs/phase.md` (only that phase)
4. `docs/design.md`, `docs/content.md`, `docs/assets.md` when the task touches look, text, or images
5. `docs/future_scope.md` before adding or changing anything beyond the current phase

The four images in `design/reference/` are the visual truth. If a document and an image disagree, follow the image and add a line to the changelog in `docs/tech.md`.

## Stack (do not change without asking)
Astro (static output) + TypeScript, plain CSS with custom properties, small vanilla TS scripts, JSON content validated with Astro content collections + Zod, Astro image optimisation, self-hosted fonts (Figtree, Newsreader), npm, GitHub + Vercel.
**Do not add:** Tailwind, React/Vue/Svelte, animation libraries, UI kits, a backend, a database, authentication, forms, analytics, or any new dependency without the owner's approval.

## Hard rules
1. **No copy in components.** All text, links, numbers, and image names live in `src/content/*.json`. Components only render props.
2. **Never type counts by hand.** People count, function count, number words, group counts, and the copyright year are computed (`src/lib/counts.ts`).
3. **Tokens only.** Use variables from `src/styles/tokens.css`. No raw hex colours, font names, or arbitrary sizes in components.
4. **Reuse before creating.** Check `src/components/` first. One component per idea.
5. **Pages are replaceable.** Every linked-but-unbuilt route stays a blank page (shared header and footer, empty main, hidden `<h1>`, `noindex`) controlled by `status` in `src/content/pages.json`. Never delete a route; never put design into a blank page unless the current phase says so.
6. **Optional means optional.** An arrow or link renders only if its `href`/`link` is non-empty. A social icon renders only if its `url` is non-empty. A missing photo or logo shows the placeholder and never breaks the page.
7. **Member cards have one fixed size** (4:5 photo ratio) everywhere.
8. **Past Teams is removed** for now. Do not add it. Projects shows "Launching soon" until real items exist in `home.json`.
9. **Use only the supplied artwork** (`src/assets/art/`, cut from the asset sheet). Never generate or draw extra cubes, waves, or illustrations. Never import anything from `assets-source/`. Structural UI shapes (stepper rail, arcs, borders) are CSS/SVG.
10. **Layer artwork, do not stretch it.** Follow `docs/assets.md` section 5. No visible rectangle edges. Decorative art is `alt=""` and `aria-hidden`.
11. **Current approved designs win** over earlier plans. The glowing purple look is intentional; do not tone it down.
12. **Accessibility is not optional:** skip link, one `h1` per page, landmarks, visible focus, keyboard operation for every control, alt text for photos, `prefers-reduced-motion` respected.
13. **No third-party requests.** Fonts and icons are local. No cookies or tracking.
14. **Never commit secrets.** (There should be none.)

## How to work
- Work on **one phase at a time**, only the phase the owner names. Do not start the next phase or add features that are not in the PRD.
- Before coding, state a short plan (files you will create or change). After coding, state what changed and how to check it.
- Run `npm run build` (and `npx astro check`) before saying a task is done. Fix errors; do not hide them.
- Compare your result to the design image for the section, at 390, 768, and 1440 px, and say honestly what still differs.
- Tick the checkboxes in `docs/phase.md` for finished items only. Do not tick items you did not verify.
- Add a changelog line to `docs/tech.md` for any structural decision or deviation from a document.
- If something is ambiguous or two documents conflict, **ask a short question** instead of guessing.
- Ask before: deleting files, changing the stack, renaming content fields, or touching files outside the current phase.
- Keep commits small and meaningful (messages are suggested in `docs/phase.md`).

## Content and data conventions
- JSON shapes are defined by the Zod schemas in `src/content/config.ts`. If a field must change, change the schema, the JSON, `docs/content.md`, and the changelog together.
- Photos: `src/assets/team/firstname-lastname.jpg`, referenced by file name in `team.json`.
- Logos: `src/assets/brand/cai-logo.*` and `src/assets/brand/affiliation-logo.*`.
- Breakpoints: mobile < 768 px, tablet 768–1023 px, desktop ≥ 1024 px. Mobile-first CSS.

## Definition of done for any task
It builds, matches the design for its section, uses tokens and JSON content, works by keyboard, respects reduced motion, has no console errors, and is described in plain language with anything left unfinished listed.
