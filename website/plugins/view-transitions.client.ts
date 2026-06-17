import type { Router } from 'vue-router'

/**
 * Page-flow transitions via the native View Transitions API (V3 §4.3).
 *
 * - Wraps every <NuxtLink>/router navigation in `document.startViewTransition()`,
 *   giving a cross-page crossfade + shared-element morph.
 * - Shared-element morph: the element carrying `view-transition-name: vt-project-{slug}`
 *   (the project-card visual on /projects ↔ the detail-hero visual on /projects/[slug])
 *   flies/morphs between the two pages. Same name on both sides is what makes it morph.
 * - The navbar carries `view-transition-name: site-navbar` so it stays put (no flicker).
 * - Falls back to plain instant navigation when the API is unsupported OR the user
 *   prefers reduced motion — no transition at all in that case.
 * - Nuxt's Vue <Transition> pageTransition is disabled in nuxt.config
 *   (app.pageTransition: false) so the two animation systems don't double-animate
 *   (out-in Vue transition would also delay the new-page mount and break the morph).
 *
 * SSG-safe: `.client` plugin → never runs during `nuxt generate`.
 */
export default defineNuxtPlugin(() => {
  const router = useRouter() as Router

  type VT = (cb: () => Promise<void> | void) => { finished: Promise<void> }
  const startVT = (): VT | undefined => {
    if (typeof document === 'undefined') return undefined
    const fn = (document as unknown as { startViewTransition?: VT }).startViewTransition
    // MUST be bound to document — invoking the detached method throws "Illegal invocation".
    return fn ? fn.bind(document) : undefined
  }

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let inFlight = false

  router.beforeEach((to, from, next) => {
    // Skip: first load, same-path (hash-only), or a transition already running.
    if (inFlight || !from.matched.length || to.path === from.path) return next()
    // Skip: unsupported or reduced-motion → plain navigation.
    const vt = startVT()
    if (!vt || prefersReduced()) return next()

    inFlight = true
    // startViewTransition snapshots the OLD DOM first, then runs the callback,
    // then snapshots the NEW DOM once the callback's promise resolves → morph.
    const transition = vt(async () => {
      await new Promise<void>((resolve) => {
        // Resolve only after the new route has actually rendered into the DOM,
        // so the NEW snapshot captures the destination page (not the old one).
        const off = router.afterEach(() => {
          off()
          nextTick(() => nextTick(resolve))
        })
        next()
      })
    })

    transition.finished
      .catch(() => {
        /* transition can reject if skipped/aborted — swallow */
      })
      .finally(() => {
        inFlight = false
      })
  })
})
