# AGENTS.md — SportSenter1 Website

> **Purpose**: Detailed technical analysis and practical guide for AI agents (and future you) working on this codebase.  
> This file captures the state of the project after directory analysis (June 2026 context).

This document complements [README.md](./README.md). Use README.md for high-level human editor instructions; use this file for architecture, file responsibilities, current gaps, and agent-friendly workflows.

---

## Project Overview

- **What**: Statically generated marketing website for SportSenter1 (fitness centers in **Kolbotn** and **Vinterbro**, Norway).
- **Original source**: Recreated from a Wix site. Full raw backup lives in `scrape/`.
- **Stack**: Astro 4 (pure static output). No frontend frameworks, no heavy dependencies.
- **Key characteristics**:
  - Dark theme with orange (`#ffa500`) and blue (`#5aa1cc`) accents.
  - Norwegian language everywhere.
  - Very small source footprint. Most "content" is either in `.astro` files or the central data file.
  - Designed for easy static hosting (Cloudflare Pages / Netlify recommended).

**Site URL** (configured): `https://www.sportsenter1.no`

---

## Directory Map & Responsibilities

| Path                        | Purpose / What to edit                                                                 |
|-----------------------------|----------------------------------------------------------------------------------------|
| `src/data/site.js`          | **Single source of truth**. Phone, email (global + per location), addresses, Google Maps links, reception opening hours, main navigation. |
| `src/data/icons.js`         | Inline SVG icons used on the homepage feature tiles (extracted from original site).     |
| `src/layouts/Base.astro`    | HTML shell, meta tags, fonts, `<Header/>` + `<Footer/>` + `<slot/>`.                    |
| `src/components/Header.astro` | Top nav (uses `nav` from site.js) + mobile hamburger JS.                               |
| `src/components/Footer.astro` | Two-column location info + links + copyright.                                          |
| `src/components/LocationPage.astro` | Reusable template for the two physical locations (contact, hours table, **embed slot**, gallery). |
| `src/pages/*.astro`         | One file per route. See page inventory below.                                          |
| `src/content/blog/*.md`     | "Just Sayin'" blog posts via Astro Content Collections.                                |
| `src/content/config.ts`     | Collection schema for blog (title, excerpt, date, optional image).                     |
| `src/styles/global.css`     | Complete design system + layout primitives (grids, heroes, cards, buttons, nav, footer, `.embed-slot`, etc.). |
| `public/img/`               | **Web-optimized production images** (copied/optimized from scrape). Includes `hero.jpg`, `hero.mp4`, `logo.png`, and `trainers/` (named photos). |
| `scrape/`                   | Full raw backup of the original Wix site (HTML, extracted .txt, high-res images). Use for recovering full blog texts, original prices, legal copy, etc. Large (127 MB). |
| `astro.config.mjs`          | Minimal config (just `site` URL).                                                      |
| `package.json`              | `astro` + `playwright` (the latter was used for scraping).                             |

**Ignored in builds** (see `.gitignore`): `node_modules/`, `dist/`, `scrape/images/`, `.astro/`, temp visual artifacts.

**Note**: There is currently **no `.git`** repository initialized in this workspace (commands return "not a git repository").

---

## Page Inventory (src/pages/)

- `index.astro` — Homepage: video hero, feature tiles (using icons), 17. mai campaign block, price guarantee, location cards, app teaser.
- `kolbotn.astro` / `vinterbro.astro` — Thin wrappers that pass location data + gallery images to `LocationPage.astro`.
- `LocationPage.astro` (component) — Shared location template. Contains the per-location `.embed-slot` for the timetable.
- `gruppetimer.astro` — Group class descriptions + large central `.embed-slot` for the full weekly schedule.
- `bli-medlem.astro` — Membership tiers (Bronse / Sølv / Gull). **Prices are placeholders**.
- `trenere.astro` — 12 trainers with photos (now correctly wired from `public/img/trainers/`), roles, bios, and tag lists.
- `om-oss.astro` — History since 2007, facilities, Antidoping Norge collaboration, member testimonials.
- `medisinske-tjenester.astro` — Specialized services (medical leadership, physio, rehab, senior programs, etc.).
- `jobb.astro` — Recruitment areas + email application CTA.
- `vilkar.astro` — Philosophy + high-level section outline for terms. **Full legal clauses are missing**.
- `blog/index.astro` + `blog/[...slug].astro` — Blog listing and individual post renderer (uses content collection).

---

## Core Editing Rules (for agents)

1. **Business data & contact info** → Always edit `src/data/site.js` first. Never hardcode phone numbers, emails, addresses, or hours in individual pages.
2. **Navigation** → Also controlled in `site.js` (`nav` array).
3. **Page-specific text / layout** → Edit the corresponding `.astro` file in `src/pages/`.
4. **New blog post** → Create a new `.md` file in `src/content/blog/`. Use frontmatter matching the schema in `config.ts`. Copy an existing post as a template. The blog list sorts by `date` descending.
5. **Images** → Add to `public/img/`. Reference with paths starting `/img/...`. Trainers live in `public/img/trainers/`.
6. **Styles** → Prefer extending classes in `global.css`. Avoid heavy inline styles except for one-off overrides.
7. **Booking integration** → See dedicated section below.

---

## Booking / Timetable Integration (Important TODOs)

The in-house booking system is **not yet wired**.

Prepared placeholders (search for `.embed-slot` or `TODO`):

- `src/pages/gruppetimer.astro:43` — Main weekly schedule section.
- `src/components/LocationPage.astro:47` — Per-location timetable (appears on both Kolbotn and Vinterbro pages).

**How to integrate** (when the embed/API is ready):
- Replace the placeholder `<div class="embed-slot">` content with an `<iframe>`, a script widget, or a small Astro component that fetches data.
- The dashed blue styling on `.embed-slot` (defined in `global.css:195`) is intentional for visibility during development.

There is also a TODO in `bli-medlem.astro:52` for a potential membership signup form.

---

## Current Content Gaps (as of analysis)

These are explicitly called out in the human-facing README and confirmed in code:

- **Prices** (`bli-medlem.astro`): Tiers exist with perks. Prices show the text: “Pris fylles inn / kobles til bookingsystemet.”
- **Full medlemsvilkår** (`vilkar.astro`): Only introductory philosophy + a structural outline of 5 sections. The actual clause text needs to be pasted in.
- **Blog posts** (all files under `src/content/blog/`): Every post is a short stub containing title + excerpt + a note to the editor to paste the original “Just Sayin'” article. There are 9 posts.
- **Innmelding flow**: Currently directs people to reception or the location pages. No live form.
- **Trainer photos**: This gap has been **resolved** (photos now live in `public/img/trainers/` and are used in `trenere.astro`). The original README note on this item is now outdated.

The `scrape/` directory (especially the `.txt` extracts and `raw/*.html`) is the best source for recovering the original full texts.

---

## Styling & Design System Highlights

Defined in `src/styles/global.css`:

- CSS variables for colors, fonts, spacing, shadows.
- Major primitives: `.container`, `.section`, `.section--alt`, `.section--black`, `.btn`, `.btn--blue`, `.card`, `.eyebrow`, `.display`, `.split`, `.gallery`, `.grid-*`, `.tiles`, `.trainer`, `.hero*`, `.nav*`, `.site-footer`, `.embed-slot`.
- Responsive breakpoints at 1280px (nav), 900px (grids), 700px (heroes/galleries).
- Sticky header with blur, full-bleed heroes with overlays, etc.

The visual language is intentionally bold (giant Anton display headings) but clean.

---

## Build, Run & Preview

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

Output is pure static HTML/CSS/JS + assets. No server-side rendering needed.

`dist/` is currently present and can be used for visual checks.

---

## Asset Pipeline

- **Production assets**: `public/img/` (served at `/img/...`).
- **Source material**: Everything came from `scrape/images/` (high-resolution Wix exports) and was optimized/copied.
- **Hero video**: `public/img/hero.mp4` (with `hero.jpg` poster).
- **Logo**: `public/img/logo.png`.
- **Trainers**: Named files in `public/img/trainers/` (atle.png, benthe.png, etc.).

When adding new images, optimize them for web and place them in `public/img/`.

---

## Agent / Tooling Notes

- `.well-known/agent-card.json` — A2A-compatible agent discovery card. It declares this agent's skills:
  - `site-content`, `site-data`, `blog-posts`, `booking-embed`, `build-and-deploy`, `code-search`.
- There is evidence of local bridge/MCP usage (`bridge-s1-website`) and Claude Code sessions (`.claude/`, `claude.sh`).
- Playwright was used historically for scraping the original site.

When an agent is working via the bridge or similar, it should register itself and can use the declared skills.

---

## Conventions & Gotchas

- Do **not** duplicate contact/location data across files.
- Blog dates use `z.coerce.date()` — any string that coerces to a valid date works.
- The site is intentionally simple. Resist adding React, heavy UI libs, or client-side state unless truly justified.
- Some campaign text (17. mai) is still hardcoded on the homepage.
- The README.md "Trenerbilder" bullet is now stale — trainers are wired.

---

## Quick Reference for Common Agent Tasks

**Update opening hours or phone**  
→ Edit `src/data/site.js` (both global `site` and the two objects inside `locations`).

**Add or update a blog post**  
→ New file in `src/content/blog/your-slug.md` with proper frontmatter. Rebuild to see it.

**Change the main menu order or labels**  
→ `nav` array in `src/data/site.js`.

**Add a new top-level page**  
→ Create `src/pages/new-page.astro` + add a nav entry in `site.js`.

**Implement the timetable**  
→ Find the two `.embed-slot` blocks and replace the explanatory text with the real embed/widget/component.

**Recover original full blog/legal text**  
→ Look in `scrape/*.txt` and `scrape/raw/*.html`.

**Visual regression / before-after**  
→ The `.gitignore` mentions patterns for temporary screenshots (`shot*.mjs`, `orig-*.png`, `mine-*.png`). These were used during the initial recreation.

---

## File Counts (approximate at time of analysis)

- ~30 files under `src/`
- ~877 lines total across Astro/JS/TS/MD source
- 9 blog posts (all stubs)
- ~77 optimized images in `public/img/`
- Large scrape backup for reference

---

This file was generated from a full directory analysis. Keep it updated when major structural changes, new integrations, or content population occur.

For day-to-day human editing instructions, also consult the main [README.md](./README.md).