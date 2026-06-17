<template>
  <!-- 08 · Jack AnimatedText — char-by-char scroll-reveal (opacity 0.2→1).
       ONE ScrollTrigger scrub, onUpdate writes each char's opacity directly to
       the DOM (no per-char Vue reactivity on the scroll hot path). Offset
       ['start 0.8','end 0.2'] → start 'top 80%' / end 'bottom 20%'.
       Reduced motion → CSS forces all chars visible. -->
  <component :is="tag" ref="elRef" class="jack-animated-text" :class="{ 'is-reduced': reduce }">
    <span
      v-for="(ch, i) in chars"
      :key="i"
      class="jack-animated-text__char"
      :ref="(el) => { if (el) charEls[i] = el as HTMLElement }"
    >{{ ch === ' ' ? ' ' : ch }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    text: string
    tag?: string
  }>(),
  { tag: 'p' },
)

const reduce = useReducedMotion()
const elRef = ref<HTMLElement | null>(null)
const chars = Array.from(props.text)
const charEls: HTMLElement[] = []
let st: { kill: () => void } | null = null

onMounted(() => {
  const el = elRef.value
  if (!el || reduce.value) return

  // Hide chars synchronously (below-the-fold, so no visible flash), then async-
  // load GSAP for the scrubbed ScrollTrigger.
  charEls.forEach((c) => {
    c.style.opacity = '0.2'
  })

  void (async () => {
    const gsap = (await import('gsap')).default
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    const n = charEls.length
    st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
      onUpdate: (self: { progress: number }) => {
        const p = self.progress
        for (let i = 0; i < n; i++) {
          // char i fully revealed when p*n - i >= 1 → p >= (i+1)/n
          const v = 0.2 + 0.8 * Math.max(0, Math.min(1, p * n - i))
          charEls[i].style.opacity = String(v)
        }
      },
    })
  })()
})

onUnmounted(() => {
  st?.kill()
  st = null
})
</script>

<style scoped>
.jack-animated-text__char {
  display: inline-block;
  will-change: opacity;
}
/* Reduced motion: all chars fully visible, ignore JS-set opacity. */
.jack-animated-text.is-reduced .jack-animated-text__char {
  opacity: 1 !important;
}
</style>
