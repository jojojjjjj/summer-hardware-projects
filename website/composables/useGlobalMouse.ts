import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * Global mouse position with lerp smoothing.
 *
 * Exposes `targetX/targetY` (raw cursor coords) and `x/y` (lerp-smoothed).
 * A single `mousemove` listener + rAF loop drives the smoothing; the loop
 * self-stops when converged (so still mouse = zero per-frame work).
 *
 * Disabled under `prefers-reduced-motion` and on coarse pointers (touch) —
 * there `enabled` is false and the smoothed coords stay at viewport center.
 * Pair with `useReducedMotion` when a component needs both signals.
 */
export function useGlobalMouse(lerp = 0.12) {
  const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const targetX = ref(cx)
  const targetY = ref(cy)
  const x = ref(cx)
  const y = ref(cy)
  const enabled = ref(false)

  let raf = 0
  let running = false

  function lerpFn(a: number, b: number, t: number): number {
    return a + (b - a) * t
  }

  function tick(): void {
    x.value = lerpFn(x.value, targetX.value, lerp)
    y.value = lerpFn(y.value, targetY.value, lerp)
    if (Math.abs(x.value - targetX.value) > 0.4 || Math.abs(y.value - targetY.value) > 0.4) {
      raf = requestAnimationFrame(tick)
    } else {
      x.value = targetX.value
      y.value = targetY.value
      running = false
      raf = 0
    }
  }

  function onMove(e: MouseEvent): void {
    if (!enabled.value) return
    targetX.value = e.clientX
    targetY.value = e.clientY
    if (!running) {
      running = true
      raf = requestAnimationFrame(tick)
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    enabled.value = !reduce && !coarse
    if (!enabled.value) return
    targetX.value = x.value = window.innerWidth / 2
    targetY.value = y.value = window.innerHeight / 2
    window.addEventListener('mousemove', onMove, { passive: true })
  })

  onUnmounted(() => {
    if (raf) cancelAnimationFrame(raf)
    if (typeof window !== 'undefined') window.removeEventListener('mousemove', onMove)
  })

  return { x, y, targetX, targetY, enabled: readonly(enabled) }
}
