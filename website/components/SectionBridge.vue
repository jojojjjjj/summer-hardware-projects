<template>
  <!-- V3 §4.4: differentiated section bridges. These REPLACE the four identical
       <ScrollDivider> copies that evenly sliced the page (the #1 "AI template"
       signal). Each variant is a visually distinct transition — never the same
       centered hairline repeated. aria-hidden: purely transitional. -->
  <div class="section-bridge" :class="'sb-' + variant" aria-hidden="true">
    <!-- 1. color-shift: full-bleed vertical bg gradient + bottom hairline -->
    <div v-if="variant === 'color-shift'" class="sb-colorshift" :style="{ '--from': from, '--to': to }" />

    <!-- 2. overlap-lip: a short left-aligned rule; the following section overlaps
         it via a -mt utility (see pages/index.vue) for a z-axis seam. -->
    <div v-else-if="variant === 'overlap-lip'" class="sb-lip-wrap">
      <span class="sb-lip-rule" />
      <span class="sb-lip-tag">{{ tag }}</span>
    </div>

    <!-- 3. dots: a parallax-drifting row of the 9 project colours (the "9 projects"
         motif as a bridge). Static under reduced-motion. -->
    <div v-else-if="variant === 'dots'" ref="dotsRef" class="sb-dots">
      <div class="sb-dots-track" :style="{ transform: `translateX(${dotsX}px)` }">
        <span v-for="(c, i) in dotColors" :key="i" class="sb-dot" :style="{ color: c, background: c }" />
      </div>
    </div>

    <!-- 4. glow-merge: a soft full-bleed glow that bleeds one section's atmosphere
         into the next. -->
    <div v-else-if="variant === 'glow-merge'" class="sb-glow" :style="{ '--glow': glow }" />

    <!-- 5. tight: a cinematic tight band (≤0.5 screen) — one big number + one line.
         Doubles as the height-rhythm "breath" counterpoint to the long sections. -->
    <div v-else-if="variant === 'tight'" class="sb-tight">
      <span class="sb-tight-num font-mono">{{ number }}</span>
      <span class="sb-tight-rule" />
      <span class="sb-tight-text"><slot /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { projects } from '~/content/projects'

type Variant = 'color-shift' | 'overlap-lip' | 'dots' | 'glow-merge' | 'tight'
const props = withDefaults(
  defineProps<{
    variant: Variant
    from?: string
    to?: string
    tag?: string
    glow?: string
    number?: string | number
  }>(),
  {
    from: '#0b0d12',
    to: '#11141b',
    tag: '',
    glow: 'rgba(99,102,241,0.16)',
    number: '',
  },
)

const reduce = useReducedMotion()
const dotsRef = ref<HTMLElement | null>(null)
const dotsX = ref(0)
const dotColors = projects.map((p) => p.colorHex)

let stKill: (() => void) | null = null

onMounted(async () => {
  if (props.variant !== 'dots' || reduce.value || !dotsRef.value) return
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  const st = gsap.to(dotsRef.value.querySelector('.sb-dots-track'), {
    x: -120,
    ease: 'none',
    scrollTrigger: {
      trigger: dotsRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  })
  stKill = () => st.scrollTrigger?.kill()
})

onUnmounted(() => {
  stKill?.()
})
</script>

<style scoped>
.section-bridge { position: relative; width: 100%; }

/* 1. color-shift */
.sb-colorshift {
  width: 100%;
  height: 72px;
  background: linear-gradient(180deg, var(--from) 0%, var(--to) 100%);
}
.sb-colorshift::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.28) 50%, transparent 100%);
}

/* 2. overlap-lip — left-aligned short rule + tag (NOT a centered line) */
.sb-lip-wrap {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.sb-lip-rule {
  flex: 0 0 4rem;
  height: 1px;
  background: linear-gradient(90deg, rgba(99,102,241,0.5), transparent);
}
.sb-lip-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6b7280;
  font-family: 'JetBrains Mono', monospace;
}

/* 3. dots — parallax row of 9 project colours */
.sb-dots {
  overflow: hidden;
  padding: 30px 0;
  display: flex;
  justify-content: center;
}
.sb-dots-track {
  display: flex;
  gap: 22px;
  will-change: transform;
}
.sb-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0.55;
  box-shadow: 0 0 14px currentColor;
}

/* 4. glow-merge */
.sb-glow {
  width: 100%;
  height: 140px;
  background: radial-gradient(ellipse 60% 100% at 50% 100%, var(--glow) 0%, transparent 72%);
}

/* 5. tight band */
.sb-tight {
  max-width: 72rem;
  margin: 0 auto;
  padding: 64px 1.5rem;
  display: flex;
  align-items: center;
  gap: 28px;
}
.sb-tight-num {
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #f4f5f7;
  flex-shrink: 0;
}
.sb-tight-rule {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(99,102,241,0.45), transparent);
  min-width: 40px;
}
.sb-tight-text {
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  color: #9aa0ac;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .sb-tight { gap: 18px; padding: 48px 1.5rem; }
  .sb-tight-text { white-space: normal; }
}

@media (prefers-reduced-motion: reduce) {
  .sb-dots-track { transform: none !important; }
}
</style>
