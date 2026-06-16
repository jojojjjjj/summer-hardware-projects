<template>
  <div
    ref="cardRef"
    class="tilt-card"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const cardRef = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const scale = ref(1)

const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${scale.value})`,
  transition: 'transform 0.15s ease-out',
}))

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = (e.clientX - centerX) / (rect.width / 2)
  const deltaY = (e.clientY - centerY) / (rect.height / 2)
  rotateX.value = -deltaY * 6
  rotateY.value = deltaX * 6
  scale.value = 1.02
}

function handleMouseLeave() {
  rotateX.value = 0
  rotateY.value = 0
  scale.value = 1
}
</script>

<style scoped>
.tilt-card {
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
