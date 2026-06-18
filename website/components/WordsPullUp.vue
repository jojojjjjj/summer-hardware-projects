<template>
  <!-- V4 · WordsPullUp — per-word (or per-char for space-less CJK) pull-up reveal.
       Ported from the Prisma "WordsPullUp" (framer-motion) to GSAP. Auto-splits:
       text with whitespace → words; text without (Chinese) → characters, so the
       staggered lift works for both languages. SSG-safe (tokens visible by
       default; JS hides then reveals on intersect). Reduced motion → all visible. -->
  <component :is="as" ref="elRef" class="words-pull-up">
    <template v-for="(tok, i) in tokens" :key="i">
      <span
        v-if="!isSpace(tok)"
        class="words-pull-up__token"
        :ref="(el) => { if (el) tokenEls[i] = el as HTMLElement }"
      >{{ tok }}</span>
      <template v-else>{{ tok }}</template>
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    delay?: number
    stagger?: number
    duration?: number
    y?: number
  }>(),
  {
    as: 'span',
    delay: 0,
    stagger: 0.08,
    duration: 0.7,
    y: 24,
  },
)

const elRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()
let observer: IntersectionObserver | null = null
let tween: { kill: () => void } | null = null
// Guard the async gsap-import path against unmount races (fast route changes):
// without these, an unmount during `await import('gsap')` would leak the IO and
// fire gsap.set on detached nodes. Mounted 3× (Mission/Projects/CTA) — real surface.
let disposed = false
let rafId = 0

function isSpace(tok: string): boolean {
  return /^\s+$/.test(tok)
}

// Split: keep whitespace runs as break-opportunity text nodes; words/chars animate.
const tokens = /\s/.test(props.text)
  ? props.text.split(/(\s+)/).filter((t) => t.length > 0)
  : Array.from(props.text)

// Indexed by token index; space tokens leave holes, filtered out before animating.
const tokenEls: HTMLElement[] = []

onMounted(() => {
  const el = elRef.value
  if (!el) return
  const els = tokenEls.filter(Boolean) as HTMLElement[]
  if (reduce.value || els.length === 0) return // CSS baseline keeps tokens visible

  void (async () => {
    const gsap = (await import('gsap')).default
    if (disposed) return
    // Hide one rAF later (SSG-visible baseline paints first), reveal on intersect.
    rafId = requestAnimationFrame(() => {
      if (disposed) return
      gsap.set(els, { opacity: 0, y: props.y })
    })
    if (disposed) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        tween = gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: props.duration,
          delay: props.delay,
          stagger: props.stagger,
          ease: 'power3.out',
        }) as { kill: () => void }
        observer?.disconnect()
        observer = null
      },
      { threshold: 0, rootMargin: '0px 0px 50px 0px' },
    )
    observer.observe(el)
  })()
})

onUnmounted(() => {
  disposed = true
  cancelAnimationFrame(rafId)
  observer?.disconnect()
  observer = null
  tween?.kill()
  tween = null
})
</script>

<style scoped>
.words-pull-up__token {
  display: inline-block;
  will-change: transform, opacity;
}
</style>
