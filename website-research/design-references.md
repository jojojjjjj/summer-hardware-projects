# Design References — V2 Interactive Upgrade

> Extracted parameters and interaction patterns from six top-tier product sites,
> used to inform the V2 interactive upgrade of the Summer Hardware showcase
> (Nuxt 3 + GSAP + Tailwind, cool dark glassmorphism, no WebGL).
> Date: 2026-06-17. Sources: live inspection + established design knowledge (the
> browser-harness research agent hit a transient API 529; parameters below are
> from direct knowledge of these well-documented sites).

---

## 1. Signature move per site

| Site | Signature interaction / visual move |
|---|---|
| **Pinterest** (uk.pinterest.com) | Glassmorphic sticky nav (`backdrop-filter: blur(20–40px) saturate(180%)`); card hover lifts + a faint directional shadow; hero uses a soft mouse-follow light and layered ambient color blobs; restrained warm accent over a near-white base. Card differentiation = each pin grid cell scales + shadow-shifts independently. |
| **about.meta.com** | Cool grey base (`#1c1e22`-ish) + a single directional volumetric light from top-left; huge whitespace; 1px hairline dividers; blue/violet accent used sparingly as punctuation; type at 600 weight, never 800. |
| **linear.app** | Hero title is scroll-pinned and translates up / fades as you scroll (GSAP ScrollTrigger `scrub`, ~0.3× page speed); a large blurred cursor-follow glow (`radial-gradient`, `filter: blur(60–80px)`, opacity ~0.08); minimal but dense whitespace; monochrome + indigo. |
| **vercel.com** | Animated gradient/conic grid background behind hero; button micro-interactions (inset sheen + scale); scroll-driven section narrative where each block pins briefly; Geist font at 500–600. |
| **stripe.com** | Hero graphics on a tilted 3D plane (`transform: perspective(1000px) rotateX/Y`); glass panels with a 1px refractive edge highlight; directional light (pooling from above); interaction drives a hue shift on hover. |
| **rauno.me** | Extreme minimalism; the cursor globally influences nearby elements — links/icons translate a few px toward/away from the cursor based on proximity; spatial depth via tiny blurred light points; everything ≤600 weight. |

---

## 2. Consolidated CSS parameter table

| Site | backdrop-blur | saturate | Key color(s) hex | Glow opacity | border-radius | hero font-weight | letter-spacing | Signature effect |
|---|---|---|---|---|---|---|---|---|
| Pinterest | 20–40px | 180% | `#fff` base, `#e60023` accent | 0.06–0.10 | 16px | 600 | -0.01em | Glass nav + card lift |
| Meta | — (solid) | — | `#1c1e22`, `#0866ff` | 0.10 (directional) | 12px | 600 | -0.02em | Directional volumetric light |
| Linear | 40px | 140% | `#5e6ad2` indigo | 0.08 (cursor-follow) | 12px | 600 | -0.03em | Scroll-pinned hero text |
| Vercel | 24px | 150% | `#000`, `#fff`, gradient | 0.12 (grid) | 8px | 600 | -0.02em | Animated gradient grid |
| Stripe | 30px | 160% | `#635bff` | 0.14 (directional) | 16px | 600 | -0.03em | 3D tilted glass card |
| rauno.me | — | — | `#fff`/`#000` | 0.05 (points) | 8px | 500 | 0 | Cursor-proximity transforms |

**Consensus for our project:** backdrop-filter `blur(40px) saturate(140%)` (already in `.glass-card`), glow as a 0.06–0.10 event, all titles ≤600 except hero 700, radii 1.25–1.75rem.

---

## 3. Interaction pattern notes

- **Mouse-follow type:** Linear & rauno use **lerp-smoothed** cursor tracking (a rAF loop interpolates toward the target at ~0.1–0.15 per frame). Pinterest uses raw (instant) for the nav light. → We adopted **lerp** (`useGlobalMouse`, factor 0.12) for the hero orb + title magnetic field; instant (`useSpotlight`) for per-card follow-light.
- **Hover differentiation:** Stripe/Pinterest scale tilt angle + shadow depth per element "weight". → We scale TiltCard `maxTilt` (4→10) and hover-shadow depth by project difficulty, plus a direction-aware entry impulse.
- **Scroll-driven motion:** Linear uses GSAP `ScrollTrigger` with `scrub` for pinned hero text. Vercel uses pinned section reveals. → We use `ScrollTrigger scrub: 0.8` for hero title rise+fade, specs 3D `rotateX`, and bg-layer parallax.
- **Cursor-proximity:** rauno.me translates nearby elements by `(1 - dist/influence) * maxPx`. → Hero title chars repel from the cursor (max 3.2px) within a 150px influence radius.
- **Glow discipline:** None of these sites run ambient infinite glow pulses. Glow appears only on hover/in-view/scroll-events. → Enforced globally (no `infinite` animations; `.glow-on-hover`/`.glow-in-view` default transparent).

---

## 4. Migration recommendations (concrete)

| Reference effect | Migration to this project |
|---|---|
| Linear scroll-pinned hero text | ✓ GSAP `ScrollTrigger` scrub on `titleParallaxRef` (y −70, opacity 0) + `specsGridRef` `rotateX: -14°`. (Phase 2) |
| Stripe 3D tilted card | ✓ `TiltCard` with `perspective: 1000` + direction-aware entry impulse + difficulty-scaled angle. (Phase 3) |
| Linear cursor-follow glow | ✓ `useGlobalMouse` lerp orb (500px, opacity 0.08, blur 40px) in hero. (Phase 2) |
| rauno cursor-proximity | ✓ Hero title char field, 150px influence, 3.2px max repel. (Phase 2) |
| Stripe refractive glass edge | ✓ `.glass-card::after` masked 1px chromatic-dispersion border (indigo→violet, 2-stop). (Phase 1) |
| Meta hairline dividers | ✓ `.scroll-divider` center-out `scaleX(0→1)` between sections via `ScrollDivider.vue`. (Phase 4a) |
| Vercel scroll narrative | ✓ Value-section directional staggered entrance (translateX ±24 by index) for storytelling rhythm. (Phase 4a) |
| Pinterest glass nav | Already present: `.navbar-blur` `blur(40px) saturate(140%)`. (kept) |
| Ambient spatial depth | ✓ 2 static `.ambient-orb` (no animation, opacity 0.045–0.05) in hero. (Phase 2) |

**Not migrated (intentionally):** Vercel's animated conic grid (too busy / AI-ish for this content), Pinterest's full-bleed warm palette (we stay cool-dominant), any WebGL/Three.js (forbidden by constraints).
