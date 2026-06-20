<template>
  <!-- 10v4 · Indigo Archive dock — the 9 project nodes become a single-shell
       liquid-glass "specimen dock" grounded beneath the scrub-video figure. Same
       .liquid-glass material as the navbar/CTA (one design system, not a separate
       3D object). Pure DOM (no WebGL → no clipping ever; SSG/reduced-motion/touch
       all render the same dock). Shared-pointer parallax + GSAP entrance. -->
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
        <span class="dock-dot" />
        <span class="dock-idx">{{ String(i + 1).padStart(2, '0') }}</span>
      </button>
    </div>
    <Transition name="docktip">
      <div v-if="hovered" class="dock-tip" :style="{ left: tipX + 'px' }">
        <span class="tip-dot" :style="{ background: hovered.color }" />
        {{ hovered.title }}
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
  projects: { slug: string; titleZh: string; colorHex: string }[]
}>()

const router = useRouter()
const reduce = useReducedMotion()
const { x: mx, y: my, enabled: mouseEnabled } = useGlobalMouse(0.1)

const dockRef = ref<HTMLDivElement | null>(null)
const chipRefEls = ref<HTMLButtonElement[]>([])
const ready = ref(false)
const hovered = ref<{ title: string; color: string } | null>(null)
const tipX = ref(0)

function onHover(i: number) {
  const p = props.projects[i]
  hovered.value = { title: p.titleZh, color: p.colorHex }
  const chip = chipRefEls.value[i]
  const dock = dockRef.value
  if (chip && dock) {
    const r = chip.getBoundingClientRect()
    const d = dock.getBoundingClientRect()
    tipX.value = r.left + r.width / 2 - d.left
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
    gsap.from(chips, {
      opacity: 0,
      y: 18,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.5,
      onComplete: () => { ready.value = true },
    })
  }
  // shared-pointer parallax: the same cursor that scrubs the video also drifts
  // the dock (subtle, ±10px). quickTo is efficient (no gsap.to per move).
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
  align-items: center;
  will-change: transform;
}

/* single-shell liquid-glass bar (Aetheris .liquid-glass pattern: backdrop-blur +
   gradient border via mask::before) — the ONE shared glass material, same as the
   navbar/CTA, so the dock reads as UI chrome, not a competing 3D object. */
.hero-dock-shell {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 6px;
  max-width: 100%;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px) saturate(1.3);
  -webkit-backdrop-filter: blur(12px) saturate(1.3);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.14), 0 14px 44px -14px rgba(0, 0, 0, 0.65);
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
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.12) 22%,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0.12) 78%,
    rgba(255, 255, 255, 0.42) 100%);
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 9999px;
  background: transparent;
  color: rgba(244, 245, 247, 0.62);
  cursor: pointer;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), background 0.32s ease, color 0.32s ease;
}
.dock-chip:hover,
.dock-chip:focus-visible {
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  transform: translateY(-5px);
  outline: none;
}
.dock-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 9px var(--c);
  transition: box-shadow 0.32s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}
.dock-chip:hover .dock-dot,
.dock-chip:focus-visible .dock-dot {
  box-shadow: 0 0 18px var(--c), 0 0 4px var(--c);
  transform: scale(1.25);
}
.dock-idx {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px;
  letter-spacing: 0.06em;
  font-weight: 500;
}

/* tooltip above the hovered chip */
.dock-tip {
  position: absolute;
  top: -14px;
  transform: translate(-50%, -100%);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  color: #f4f5f7;
  background: rgba(11, 13, 18, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}
.dock-tip .tip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}
.docktip-enter-active, .docktip-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.docktip-enter-from, .docktip-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .dock-chip { width: 46px; height: 46px; }
  .dock-dot { width: 9px; height: 9px; }
  .dock-idx { font-size: 8px; }
}
</style>
