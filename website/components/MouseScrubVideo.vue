<template>
  <!-- V4 · MouseScrubVideo — background video that scrubs with horizontal mouse
       movement (Hero signature interaction). Does NOT autoplay. When `src` is
       empty, an <img> poster shows (placeholder for a future scrub video); the
       composable no-ops cleanly (no duration → no seeking). -->
  <div class="mouse-scrub-video relative h-full w-full overflow-hidden">
    <!-- preload="auto" is deliberate: the Hero is above the fold, so eager-loading
         buffers the clip for smooth scrubbing. useMouseScrubVideo's IO gates the
         mousemove binding (not the fetch); touch / reduced-motion never bind. -->
    <video
      ref="videoRef"
      class="absolute inset-0 h-full w-full object-cover"
      style="object-position: 72% center; filter: saturate(0.72) hue-rotate(-16deg) brightness(0.92) contrast(1.06);"
      :poster="poster"
      muted
      playsinline
      preload="auto"
    >
      <source v-if="src" :src="src" type="video/mp4" />
    </video>
    <!-- Poster image guarantees the placeholder shows (some browsers render a
         blank frame for a <video> with no source). Rendered only while src empty. -->
    <img
      v-if="!hasVideo"
      :src="poster"
      :alt="alt"
      class="absolute inset-0 h-full w-full object-cover"
      decoding="async"
    />
    <!-- MEDIA-PLACEHOLDER: drop scrub video at /media/<name>.mp4, set :src -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseScrubVideo } from '~/composables/useMouseScrubVideo'

const props = withDefaults(
  defineProps<{
    poster: string
    src?: string
    fallback?: string
    alt?: string
    sensitivity?: number
  }>(),
  {
    src: '',
    fallback: '',
    alt: '',
    sensitivity: 0.8,
  },
)

const videoRef = ref<HTMLVideoElement | null>(null)
const hasVideo = computed(() => !!props.src)

useMouseScrubVideo(videoRef, { sensitivity: props.sensitivity })
</script>
