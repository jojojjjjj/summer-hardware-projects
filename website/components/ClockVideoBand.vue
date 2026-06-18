<template>
  <!-- V4 · ClockVideoBand — full-bleed dark band introducing the course timeline.
       The clock-mechanism video (§5.2: bg video + noise + gradient, lazy IO
       play/pause) sits behind a bilingual schedule tagline that types itself out
       (useTypewriter) when the band scrolls into view. Clock = time = the 12–15
       day schedule that follows in JackServices. Only real video in the build. -->
  <section ref="rootRef" class="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-background">
    <MediaSlot
      class="absolute inset-0"
      mode="bg-autoplay"
      poster="/media/clock-banner.webp"
      src="/media/clock-motion.mp4"
      :noise="true"
      :noise-opacity="0.5"
      overlay-class="bg-gradient-to-b from-background/70 via-background/35 to-background/85"
    />

    <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <p class="eyebrow mb-5">时间表 · SCHEDULE</p>
      <h2 class="font-sans font-bold tracking-tight text-text-primary leading-tight" style="font-size: clamp(1.75rem, 5vw, 3rem)">
        <span>{{ displayed }}</span><span v-if="started && !done" class="typewriter-cursor" />
      </h2>
      <p class="mx-auto mt-5 max-w-xl text-body-lg text-text-secondary">
        12–15 days — from your first line of code to the final defense
      </p>
      <p class="mt-3 text-sm text-text-tertiary">钟表机芯 · Clock mechanism</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTypewriter } from '~/composables/useTypewriter'

const rootRef = ref<HTMLElement | null>(null)
const { displayed, done, started } = useTypewriter(
  '12–15 天，从第一行代码到最终答辩',
  { speed: 42, startDelay: 350 },
  rootRef,
)
</script>

<style scoped>
.typewriter-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 3px;
  vertical-align: -0.15em;
  background: var(--cool-indigo, #6366f1);
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor { animation: none; display: none; }
}
</style>
