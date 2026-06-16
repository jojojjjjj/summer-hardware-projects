import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseInViewOptions {
  /** IntersectionObserver threshold */
  threshold?: number
  /** IntersectionObserver rootMargin */
  rootMargin?: string
  /** Debounce interval in ms for progress updates */
  debounceMs?: number
  /** Track progress (0-1) as element scrolls through viewport */
  trackProgress?: boolean
}

export function useInView(options: UseInViewOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    debounceMs = 16,
    trackProgress = true,
  } = options

  const elementRef: Ref<HTMLElement | null> = ref(null)

  /** Once true, stays true forever */
  const hasBeenInView = ref(false)

  /** Reflects current intersection state */
  const isCurrentlyInView = ref(false)

  /** 0-1 progress of element scrolling through the viewport */
  const progress = ref(0)

  /** 'top' if entering from top, 'bottom' if from bottom */
  const direction = ref<'top' | 'bottom'>('top')

  let observer: IntersectionObserver | null = null
  let rafId: number | null = null
  let lastUpdateTime = 0

  function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
  }

  /** Calculate scroll progress through the element (0 = just entering, 1 = fully exited) */
  function computeProgress(): void {
    const el = elementRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Progress: 0 when element top touches viewport bottom,
    //           1 when element bottom passes viewport top
    const totalTravel = viewportHeight + rect.height
    const distanceFromStart = viewportHeight - rect.top
    const raw = distanceFromStart / totalTravel

    progress.value = clamp(raw, 0, 1)
  }

  function handleIntersect(entries: IntersectionObserverEntry[]): void {
    const entry = entries[0]
    if (!entry) return

    const prevInView = isCurrentlyInView.value
    isCurrentlyInView.value = entry.isIntersecting

    if (entry.isIntersecting) {
      hasBeenInView.value = true

      // Determine direction: if boundingClientRect.top < 0, we entered from top
      direction.value = entry.boundingClientRect.top < 0 ? 'top' : 'bottom'
    }
  }

  /** RAF loop for progress tracking with optional debounce */
  function tick(): void {
    const now = performance.now()

    if (now - lastUpdateTime >= debounceMs) {
      if (trackProgress && isCurrentlyInView.value) {
        computeProgress()
      }
      lastUpdateTime = now
    }

    rafId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    const el = elementRef.value
    if (!el) return

    observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    })
    observer.observe(el)

    if (trackProgress) {
      rafId = requestAnimationFrame(tick)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return {
    elementRef,
    hasBeenInView,
    isCurrentlyInView,
    progress,
    direction,
  }
}

