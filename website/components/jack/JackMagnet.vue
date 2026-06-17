<template>
  <!-- 08 · Jack Magnet — padding-edge activation, strength divisor, asymmetric
       0.3s in / 0.6s out via CSS transition. Direct DOM writes on mousemove (hot
       path — no Vue reactivity). Disabled on coarse pointer + reduced-motion. -->
  <div ref="elRef" class="jack-magnet">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    /** Activation distance beyond the element's bounding rect (px). */
    padding?: number
    /** Movement divisor — higher = subtler follow. Spec default 3. */
    strength?: number
    activeTransition?: string
    inactiveTransition?: string
  }>(),
  {
    padding: 150,
    strength: 3,
    activeTransition: 'transform 0.3s ease-out',
    inactiveTransition: 'transform 0.6s ease-in-out',
  },
)

const elRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()
let enabled = false

function onMove(e: MouseEvent) {
  const el = elRef.value
  if (!el || !enabled) return
  const rect = el.getBoundingClientRect()
  const left = rect.left - props.padding
  const right = rect.right + props.padding
  const top = rect.top - props.padding
  const bottom = rect.bottom + props.padding
  const inside =
    e.clientX >= left && e.clientX <= right && e.clientY >= top && e.clientY <= bottom

  if (inside) {
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = (e.clientX - cx) / props.strength
    let dy = (e.clientY - cy) / props.strength
    // Cap so strength can't fling a large element off-screen.
    const capX = rect.width * 0.4
    const capY = rect.height * 0.4
    dx = Math.max(-capX, Math.min(capX, dx))
    dy = Math.max(-capY, Math.min(capY, dy))
    el.style.transition = props.activeTransition
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  } else {
    el.style.transition = props.inactiveTransition
    el.style.transform = 'translate3d(0, 0, 0)'
  }
}

onMounted(() => {
  const el = elRef.value
  if (!el) return
  // No magnet on touch / reduced motion.
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (reduce.value || coarse) return
  enabled = true
  el.style.willChange = 'transform'
  window.addEventListener('mousemove', onMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
})
</script>

<style scoped>
.jack-magnet {
  display: inline-block;
}
</style>
