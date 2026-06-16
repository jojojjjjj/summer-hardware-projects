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
  speed: 0.5,
})

const el = ref<HTMLElement | null>(null)
const offset = ref(0)

const layerStyle = computed(() => ({
  transform: `translateY(${offset.value}px)`,
  willChange: 'transform',
}))

function handleScroll() {
  if (!el.value) return
  const rect = el.value.getBoundingClientRect()
  const viewportCenter = window.innerHeight / 2
  const elementCenter = rect.top + rect.height / 2
  offset.value = (elementCenter - viewportCenter) * props.speed * 0.1
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
