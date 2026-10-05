# CAI Website — Content (every text, page by page)

> **Status of this file:** human-readable view of the content. The same content exists as JSON in `content-seed/` (`site.json`, `pages.json`, `home.json`, `team.json`), generated from one source so they match exactly. In Phase 1 the JSON is copied to `src/content/`. **From that moment the JSON files are the truth** and this file is a reference snapshot. Edit the JSON, not this file.

**Conventions**

- Text in `{curly braces}` is computed from the data (see the Computed values table). Never type those numbers by hand.
- *Placeholder* means the design's current text, kept on purpose until you replace it.
- *New* means text that is not in the design and was added to make a state work.
- Straight apostrophes are used in the data; the site may render typographic quotes.

## 0. Computed values

| Token | Meaning | Today |
|---|---|---|
| `{people}` | number of entries in `team.members` | 15 |
| `{functions}` | number of entries in `team.functions` | 8 |
| `{PeopleWord}` / `{peopleWord}` | people count in words, capitalised / lower case | Fifteen / fifteen |
| `{functionsWord}` / `{FUNCTIONSWORD}` | functions count in words | eight / EIGHT |
| `{PEOPLEWORD}` | people count in words, upper case | FIFTEEN |
| `{currentYear}` | `team.currentYear` | 2026–27 |
| Year in copyright | current calendar year, automatic | the current year |

## 1. Shared on every page

### 1.1 Header

| Element | Text / value | Notes |
|---|---|---|
| Logo | image `src/assets/brand/cai-logo.*` | You upload it. Placeholder until then |
| Wordmark | Centre for Artificial Intelligence | Two lines. `brand.showWordmark` = false hides it if your logo already has the name |
| Nav item | Home → `/` | |
| Nav item | About us → `/about` | blank page |
| Nav item | Team → `/team` | |
| Nav item | Projects → `/projects` | blank page |
| Nav item | Events → `/events` | blank page |
| Nav item (dropdown) | More | Achievements `/achievements`, AI Updates `/ai-updates`, Idea Box `/idea-box`, Collaborate `/collaborate`, Contact `/contact` (all blank pages) |
| Button | Get started → `/join` | blank page |

### 1.2 Footer

| Block | Text | Notes |
|---|---|---|
| Logo + wordmark | same slot as header | |
| Tagline | Where mind leads & AI assists. | |
| Social icons | LinkedIn, Instagram, X, YouTube | An icon shows only when its URL in `site.json` is filled |
| Heading | Navigate | |
| Links | Home, About us, Team, Projects, Events, More → | *More* points to `/contact` for now |
| Heading | Get in Touch | |
| Email | cai@college.edu | *Placeholder* |
| Phone | +91 98765 43210 | *Placeholder* |
| Address | ABC College / City, State 560001 | *Placeholder* |
| Heading | Our Affiliation | |
| Affiliation logo | image `src/assets/brand/affiliation-logo.*` | You upload it. Placeholder until then |
| Affiliation text | ABC College of Engineering / An Autonomous Institution / Affiliated to XYZ University | *Placeholder* |
| Copyright | © {current year} Centre for AI. All rights reserved. | Year is automatic |
| Legal links | Privacy Policy `/privacy` · Terms of Use `/terms` · Cookie Policy `/cookies` | blank pages |

### 1.3 Interface strings

Skip to content · Open menu · Close menu · More · Previous · Next · Photo coming soon

### 1.4 Search / share information

- Site title: Centre for Artificial Intelligence | Kirori Mal College
- Default description: The Centre for Artificial Intelligence, Kirori Mal College, is Delhi University's first AI-based learning and innovation ecosystem.
- Share image: none yet (`seo.shareImage` is empty)

## 2. Home page (`/`)

### 2.1 Hero

- Eyebrow: CENTRE FOR AI
- Headline: DISCOVER / WITH **AI** (the word AI is in the purple accent)
- Subline: Where mind leads & AI assists
- Button: See it in action → scrolls to the *What we do* section
- Corner text, top left: NEURAL NETWORK / FOR A BRIGHTER TOMORROW
- Corner text, bottom left: PEOPLE / IDEAS / INTELLIGENCE / FOR A BRIGHTER TOMORROW
- Corner text, right: INTELLIGENCE / PEOPLE / POSSIBILITIES
- Scroll indicator label: Scroll

### 2.2 Side stepper (appears after the hero)

| Number | Label | Section |
|---|---|---|
| 01 | WHO WE ARE | `#who-we-are` |
| 02 | WHAT WE DO | `#what-we-do` |
| 03 | OUR PROJECTS | `#our-projects` |
| 04 | WAYS TO ENGAGE | `#ways-to-engage` |

### 2.3 Section 01 — Who we are (`#who-we-are`)

- Eyebrow: COMMUNITY FIRST
- Heading: Centre for / *Artificial Intelligence* (second line in italic serif, magenta)
- Body: The Centre for Artificial Intelligence, Kirori Mal College, is Delhi University's first AI-based learning and innovation ecosystem — dedicated to making artificial intelligence accessible to every curious mind. In our first official year, we're bringing students and enthusiasts from across Delhi University together to learn, build, and explore AI without barriers. CAI is more than a centre — it's a community for anyone who wants to understand the technology shaping tomorrow.
- Link: Explore Projects → `/projects`

### 2.4 Section 02 — What we do (`#what-we-do`)

- Eyebrow: What we do
- Heading: Four ways we bring AI within reach.
- Intro (right side): From structured research to open speaker sessions — every track is built to move a curious student from first exposure to real capability.

| Card | Icon | Text | Arrow goes to |
|---|---|---|---|
| Research | book-open | Faculty-guided exploration into applied AI, published and presented within the college and beyond. | `/projects` (arrow shown on mobile only, as designed) |
| Technical Projects | code-xml | Student-built tools and systems — the centre's strongest evidence of what members can actually do. | `/projects` (arrow shown on mobile only, as designed) |
| Workshops & Outreach | users | Hands-on sessions and speaker talks that take AI from theory to something you've actually used. | `/events` (arrow shown on mobile only, as designed) |
| Courses | graduation-cap | Free, exclusive NASSCOM and IBM-backed courses available only to CAI members. | `/join` (arrow shown on mobile only, as designed) |

> Note: in the Technical Projects card the design has two overlapping sentences. The one used here is the one that reads as complete on desktop. The other version in the design was: "…the centre's hands-on side, where guidance turns ideas into…" (cut off). Change it in `home.json` if you prefer it.

### 2.5 Section 03 — Our projects (`#our-projects`)

- Eyebrow: Featured projects
- Heading: Concrete work, not slideware.
- Intro: From research prototypes to real-world tools, our projects turn curiosity, creativity, and drive to use AI for meaningful change.
- Link: Explore projects → `/projects`
- **Current state (*New*):** badge "Launching soon", title "Our first projects are on the way.", text "Check back soon."
- When `projects.items` is empty the section shows the launching-soon state on the timeline rail, with the large cube kept.
- When items exist, each shows: status label (Active / Completed / Idea stage), name, one- or two-line summary, and (for active ones) "Dept: …   N members".
- The design's sample items ("Project name goes here", "Second project", "Third project") are **not** used.

### 2.6 Section 04 — Ways to engage (`#ways-to-engage`)

- Eyebrow: Ways to engage
- Heading: However you want in, there's a door.
- Intro: Join our community, contribute to our projects, or attend our next event.

| Card | Icon | Text | Link |
|---|---|---|---|
| Join CAI | user | Become a member and get free access to NASSCOM & IBM courses. | Apply now → `/join` |
| Attend an Event | calendar | Sit in on our next workshop or speaker session. | See events → `/events` |
| Submit an Idea | lightbulb | Pitch an AI project through the Idea Box for review. | Open Idea Box → `/idea-box` |
| Collaborate | handshake | Propose a partnership as a society, researcher, or company. | Start a proposal → `/collaborate` |

## 3. Team page (`/team`)

### 3.1 Hero

- Pill: OUR PEOPLE
- Heading: The team behind / Centre for / *Artificial Intelligence* (italic serif, magenta)
- Subline: {PeopleWord} people, {functionsWord} functions, one centre — meet the operating body running CAI this year.  → today: "Fifteen people, eight functions, one centre — meet the operating body running CAI this year."
- Button: Scroll to meet the team → scrolls to *The team*
- Corner text, top left: PEOPLE / IDEAS / INTELLIGENCE / FOR A BRIGHTER TOMORROW
- Words beside the arc: PEOPLE / DRIVE / POSSIBILITIES

### 3.2 Side stepper (counted once, three steps)

| Number | Label | Section |
|---|---|---|
| 01 | OUR STRUCTURE | `#our-structure` |
| 02 | THE TEAM | `#the-team` |
| 03 | THE COLLECTIVE | `#the-collective` |

> The design repeated "The team" and showed two "03" entries, and had a fourth step for Past Teams. This is fixed: each step appears once and Past Teams is removed for now.

### 3.3 Section 01 — Our structure (`#our-structure`)

- Eyebrow: {FUNCTIONSWORD} FUNCTIONS, ONE CENTRE  → today: EIGHT FUNCTIONS, ONE CENTRE
- Heading: How the centre is organised.
- Intro: Each head owns a function — together they run everything from courses to campus events.

| Function | Icon | Text |
|---|---|---|
| Leadership | user | Sets direction, represents CAI externally, and signs off on major decisions. |
| Advisory | message-circle | Faculty and senior guidance on strategy, partnerships, and academic direction. |
| Tech & Social Media | laptop | Runs the centre's online presence, website, and technical infrastructure. |
| AI Implementation | box | Leads applied AI projects from idea to working build. |
| AI Board | book-open | Curates and validates AI updates, content and research direction. |
| Events & Outreach | calendar | Plans workshops, speaker sessions, and outreach across the university. |
| Finance & Operations | database | Manages budgets, logistics, and day-to-day running of the centre. |
| Members | users | The wider AI-enthusiast community CAI exists to serve. |

The *Members* function has no named core members, so it counts as a function but not toward the people count.

### 3.4 Section 02 — The team (`#the-team`)

- Eyebrow: CURRENT TEAM · {currentYear}  → today: CURRENT TEAM · 2026–27
- Heading: Meet the people running CAI.
- Intro: {PeopleWord} individuals. Different roles. A shared belief in what AI can make possible.  → today: "Fifteen individuals. Different roles. A shared belief in what AI can make possible."

Each group shows its title and a count (number of people in it). Every card shows photo, name, role (magenta) and function (grey).

| Group | Count today | Cards (role → function label) |
|---|---|---|
| Leadership & Advisory | 5 | President → Leadership; Vice President → Leadership; Vice President → Leadership; Vice President → Leadership; Advisory → Advisory |
| Tech & Social Media | 3 | Tech & Social Media Head → Tech & Social Media; Tech & Social Media Head → Tech & Social Media; Tech & Social Media Vice Head → Tech & Social Media |
| AI Implementation & AI Board | 2 | AI Implementation Head → AI Implementation; AI Board Head → AI Board |
| Events & Outreach | 2 | Events & Outreach Head → Events & Outreach; Events & Outreach Head → Events & Outreach |
| Finance & Operations | 3 | Finance & Operations Head → Finance & Operations; Finance & Operations Head → Finance & Operations; Finance & Operations Head → Finance & Operations |

All 15 entries currently have the name **Full Name** (*placeholder*), no photo (a placeholder portrait shows) and no link (so no arrow). Two small fixes to the design's role text: "Event & Outreach Head" became "Events & Outreach Head", and the cut-off "Vice & Social Media Head" became "Tech & Social Media Vice Head". Both are one-line edits in `team.json`.

### 3.5 Section 03 — The collective (`#the-collective`)

- Eyebrow: DIFFERENT ROLES. A SHARED PURPOSE.
- Heading: Many roles. / *One centre.* (second line italic serif, magenta)
- Body: From research and projects to events and community, we're a team of {people} driven by curiosity, collaboration and a desire to make AI accessible to everyone.  → today: "…we're a team of 15 driven by…"
- Desktop side words: FIFTEEN PEOPLE / EIGHT FUNCTIONS / ONE CENTRE
- Mobile stat cards: 15 People · 8 Functions · 1 Centre, then a card: **A shared purpose** — Making AI accessible to everyone.

### 3.6 Removed for now

Past Teams section ("Our history / Past teams."), the year cards (2025–26 to 2022–23) and the "View Previous Teams" button. See `future_scope.md` for the plan to bring them back.

## 4. Blank pages

Routes with an empty main area (shared header and footer still show): `/about`, `/projects`, `/events`, `/achievements`, `/ai-updates`, `/idea-box`, `/collaborate`, `/contact`, `/join`, `/privacy`, `/terms`, `/cookies`. Each has only a visually hidden page title for accessibility (taken from its `title` in `pages.json`).

## 5. Texts to confirm

- Footer contact details and affiliation text (kept as in the design).
- Technical Projects card sentence (see the note in 2.4).
- Where the footer's *More* link should go (currently `/contact`).
- Real team names, roles, photos and profile links.
- New text added for the projects empty state ("Launching soon" and its two lines).
