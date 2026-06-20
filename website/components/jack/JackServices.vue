<template>
  <!-- 12 · JackServices rewrite (approach C — "Lean Ambient Drawer").
       One faint clock-motion ambient video (the same clock motif as
       ClockVideoBand immediately before this section) behind five
       liquid-glass accordion drawers. BlurText title, quiet mono counter.
       The leanness is the feature: ONE video (not a crossfade queue),
       ONE expanded drawer (not a sticky-stack), ONE counter (not per-stage
       watermarks). Accordion is the only interaction — no ScrollTrigger,
       no GSAP for the drawers (CSS max-height transition). SSG-safe: with
       zero JS, openIndex=0 renders stage 1 fully expanded + 4 collapsed
       headers in the static HTML (v-show, not v-if). JackFadeIn + BlurText
       each self-gate on useReducedMotion; the 2 .ambient-orb are static
       (NEVER animated). MediaSlot is FROZEN — used verbatim. Premium dark
       Jack-flow (cool indigo/blue/violet only). -->
  <section
    id="services"
    class="relative z-0 overflow-hidden bg-background text-text-primary px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24"
  >
    <!-- AMBIENT VIDEO LAYER — single FROZEN MediaSlot, faint background
         texture (the clock mechanism reads as a ghost, not a focal). The
         82% dark-indigo scrim + 0.4 noise pushes it to barely-there behind
         the glass drawers. MediaSlot already does IO play/pause,
         pointer:fine gate, and reduced-motion→poster. -->
    <MediaSlot
      class="absolute inset-0 z-0"
      mode="bg-autoplay"
      poster="/media/clock-banner.webp"
      src="/media/clock-motion.mp4"
      :noise="true"
      :noise-opacity="0.4"
      overlay-class="bg-[#0b0d12]/82"
    />

    <!-- Static ambient depth — NEVER animated (per main.css .ambient-orb).
         These survive even when the video is gated off so the section
         never goes flat. -->
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

    <!-- CONTENT WRAPPER — z-10 sits above the z-0 video/scrim/orbs. -->
    <div class="relative z-10 mx-auto max-w-4xl">

      <!-- HEADER (preserved verbatim — already matches the dark Jack flow) -->
      <div class="relative mx-auto mb-10 sm:mb-12 md:mb-14 text-center">
        <JackFadeIn :tag="'div'" :y="20" :duration="0.7">
          <span class="eyebrow inline-block mb-5">课程阶段 · COURSE STAGES</span>
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
        <span class="font-mono text-xs tracking-[0.2em] text-text-tertiary">
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
                  <span class="font-mono uppercase tracking-[0.18em] text-text-tertiary truncate" style="font-size: clamp(0.62rem, 1.6vw, 0.72rem);">
                    {{ stage.titleEn }}
                  </span>
                </span>

                <!-- Spacer pushes badge + chevron to the right -->
                <span class="flex-1" />

                <!-- Days badge -->
                <span
                  class="font-mono text-xs px-2 py-0.5 rounded-full shrink-0"
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
                <p class="text-text-tertiary leading-relaxed mb-4" style="font-size: clamp(0.78rem, 1vw, 0.88rem);">
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
                    <span class="text-text-secondary" style="font-size: clamp(0.8rem, 1vw, 0.9rem);">{{ bullet }}</span>
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
import { ref } from 'vue'
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
