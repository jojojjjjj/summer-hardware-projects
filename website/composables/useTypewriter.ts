import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

export interface UseTypewriterOptions {
  /** ms per character (spec default 38) */
  speed?: number
  /** ms delay before typing starts (spec default 600) */
  startDelay?: number
}

/**
 * Typewriter effect — ported from the "Mainframe" hero spec. Reveals `text` one
 * character at a time.
 *
 * SSG-safe (unlike a naive empty-start typewriter): `displayed` is initialized to
 * the FULL text and `done` to true, so the static export ships the headline and a
 * no-JS visitor sees it. On mount (client only) the non-reduced path HIDES it
 * (`displayed=''`, `done=false`) — for a below-the-fold band this is off-screen,
 * so the full-text → empty transition is never seen — then types back when the
 * element scrolls into view (or on mount if no `triggerRef`). Reduced motion
 * leaves the full-text baseline untouched.
 *
 * Returns `{ displayed, done, started }`: gate a cursor on `started && !done` so
 * it never appears in the SSG baseline or under reduced motion.
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {},
  triggerRef?: Ref<HTMLElement | null>,
) {
  const { speed = 38, startDelay = 600 } = options
  const displayed = ref(text)
  const done = ref(true)
  const started = ref(false)
  const reduce = useReducedMotion()

  let i = 0
  let typeTimer: ReturnType<typeof setInterval> | null = null
  let startTimer: ReturnType<typeof setTimeout> | null = null
  let io: IntersectionObserver | null = null

  function clear() {
    if (typeTimer) { clearInterval(typeTimer); typeTimer = null }
    if (startTimer) { clearTimeout(startTimer); startTimer = null }
    io?.disconnect()
    io = null
  }

  function beginTyping() {
    if (started.value) return
    started.value = true
    startTimer = setTimeout(() => {
      typeTimer = setInterval(() => {
        i += 1
        displayed.value = text.slice(0, i)
        if (i >= text.length) {
          if (typeTimer) { clearInterval(typeTimer); typeTimer = null }
          done.value = true
        }
      }, speed)
    }, startDelay)
  }

  onMounted(() => {
    // Reduced motion: leave the SSG full-text baseline as-is (done stays true,
    // started stays false → no cursor). Nothing to animate.
    if (reduce.value) return

    // Non-reduced: hide now (client-only). For a below-the-fold band this is
    // off-screen, so the SSG full-text → empty transition is never seen; a no-JS
    // visitor keeps the full text. Then type on view (or immediately).
    displayed.value = ''
    done.value = false

    if (triggerRef?.value) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            beginTyping()
            io?.disconnect()
            io = null
          }
        },
        { threshold: 0.4 },
      )
      io.observe(triggerRef.value)
    } else {
      beginTyping()
    }
  })

  onUnmounted(clear)

  return { displayed, done, started }
}
