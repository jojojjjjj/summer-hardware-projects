<template>
  <!-- ClientOnly: the bar depends on window/scroll, so never render it during SSR
       (avoids hydration mismatch). It appears immediately after hydration. -->
  <ClientOnly>
    <div v-if="!reduce" class="scroll-progress" aria-hidden="true">
      <div class="scroll-progress-bar" :style="{ transform: `scaleX(${smoothProgress})` }" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useScrollProgress } from '~/composables/useScrollProgress'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { smoothProgress } = useScrollProgress()
const reduce = useReducedMotion()
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 60;
  pointer-events: none;
}
.scroll-progress-bar {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  transform: scaleX(0);
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.15), #6366f1 45%, #8b5cf6 100%);
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.35);
}
</style>
