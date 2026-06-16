<template>
  <component
    :is="tag"
    ref="el"
    :class="['reveal-text', { 'is-visible': isInView }]"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      class="reveal-word"
      :style="{ transitionDelay: `${i * delay}ms` }"
    >{{ word }}&nbsp;</span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  tag?: string
  delay?: number
}>(), {
  tag: 'p',
  delay: 60,
})

const el = ref<HTMLElement | null>(null)
const isInView = ref(false)
const words = computed(() => props.text.split(' '))

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(el.value)
})
</script>

<style scoped>
.reveal-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.is-visible .reveal-word {
  opacity: 1;
  transform: translateY(0);
}
</style>
