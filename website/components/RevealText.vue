<template>
  <component :is="tag" ref="containerRef" class="reveal-text" :class="{ 'is-revealed': hasAnimated }">
    <span v-if="hasSplit" ref="innerRef" class="reveal-text__inner" v-html="splitHTML" />
    <span v-else ref="innerRef" class="reveal-text__inner"><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

export interface RevealTextProps {
  /** How to split text: 'chars' | 'words' | 'lines' */
  mode?: 'chars' | 'words' | 'lines'
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Duration of each element's animation (seconds) */
  duration?: number
  /** Stagger between elements (seconds) */
  stagger?: number
  /** HTML tag for the wrapper */
  tag?: string
  /** Y translation in px */
  translateY?: number
  /** Auto-trigger on intersection, or wait for manual trigger */
  auto?: boolean
}

const props = withDefaults(defineProps<RevealTextProps>(), {
  mode: 'words',
  delay: 0,
  duration: 0.8,
  stagger: 0.03,
  tag: 'div',
  translateY: 40,
  auto: true,
})

const containerRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)
const hasSplit = ref(false)
let observer: IntersectionObserver | null = null
let tween: gsap.core.Tween | null = null

const splitHTML = computed(() => '')

function splitText(text: string): string {
  switch (props.mode) {
    case 'chars':
      return text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="reveal-text__char reveal-text__space">&nbsp;</span>'
            : `<span class="reveal-text__char">${char}</span>`
        )
        .join('')

    case 'words':
      return text
        .split(/(\s+)/)
        .map((segment) =>
          segment.trim()
            ? `<span class="reveal-text__word">${segment}</span>`
            : `<span class="reveal-text__space">${segment}</span>`
        )
        .join('')

    case 'lines':
      // Simple line split by newline — for proper line splitting,
      // use a library or split by <br> tags
      return text
        .split('\n')
        .map((line) => `<span class="reveal-text__line"><span class="reveal-text__line-inner">${line}</span></span>`)
        .join('')

    default:
      return text
  }
}

function getSelector(): string {
  switch (props.mode) {
    case 'chars':
      return '.reveal-text__char'
    case 'words':
      return '.reveal-text__word'
    case 'lines':
      return '.reveal-text__line-inner'
    default:
      return '.reveal-text__word'
  }
}

function animate(): void {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const container = innerRef.value
  if (!container) return

  const selector = getSelector()
  const elements = container.querySelectorAll(selector)

  if (elements.length === 0) return

  gsap.set(elements, {
    opacity: 0,
    y: props.translateY,
    rotateX: props.mode === 'lines' ? -15 : 0,
  })

  tween = gsap.to(elements, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: props.duration,
    stagger: props.stagger,
    delay: props.delay,
    ease: 'power3.out',
    force3D: true,
  })
}

function reset(): void {
  tween?.kill()
  tween = null
  hasAnimated.value = false
}

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  // Get slot text content and split
  const textContent = container.textContent?.trim() || ''
  if (textContent && props.mode) {
    const html = splitText(textContent)
    // We need to set the split HTML after mount
    // Using a reactive approach
    hasSplit.value = true
    // Directly set innerHTML for the split content
    requestAnimationFrame(() => {
      if (innerRef.value) {
        innerRef.value.innerHTML = html
      }

      if (props.auto) {
        // Set up IntersectionObserver
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              animate()
              observer?.disconnect()
            }
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )
        observer.observe(container)
      }
    })
  }
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  tween?.kill()
  tween = null
})

// Expose for manual triggering
defineExpose({ animate, reset })
</script>

<style scoped>
.reveal-text {
  overflow: hidden;
}

.reveal-text__inner {
  display: inline;
}

.reveal-text__char,
.reveal-text__word {
  display: inline-block;
  will-change: transform, opacity;
}

.reveal-text__space {
  display: inline-block;
  white-space: pre;
}

.reveal-text__line {
  display: block;
  overflow: hidden;
}

.reveal-text__line-inner {
  display: inline-block;
  will-change: transform, opacity;
}
</style>