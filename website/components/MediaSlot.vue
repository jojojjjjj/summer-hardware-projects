<template>
  <!-- V4 · MediaSlot — unified media surface for the V4 media layer. Handles:
       - 'static'      → <img> (direct-fusion backgrounds / accents)
       - 'bg-autoplay' → lazy <video> (IntersectionObserver play/pause, preload none); poster-first
       - 'mouse-scrub' → delegates to <MouseScrubVideo> (Hero signature)
       `src` empty → poster shows (placeholder for a future video, no broken frame).
       Reduced motion / touch (pointer: coarse) → poster image (no autoplay, no scrub).
       The slot must be sized + positioned by the consumer (e.g. class="absolute inset-0"). -->
  <div class="media-slot overflow-hidden" aria-hidden="true">
    <MouseScrubVideo
      v-if="mode === 'mouse-scrub'"
      :poster="posterImg"
      :src="src"
      :alt="alt"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <video
      v-else-if="showAutoplayVideo"
      ref="videoRef"
      class="absolute inset-0 h-full w-full object-cover"
      :poster="posterImg"
      muted
      loop
      playsinline
      preload="none"
    >
      <source :src="src" type="video/mp4" />
    </video>
    <img
      v-else
      :src="posterImg"
      :alt="alt"
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />

    <div
      v-if="noise"
      class="noise-overlay pointer-events-none absolute inset-0"
      :style="{ '--noise-opacity': noiseOpacity }"
    />
    <div
      v-if="overlayClass"
      class="pointer-events-none absolute inset-0"
      :class="overlayClass"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    poster: string
    src?: string
    mode?: 'static' | 'bg-autoplay' | 'mouse-scrub'
    fallback?: string
    alt?: string
    noise?: boolean
    noiseOpacity?: number
    overlayClass?: string
  }>(),
  {
    src: '',
    mode: 'static',
    fallback: '',
    alt: '',
    noise: false,
    noiseOpacity: 0.12,
    overlayClass: '',
  },
)

const reduce = useReducedMotion()
const finePointer = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
let io: IntersectionObserver | null = null

const posterImg = computed(() => props.fallback || props.poster)

// Render the autoplay <video> only on desktop (pointer: fine), no reduced motion,
// AND when a src is actually provided. Otherwise the poster <img> shows (lazy, no
// data spent on touch / low-end devices).
const showAutoplayVideo = computed(
  () => props.mode === 'bg-autoplay' && !!props.src && !reduce.value && finePointer.value,
)

function attachIO() {
  io?.disconnect()
  io = null
  const v = videoRef.value
  if (!v || !showAutoplayVideo.value) return
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {})
      else v.pause()
    },
    { threshold: 0.1 },
  )
  io.observe(v)
}

onMounted(() => {
  finePointer.value = window.matchMedia('(pointer: fine)').matches
})

// Re-attach whenever the <video> actually mounts (finePointer flips after mount).
watch([videoRef, showAutoplayVideo], attachIO, { flush: 'post' })

onUnmounted(() => {
  // Detaching a <video> doesn't auto-pause it; stop decode explicitly (8MB clock video).
  videoRef.value?.pause()
  io?.disconnect()
  io = null
})
</script>
