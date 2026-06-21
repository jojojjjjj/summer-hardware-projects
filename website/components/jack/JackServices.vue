<template>
  <!-- 12 · JackServices rewrite (approach C — "Diagonal Clip-Path Slash Accent").
       The V3 drawer accordion (5 glass drawers, one open, BlurText title, mono
       counter, 5-stage content) is PRESERVED VERBATIM — only the background
       video layer changed. The single full-bleed clock-motion <MediaSlot> is
       REPLACED with TWO peripheral diagonal slash accents (clip-path polygons)
       sitting in the section's negative-space gutters, OUTSIDE the centered
       max-w-4xl content column:
         · SLASH A (primary, lower-left): rainbow-moon.mp4 — a lunar/rainbow
           arc showcase texture maps onto the 5-stage climb metaphor.
         · SLASH B (secondary, upper-right): code-river.mp4 — lateral code flow
           vs. rainbow-moon's arc, so the overlap reads as two distinct textures.
       Both are vertical 1920×3414 portrait clips; the portrait aspect lets the
       diagonal polygon read as a tall slash rather than a cropped band. clip-path
       gives the angled-graphic read with ZERO bounding-box growth (the DOM box
       stays axis-aligned; only visible pixels are angled), so the section's
       existing overflow-hidden is the only overflow guarantee needed. The
       slashes are DECOR (aria-hidden + pointer-events-none) — the drawer
       accordion stays the unambiguous focal. SSG-safe: clip-path is inline CSS
       (renders in static HTML), MediaSlot gates to the poster <img> under
       pointer:coarse OR prefers-reduced-motion, JackFadeIn + BlurText each
       self-gate on useReducedMotion, the accordion uses v-show so stage 1's
       expanded panel is in the SSG HTML. MediaSlot is FROZEN — used verbatim.
       Premium dark Jack-flow (cool indigo/blue/violet only). -->
  <section
    id="services"
    class="relative z-0 overflow-hidden bg-background text-text-primary px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24"
  >
    <!-- Static ambient depth — NEVER animated (per main.css .ambient-orb).
         z-0 base layer; these survive even when both videos gate to posters so
         the section never goes flat. -->
    <div
      class="ambient-orb pointer-events-none"
      style="width: 520px; height: 520px; left: -8%; top: 10%; background: rgba(99,102,241,0.06);"
      aria-hidden="true"
    />
    <div
      class="ambient-orb pointer-events-none"
      style="width: 460px; height: 460px; right: -6%; bottom: 8%; background: rgba(139,92,246,0.05);"
      aria-hidden="true"
    />

    <!-- DIAGONAL SLASH ACCENTS — z-[1] sit above the z-0 orbs but below the
         z-10 content column. Each is a clipped MediaSlot (FROZEN, bg-autoplay
         self-gates: IO play/pause, pointer:fine, reduced-motion→poster).
         Negative offsets bleed past the section edge but are SAFE: section
         overflow-hidden clips them to the section box, never the viewport, so
         no page-level horizontal scroll can occur. pointer-events:none +
         aria-hidden so they never intercept drawer taps on touch.

         NOTE on entrance: the slashes are STATIC (no JackFadeIn wrapper). A
         transform-based entrance (JackFadeIn applies gsap x/y) would establish
         a containing block on its wrapper, making the absolute slash resolve
         its left/bottom against the wrapper instead of the section — a layout
         risk. The plan permits skipping the slash entrance ("optional, skip if
         it risks layout"). The drawers keep their JackFadeIn stagger; the
         slashes are always-present decor. SSG-safe: visible in the no-JS
         baseline (clip-path is inline CSS, MediaSlot poster <img> renders). -->

    <!-- SLASH A (primary, lower-left) — rainbow-moon. 6-point parallelogram-ish
         slash running lower-left → upper-right (an upward vector that
         foreshadows the 5-stage progression the drawers describe). -->
    <div
      class="slash-a pointer-events-none absolute z-[1]"
      aria-hidden="true"
      :style="slashAStyle"
    >
      <MediaSlot
        class="h-full w-full"
        mode="bg-autoplay"
        poster="/media/rainbow-moon-hd.webp"
        src="/media/rainbow-moon.mp4"
        :noise="true"
        :noise-opacity="0.32"
        overlay-class="bg-[#0b0d12]/68"
      />
    </div>

    <!-- SLASH B (secondary, upper-right) — code-river. Thinner counter-slanted
         polygon running upper-right → lower-left, intersecting/overlapping
         Slash A near the vertical center for the Neo-style overlap. Slightly
         heavier scrim so B reads as secondary to A. -->
    <div
      class="slash-b pointer-events-none absolute z-[1]"
      aria-hidden="true"
      :style="slashBStyle"
    >
      <MediaSlot
        class="h-full w-full"
        mode="bg-autoplay"
        poster="/media/code-river-hd.webp"
        src="/media/code-river.mp4"
        :noise="true"
        :noise-opacity="0.34"
        overlay-class="bg-[#0b0d12]/72"
      />
    </div>

    <!-- CONTENT WRAPPER — z-10 sits above the z-0 orbs + z-[1] slashes.
         Drawers sit on solid bg-background (#0b0d12) — a flat high-contrast
         surface — so text remains at full V3 contrast (no text sits on the
         slashes; the slash scrims tone the VIDEO into the cool palette, they
         do not protect text). -->
    <div class="relative z-10 mx-auto max-w-4xl">

      <!-- HEADER (preserved verbatim — already matches the dark Jack flow) -->
      <div class="relative mx-auto mb-10 sm:mb-12 md:mb-14 text-center">
        <JackFadeIn :tag="'div'" :y="20" :duration="0.7">
          <span class="eyebrow inline-block mb-5 js-services-eyebrow">课程阶段 · COURSE STAGES</span>
        </JackFadeIn>
        <BlurText
          text="课程阶段"
          as="h2"
          :delay="0.05"
          class="hero-heading font-black uppercase tracking-tight"
          :style="{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1.05 }"
        />
        <JackFadeIn :tag="'p'" :delay="0.2" :y="16" :duration="0.7" class="mt-5 mx-auto max-w-2xl text-text-tertiary leading-relaxed" style="font-size: clamp(0.85rem, 1.4vw, 1.05rem);">
          15 天，五个阶段，从调研到答辩的全闭环工程训练。
          <span class="block mt-1 opacity-70">15 days, five stages — a full engineering loop from research to defense.</span>
        </JackFadeIn>
      </div>

      <!-- QUIET MONO COUNTER (Neo's "01 / 05" chapter counter, demoted
           from a giant watermark to a single section-level readout). -->
      <JackFadeIn :tag="'div'" :delay="0.15" :y="10" :duration="0.6" class="flex justify-end mb-3">
        <span class="font-mono text-xs tracking-[0.2em] text-text-tertiary js-stage-counter">
          {{ String(openIndex + 1).padStart(2, '0') }}
          <span class="opacity-40">/ 05</span>
        </span>
      </JackFadeIn>

      <!-- ACCORDION DRAWERS — Neo chapter-list × Aetheris liquid-glass.
           One shared state: openIndex (default 0 = stage 1 expanded on
           mount, gives an immediate "what's inside" without a click).
           Clicking a collapsed row opens it; clicking the open row closes
           it (openIndex = -1). No auto-advance timer. -->
      <div class="flex flex-col">

        <JackFadeIn
          v-for="(stage, i) in stages"
          :key="i"
          :tag="'div'"
          :delay="0.1 + i * 0.08"
          :duration="0.6"
          :y="20"
          :class="['relative', i < stages.length - 1 ? 'border-b border-white/[0.06]' : '']"
        >
          <!-- Row trigger: real <button>, keyboard-focusable, aria-expanded.
               The liquid-glass surface IS .glass-card (no new CSS). -->
          <button
            type="button"
            class="glass-card w-full text-left rounded-2xl p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none"
            :class="openIndex === i
              ? 'glow-soft'
              : 'opacity-80 hover:opacity-100'"
            :aria-expanded="openIndex === i"
            :aria-controls="`stage-panel-${i}`"
            @click="toggle(i)"
          >
            <div class="glass-card__inner relative z-[1]">
              <!-- ROW HEADER (always visible, clickable): mono counter +
                   icon chip + CN title + EN mono label (left), days badge
                   + chevron (right). -->
              <div class="flex items-center gap-3 sm:gap-4">
                <!-- Mono counter: bright when open, muted when closed -->
                <span
                  class="font-mono text-sm shrink-0 transition-opacity duration-300"
                  :style="{ color: stage.color, opacity: openIndex === i ? 1 : 0.5 }"
                >{{ String(i + 1).padStart(2, '0') }}</span>

                <!-- Icon chip -->
                <span
                  class="inline-flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
                  :style="{ backgroundColor: stage.color + '26', color: stage.color }"
                >
                  <component :is="stage.icon" :size="16" />
                </span>

                <!-- Title CN + EN mono label -->
                <span class="flex flex-col min-w-0">
                  <span class="font-semibold text-text-primary leading-tight truncate" style="font-size: clamp(0.95rem, 3.5vw, 1.1rem);">
                    {{ stage.title }}
                  </span>
                  <span class="font-mono uppercase tracking-[0.18em] text-text-tertiary truncate js-stage-label-en" style="font-size: clamp(0.62rem, 1.6vw, 0.72rem);">
                    {{ stage.titleEn }}
                  </span>
                </span>

                <!-- Spacer pushes badge + chevron to the right -->
                <span class="flex-1" />

                <!-- Days badge -->
                <span
                  class="font-mono text-xs px-2 py-0.5 rounded-full shrink-0 js-stage-days"
                  :style="{ backgroundColor: stage.color + '1F', color: stage.color }"
                >{{ stage.days }}</span>

                <!-- Chevron (reads as "expand" — the actual affordance) -->
                <ChevronDown
                  :size="18"
                  class="text-text-tertiary shrink-0 transition-transform duration-300"
                  :class="{ 'rotate-180': openIndex === i }"
                />
              </div>

              <!-- EXPANDED PANEL (only the open drawer). v-show (NOT v-if)
                   keeps the DOM for the SSG baseline + lets CSS
                   height-transition. Fixed 260px max-height — more robust
                   than measuring (no ResizeObserver, no layout-jank). -->
              <div
                :id="`stage-panel-${i}`"
                v-show="openIndex === i"
                class="overflow-hidden"
                :class="reduce ? '' : 'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'"
                :style="{
                  maxHeight: openIndex === i ? '260px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }"
              >
                <!-- 3px accent top cap -->
                <span
                  class="block h-[3px] rounded-full my-4"
                  :style="{ backgroundColor: stage.color + '4D' }"
                  aria-hidden="true"
                />
                <!-- Description CN -->
                <p class="text-text-secondary leading-relaxed mb-1" style="font-size: clamp(0.85rem, 1.2vw, 0.98rem);">
                  {{ stage.description }}
                </p>
                <!-- Description EN -->
                <p class="text-text-tertiary leading-relaxed mb-4 js-stage-desc-en" style="font-size: clamp(0.78rem, 1vw, 0.88rem);">
                  {{ stage.descriptionEn }}
                </p>
                <!-- Bullets (dot + text pattern verbatim) -->
                <ul class="flex flex-col gap-1.5">
                  <li
                    v-for="bullet in stage.bullets"
                    :key="bullet"
                    class="flex items-center gap-2.5"
                  >
                    <span
                      class="h-1.5 w-1.5 rounded-full shrink-0"
                      :style="{ backgroundColor: stage.color + '66' }"
                      aria-hidden="true"
                    />
                    <span class="text-text-secondary js-stage-bullet" style="font-size: clamp(0.8rem, 1vw, 0.9rem);">{{ bullet }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </button>
        </JackFadeIn>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Cpu, Code2, Sparkles, Presentation, ChevronDown } from 'lucide-vue-next'
import type { Component } from 'vue'
import BlurText from './BlurText.vue'
import JackFadeIn from './JackFadeIn.vue'

interface Stage {
  days: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  color: string
  icon: Component
  bullets: string[]
}

// 5 STAGES — preserved VERBATIM (days / title / titleEn / description /
// descriptionEn / color / icon / bullets). Do not touch.
const stages: Stage[] = [
  {
    days: 'Day 1-3',
    title: '项目调研与选型',
    titleEn: 'Research & Selection',
    description: '研究开源项目，评估可行性，选择最适合的技术方案与硬件平台',
    descriptionEn: 'Research open-source projects, evaluate feasibility, and select the optimal technical approach and hardware platform',
    color: '#6366f1',
    icon: Search,
    bullets: ['开源项目调研', '可行性评估', '技术方案确定'],
  },
  {
    days: 'Day 4-6',
    title: '硬件搭建与调试',
    titleEn: 'Hardware Build',
    description: '元器件选型、电路搭建、接线调试，让硬件跑起来',
    descriptionEn: 'Component selection, circuit assembly, and wiring debug — get the hardware running',
    color: '#3b82f6',
    icon: Cpu,
    bullets: ['元器件选型', '电路搭建', '接线调试'],
  },
  {
    days: 'Day 7-9',
    title: '软件开发与集成',
    titleEn: 'Software Dev',
    description: '固件编写、传感器集成、模块调试，让系统联动起来',
    descriptionEn: 'Firmware coding, sensor integration, and module debug — make the system work as a whole',
    color: '#8b5cf6',
    icon: Code2,
    bullets: ['固件编写', '传感器集成', '模块调试'],
  },
  {
    days: 'Day 10-12',
    title: '系统优化与完善',
    titleEn: 'System Optimize',
    description: '性能调优、边界测试、细节打磨，让产品稳定可靠',
    descriptionEn: 'Performance tuning, edge-case testing, and polish — make the product stable and reliable',
    color: '#9aa3d4',
    icon: Sparkles,
    bullets: ['性能调优', '边界测试', '细节打磨'],
  },
  {
    days: 'Day 13-15',
    title: '文档撰写与展示',
    titleEn: 'Docs & Demo',
    description: '技术文档、最终演示、项目答辩，完成从做到讲的全闭环',
    descriptionEn: 'Technical documentation, final demo, and project defense — close the loop from doing to presenting',
    color: '#a5aceb',
    icon: Presentation,
    bullets: ['技术文档', '最终演示', '项目答辩'],
  },
]

// ONE shared accordion state. Default 0 = stage 1 expanded on mount (SSG
// baseline renders it expanded even with zero JS). Clicking a collapsed
// row opens it; clicking the open row closes it (openIndex = -1).
const openIndex = ref(0)

// ── DIAGONAL SLASH ACCENT STYLES (approach C) ──
// Pure CSS clip-path + min()/clamp() sizing — renders in the SSG HTML
// baseline (no window at render top-level), so the diagonal graphic
// composition holds with zero JS. Position offsets (left/right/top/bottom)
// live in the scoped <style> below so a mobile media query can tighten the
// negative bleed; the clip-path + dimensions are inline here per the plan.
//
// SLASH A — primary lower-left slash (rainbow-moon). 6-point parallelogram
// running lower-left → upper-right. width/height capped via min() so a very
// tall phone never stretches the slash beyond the section height.
const slashAStyle = computed(() => ({
  clipPath: 'polygon(0 22%, 58% 0, 100% 30%, 100% 78%, 46% 100%, 0 74%)',
  width: 'min(52vw, 620px)',
  height: 'min(62vh, 560px)',
}))

// SLASH B — secondary upper-right counter-slash (code-river). Thinner
// polygon running upper-right → lower-left, overlapping Slash A near the
// vertical center.
const slashBStyle = computed(() => ({
  clipPath: 'polygon(8% 0, 100% 18%, 92% 100%, 0 82%)',
  width: 'min(40vw, 440px)',
  height: 'min(48vh, 420px)',
}))

// Reduced-motion gate. MediaSlot internally flips to the poster <img>
// under reduced-motion / coarse-pointer; BlurText + JackFadeIn leave
// content visible; here we drop the max-height transition so the panel
// snaps open instantly (the global main.css media query already forces
// transition-duration:0.001ms, this is belt-and-suspenders explicit).
const reduce = useReducedMotion()

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<style scoped>
/* ── DIAGONAL SLASH ACCENT POSITIONING (approach C) ──
   Position offsets ONLY (clip-path + dimensions are inline via :style per
   the plan). Desktop: negative offsets bleed the slashes past the section
   edge; SAFE because the parent <section> is overflow-hidden, so anything
   bleeding past left/right/bottom is clipped to the section box, never the
   viewport — no page-level horizontal scroll can occur. The DOM box stays
   axis-aligned (only visible pixels are angled via clip-path), so the
   bounding box does NOT grow the way a rotated element's would.
   Mobile (≤640px): tighten the bleed so the slash reads as an edge accent,
   not a wall — still bleeds, still fully clipped by the section. */
.slash-a {
  left: -6%;
  bottom: -8%;
}
.slash-b {
  right: -5%;
  top: 6%;
}

@media (max-width: 640px) {
  .slash-a { left: -10%; }
  .slash-b { right: -9%; }
}

/* 14 · mobile touch-up: stage-card typography uses inline clamp() with sub-13px
   floors (9.9px EN label, 12.5px EN desc, 12.8px bullets) and text-xs (12px)
   counter/days + the global .eyebrow (10-11px). Inline style beats Tailwind
   utilities, so each fix is a hook class + scoped @media(max-width:767px) with
   !important. Desktop (>=768px) is untouched — these rules never match there.
   Note: the section title "课程阶段" itself renders at 15px (mobile) / 17px
   (desktop) due to a pre-existing BlurText :style-forwarding bug; fixing that
   would change desktop, so it is FROZEN and these labels stay at 13px (clearly
   subordinate to the 15px title). */
@media (max-width: 767px) {
  .js-services-eyebrow { font-size: 13px !important; }
  .js-stage-counter { font-size: 13px !important; }
  .js-stage-label-en { font-size: 13px !important; }
  .js-stage-days { font-size: 13px !important; }
  .js-stage-desc-en { font-size: 13px !important; line-height: 1.55; }
  .js-stage-bullet { font-size: 13px !important; }
}
</style>
