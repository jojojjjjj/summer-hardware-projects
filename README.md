# Summer Hardware Projects for High School

高中生暑期硬件实践课程资源库 — 一套面向零基础高中生的 10-20 天全日制硬件项目课程。

> A summer hardware practicum resource library for high school students — 10-20 day intensive, project-based courses designed for beginners.

---

## What's Inside

Three project modules with increasing difficulty, each covering a different tech domain:

| # | Project | Domain | Difficulty | Core Tech | Cost |
|---|---------|--------|------------|-----------|------|
| 01 | **Smart Speaker "Xiao Zhi"** | Voice AI | ★★☆☆☆ | Whisper, Edge TTS, LLM API, Raspberry Pi | ¥350-400 |
| 02 | **Environmental Monitor "Air Butler"** | IoT | ★★★☆☆ | ESP32, MicroPython, MQTT, Grafana | ¥250-350 |
| 03 | **Gesture Interactive "Magic Gesture"** | Computer Vision | ★★★★☆ | MediaPipe, OpenCV, Python | ¥300-500 |

Each module includes a complete 12-day curriculum with daily plans, code scaffolding, hardware BOM, wiring guides, assignments, and grading rubrics.

---

## Repository Structure

```
├── prompts/              # Claude Code Teams prompts used to generate content
├── reports/              # Research, feasibility reports, project selection
├── project-01-speaker/   # Smart Speaker module
├── project-02-env-monitor-mid/   # Environmental Monitor module (fully built)
│   ├── curriculum/       # 12-day daily lesson plans
│   ├── hardware/         # BOM, wiring guide, assembly steps
│   ├── software/         # MicroPython code (sensors, MQTT, display)
│   └── assignments/      # Check-ins, rubrics, final presentation
└── project-03-gesture/   # Gesture Interactive module
```

---

## Design Principles

- **Fine-grained scaffolding** — Every step explains *why*, not just *how*, with expected results at each checkpoint
- **Real-world projects** — Adapted from proven open-source projects (ESPHome, Whisper, MediaPipe, etc.)
- **College-level rigor** — Includes project proposals, weekly check-ins, final presentations, and Git workflow
- **Budget-friendly** — All projects under ¥500 per kit

---

## Quick Start

1. Browse the reports in `reports/` to understand the project selection process
2. Pick a project module that matches your students' level
3. Start with Day 1 in `project-XX/curriculum/day-01.md`
4. Follow the daily plans — each day has morning/afternoon/evening sessions with clear deliverables

---

## Tech Stack Coverage

| Skill | Smart Speaker | Env Monitor | Gesture |
|-------|:---:|:---:|:---:|
| Python | ✅ | ✅ | ✅ |
| Linux basics | ✅ | ✅ | ✅ |
| Hardware wiring | ✅ | ✅ | ✅ |
| AI/ML concepts | ✅ | — | ✅ |
| IoT protocols | — | ✅ | — |
| Sensors | — | ✅ | — |
| Data visualization | — | ✅ | ✅ |
| Computer vision | — | — | ✅ |
| API integration | ✅ | ✅ | — |
| Git version control | ✅ | ✅ | ✅ |

---

## License

MIT

---

*Generated with Claude Code Teams Mode | Bilingual (Chinese / English)*
