import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseSpotlightOptions {
  /** Spotlight color theme — matches the [data-glow] CSS contract. Default 'cool'. */
  glow?: 'cool' | 'warm'
  /** Set the data-glow attribute on the element so .spotlight picks the right color. */
  setAttribute?: boolean
}

/**
 * Mouse-follow spotlight. Sets `--mx` / `--my` (px) on the element so the
 * `.spotlight::before` radial follows the cursor. Pair with the `.spotlight` class.
 *
 * Disabled automatically under `prefers-reduced-motion` and on coarse pointers
 * (touch) — there the spotlight simply never appears.
 */
export function useSpotlight(el: Ref<HTMLElement | null>, options: UseSpotlightOptions = {}) {
  const { glow = 'cool', setAttribute = true } = options
  const active = ref(false)

  let enabled = true
  let raf = 0
  let pending: { x: number; y: number } | null = null

  function flush(): void {
    raf = 0
    const node = el.value
    if (!node || !pending) return
    node.style.setProperty('--mx', `${pending.x}px`)
    node.style.setProperty('--my', `${pending.y}px`)
  }

  function onMove(e: MouseEvent): void {
    const node = el.value
    if (!node || !enabled) return
    const rect = node.getBoundingClientRect()
    pending = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (!raf) raf = requestAnimationFrame(flush)
  }

  function onEnter(): void {
    if (!enabled) return
    active.value = true
  }

  function onLeave(): void {
    active.value = false
    pending = null
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    enabled = !reduce && !coarse

    const node = el.value
    if (!node) return
    if (setAttribute) node.setAttribute('data-glow', glow)
    if (!enabled) return

    node.addEventListener('mousemove', onMove, { passive: true })
    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    if (raf) cancelAnimationFrame(raf)
    const node = el.value
    if (!node) return
    node.removeEventListener('mousemove', onMove)
    node.removeEventListener('mouseenter', onEnter)
    node.removeEventListener('mouseleave', onLeave)
  })

  return { active }
}
