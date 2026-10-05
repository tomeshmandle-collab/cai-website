# CAI Website — Future Scope & Extension Guide

**Purpose of this file:** explain what the CAI website will grow into, and how the current build is structured so each future feature can be added without a rewrite. Give this file to any AI assistant (with `AGENTS.md`, `PRD.md`, `tech.md`, `design.md`) before asking it to improve the site.

> The folder paths below are the **planned structure**. If the real repository differs, the repository wins — update this file to match.

---

## 1. Snapshot: what exists now (Release 1)

- **Organisation:** CAI — Centre for Artificial Intelligence, Kirori Mal College, University of Delhi.
- **Built and functional:** Home (`/`) and Team (`/team`), each with a desktop and a mobile design.
- **Exist as completely blank pages:** every other page the navigation or footer links to (see section 3).
- **Stack:** Astro (static output) + TypeScript, plain CSS with design tokens, small vanilla scripts, JSON content validated by a schema, Astro image optimisation, self-hosted fonts, GitHub + Vercel.
- **Visual source:** one master SVG asset sheet, sliced into optimised images. No other imagery is invented.
- **Not built, on purpose:** backend, database, login, admin dashboard, forms, AI Updates automation or APIs.

## 2. Rules that must not be broken

1. **Content never lives in layout code.** All text, links, numbers, names and image filenames live in `src/content/*.json`. Components only render what they receive.
2. **Store what content is, not how it looks.** A record is `{name, role, photo}`, never HTML.
3. **One component per idea** (card, section header, stepper, button). Reuse before creating.
4. **No raw colours, fonts or spacing values in components.** Use the tokens in `src/styles/tokens.css`.
5. **A page must not care where its data comes from** (JSON file today, API tomorrow).
6. **Every dynamic feature is isolated** in its own component or module so it can be upgraded alone.
7. **Never expose secrets** (API keys) in frontend code or the repository.
8. **Never publish user-submitted input without human review.**
9. **Current designs win** over earlier assumptions. If a design and a document disagree, follow the design and record the decision in `tech.md`.
10. **Keep the site fast and accessible:** optimised images, keyboard access, visible focus, reduced-motion support, alt text.

## 3. Page status board

| Page | Route | Now | Future plan |
|---|---|---|---|
| Home | `/` | Built | Add live sections as data appears (projects, events, achievements) |
| Team | `/team` | Built | Yearly archive, member profiles |
| About | `/about` | Blank | Story, timeline, structure, advisory |
| Projects | `/projects` | Blank | Ongoing and completed projects |
| Events | `/events` | Blank | Upcoming and past archive |
| Join | `/join` | Blank | How to become a member |
| Achievements | `/achievements` | Blank | Evidence-based record |
| AI Updates | `/ai-updates` | Blank | Hand-curated links first, automation only if needed |
| Idea Box | `/idea-box` | Blank | Idea submission form |
| Collaborate | `/collaborate` | Blank | Collaboration proposal form |
| Contact | `/contact` | Blank | Contact details and form |
| Privacy / Terms / Cookies | `/privacy` `/terms` `/cookies` | Blank | Legal text |

**How blank pages work:** each route has its own file in `src/pages/`. It uses the shared layout (navigation and footer), has an empty main area plus a visually hidden page title, and is registered in `src/content/pages.json` with `status: "blank"`. Blank pages are excluded from search engines and the sitemap. When a page is designed, its file's contents are replaced and its status is changed to `"live"`.

## 4. How the current build prepares for the future

| Mechanism | What it gives you later |
|---|---|
| `src/content/*.json` with a schema | Add or edit content without touching code; mistakes fail the build with a clear message |
| `pages.json` registry | Turn a blank page live, or add a nav item, by editing one entry |
| Shared layout (navigation, footer, head) | A new page is "layout + sections", nothing to copy |
| Reusable components | New pages look consistent automatically |
| `tokens.css` | Rebranding or a colour change happens in one file |
| Image helper with placeholder fallback | Adding photos never breaks a page if a file is missing |
| Brand slots (logo, affiliation logo) | Swap images without changing code |
| Computed counts (people, functions) | Numbers never go stale |
| Optional `href` on cards | Arrows and links appear only when a destination exists |

### Brand and logo slots

- **Header and footer logo:** `src/assets/brand/cai-logo.(svg|png|webp)`, referenced from `site.json` (`brand.logo`). The same image is used in the header (top-left) and the footer.
- **Wordmark text** beside the logo ("Centre for Artificial Intelligence") is editable text in `site.json` (`brand.name`). If the uploaded logo already contains the name, set `brand.showWordmark` to `false`.
- **Affiliation logo (footer):** `src/assets/brand/affiliation-logo.(svg|png|webp)`, referenced from `site.json` (`affiliation.logo`).
- **Until real logos are uploaded,** neutral placeholders show in those slots.
- **Affiliation, contact and social texts** are kept exactly as in the current design and are editable in `site.json`. Social icons appear only when a URL is filled in.

## 5. Common recipes

**Edit any text:** find it in the matching `src/content/*.json` file and change it.

**Add a team member:** add one entry to the team data and drop the photo in `src/assets/team/` named `firstname-lastname.jpg`. Counts update automatically.

**Change the college name:** edit it in the content files; it is not hard-coded in components.

**Make a blank page live:**
1. Read `AGENTS.md`, `design.md` and the page's design (or ask for one).
2. Define its content file and schema in `src/content/`.
3. Replace the page file's body with sections built from existing components.
4. Set `status: "live"` in `pages.json`.
5. Add its content to `content.md` and its steps to `phase.md`.

**Add a navigation item:** add an entry in `pages.json` with its route and nav group.

**Replace a visual:** put the new source in `assets-source/`, re-run the slicing script, and update `assets.md`.

## 6. Planned features

### About
- **Purpose:** identity, history, legitimacy, direction.
- **Content:** founding context, mission, vision, values (only if genuine), governing structure, faculty advisory structure.
- **Presentation:** a timeline (Founded → Early initiatives → Major activities → Current phase → Future direction).
- **Data:** `about.json` (narrative blocks) and `timeline.json` (entries with date, title, description).

### Projects
- **Now:** Home shows a "Launching soon" state.
- **Fields:** title, summary, problem addressed, why it matters, status (`idea` / `active` / `completed` / `paused` / `archived`), department, tech or methods, members, media, links, milestones, outcome.
- **Plug-in point:** `projects.json`. When it has entries, Home switches automatically from "Launching soon" to the project timeline, with no layout change.
- **Rule:** concrete function and results, no hype words.

### Events
- **Upcoming:** title, date and time, location or mode, description, speakers, registration link, image, status.
- **Past:** title, date, description, photos, speakers, highlights, attendance, resources.
- **Data:** `events.json`, split by date into upcoming and past. The archive stays visible for years.
- **Home:** shows one prominent upcoming event, not a list.

### Achievements
- **Categories:** competitions, awards, research, projects, collaborations, outreach, recognition.
- **Per entry:** name, date, person or team, result, significance, supporting link or image.
- **Data:** `achievements.json`. Aggregate numbers must be accurate and sourced.

### Join
- **Purpose:** the destination for "Get started" and "Apply now".
- **First version:** instructions plus an external form link. Later it can use the same form pattern as Idea Box.

### AI Updates
- **First version:** a team member manually adds 3 to 5 curated links per week to `updates.json` (source, title, link, one-line context). No automation.
- **Only if curation becomes a real burden:** trusted sources → feeds or APIs → a small backend → filter, validate, categorise and cache → the same page. A human check always comes before anything is shown.
- **Plug-in point:** the section reads "a list of updates"; whether that list comes from a file or an API is hidden from the page.

### Idea Box, Collaborate, Contact (forms)
- **First version:** each is a form posting to an external form service (for example Formspree) that emails the team. No database and no public listing.
- **Idea Box fields:** title, problem or need, proposed AI use, why it is useful, expected users, optional name, optional contact, optional links.
- **Collaborate:** collaboration types accepted, what CAI offers, what to include, then the form.
- **Contact:** official email, socials, affiliation, location (if relevant), optional form.
- **Rules:** collect only what is needed, state how contact details are used, show clear success and error states, use the service's spam protection.
- **Upgrade path:** the form's destination moves from the service to a custom endpoint with no change to the form markup.

### Legal pages
- Privacy, Terms and Cookie pages currently blank. The site sets no tracking cookies today; update the text if analytics or forms are added.

### Team archive (replaces the removed "Past Teams")
- **Removed for now:** the Past Teams section and "View Previous Teams".
- **Plan:** team data grouped by academic year (for example `2026-27`), with the current year named in `site.json`. At year end, the current team's data is kept as an archive and a new year's data becomes current.
- **Archive page:** a per-year page listing that year's functions and members, linked from a restored "Past teams" section on `/team`.
- **Stepper:** the Team stepper is Structure → Team today. A fourth step is added only when the archive returns.

### Member profiles
- **Today:** a card arrow appears only when the member has a link.
- **Later:** optional bio, responsibilities and social links per member, shown on a profile view or page.

### Release 3 (only if editing JSON becomes genuinely painful)
- **Triggers:** many contributors, high content volume, or submissions that need tracking.
- **Path:** content files → imported into a database → small backend API → the same pages fetch from the API instead of the local file.
- **Admin dashboard sections would mirror the content types:** events, projects, team, achievements, updates, ideas, collaborations, media.
- **Roles:** do not build roles until team size justifies it.
- **Security:** only authorised users edit public content, and the public never has direct database access.

## 7. Data schemas (planned shapes)

```json
// team member
{ "id": "firstname-lastname", "name": "Full Name", "role": "President",
  "function": "leadership", "photo": "firstname-lastname.jpg", "link": "" }

// function (department)
{ "id": "leadership", "name": "Leadership", "description": "...", "group": "Leadership & Advisory" }

// project
{ "id": "slug", "title": "", "summary": "", "status": "active",
  "department": "", "members": 0, "links": {} }

// event
{ "id": "slug", "title": "", "date": "YYYY-MM-DD", "mode": "", "description": "",
  "registrationLink": "", "image": "" }

// curated update
{ "source": "", "title": "", "url": "", "context": "", "date": "YYYY-MM-DD" }

// page registry entry
{ "route": "/about", "title": "About us", "status": "blank", "nav": "main" }
```

## 8. Design and asset notes for future work

- Design language: dark theme, purple and magenta accent, serif italic accent words, glowing cube and particle imagery from the asset sheet.
- Every visual comes from the sliced asset sheet (`assets.md` maps each slice to its place). New pages reuse these slices in layers rather than stretching one image.
- Structural ornaments (stepper rail, nodes, bracket lines) are CSS, so they can animate and stay sharp.
- Team cards use one fixed size and ratio; photos are cropped to it, shown black-and-white, with an optional focus point per person.
- Breakpoints: mobile below 768 px, tablet 768–1023 px, desktop 1024 px and up.

## 9. Decisions log

| Decision | Reason |
|---|---|
| Astro over plain HTML | Shared header and footer, build-time JSON, schema validation |
| No Tailwind | Custom design maps to tokens; easier for non-coders to read |
| Static first, no backend | Nothing to crash, patch or pay for; easy handover |
| Forms through an external service | Simpler and more reliable than custom backend code |
| AI Updates manual first | Live feeds are fragile and need monitoring nobody will reliably do |
| Blank pages instead of missing routes | No broken links, easy replacement later |
| Past Teams removed | Not enough history yet; returns as the yearly archive |
| Projects "Launching soon" | No verified projects yet; avoids placeholder claims |

## 10. Prompt template for briefing an AI

Copy, fill in, and send together with this file, `AGENTS.md`, `PRD.md`, `tech.md` and `design.md`:

```
I am extending the CAI website. Read AGENTS.md, future_scope.md, tech.md and design.md first.

Task: <what you want, e.g. "make the Events page live">
Page/route: <route>
Design reference: <file or description>
Content: <the real text or data, or "use placeholders in the content JSON only">

Follow the rules in section 2 of future_scope.md. Reuse existing components and tokens.
Put all text in src/content JSON. Do not add a backend or new dependencies unless I approve.
When finished: run the build, update pages.json, content.md, phase.md, and add a changelog
entry in tech.md.
```

## 11. Open items to confirm

- Real contact details, social links, and affiliation text (current design text is kept as placeholders).
- Logo files for the header, footer and affiliation slot.
- Real team names, photos and profile links.
- Final sentence for the Technical Projects card on Home (the design has two overlapping versions; see `content.md` section 2.4).
- Where the footer's "More" link should point (currently `/contact`).
- Domain name for the live site.
- Legal text for Privacy, Terms and Cookies.
