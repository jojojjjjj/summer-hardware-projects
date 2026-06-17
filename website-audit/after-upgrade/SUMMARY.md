# Visual Upgrade — Summary

Upgrade of `website/` from a warm "Apple × Mimo" look toward a restrained, cool "Meta-style" language.
Goal: remove the "AI-generated look" (ambient warm glow, infinite breathing, gradient-text everywhere, centered symmetry) while keeping information architecture, routes, data, and GSAP skeleton intact.

## Quality gates (Section 七 of the prompt)

| # | Gate | Result |
|---|---|---|
| 1 | `npm run build` (`nuxt generate`) passes | ✅ 26 routes prerendered |
| 2 | No horizontal scrollbar at 375px | ✅ real `scrollWidth - clientWidth` = 0 on `/`, `/projects`, `/projects/[slug]` |
| 3 | `prefers-reduced-motion` respected | ✅ all GSAP entrances short-circuited; tilt/spotlight/magnetic disabled; testimonial autoplay removed |
| 4 | Infinite animations = 0 (loading excepted) | ✅ 0 (verified by adversarial grep) |
| 5 | Same-screen glowing elements ≤ 2 | ✅ (LearningPath glow capped; glow is event-only) |
| 6 | Design-review ≥ acceptable | ✅ ACCEPTABLE (see `design-review.md`) |

## Files changed

**Foundation (design tokens)**
- `assets/css/main.css` — cool deep-space palette (`#0b0d12`/`#11141b`), removed global `body::before` noise, rewrote `.glass-card` (double-layer 40px blur + inset highlight + 1px border), glow utilities now default-transparent event classes (`.glow-on-hover`, `.glow-in-view`, `.glow-soft`, `.spotlight`), added `.text-gradient-accent` (site-wide limit: Hero specs only), lowered typography weights (700, no 800), removed all `infinite` keyframe declarations, added `@supports` backdrop-filter fallback + global `prefers-reduced-motion` neutralizer.
- `tailwind.config.ts` — cool colors/bg/borders/text, added `cool-indigo/blue/violet`, cool indigo `shadow-glow*`, removed warm radial `backgroundImage` entries, `animation` map reduced to one-shot `forwards` only (dropped `float`/`pulse-soft`/`glow-pulse`/`gradient-shift`/`shimmer` infinite utilities), `display` weight 800→700.
- `composables/useSpotlight.ts` — **new**. Mouse-follow radial via `--mx`/`--my`; auto-disables under reduced-motion / coarse pointer; `data-glow` cool|warm.
- `composables/useReducedMotion.ts` — **new**. Reactive flag; used to short-circuit GSAP entrances.

**Components**
- `HeroSection.vue` — broke symmetry → left-aligned 7:5; replaced centered warm radials with a single directional cool volumetric light; specs numbers = the one gradient-text location; removed infinite `gradientShift` bg + infinite scroll-line float; reduced-motion short-circuit.
- `ValueSection.vue` — removed 2 full-bleed warm radials + per-feature radials/orbs/section-glow; glass icon tiles with one-shot in-view `.glow-soft` (tinted per-feature); removed `animate-breathe` watermark + spinning conic border + 2 gradient-text instances; alternating 5:7 layout.
- `LearningPath.vue` — removed 5 background warm radials/orbs; stopped `pulseSoft infinite` + `animate-ping` on nodes (now transition-based one-shot); **capped glow ≤2** (progress line/dot made solid/no-glow; only activated node glows); cool step palette.
- `ProjectsSection.vue` — cooled header blob + active filter; removed `animate-pulse` scroll hint; added reduced-motion short-circuit.
- `ProjectCard.vue` — hover-only mouse-follow spotlight (`useSpotlight`), removed default ambient glow overlay; `--glow-cool` set per-card to its accent (coherent follow-light); weights lowered.
- `TiltCard.vue` — glare strength 0.15→0.08, cool|warm via `data-glow`/`glow` prop; reduced-motion guard.
- `TestimonialsSection.vue` — left-aligned glass quote card (was centered warm-glow); **removed autoplay + progress bar** (AI carousel signature); manual dots only.
- `CtaSection.vue` — removed 3 large warm orbs + 6 `animate-float` orbs + spinning conic border + gradient "开始" text + warm inner glow; kept magnetic CTA as the one restrained warm accent; reduced-motion guard.
- `AppNavbar.vue` — cooled scroll divider + link hovers; magnetic CTA + mobile stagger reduced-motion guarded.
- `AppFooter.vue` — cool 1px top divider (was warm gradient); neutral hovers.

**Pages**
- `pages/projects/index.vue` — weights lowered, active filter cooled, card-title gradient hover removed.
- `pages/projects/[slug].vue` — weights lowered, hero radial dimmed, **fixed pre-existing +50px overflow** (`text-9xl` watermark now clipped via `overflow-hidden` + reduced to `text-8xl`), warm hovers neutralized.

## Before → after, at a glance
- **Color temperature:** warm peach/coral/honey dominant → cool deep-space grey + indigo/blue/violet, warm kept only on CTA buttons.
- **Hero:** centered, full-screen warm radial, infinite bg shift → left-aligned 7:5, single directional cool light, static.
- **Glass:** `blur(20px) saturate(150%)` single-layer → `blur(40px) saturate(140%)` + inset highlight + 1px border (double-layer concept).
- **Glow:** ambient warm box-shadows everywhere → default-transparent, appears only on hover / one-shot in-view (≤2 per screen).
- **Gradient text:** 6+ locations → 1 (Hero specs numbers).
- **Typography:** `font-extrabold` (800) on every heading → `font-bold` (700) everywhere.
- **Motion:** 11 infinite animations (shimmer/float/pulse/glow-pulse/gradient-shift/ping/breathe) + 1 GSAP `repeat:-1` → 0; entrances are one-shot with reduced-motion short-circuits.
- **Symmetry:** every section centered → Hero 7:5, Value/LearningPath alternating, Testimonials left-aligned.

## Audit artifacts
- `website-audit/before-upgrade/` — 9 screenshots (3 pages × 3 breakpoints) + `issues.md` + `screenshots.json`
- `website-audit/after-upgrade/` — 9 screenshots + `design-review.md` + this `SUMMARY.md` + `screenshots.json`
- `website-audit/screenshot-audit.mjs` — reusable multi-viewport capture tool

## Known issues / follow-ups (non-blocking)
1. **Per-project accent colors** remain a warm/cool mix (some semantic: 01 thermal=orange, 02 env=green, 06 weather=teal, 09 satellite=blue). The design reviewer suggested remapping the 4 warm accents to cool; **deliberately not applied** — out of spec scope, semantic value, and per-project sync burden. Spotlight-coherence is fixed so each card's follow-light matches its accent. See `design-review.md` for a one-line-per-project opt-in remap if a cooler grid is desired.
2. Hero grid-texture layer (`opacity-[0.012]`) is effectively invisible — minor dead parallax cost.
3. Hero static scroll indicator is a weak affordance (1px line) — could add a chevron or remove.
4. Pre-existing dead code (not introduced here): `useScrollProgress`, `useInView`, `ParallaxLayer`, `RevealText`, `useMagnetic` composables/components are never imported. Safe to delete in a cleanup pass.
5. Pre-existing cosmetic no-op: `LearningPath.vue` `.step-card span:first-child` icon-scale selector matches nothing (guarded; no error).
6. Screenshot tool's naive overflow measurement false-positives the Projects horizontal shelf (children of an `overflow-x-auto` container). The authoritative check (`documentElement.scrollWidth - clientWidth`) = 0 on all pages.
