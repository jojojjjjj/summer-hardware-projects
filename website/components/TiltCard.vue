<template>
  <div
    ref="cardRef"
    class="tilt-card"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="tilt-card__content" ref="contentRef">
      <slot />
    </div>
    <div class="tilt-card__glare" ref="glareRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export interface TiltCardProps {
  /** Maximum tilt angle in degrees. Default 15 */
  maxTilt?: number
  /** Perspective in px. Default 1000 */
  perspective?: number
  /** Scale on hover. Default 1.04 */
  hoverScale?: number
  /** Glare intensity (0-1). Default 0.15 */
  glareIntensity?: number
  /** Transition duration in seconds. Default 0.4 */
  duration?: number
  /** Easing for tilt movement */
  ease?: string
  /** Enable glare effect */
  glare?: boolean
}

const props = withDefaults(defineProps<TiltCardProps>(), {
  maxTilt: 15,
  perspective: 1000,
  hoverScale: 1.04,
  glareIntensity: 0.15,
  duration: 0.4,
  ease: 'power2.out',
  glare: true,
})

const cardRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLElement | null>(null)

let tween: gsap.core.Tween | null = null
let isHovering = false
let prefersReducedMotion = false

function handleMouseEnter(): void {
  if (prefersReducedMotion) return
  isHovering = true

  gsap.to(cardRef.value, {
    scale: props.hoverScale,
    duration: props.duration,
    ease: props.ease,
  })
}

function handleMouseMove(e: MouseEvent): void {
  if (!cardRef.value || prefersReducedMotion) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height

  const tiltX = (0.5 - y) * props.maxTilt * 2
  const tiltY = (x - 0.5) * props.maxTilt * 2

  tween?.kill()
  tween = gsap.to(cardRef.value, {
    rotateX: tiltX,
    rotateY: tiltY,
    duration: props.duration,
    ease: props.ease,
  })

  // Update glare position
  if (props.glare && glareRef.value) {
    gsap.to(glareRef.value, {
      opacity: props.glareIntensity,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)`,
      duration: 0.3,
      ease: 'power1.out',
    })
  }
}

function handleMouseLeave(): void {
  if (!cardRef.value || prefersReducedMotion) return
  isHovering = false

  tween?.kill()
  tween = gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: props.duration * 1.5,
    ease: 'elastic.out(1, 0.5)',
  })

  // Fade out glare
  if (props.glare && glareRef.value) {
    gsap.to(glareRef.value, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
}

onMounted(() => {
  // Check for reduced motion preference
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = motionQuery.matches

  const handler = (e: MediaQueryListEvent) => {
    prefersReducedMotion = e.matches
  }
  motionQuery.addEventListener('change', handler)

  // Set initial perspective on the card parent
  if (cardRef.value?.parentElement) {
    gsap.set(cardRef.value.parentElement, { perspective: props.perspective })
  }
})

onUnmounted(() => {
  tween?.kill()
  tween = null
})
</script>

<style scoped>
.tilt-card {
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
  border-radius: inherit;
}

.tilt-card__content {
  position: relative;
  z-index: 1;
  transform: translateZ(0);
}

.tilt-card__glare {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  mix-blend-mode: overlay;
  will-change: opacity, background;
}
</style>