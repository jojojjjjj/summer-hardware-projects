<template>
  <div ref="lineRef" class="scroll-divider" :aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const lineRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  const el = lineRef.value
  if (!el) return

  if (reduce.value) {
    el.classList.add('is-in')
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        el.classList.add('is-in')
        observer?.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
