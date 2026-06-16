<template>
  <div ref="el" :style="layerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  speed?: number
}>(), {
  speed: 0.3,
})

const el = ref<HTMLElement | null>(null)
const offset = ref(0)
const targetOffset = ref(0)
let rafId: number | null = null

const layerStyle = computed(() => ({
  transform: `translate3d(0, ${offset.value}px, 0)`,
  willChange: 'transform',
}))

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function animate() {
  offset.value = lerp(offset.value, targetOffset.value, 0.1)
  if (Math.abs(offset.value - targetOffset.value) > 0.5) {
    rafId = requestAnimationFrame(animate)
  }
}

function handleScroll() {
  if (!el.value) return
  const rect = el.value.getBoundingClientRect()
  const viewportCenter = window.innerHeight / 2
  const elementCenter = rect.top + rect.height / 2
  targetOffset.value = (elementCenter - viewportCenter) * props.speed * 0.08
  if (rafId === null) {
    rafId = requestAnimationFrame(animate)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
