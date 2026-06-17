<template>
  <div
    ref="cardRef"
    class="tilt-card"
    :data-glow="glow"
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
import { useReducedMotion } from '~/composables/useReducedMotion'

export interface TiltCardProps {
  /** Maximum tilt angle in degrees. Default 15 */
  maxTilt?: number
  /** Perspective in px. Default 1000 */
  perspective?: number
  /** Scale on hover. Default 1.04 */
  hoverScale?: number
  /** Glare intensity (0-1). Default 0.08 (restrained) */
  glareIntensity?: number
  /** Transition duration in seconds. Default 0.4 */
  duration?: number
  /** Easing for tilt movement */
  ease?: string
  /** Enable glare effect */
  glare?: boolean
  /** Glare light theme — 'cool' (indigo) or 'warm' (coral). Default 'cool' */
  glow?: 'cool' | 'warm'
}

const props = withDefaults(defineProps<TiltCardProps>(), {
  maxTilt: 15,
  perspective: 1000,
  hoverScale: 1.04,
  glareIntensity: 0.08,
  duration: 0.4,
  ease: 'power2.out',
  glare: true,
  glow: 'cool',
})

const cardRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()
const coarse = ref(false)

let tween: gsap.core.Tween | null = null

/** Direction-aware impulse state — set on enter, consumed by next mousemove */
let enterDir: { rotateX: number; rotateY: number } | null = null

// Glare tint — cool indigo by default, coral when warm
const glareColor = props.glow === 'warm' ? '255,107,107' : '99,102,241'

function handleMouseEnter(e: MouseEvent): void {
  if (reduce.value || coarse.value || !cardRef.value) return

  // Detect which edge the cursor crossed
  const rect = cardRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy

  // Normalise by half-dimensions so we can compare axes fairly
  const nx = dx / (rect.width / 2)
  const ny = dy / (rect.height / 2)

  // The dominant axis determines the entry edge
  const bias = 0.35 * props.maxTilt
  if (Math.abs(nx) >= Math.abs(ny)) {
    // Entered from left or right
    // Left edge → nx < 0 → card should lean right (rotateY positive, right edge recedes)
    // Right edge → nx > 0 → card should lean left (rotateY negative)
    enterDir = { rotateX: 0, rotateY: -nx * bias }
  } else {
    // Entered from top or bottom
    // Top edge → ny < 0 → card should lean down (rotateX negative, top tilts forward)
    // Bottom edge → ny > 0 → card should lean up (rotateX positive)
    enterDir = { rotateX: ny * bias, rotateY: 0 }
  }

  // Apply directional impulse, then the next handleMouseMove smoothly blends to live tracking
  tween?.kill()
  tween = gsap.to(cardRef.value, {
    rotateX: enterDir.rotateX,
    rotateY: enterDir.rotateY,
    scale: props.hoverScale,
    duration: 0.28,
    ease: props.ease,
  })
}

function handleMouseMove(e: MouseEvent): void {
  if (!cardRef.value || reduce.value || coarse.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height

  const tiltX = (0.5 - y) * props.maxTilt * 2
  const tiltY = (x - 0.5) * props.maxTilt * 2

  // Blend duration: shorter right after a directional impulse so it feels connected
  const blendDuration = enterDir ? 0.3 : props.duration
  enterDir = null

  tween?.kill()
  tween = gsap.to(cardRef.value, {
    rotateX: tiltX,
    rotateY: tiltY,
    duration: blendDuration,
    ease: props.ease,
  })

  if (props.glare && glareRef.value) {
    gsap.to(glareRef.value, {
      opacity: props.glareIntensity,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(${glareColor},0.45) 0%, rgba(${glareColor},0) 60%)`,
      duration: 0.3,
      ease: 'power1.out',
    })
  }
}

function handleMouseLeave(): void {
  if (!cardRef.value || reduce.value || coarse.value) return

  enterDir = null
  tween?.kill()
  tween = gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: props.duration * 1.5,
    ease: 'elastic.out(1, 0.5)',
  })

  if (props.glare && glareRef.value) {
    gsap.to(glareRef.value, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    coarse.value = window.matchMedia('(pointer: coarse)').matches
  }
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
  mix-blend-mode: screen;
  will-change: opacity, background;
}
</style>
