import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useMagnetic(elementRef: Ref<HTMLElement | null>, strength = 0.3) {
  const x = ref(0)
  const y = ref(0)

  function handleMouseMove(e: MouseEvent) {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    x.value = deltaX
    y.value = deltaY
  }

  function handleMouseLeave() {
    x.value = 0
    y.value = 0
  }

  onMounted(() => {
    const el = elementRef.value
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove as any)
    el.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    const el = elementRef.value
    if (!el) return
    el.removeEventListener('mousemove', handleMouseMove as any)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })

  return { x, y }
}
