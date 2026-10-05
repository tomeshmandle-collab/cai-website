# CAI Website

Official website of **CAI — Centre for Artificial Intelligence**, Kirori Mal College, University of Delhi.

Built with Astro (static), plain CSS, and JSON content. Hosted on Vercel.

## Run it on your computer

1. Install Node.js (current LTS) and Git.
2. In a terminal, in this folder:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (usually http://localhost:4321).

Other commands:
```
npm run build      builds the site and checks all content files
npm run preview    shows the built site locally
```

## Edit content (no coding)

All text lives in `src/content/`. After editing, save; the dev server refreshes by itself.

| I want to change… | Edit… |
|---|---|
| Header button, footer text, contact details, socials, affiliation text | `src/content/site.json` |
| Which pages exist, their names, and what shows in the menu | `src/content/pages.json` |
| Home page text, section texts, ways-to-engage cards, projects | `src/content/home.json` |
| Team page text, functions, groups, members | `src/content/team.json` |

If you make a typo in a file, `npm run build` stops and tells you which file and field.

### Add a team member
1. Put the photo in `src/assets/team/` named `firstname-lastname.jpg`.
2. In `team.json`, add an entry to `members`: a unique `id`, `name`, `role`, `function` (one of the function ids), and `photo` (the file name). Optional: `link` (shows an arrow), `focus` (where to centre the crop).
3. Counts ("Fifteen people", group counts, "15") update automatically.

### Replace the logo
Put your files in `src/assets/brand/` as `cai-logo.svg` (or `.png`) and `affiliation-logo.svg` (or `.png`). If your logo already contains the name "Centre for Artificial Intelligence", set `showWordmark` to `false` in `site.json`.

### Add a real project
In `home.json`, under `projects.items`, add an entry (status `active`, `completed`, or `idea`, plus name, summary, department, members). "Launching soon" disappears by itself.

### Turn a blank page into a real page
Replace the contents of its file in `src/pages/` (for example `about.astro`) and set its `status` to `live` in `pages.json`. See `docs/future_scope.md`.

## Project documents

| File | Purpose |
|---|---|
| `docs/PRD.md` | What we build and why |
| `docs/design.md` | How it looks and behaves |
| `docs/content.md` | Every text on every page |
| `docs/tech.md` | Stack, structure, decisions, changelog |
| `docs/assets.md` | The artwork and how to use it |
| `docs/phase.md` | Build order and checks |
| `docs/future_scope.md` | How future features slot in; brief any AI with it |
| `AGENTS.md` | Rules the AI agent follows |

## Deploy

Pushing to `main` on GitHub deploys automatically to Vercel (build command `npm run build`, output folder `dist`).

## Important

- Never put `assets-source/` files into the site. They are source material only.
- The site has no backend, no forms, no cookies, and no tracking.
