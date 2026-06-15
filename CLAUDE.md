# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A summer hardware practicum resource for high school students (~16, zero-to-weak technical background). The repo has two main halves:

1. **9 project course-packs** (`project-01..09-[name]/`) — each with curriculum, hardware BOMs, code scaffolding, and grading rubrics
2. **A Next.js showcase website** (`website/`) — deployed as static HTML to GitHub Pages at `/summer-hardware-projects`

All deliverables are bilingual Chinese-English. Content follows the "笨鸟先飞" (fine-grained scaffolding) principle: explain *why*, not just *how*.

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
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # Static export → ../docs/ (via next.config.js output:'export')
npm run start     # Serve the production build locally
npm run lint      # ESLint with next/core-web-vitals
```

### Visual verification (from repo root)

```bash
node verify-screenshot.js   # Playwright script — captures screenshots to verify/
```

### Deployment

- `npm run build` produces static HTML in `docs/`
- `docs/` is served via GitHub Pages (basePath: `/summer-hardware-projects`)
- The `.nojekyll` file in `docs/` disables Jekyll processing
- `next.config.js` conditionally sets `basePath` — empty in dev, `/summer-hardware-projects` in production

---

## Website Architecture

**Stack**: Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide icons

**Routes** (App Router):

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Landing page — hero, value props, projects, learning path, testimonials, CTA |
| `/projects` | `app/projects/page.tsx` | Project grid with difficulty filter |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | SSG detail pages via `generateStaticParams()` |

**Data layer**: `website/lib/projects-data.ts` — single source of truth for all 9 projects (types + data + helpers). If project content changes, update this file and the corresponding `project-NN/README.md`.

**Design system** (in `tailwind.config.ts`):
- "Electronic workbench" color palette (PCB gold, solder green, copper, rust, clay)
- Per-project accent colors (`project-01` through `project-09`) and tag colors
- Custom fonts: Inter + Noto Sans SC (body), JetBrains Mono (code)
- Custom animations: gradient-flow, marquee, fade-in; custom shadows: card, card-hover, glow

**Path alias**: `@/*` maps to `website/*` (tsconfig.json)

---

## 9 Projects

| # | Slug | Name | Difficulty | MCU |
|---|---|---|---|---|
| 01 | binocular-thermal-imager | ThermalEyes | 3/5 Intermediate | STM32F411 |
| 02 | env-monitor | Air Butler | 2/5 Basic | ESP32 |
| 03 | 4mode-keyboard | FantasyKB | 4/5 Advanced | STM32 |
| 04 | pocket-signal-generator | TinyAWG | 5/5 Expert | FPGA |
| 05 | desktop-pet | Desktop Pet | 3/5 Intermediate | ESP32 |
| 06 | weather-cube | Weather Cube | 1/5 Beginner | ESP8266 |
| 07 | bipedal-wheeled-robot | WheelWalker | 5/5 Expert | STM32 |
| 08 | electronbot | ElectronBot | 5/5 Expert | STM32 |
| 09 | desk-satellite | Desk Satellite | 4/5 Advanced | ESP32 |

Each project folder follows: `README.md`, `curriculum/`, `hardware/`, `software/`, `assignments/` (some also have `resources/` or `advanced/`).

---

## Three-Phase Generation Pipeline

Run by pasting `prompts/00_MASTER_PROMPT.md` into Claude Code Teams mode:

1. **Research** — Two researchers find ≥8 open-source projects each. Output → `reports/01_*.md`
2. **Evaluation** — Feasibility scoring on 6 dimensions (tech 25%, cost 20%, pedagogy 20%, community 15%, fun 10%, extensibility 10%). Output → `reports/02_*.md` + `reports/03_*.md`
3. **Build** — Generate full course-packs. Output → `project-NN-[name]/`

The pipeline was used to produce the initial projects; the prompts in `prompts/` are the source of truth for re-running or modifying the workflow.

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

- **When adding/modifying a project**: update both the project folder's `README.md` and `website/lib/projects-data.ts` — they must stay in sync
- **Website deployment path**: the site lives at `/summer-hardware-projects` on GitHub Pages; local dev has no basePath
- **Static export constraints**: no `next/image` optimization (images unoptimized), all pages must be statically generatable
- **Bilingual requirement**: every deliverable must have both Chinese and English content
- **Scaffolding principle**: curriculum docs must include prerequisite checklists, common error guides, and debugging tips
- **College-level rigor**: course-packs must include formal project proposals, weekly check-in reports, final demo + presentation specs, and Git workflow conventions
- **Design audit artifacts**: `website-audit/` and `website-research/` contain competitive analysis and design specs — reference these when modifying visual design
