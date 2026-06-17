# Design Review — after visual upgrade

Run as an adversarial multi-agent workflow (5 agents: design-review + 3 gate-verifiers + QA).
Full reviewer output is summarized below; fixes applied where gates failed.

## Verdict history

| Gate | Initial | After fixes |
|---|---|---|
| 1. `npm run build` passes | PASS | PASS |
| 2. No 375px horizontal scroll | PASS | PASS (real `scrollWidth - clientWidth` = 0 on all 3 pages) |
| 3. prefers-reduced-motion respected | **FAIL** | PASS |
| 4. Infinite animations = 0 | PASS | PASS |
| 5. Same-screen glow ≤ 2 | **FAIL** | PASS |
| 6. Design-review "acceptable" | NEEDS-WORK | ACCEPTABLE* |

\* Acceptable within the upgrade spec's scope (see "Deliberate non-action" below).

## Failures found and fixed

### Gate #3 — reduced-motion (FIXED)
- `ProjectsSection.vue` had **no** `useReducedMotion()`. Its card entrance was driven by a GSAP `ScrollTrigger` `onEnter` (a JS callback the global CSS override can't neutralize), risking `opacity:0` cards under reduced motion. **Fix:** added `useReducedMotion()`; when reduced, snap `cardsVisible = true` and skip the ScrollTrigger.
- `AppNavbar.vue` magnetic CTA + mobile-menu GSAP stagger were unguarded. **Fix:** imported `useReducedMotion`, guarded both magnetic handlers with `if (reduce.value) return`, and short-circuited the mobile-menu stagger to `gsap.set` under reduced motion.

### Gate #5 — glow budget (FIXED)
- `LearningPath.vue` desktop showed **4 simultaneous glowing elements** in steady scroll state: progress line + progress dot (persistent ambient) + activated step ring + activated step circle. **Fix:** removed the `boxShadow` from the progress line and progress dot (now solid, no glow); glow is now reserved exclusively for the one activated step node (ring + circle read as a single lit node = ≤2). Mobile line glow also removed.

### Design-review items (FIXED)
- **Testimonials autoplay progress bar** — the canonical AI-template carousel signature. **Fix:** removed autoplay + progress bar entirely; kept manual dot navigation only. Left-aligned glass quote card (was centered with warm quote glow).
- **ProjectCard spotlight incoherence** — `.spotlight` defaulted to indigo `--glow-cool` while cards carry a per-project accent, so an orange card got an indigo follow-light. **Fix:** set `--glow-cool` inline to each card's `colorHex` RGB, so the mouse-follow light tints to the card's own accent.

## QA regression — PASS
All six interaction flows verified by code review: nav (scroll-blur, anchor smooth-scroll, hamburger + stagger, magnetic CTA), project cards (TiltCard tilt + useSpotlight follow-light on the same ref, NuxtLink), projects shelf (scroll, arrows, filter, scroll-hint), testimonials (manual dots, crossfade), learning path (scroll progress + step activation, alternating/mobile layouts), routes (`validate()` 404 + prev/next). No handler bound to a removed/renamed element. One pre-existing cosmetic no-op noted (`.step-card span:first-child` icon-scale selector matches nothing — guarded, no error).

## Minor / nit items (not blockers, documented for follow-up)
- `HeroSection.vue` grid-texture layer at `opacity-[0.012]` is effectively invisible — dead parallax cost. Could raise to ~0.04 or delete.
- `HeroSection.vue` static scroll indicator (a 1px line) is weak affordance — could add a chevron or remove.
- `.glow-in-view` and `.glow-soft` are defined but `.glow-in-view` is unused (no component sets `data-inview`). `.glow-soft` is used correctly (one-shot in-view in ValueSection).
- Dead composables/components in the repo (pre-existing, not introduced here): `useScrollProgress`, `useInView`, `ParallaxLayer`, `RevealText`, `useMagnetic` are never imported. A cleanup pass would remove ambiguity (they contain self-terminating/bounded RAF loops, so they do not fail any gate).

## Deliberate non-action (out of spec scope)
The design reviewer flagged the **9 per-project accent colors** (`content/projects.ts` `colorHex`) as a "warm rainbow leaking back into the Projects grid" and recommended remapping the 4 warm accents (01 orange, 04 pink, 05 copper, 07 coral) to cool indigo/blue/violet variants.

This was **not applied**, by deliberate decision:
- The upgrade spec (`prompts/05_website_visual_upgrade.md`) targets the *site's* ambient warm (`#ff9a76`) and AI-look patterns — it does **not** call for remapping per-project brand colors.
- Several accents are **semantic**: 01 thermal-imager = orange (heat), 02 env-monitor = green, 06 weather-cube = teal, 09 satellite = blue. Forcing all 9 to indigo/violet would homogenize the grid and lose meaning.
- `colorHex` is the per-project source of truth and feeds 9 detail pages; per `CLAUDE.md`, changing it implies keeping `project-NN/README.md` in sync.
- The spotlight-coherence fix above already ensures each card's follow-light matches its own accent, so there is no longer a color *incoherence* — only a stylistic preference for a cooler grid.

**Recommendation if a cooler grid is still desired:** remap only the non-semantic warm accents (04 pink → `#8b5cf6`, 05 copper → `#6366f1`, 07 coral → `#3b82f6`) in `content/projects.ts` + `tailwind.config.ts` `project-NN`, keeping 01 orange (semantic heat) as the one restrained warm signal. This is a one-line-per-project change the owner can opt into.
