import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reactive `prefers-reduced-motion` flag. Read synchronously (client) so GSAP
 * setup hooks can short-circuit entrance tweens — when reduced, components should
 * `gsap.set(els, { opacity: 1, y: 0 })` instead of animating.
 */
export function useReducedMotion() {
  const reduced = ref(false)
  let mq: MediaQueryList | null = null

  const handler = (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  }

  if (typeof window !== 'undefined') {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    if (!mq) mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    mq.addEventListener('change', handler)
  })

  onUnmounted(() => {
    mq?.removeEventListener('change', handler)
  })

  return reduced
}
