import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useInView(elementRef: Ref<HTMLElement | null>, options: IntersectionObserverInit = {}) {
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        if (options.once !== false) {
          observer?.disconnect()
        }
      }
    }, { threshold: 0.1, ...options })
    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isInView }
}
