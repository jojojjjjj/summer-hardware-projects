<template>
  <!-- 12 · Jack BlurText — Aetheris BlurText port. Splits `text` into chars
       (Array.from handles CJK), each a <span>. On in-view (IntersectionObserver,
       once): animate filter blur(10px)→0, opacity 0→1, y 50→0, staggered.
       ONE-SHOT (no loop). Reduced-motion → all chars visible immediately.
       SSG-safe: CSS baseline is visible (opacity 1, no blur), so no-JS / during
       SSG the text shows normally. We hide on mount (one rAF later so the visible
       baseline paints first) then reveal on intersect — same tradeoff as
       JackFadeIn.vue. The `as` prop sets the wrapper tag via <component :is>;
       `class` is forwarded so the caller can apply .hero-heading. -->
  <component
    :is="as"
    ref="elRef"
    class="jack-blur-text"
    :class="$props.class"
    :aria-label="text"
  >
    <span class="jack-blur-text__sr-only">{{ text }}</span>
    <span
      v-for="(ch, i) in chars"
      :key="i"
      class="jack-blur-text__char"
      :class="{ 'jack-blur-text__char--space': ch === ' ' }"
      aria-hidden="true"
      :ref="(el) => { if (el) charEls[i] = el as HTMLElement }"
    >{{ ch === ' ' ? ' ' : ch }}</span>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

// We declare `class` as a prop and forward it manually to the wrapper, so opt
// out of Vue's automatic attr fallthrough (avoids double-applying the class).
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Text to split into chars (CJK-safe via Array.from). */
    text: string
    /** Wrapper tag (e.g. 'h2', 'p', 'div'). Forwarded via <component :is>. */
    as?: string
    /** Extra classes forwarded to the wrapper (e.g. 'hero-heading'). */
    class?: string
    /** Per-char stagger in seconds. */
    stagger?: number
    /** Per-char duration in seconds. */
    duration?: number
    /** Section-level delay in seconds before the first char animates. */
    delay?: number
  }>(),
  {
    as: 'h2',
    class: '',
    stagger: 0.06,
    duration: 0.7,
    delay: 0,
  },
)

const reduce = useReducedMotion()
const elRef = ref<HTMLElement | null>(null)
const chars = Array.from(props.text)
const charEls: HTMLElement[] = []
let observer: IntersectionObserver | null = null
let tween: { kill: () => void } | null = null
let hideRaf = 0

// Initial hide happens in onMounted. If `text` changes reactively, reset hidden
// chars so a future in-view pass can re-reveal them (used by stage transitions
// where the same component instance swaps text). This is an edge case the
// Rebuild agent likely won't hit, but it keeps the component robust.
watch(
  () => props.text,
  async () => {
    await nextTick()
    if (reduce.value) return
    charEls.forEach((c) => {
      c.style.opacity = '0'
      c.style.filter = 'blur(10px)'
      c.style.transform = 'translateY(50px)'
    })
  },
)

onMounted(() => {
  const el = elRef.value
  if (!el) return

  // Reduced motion: leave everything visible (the CSS baseline), no observer.
  if (reduce.value) return

  // Hide now (one rAF later so the SSG-visible baseline paints first), reveal on
  // intersect. Same hide-then-reveal tradeoff as JackFadeIn.vue.
  hideRaf = requestAnimationFrame(() => {
    if (!elRef.value) return
    charEls.forEach((c) => {
      c.style.opacity = '0'
      c.style.filter = 'blur(10px)'
      c.style.transform = 'translateY(50px)'
    })
  })

  observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry?.isIntersecting && elRef.value) {
        observer?.disconnect()
        observer = null

        // Async-import GSAP only when we actually need to animate.
        const gsap = (await import('gsap')).default

        tween = gsap.to(charEls, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: props.duration,
          delay: props.delay,
          stagger: props.stagger,
          ease: 'expo.out',
          clearProps: 'filter,transform', // leave opacity:1; drop will-change-heavy props
        })
      }
    },
    { threshold: 0, rootMargin: '0px 0px 50px 0px' },
  )
  observer.observe(el)
})

onUnmounted(() => {
  if (hideRaf) cancelAnimationFrame(hideRaf)
  observer?.disconnect()
  observer = null
  tween?.kill()
  tween = null
})
</script>

<style scoped>
.jack-blur-text {
  /* Caller drives font-size / weight via .hero-heading or their own class. */
  line-height: 1.05;
}
.jack-blur-text__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.jack-blur-text__char {
  display: inline-block;
  will-change: filter, opacity, transform;
}
</style>
