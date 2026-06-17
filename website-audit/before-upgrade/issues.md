# Baseline issues — before visual upgrade

Captured from `npm run dev` at 3 breakpoints (375 / 768 / 1440) before any changes.
See sibling `*.png` screenshots.

## "AI-generated look" problems found in the code

### Ambient / infinite motion (violates "no breathing")
- `tailwind.config.ts` — `shimmer`, `float`, `pulse-soft`, `glow-pulse`, `gradient-shift` animations all declared `infinite`.
- `HeroSection.vue:5` — hero background `radial-gradient` with `animation: gradientShift 8s ease infinite`.
- `HeroSection.vue:200` — GSAP scroll-indicator `repeat: -1` float.
- `ValueSection.vue:92` — `animate-breathe` on the oversized number watermark.
- `ValueSection.vue:200` — `animate-[spin_8s_linear_infinite]` conic-gradient border on the data-point.
- `LearningPath.vue:51,74` — `pulseSoft 2s ease-in-out infinite` on progress-line dot indicators.
- `LearningPath.vue:164,224` — `animate-ping` (Tailwind built-in, infinite) on active timeline nodes.
- `CtaSection.vue:17` — `animate-[spin_12s_linear_infinite]` conic border around the CTA card.
- `CtaSection.vue:49-54` — six `animate-float` decorative orbs.
- `CtaSection.vue:59` — `animate-gradient-shift` infinite gradient text on "开始".
- `ProjectsSection.vue:72` — `animate-pulse` on the scroll hint.

### Full-bleed warm radial backgrounds (cheap "AI glow")
- `HeroSection.vue:5` — two centered warm radials covering the whole hero.
- `ValueSection.vue:6-7` — two full-bleed warm radials in the intro; per-feature: 2 radials + 2 blurred orbs + a section-wide glow (`:31-79`).
- `LearningPath.vue:4-10` — three full-bleed warm radials + three blurred orbs.
- `TestimonialsSection.vue:7-12` — four warm radials + a warm glow behind the quotation mark.
- `CtaSection.vue:4-6` — three large blurred warm orbs (peach / coral / honey) + internal warm washes.

### Gradient text overuse
- `text-gradient-warm` used in 6 locations: Hero specs (×3 desktop + mobile), ValueSection intro heading, LearningPath step titles (×2), ProjectCard title hover, projects/index card title hover.
- Inline gradient clip text: ValueSection data-point value, CtaSection "开始", Testimonials quotation mark.

### Font weight 800 everywhere
- `.text-hero` `font-weight: 800`; `font-extrabold` on every section/subsection heading across all components and both pages (≈18 occurrences) — the heavy "AI title" look.

### Glass too light, saturate too high
- `.glass-card` `blur(20px) saturate(150%)`; `.navbar-blur` `blur(48px) saturate(200%)`; `.apple-blur` `blur(60px) saturate(220%)` — overly saturated, single-layer, no edge highlight.

### Always-on glow shadows
- `.glow-peach / .glow-coral / .glow-strong` and `.shadow-glow*` are ambient box-shadows (warm), applied as default state in several places rather than as hover/in-view events.

### Symmetry
- Hero, Testimonials, CTA, and all section intros are centered — the generic "every section centered" AI template.

### Layout bug (pre-existing)
- `pages/projects/[slug].vue` — the `text-9xl` titleEn watermark had no `overflow-hidden` on its container, causing **+50px horizontal page overflow at 375px**.

### Eyebrow repetition
- `.eyebrow` (with a warm `text-shadow` glow) repeated in every section + 4× on the detail page.

## Color temperature
- Base `#0a0a0b` warm-black; dominant warm peach/coral/honey throughout; essentially no cool accent.
