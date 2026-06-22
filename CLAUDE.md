# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A summer hardware practicum resource for high school students (~16, zero-to-weak technical background). The repo has two main halves:

1. **9 project course-packs** (`project-01..09-[name]/`) — each with curriculum, hardware BOMs, code scaffolding, and grading rubrics
2. **A Nuxt 3 + Vue 3 showcase website** (`website/`) — statically generated and deployed to GitHub Pages at `/summer-hardware-projects`

All deliverables are bilingual Chinese-English. Content follows the "笨鸟先飞" (fine-grained scaffolding) principle: explain *why*, not just *how*.

> The site was migrated from Next.js to Nuxt 3 (commit `5bbcc12`) and then visually redesigned in an "Apple keynote + Mimo warm" dark style. Do not assume Next.js/React conventions — it is Nuxt + Vue now.

---

## Core Constraints (always enforce)

| Constraint | Value |
|---|---|
| Hardware cost per kit | < ¥500 |
| Project duration | 10–20 days (full-time camp) |
| Student level | High school, zero/weak foundation |
| Documentation language | Bilingual Chinese-English |
| Open-source basis | Adapted from real community projects |
| Reproducibility | MVP completable in a standard summer camp |

---

## Website — Build & Dev Commands

All commands run from `website/`:

```bash
cd website
npm run dev       # nuxt dev — dev server on http://localhost:3000
npm run build     # nuxt generate — static export → website/.output/public (also symlinked as dist/)
npm run generate  # alias of nuxt generate
npm run preview   # nuxt preview — serve the production build locally
```

There is **no lint script** configured (no ESLint in `website/package.json`).

### Dev server hygiene — ONE dev server at a time (hardcoded rule)

> **Rule:** Run **only one** `npm run dev` at a time. Reasons: (1) `nuxt generate` refuses to build while a dev server holds the `.nuxt` lock; (2) if `:3000` is already taken, `nuxt dev` silently falls back to `:3001`, leaving a **stale orphan on `:3000`** that serves the wrong/old build — the user sees two servers and can't tell which is live. Before starting dev, check both ports and **kill any stale listener** rather than spawning a new port:
> ```bash
> powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000,3001 -State Listen -EA SilentlyContinue | Select LocalPort,OwningProcess"
> # kill the stale one (NOT the one you just started):
> powershell -NoProfile -Command "Stop-Process -Id <PID> -Force"
> ```
> **`TaskStop` on the dev-server shell does NOT always kill the child `node` process** — always verify the PID is actually gone by re-listing the ports. Also kill any orphaned dev `node` before `npm run build`.
> **Exception:** intentional visual **before/after comparison** may run two dev servers (one on `:3000`, one on `:3001`) — kill both when the comparison is done.

### Visual verification

> **Rule (hardcoded — always follow this):** ALL visual-verification artifacts — screenshots, capture scripts, before/after diffs, design-review reports — live under **`verify/`** at the repo root. `verify/` is gitignored, so none of this is committed. Never create `website-audit/`, `website/verify/`, or scatter screenshot scripts at the repo root; `verify/` is the single home. This is mandatory for every visual change, before and after.

Layout:

- `verify/scripts/` — reusable Playwright capture scripts (gitignored dev tools, not committed):
  - `screenshot-audit.mjs` — `node verify/scripts/screenshot-audit.mjs before|after [port]`. Captures `/`, `/projects`, `/projects/weather-cube` at 375 / 768 / 1440 → `verify/<phase>-upgrade/`.
  - `section-shots.mjs` — `node verify/scripts/section-shots.mjs` (expects `:3000`). Per-section viewport screenshots (in-view states activated, ground-truth scroll-position verified) at 1440 + 375 → `verify/sections/`.
  - `verify/legacy/` — older one-off scripts (`verify-screenshot.js`, `screenshot-final.js`) kept for reference.
- `verify/<run-name>/` — one folder per verification run (e.g. `verify/before-upgrade/`, `verify/after-upgrade/`, `verify/sections/`). Screenshots land here, alongside any `SUMMARY.md` / `design-review.md` / `issues.md` for that run.

How to use: serve the built site (`npm run preview` from `website/`, or serve `.output/public`) — or run `npm run dev` (default `:3000`) — then run the script. The scripts resolve Playwright from `website/node_modules` via an absolute `createRequire`, so they work from any cwd. When capturing, disable smooth-scroll first (`document.documentElement.style.scrollBehavior = 'auto'`) and assert the target heading is in the viewport before screenshotting, or `scroll-behavior: smooth` will capture mid-scroll at the wrong position.

### Deployment

- `npm run build` (`nuxt generate`) writes static output to `website/.output/public`. `.output/` and the `dist/` symlink are gitignored.
- `docs/` (at repo root) is the GitHub Pages source and **is committed**. It holds a copy of the generated export (`_nuxt/`, `_payload.json`, `index.html`, `404.html`, `200.html`, `projects/`). Re-running the build does **not** automatically update `docs/` — after generating, copy the export into `../docs/` (the `.nojekyll` file there disables Jekyll).
- `nuxt.config.ts` sets `app.baseURL` to `/summer-hardware-projects` in production and `/` in dev — so all asset/route URLs are prefixed only in the deployed build. Run dev with no prefix.

---

## Website Architecture

**Stack**: Nuxt 3 · Vue 3 (`<script setup lang="ts">`) · TypeScript · Tailwind CSS · GSAP · `lucide-vue-next` icons. Animations are GSAP-driven (scroll, parallax, tilt, magnetic hover) plus CSS keyframes defined in `tailwind.config.ts`; there is no Framer Motion (that was the old React site).

**Entry & layout**: `app.vue` renders `<NuxtLayout><NuxtPage /></NuxtLayout>`. `layouts/default.vue` wraps every page in a global `SmoothScroll` component (native browser scroll + anchor-link smoothing + `ScrollTrigger.refresh()` on resize — NOT a custom smooth-scroll lib) — scroll behavior is defined there, not per-page.

**Routes** (Nuxt file-based routing in `pages/`):

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/index.vue` | Landing page — composes section components: Hero, Value, Projects, Learning path, Testimonials, CTA |
| `/projects` | `pages/projects/index.vue` | Project grid with difficulty filter |
| `/projects/[slug]` | `pages/projects/[slug].vue` | Project detail — skills, hardware BOM, timeline, open-source links, prev/next nav |

**Static generation (SSG)**: `nuxt.config.ts` sets `nitro.prerender.crawlLinks: true` and seeds routes `/` and `/projects`. The 9 detail pages are discovered by crawling `<NuxtLink>`s from the projects grid. The `[slug]` page uses `definePageMeta({ validate })` to 404 unknown slugs (replaces Next's `generateStaticParams`). All pages must remain statically generatable — no server-side runtime.

**Data layer**: `website/content/projects.ts` — single source of truth for all 9 projects (TypeScript types + `projects` array + helpers `getProjectBySlug`, `getAllProjectSlugs`, `getDifficultyColor`, `getDifficultyBg`). If project content changes, update this file **and** the corresponding `project-NN/README.md`. Detail pages use each project's `colorHex` for inline accent styling.

**Composables** (`composables/`): `useInView` (scroll-reveal + progress), `useMagnetic` (radius-based magnetic hover), `useScrollProgress` (scroll-linked animation), `useReducedMotion` (reactive prefers-reduced-motion gate), `useGlobalMouse` (single lerped mouse listener), `useSpotlight` (mouse-follow spotlight). These are the interactivity layer the section components build on.

**Design system** (`tailwind.config.ts`): dark "Apple keynote" base (`background: #0a0a0b`) with a warm "Mimo" accent palette (`warm-peach`, `warm-coral`, `warm-honey`, `warm-amber`) and accent metals (`accent-copper`, `accent-patina`); status colors (`success`/`warning`/`danger`); per-project accent colors (`project-01`…`project-09`) and a tag color system (`tag-bronze`/`solder`/`copper`/`teal`/`patina`/`gold`/`purple`/`pink`, each with a `-text` variant). Fonts: Plus Jakarta Sans + DM Sans + Noto Sans SC (sans/display), JetBrains Mono (mono). Apple-scale fluid typography (`display`/`hero`/`section`/`subsection` via `clamp()`), custom shadows (`card`, `card-hover`, `glow*`), and keyframe animations (`fade-up`, `reveal-up`, `shimmer`, `float`, `glow-pulse`, `gradient-shift`). `darkMode: 'class'`; `<html class="dark">` is set in `nuxt.config.ts`.

**Path alias & auto-imports**: Nuxt maps `~/` and `@/` to the `website/` root. Nuxt/Vue composables and APIs (`useRoute`, `useHead`, `definePageMeta`, `createError`, `ref`, `computed`) are auto-imported — do not add explicit imports for them. `tsconfig.json` extends `.nuxt/tsconfig.json` (regenerated by Nuxt).

> The website has an upgrade series in `prompts/`: **05** (visual — warm→cool Meta palette, glass, glow) → **06** (interactive — V2: global mouse, scroll divider, parallax) → **07** (architecture & flow — **active**: lifts 05/06's no-restructure constraint; View Transitions page-flow + shared-element morph, 3D signature hero, de-templated section rhythm, detail-page rework) → **08** (media & effects — **active**: selectively integrates user-supplied art/video assets from `D:\教书\艺术设计图片` + cherry-picked effects from `prompts/网页效果提示词/` — mouse-scrub video, video+noise bg, WordsPullUp, scroll-linked char reveal; layers on top of 07, not a global rebuild) → **09** (hero figure fusion — *lineage, superseded*: procedural 3D figure in the constellation scene, shipped jury 9.13 but user rejected as toy-like) → **10** (hero 2D-scrub-video + 3D-constellation — **active, supersedes 09's figure entirely**: reuses the Mainframe reference's mouse-scrub "little person" video **directly — downloaded & self-hosted** at `public/media/hero-scrub.mp4` (not hotlinked; user wanted to skip making their own video) — as the 2D hero layer, plus the 3D constellation (`HeroArtifact.vue`) kept and upgraded to premium + **un-clipped** (was truncated in its 440px container); removes `buildFigure()` + the figure poster SVG; the old GLTF-10 and old 2D-video-bg-11 drafts were deleted and merged into this one; jury >8.8 + no-clipping hard red line; ⚠️ the Mainframe video is not the user's asset — swap for a licensed one before public launch) → **12** (course-stages section upgrade — **active, scoped**: reworks ONLY `components/jack/JackServices.vue` (the `<h2>课程阶段</h2>` 5-stage section, currently a white outlier) to match the dark Jack-flow style of the sections before it; ports Neo Museum sand-dissolve chapter list + Aetheris BlurText/FadingVideo; ingests new videos from `D:\教书\艺术设计图片\视频` (mkv→mp4) + HD PNGs as a global media library; **everything before 课程阶段 is FROZEN — zero changes**) → **13** (mission-section black-hole & video upgrade — **active, scoped**: reworks ONLY `components/MissionSection.vue` (the `<section id="mission">` 「从代码到硬件」/ 使命 beat) — static black-hole bg → dynamic (黑洞视频), fills the right-column video placeholder with the best-fit video (own or reference, picked via vision MCP), and replaces the mission copy with a provided poem + professional EN translation; everything else FROZEN; jury >8.8) → **14** (mobile-only optimization — **active, scoped**: optimizes ONLY the phone (<768px / below `md:`) experience — layout/typography/spacing/touch/readability/perf; **everything ≥768px (desktop / 16:9 / tablet) FROZEN — pixel-identical before/after**, verified via screenshot diff + git diff; uses `max-md:`/`max-sm:` variants + `@media(max-width:767px)` scoped CSS so desktop is untouched) → **15** (project links — upstream-primary: detail-page links lead with the ORIGINAL open-source repo, user's adapted `jojojjjjj/<folder>` repo as a small secondary link below; adds `adaptedRepo` to `ProjectLinks`; rebuilds `docs/`) → **16** (image loading — signup-focused: the `/media/signup-link.png` shown after clicking「立即报名」is slow because it loads on-demand at click; convert to webp + preload + width/height + skeleton, plus site-wide webp/lazy/srcset) → **17** (project-02 redesign — **active, scoped**: redesigns ONLY the Project 02 course-pack (`project-02-env-monitor-mid/` submodule) using Bilibili video `BV1tb4y1U7Du` as the source of truth; extracts the small useful core from the uploaded `视频例程共享资源/` dump (mostly noise) and removes the noise; syncs the `content/projects.ts` 02 entry incl. the Bilibili link; only Project 02 touched) → **18** (Safari adaptation — **active, scoped**: fixes Safari (Mac + iPhone) layout-fighting — elements overlapping/misaligning/overflowing; uses Playwright WebKit as Safari proxy since browser-harness is Edge-only; Safari-scoped fixes (`@supports`/`-webkit-`/`env()`/`dvh`) — primary culprit: `body { overflow-x: clip }` ignored on Safari <16; also iPhone 100vh bug, viewport-fit=cover for notch, backdrop-filter/mask-composite stacking; Chrome/Edge pixel-identical before/after (hard red line); no redesign). When touching visual design/architecture/media/hero/course-stages/mission/mobile/project-links/image-loading/project-02-content/Safari, read `prompts/07_website_architecture_upgrade.md`, `prompts/08_website_media_effects_upgrade.md`, `prompts/10_hero_2dvideo_3dconstellation.md` (hero), `prompts/12_course_stages_upgrade.md` (course-stages), `prompts/13_mission_blackhole_video_upgrade.md` (mission), `prompts/14_mobile_optimization.md` (mobile), `prompts/15_project_links_upstream_primary.md` (links), `prompts/16_image_loading_optimization.md` (images), `prompts/17_project02_redesign.md` (project-02), and `prompts/18_safari_adaptation.md` (Safari) first (09 is lineage, figure dropped); tokens/glass/glow from 05/06 are done — don't rebuild them.
>
> **Jack 3D-Creator motion injection** (hybrid, earlier experiment — `components/jack/`; JackProjects sticky-stack later reverted, JackServices/JackMarquee remain) ports a React/Framer-Motion portfolio spec into the Nuxt/Vue/GSAP stack: giant `.hero-heading` gradient h1, scroll-driven marquee, char-by-char scroll-reveal, a white Services section (5-stage learning path), sticky-stacking project cards that scale on scroll, and magnetic hover. New section components live in `components/jack/` (`JackMarquee`, `JackAbout`, `JackServices`, `JackProjects`/`JackProjectCard`) + primitives (`JackFadeIn`, `JackMagnet`, `JackAnimatedText`, `JackContactButton`, `JackLiveProjectButton`). It rebinds to the 9 real projects (`content/projects.ts`) + 5-stage learning path, is bilingual, and preserves the 07 Three.js hero + View Transitions card↔detail morph. Kanit (display-only) added alongside the existing fonts; `body { overflow-x: clip }` (not `hidden`) so `position:sticky` in `JackProjects` works.

---

## 9 Projects

Website slugs come from `content/projects.ts` and **do not always match the `project-NN-*` folder names** — the URL uses the `slug` field, not the folder. Keep both in sync conceptually when renaming.

| # | Slug (URL) | Folder | titleEn | Difficulty | MCU |
|---|---|---|---|---|---|
| 01 | binocular-thermal-imager | project-01-binocular-thermal-imager | ThermalEyes | 3/5 Intermediate | STM32F411 |
| 02 | env-monitor | project-02-env-monitor-mid | EnvSense | 2/5 Basic | ESP32 |
| 03 | 4mode-keyboard | project-03-4mode-keyboard | KeyForge | 4/5 Advanced | STM32F103 |
| 04 | pocket-signal-generator | project-04-pocket-oscilloscope-high | WavePocket | 5/5 Expert | iCE40 FPGA |
| 05 | desktop-pet | project-05-desktop-pet-mid | DeskPet | 3/5 Intermediate | ESP32-S3 |
| 06 | weather-cube | project-06-weather-cube-easy | WeatherCube | 1/5 Beginner | ESP32 |
| 07 | bipedal-wheeled-robot | project-07-bipedal-wheeled-robot-high | BipedBot | 4/5 Advanced | STM32F103 |
| 08 | electronbot | project-08-electronbot-xhigh | ElectronBot | 5/5 Expert | STM32F411 |
| 09 | desk-satellite | project-09-desk-satellite-high | Desk Satellite | 4/5 Advanced | ESP32-C3 |

Each project folder follows: `README.md`, `curriculum/`, `hardware/`, `software/`, `assignments/` (some also have `resources/` or `advanced/`).

> **The 9 `project-NN-*` directories are git submodules** — each is its own public repo at `https://github.com/jojojjjjj/<folder>.git` (branch `main`), linked in via `.gitmodules`. See [Submodule Operations](#submodule-operations) for the exact commands.

---

## Submodule Operations

The 9 `project-NN-*` directories are git submodules — each is its own public repo at `https://github.com/jojojjjjj/<folder>.git` (branch `main`), registered in `.gitmodules`. Use these commands:

```bash
# Fresh checkout (includes all 9 projects)
git clone --recurse-submodules https://github.com/jojojjjjj/summer-hardware-projects.git

# Populate submodules after a plain clone
git submodule update --init --recursive

# Pull all 9 submodules to their latest main
git submodule update --remote --merge

# Edit one project: commit INSIDE the submodule (it is its own repo),
# then bump the pointer in the parent repo:
cd project-03-4mode-keyboard && git push origin main && cd ..
git add project-03-4mode-keyboard && git commit -m "chore: bump project-03 submodule"
```

> Replace `project-03-4mode-keyboard` with the relevant `project-NN-*` folder name. The website does not import from project folders, so submodule changes never affect the Nuxt build.

---

## Three-Phase Generation Pipeline

Run by pasting `prompts/00_MASTER_PROMPT.md` into Claude Code Teams mode:

1. **Research** — Two researchers find ≥8 open-source projects each. Output → `reports/01_*.md`
2. **Evaluation** — Feasibility scoring on 6 dimensions (tech 25%, cost 20%, pedagogy 20%, community 15%, fun 10%, extensibility 10%). Output → `reports/02_*.md` + `reports/03_*.md`
3. **Build** — Generate full course-packs. Output → `project-NN-[name]/`

The pipeline was used to produce the initial projects; the prompts in `prompts/` are the source of truth for re-running or modifying the workflow. `prompts/05_website_visual_upgrade.md`, `06_website_interactive_upgrade.md`, `07_website_architecture_upgrade.md`, `08_website_media_effects_upgrade.md`, `09_hero_mechanical_figure_fusion.md`, `10_hero_2dvideo_3dconstellation.md`, `12_course_stages_upgrade.md`, `13_mission_blackhole_video_upgrade.md`, `14_mobile_optimization.md`, `15_project_links_upstream_primary.md`, `16_image_loading_optimization.md`, `17_project02_redesign.md`, and `18_safari_adaptation.md` form a separate, website-only upgrade series (not part of the course-pack pipeline); **07/08/10/12/13/14/15/16/17/18 are the active rounds** (07 = architecture/3D/flow, 08 = media/effects, 10 = hero 2D-scrub-video + 3D constellation, 12 = course-stages [scoped], 13 = mission section [scoped], 14 = mobile-only [≥768 FROZEN], 15 = project links [upstream-primary], 16 = image loading [signup-focused], 17 = project-02 redesign [Bilibili video as source of truth], 18 = Safari adaptation [Mac+iPhone layout-fighting fix via Playwright WebKit proxy, Safari-scoped `@supports`/`-webkit-`/`env()`/`dvh` fixes — primary culprit `body { overflow-x: clip }` ignored on Safari <16; Chrome/Edge pixel-identical before/after]). 09 is lineage (hero figure, superseded).

---

## Agent Roles (`.claude/agents/`)

8 specialist agents for the Teams mode pipeline (also mirrored as `.codex/agents/` in TOML format):

| Agent | Role | Key constraint |
|---|---|---|
| project-manager | Coordination, milestone tracking | Read-only tools |
| frontend-dev | UI/web components | npm/npx access |
| backend-dev | API, DB, server logic | Python/pip access |
| data-engineer | Data collection, cleaning, viz | Python/pip access |
| ml-engineer | Model training/deploy | Python/pip access |
| qa-engineer | Testing, bug tracking | Python/npm access |
| devops | Environment, CI/CD, deploy | Docker/npm/git access |
| tech-writer | Documentation, reports | Read/write access |

Team config: `.claude/teams/summer-project/config.json` (lead: project-manager, maxConcurrent: 3)

---

## Key Conventions

- **Project course-packs are git submodules**: the 9 `project-NN-*` directories are tracked as git submodules, each pointing to its own public repo `https://github.com/jojojjjjj/<folder>.git` (branch `main`, registered in `.gitmodules`). To edit a project, commit inside the submodule (it is its own repo) and then bump the submodule pointer in the parent. See [Submodule Operations](#submodule-operations) for the exact clone/update/edit commands.
- **When adding/modifying a project**: update both the project folder's `README.md` and `website/content/projects.ts` — they must stay in sync. If you add a project, also add a matching `project-NN` accent color in `tailwind.config.ts` and a `colorHex` in the data.
- **Website deployment path**: the site lives at `/summer-hardware-projects` on GitHub Pages via `app.baseURL` (production only); local dev has no base prefix.
- **Static generation constraints**: all pages must be statically generatable (no server runtime). The build is `nuxt generate`; there is no `next/image`/Nuxt Image optimization here — images are plain static assets in `public/`.
- **Bilingual requirement**: every deliverable must have both Chinese and English content.
- **Scaffolding principle**: curriculum docs must include prerequisite checklists, common error guides, and debugging tips.
- **College-level rigor**: course-packs must include formal project proposals, weekly check-in reports, final demo + presentation specs, and Git workflow conventions.
- **Visual verification & design-audit artifacts**: visual-verification screenshots, capture scripts, and design-review reports live under **`verify/`** (gitignored) — see [Visual verification](#visual-verification). `website-research/` contains competitive analysis and design specs — reference it (and the `prompts/05→06→07→08→09→10` upgrade series, **07/08/10 active**, 10 = current hero direction, 09 lineage) when modifying visual design, site architecture, or media/effects. User-supplied art/video assets live in `D:\教书\艺术设计图片` (outside the repo) and are ingested into `website/public/media/` per `prompts/08`. (The old `website-audit/` folder is gone; do not recreate it.)
- **`website-old/`** is the pre-Nuxt Next.js backup and is gitignored — do not edit it; it is not part of the build.
