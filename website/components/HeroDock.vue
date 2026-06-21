<template>
  <!-- 10v5 · Grain-blanket light-point shelf. The 9 project nodes are glowing
       light-point orbs (real 光点 — radial-gradient + additive glow, project
       colour) in a single-shell liquid-glass shelf — same glass material as the
       navbar/CTA (one design system). Hover → orb brightens + a rich frosted
       tooltip (titleZh + titleEn + difficulty). Pure DOM (no WebGL → no
       clipping ever). Shared-pointer parallax + blur-in entrance. The grain
       blanket (in HeroSection) unifies the video + shelf + copy into one
       film-still. -->
  <div ref="dockRef" class="hero-dock" :class="{ 'is-ready': ready }" role="navigation" aria-label="9 个硬件项目快速入口">
    <div class="hero-dock-shell">
      <button
        v-for="(p, i) in projects"
        :key="p.slug"
        ref="chipRefEls"
        class="dock-chip"
        :style="{ '--c': p.colorHex }"
        :aria-label="`${i + 1}. ${p.titleZh}`"
        @pointerenter="onHover(i)"
        @pointerleave="onLeave"
        @focus="onHover(i)"
        @blur="onLeave"
        @click="onClick(p.slug)"
      >
        <span class="dock-orb" />
      </button>
    </div>
    <Transition name="docktip">
      <div v-if="hovered" class="dock-tip" :style="{ left: tipX + 'px', '--c': hovered.color }">
        <span class="tip-orb" />
        <div class="tip-text">
          <span class="tip-title">{{ hovered.titleZh }}</span>
          <span class="tip-sub">{{ hovered.index }} · {{ hovered.titleEn }} · {{ hovered.difficultyLabel }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useGlobalMouse } from '~/composables/useGlobalMouse'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps<{
  projects: { slug: string; titleZh: string; titleEn: string; colorHex: string; difficultyLabel: string }[]
}>()

const router = useRouter()
const reduce = useReducedMotion()
const { x: mx, y: my, enabled: mouseEnabled } = useGlobalMouse(0.1)

const dockRef = ref<HTMLDivElement | null>(null)
const chipRefEls = ref<HTMLButtonElement[]>([])
const ready = ref(false)
const hovered = ref<{ titleZh: string; titleEn: string; difficultyLabel: string; color: string; index: string } | null>(null)
const tipX = ref(0)

function onHover(i: number) {
  const p = props.projects[i]
  hovered.value = { titleZh: p.titleZh, titleEn: p.titleEn, difficultyLabel: p.difficultyLabel, color: p.colorHex, index: String(i + 1).padStart(2, '0') }
  const chip = chipRefEls.value[i]
  const dock = dockRef.value
  if (chip && dock) {
    const r = chip.getBoundingClientRect()
    const d = dock.getBoundingClientRect()
    const raw = r.left + r.width / 2 - d.left
    // clamp so the tooltip can't clip off the dock's left/right edges
    tipX.value = Math.max(70, Math.min(d.width - 70, raw))
  }
}
function onLeave() {
  hovered.value = null
}
function onClick(slug: string) {
  router.push('/projects/' + slug)
}

let xTo: ((v: number) => void) | null = null
let yTo: ((v: number) => void) | null = null
let stopWatch: (() => void) | null = null

onMounted(() => {
  const chips = chipRefEls.value
  if (reduce.value) {
    ready.value = true
  } else {
    // blur-in entrance (Aetheris BlurText family): opacity + y + scale, staggered.
    // fromTo + clearProps so the chips always end at scale 1 / transform none
    // (a plain gsap.from can leave them stuck at the start scale if interrupted).
    gsap.fromTo(chips,
      { opacity: 0, y: 16, scale: 0.7 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.5, clearProps: 'transform', onComplete: () => { ready.value = true } }
    )
  }
  // shared-pointer parallax: the same cursor that scrubs the video drifts the shelf
  if (dockRef.value && !reduce.value) {
    xTo = gsap.quickTo(dockRef.value, 'x', { duration: 0.9, ease: 'power2.out' })
    yTo = gsap.quickTo(dockRef.value, 'y', { duration: 0.9, ease: 'power2.out' })
    stopWatch = watch([mx, my], () => {
      if (!mouseEnabled.value || xTo == null || yTo == null) return
      const dx = (mx.value - window.innerWidth / 2) / window.innerWidth
      const dy = (my.value - window.innerHeight / 2) / window.innerHeight
      xTo(dx * 12)
      yTo(dy * 6)
    })
  }
})

onUnmounted(() => {
  stopWatch?.()
})
</script>

<style scoped>
.hero-dock {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  will-change: transform;
}

/* single-shell liquid-glass shelf (Aetheris .liquid-glass: backdrop-blur +
   gradient border via mask::before) — the ONE shared glass material. */
.hero-dock-shell {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 7px;
  max-width: 100%;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(14px) saturate(1.35);
  -webkit-backdrop-filter: blur(14px) saturate(1.35);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.16), 0 16px 50px -16px rgba(0, 0, 0, 0.7);
  overflow-x: auto;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.hero-dock-shell::-webkit-scrollbar { display: none; }
.hero-dock-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255, 255, 255, 0.46) 0%,
    rgba(255, 255, 255, 0.14) 22%,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0.14) 78%,
    rgba(255, 255, 255, 0.46) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.dock-chip {
  position: relative;
  flex: 0 0 auto;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 9999px;
  background: transparent;
  cursor: pointer;
  transition: transform 0.34s cubic-bezier(0.16, 1, 0.3, 1), background 0.34s ease;
}
.dock-chip:hover,
.dock-chip:focus-visible {
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-5px);
  outline: none;
}

/* the glowing light-point orb (光点): radial gradient (white-hot core → project
   colour → transparent) + additive glow halo. This is the "light-point" form. */
.dock-orb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ffffff 0%, var(--c) 42%, transparent 78%);
  box-shadow: 0 0 15px var(--c), 0 0 6px var(--c), inset 0 0 3px rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.34s ease, transform 0.34s cubic-bezier(0.16, 1, 0.3, 1);
}
.dock-chip:hover .dock-orb,
.dock-chip:focus-visible .dock-orb {
  transform: scale(1.28);
  box-shadow: 0 0 22px var(--c), 0 0 9px var(--c), 0 0 3px #fff, inset 0 0 4px rgba(255, 255, 255, 0.9);
}
.dock-idx {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8px;
  letter-spacing: 0.08em;
  font-weight: 500;
  color: rgba(244, 245, 247, 0.5);
  transition: color 0.34s ease;
}
.dock-chip:hover .dock-idx,
.dock-chip:focus-visible .dock-idx { color: rgba(244, 245, 247, 0.9); }

/* rich frosted tooltip (titleZh + titleEn + difficulty) */
.dock-tip {
  position: absolute;
  top: -12px;
  transform: translate(-50%, -100%);
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 13px 7px 11px;
  border-radius: 14px;
  background: rgba(11, 13, 18, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(14px) saturate(1.3);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  box-shadow: 0 12px 36px -12px rgba(0, 0, 0, 0.7);
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
}
.tip-orb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0%, var(--c) 45%, transparent 78%);
  box-shadow: 0 0 9px var(--c), 0 0 3px var(--c);
  flex: 0 0 auto;
}
.tip-text { display: flex; flex-direction: column; gap: 1px; }
.tip-title { font-size: 12px; font-weight: 600; color: #f4f5f7; line-height: 1.2; }
.tip-sub { font-size: 9.5px; color: rgba(244, 245, 247, 0.55); letter-spacing: 0.02em; line-height: 1.2; }
.docktip-enter-active, .docktip-leave-active { transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1); }
.docktip-enter-from, .docktip-leave-to { opacity: 0; transform: translate(-50%, -90%); }

/* 14 · mobile touch-up: enlarge the .dock-chip HIT AREA to 44px on phones while
   keeping the .dock-orb visual at 14px (transparent tap cell + small glowing
   dot). The shelf is overflow-x:auto + scroll-snap, so the wider dock scrolls
   horizontally inside its shell (no page-level overflow). Replaces the old
   max-width:640px block that SHRANK chips to 20px on the smallest phones
   (backwards for touch). Scoped to <768px only — desktop keeps 22px chips. */
@media (max-width: 767px) {
  .dock-chip { width: 44px; height: 44px; }
  .dock-orb { width: 14px; height: 14px; }
  .tip-title { font-size: 13px; }
  .tip-sub { font-size: 11px; }
}
</style>
