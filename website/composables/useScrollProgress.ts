import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseScrollProgressOptions {
  /** Lerp factor for smooth interpolation (0-1). Lower = smoother. Default 0.1 */
  lerp?: number
  /** Element to track. If provided, returns 0-1 progress through that element only */
  target?: Ref<HTMLElement | null>
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { lerp = 0.1, target } = options

  /** Page-wide scroll progress 0-1 */
  const progress = ref(0)

  /** Smoothly interpolated progress */
  const smoothProgress = ref(0)

  /** Section-specific progress 0-1 (only meaningful when `target` is set) */
  const sectionProgress = ref(0)

  /** Smooth section progress */
  const smoothSectionProgress = ref(0)

  /** Current scroll direction */
  const direction = ref<'up' | 'down'>('down')

  /** Scroll velocity in px/frame (positive = scrolling down) */
  const velocity = ref(0)

  let rafId: number | null = null
  let lastScrollY = 0
  let lastTime = performance.now()

  function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max)
  }

  function lerpValue(current: number, target: number, factor: number): number {
    return current + (target - current) * factor
  }

  function computePageProgress(): number {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? clamp(scrollTop / docHeight, 0, 1) : 0
  }

  function computeSectionProgress(): number {
    const el = target?.value
    if (!el) return 0

    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const totalTravel = viewportHeight + rect.height
    const distanceFromStart = viewportHeight - rect.top

    return clamp(distanceFromStart / totalTravel, 0, 1)
  }

  function tick(): void {
    const now = performance.now()
    const dt = now - lastTime

    // Update direction & velocity
    const currentScrollY = window.scrollY
    const delta = currentScrollY - lastScrollY

    if (Math.abs(delta) > 0.5) {
      direction.value = delta > 0 ? 'down' : 'up'
      velocity.value = delta / Math.max(dt, 1) * 16 // normalize to ~60fps
    } else {
      velocity.value *= 0.9
    }

    lastScrollY = currentScrollY
    lastTime = now

    // Compute raw values
    progress.value = computePageProgress()
    sectionProgress.value = computeSectionProgress()

    // Smooth interpolation
    smoothProgress.value = lerpValue(smoothProgress.value, progress.value, lerp)
    smoothSectionProgress.value = lerpValue(smoothSectionProgress.value, sectionProgress.value, lerp)

    rafId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    lastScrollY = window.scrollY
    lastTime = performance.now()
    progress.value = computePageProgress()
    smoothProgress.value = progress.value
    rafId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return {
    progress,
    smoothProgress,
    sectionProgress,
    smoothSectionProgress,
    direction,
    velocity,
  }
}