<template>
  <!-- 08 · Jack FadeIn — Framer whileInView {once:true, margin:50px, amount:0} port.
       Dynamic tag via <component :is> (≈ motion.create). SSG-safe: CSS baseline is
       visible; we hide on mount + reveal on intersect, so no-JS keeps content shown. -->
  <component :is="tag" ref="elRef" class="jack-fade-in">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    tag?: string
    delay?: number
    duration?: number
    x?: number
    y?: number
  }>(),
  {
    tag: 'div',
    delay: 0,
    duration: 0.7,
    x: 0,
    y: 30,
  },
)

const elRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()
let observer: IntersectionObserver | null = null
let tween: gsap.core.Tween | null = null

onMounted(() => {
  const el = elRef.value
  if (!el) return

  // Reduced motion: snap to final, no observer.
  if (reduce.value) {
    gsap.set(el, { opacity: 1, x: 0, y: 0 })
    return
  }

  // Hide now (one rAF later so the SSG-visible baseline paints first), reveal on
  // intersect. If JS dies after this point content could stay hidden — accepted
  // tradeoff for a clean whileInView (matches RevealText.vue's hide-then-reveal).
  requestAnimationFrame(() => {
    if (!elRef.value) return
    gsap.set(elRef.value, { opacity: 0, x: props.x, y: props.y })
  })

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting && elRef.value) {
        tween = gsap.to(elRef.value, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: props.duration,
          delay: props.delay,
          ease: 'power3.out', // ≈ cubic-bezier(0.25, 0.1, 0.25, 1)
        })
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0, rootMargin: '0px 0px 50px 0px' },
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  tween?.kill()
  tween = null
})
</script>
