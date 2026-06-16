<template>
  <div ref="wrapperRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref<HTMLElement | null>(null)
let lenis: Lenis | null = null

function raf(time: number): void {
  lenis?.raf(time)
  ScrollTrigger.update()
}

onMounted(() => {
  lenis = new Lenis({
    // Premium smooth scroll settings
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleAnchorClick)
  })

  // Handle resize
  window.addEventListener('resize', handleResize)
})

function handleAnchorClick(e: Event): void {
  const target = e.currentTarget as HTMLAnchorElement
  const id = target.getAttribute('href')
  if (!id || id === '#') return

  const el = document.querySelector(id)
  if (!el) return

  e.preventDefault()
  lenis?.scrollTo(el, {
    offset: -80,
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}

function handleResize(): void {
  ScrollTrigger.refresh()
}

onUnmounted(() => {
  gsap.ticker.remove(raf)
  lenis?.destroy()
  lenis = null

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.removeEventListener('click', handleAnchorClick)
  })
  window.removeEventListener('resize', handleResize)
})

// Expose scrollTo for programmatic use
function scrollTo(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
  lenis?.scrollTo(target, {
    offset: options?.offset ?? -80,
    duration: options?.duration ?? 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
}

provide('smoothScrollTo', scrollTo)

defineExpose({ scrollTo, lenis })
</script>