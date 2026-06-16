<template>
  <div ref="wrapperRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // No Lenis — native browser scrolling only.
  // GSAP ScrollTrigger works with native scroll out of the box.

  // Refresh ScrollTrigger on resize
  window.addEventListener('resize', handleResize)

  // Handle anchor links with smooth native scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleAnchorClick)
  })
})

function handleAnchorClick(e: Event): void {
  const target = e.currentTarget as HTMLAnchorElement
  const id = target.getAttribute('href')
  if (!id || id === '#') return

  const el = document.querySelector(id)
  if (!el) return

  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleResize(): void {
  ScrollTrigger.refresh()
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.removeEventListener('click', handleAnchorClick)
  })
})

// Programmatic scrollTo using native smooth scroll
function scrollTo(target: string | HTMLElement, options?: { offset?: number }) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  const offset = options?.offset ?? -80
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}

provide('smoothScrollTo', scrollTo)

defineExpose({ scrollTo })
</script>
