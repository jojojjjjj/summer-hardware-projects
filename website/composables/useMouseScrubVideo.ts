import { onMounted, onUnmounted, type Ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

export interface UseMouseScrubVideoOptions {
  /** How strongly horizontal mouse motion maps to scrub time (spec: 0.8). */
  sensitivity?: number
}

/**
 * Mouse-scrub video — ported from the "Mainframe" hero spec. The `<video>` does
 * NOT autoplay; horizontal mouse movement scrubs `currentTime` forward/backward,
 * so moving the cursor "winds" the video. `onSeeked` drains a one-deep seek queue
 * to avoid seek-flooding.
 *
 * Degradations:
 *  - prefers-reduced-motion / touch (pointer: coarse) → never binds (poster shows)
 *  - out of viewport (IntersectionObserver) → unbinds mousemove (no seeking)
 *  - no `src` / no duration → seeks are no-ops (poster placeholder is fine)
 */
export function useMouseScrubVideo(
  videoRef: Ref<HTMLVideoElement | null>,
  options: UseMouseScrubVideoOptions = {},
) {
  const { sensitivity = 0.8 } = options
  const reduce = useReducedMotion()

  let prevX = 0
  let targetTime = 0
  let duration = 0
  let seeking = false
  let inView = false
  let bound = false
  let io: IntersectionObserver | null = null

  function seek() {
    const v = videoRef.value
    if (!v) return
    seeking = true
    // currentTime assignment is async; the 'seeked' event fires when it lands.
    try {
      v.currentTime = targetTime
    } catch {
      seeking = false
    }
  }

  function onSeeked() {
    seeking = false
    const v = videoRef.value
    if (!v) return
    // If the target moved while seeking, drain the queue with one more seek.
    if (Math.abs(v.currentTime - targetTime) > 0.05) seek()
  }

  function onMouseMove(e: MouseEvent) {
    const v = videoRef.value
    if (!v || !inView || !duration || !isFinite(duration)) return
    const delta = e.clientX - prevX
    prevX = e.clientX
    targetTime += (delta / window.innerWidth) * sensitivity * duration
    targetTime = Math.max(0, Math.min(duration, targetTime))
    if (!seeking) seek()
  }

  function bind() {
    if (bound) return
    prevX = window.innerWidth / 2
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    bound = true
  }

  function unbind() {
    if (!bound) return
    window.removeEventListener('mousemove', onMouseMove)
    bound = false
  }

  function onLoadedMetadata() {
    const v = videoRef.value
    if (!v) return
    duration = v.duration || 0
    if (targetTime > duration) targetTime = duration
  }

  onMounted(() => {
    const v = videoRef.value
    if (!v) return
    // Touch / reduced-motion → leave the poster static.
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce.value || coarse) return

    if (v.readyState >= 1) onLoadedMetadata()
    v.addEventListener('loadedmetadata', onLoadedMetadata)
    v.addEventListener('seeked', onSeeked)

    io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) bind()
        else unbind()
      },
      { threshold: 0.05 },
    )
    io.observe(v)
  })

  onUnmounted(() => {
    unbind()
    io?.disconnect()
    io = null
    const v = videoRef.value
    if (v) {
      v.removeEventListener('loadedmetadata', onLoadedMetadata)
      v.removeEventListener('seeked', onSeeked)
    }
  })
}
