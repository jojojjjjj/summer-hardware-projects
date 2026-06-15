# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A curriculum-generation repository for a summer hardware practicum aimed at high school students (ages ~16, zero-to-weak technical background). It uses **Claude Code Teams mode** to auto-generate 3 complete, reproducible project course-packs — each containing daily lesson plans, hardware BOMs, code scaffolding, and grading rubrics.

**There is no application code to build, lint, or test.** The deliverables are Markdown documents and optional code templates inside `project-NN-[name]/` folders.

---

## Core Constraints (always enforce)

| Constraint | Value |
|---|---|
| Hardware cost per kit | < ¥500 |
| Project duration | 10–20 days (full-time camp) |
| Student level | High school, zero/weak foundation |
| Documentation language | Bilingual Chinese-English |
| Open-source basis | Must be adapted from a real community project |
| Reproducibility | MVP completable in a standard summer camp |

---

## Repository Architecture

```
prompts/            # Pipeline control prompts (source of truth for the generation workflow)
  00_MASTER_PROMPT.md   # Entry point — paste into Claude Code Teams mode to kick off all 3 phases
  01_agent_roles.md     # Defines the 8 specialist agent roles
  02_research_phase.md  # Phase 1: parallel project research
  03_evaluation_phase.md # Phase 2: feasibility scoring + top-3 selection
  04_project_build_phase.md # Phase 3: generate full course-pack per selected project

reports/            # Phase outputs (committed artifacts, not intermediate)
  01_research_raw.md        # Combined raw research from both researchers
  01a_research_desktop_speaker.md  # Researcher A: desktop pet / smart speaker
  01b_research_iot_cv.md           # Researcher B: IoT / computer vision
  02_feasibility_report.md         # Scored evaluation matrix
  03_top3_selection.md             # Final top-3 recommendation

project-01..08-[name]/   # Generated course-packs (created in Phase 3)
  README.md               # Project overview
  curriculum/             # Day-by-day lesson plan, checkpoints
  hardware/               # BOM, wiring diagrams, sourcing links
  software/               # Runnable code scaffold
  assignments/            # Homework + grading rubric

.claude/
  agents/                 # 8 specialist agent definitions (project-manager, frontend-dev, backend-dev, etc.)
  teams/summer-project/   # Team config (lead: project-manager, maxConcurrent: 3)
```

---

## Three-Phase Pipeline

Run by pasting `prompts/00_MASTER_PROMPT.md` into Claude Code Teams mode:

1. **Research** — Researcher A (desktop pet + smart speaker) and Researcher B (IoT + CV) each find ≥8 real open-source projects. Output → `reports/01_*.md`
2. **Evaluation** — Feasibility Analyst scores candidates on 6 weighted dimensions (tech feasibility 25%, cost 20%, pedagogical value 20%, community 15%, fun 10%, extensibility 10%). Output → `reports/02_*.md` + `reports/03_*.md`
3. **Build** — Curriculum Designer + Technical Architect + Hardware Expert generate full course-packs for the top 3 projects. Output → `project-01..03-[name]/`

---

## Agent Roles (in `.claude/agents/`)

| Agent | Role | Key constraint |
|---|---|---|
| project-manager | Coordination, milestone tracking | Read-only tools |
| frontend-dev | UI/web components for projects | npm/npx access |
| backend-dev | API, DB, server logic | Python/pip access |
| data-engineer | Data collection, cleaning, viz | Python/pip access |
| ml-engineer | Model training/deploy | Python/pip access |
| qa-engineer | Testing, bug tracking | Python/npm access |
| devops | Environment, CI/CD, deploy | Docker/npm/git access |
| tech-writer | Documentation, reports | Read/write access |

---

## Working With This Repo

- **Modifying the pipeline**: edit files in `prompts/` — these are the source of truth. `00_MASTER_PROMPT.md` is the orchestration entry point.
- **Reviewing research/evaluation**: check `reports/`. Reports are committed artifacts, not scratch work.
- **Editing generated course-packs**: each `project-NN-[name]/` folder is self-contained. Follow the folder structure in the template above.
- **Bilingual requirement**: every deliverable must have both Chinese and English content.
- **Scaffolding principle** ("笨鸟先飞"): every step in curriculum docs must explain *why*, not just *how*. Include prerequisite checklists, common error guides, and debugging tips.
- **College-level rigor**: course-packs must include formal project proposals, weekly check-in reports, final demo + presentation specs, and Git workflow conventions.
