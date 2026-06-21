<template>
  <section id="contact" class="relative overflow-hidden py-24 md:py-36" style="background: linear-gradient(180deg, #0b0d12 0%, #0f1118 50%, #0b0d12 100%);">
    <!-- Directional cool wash from top + richer soft bloom pooling behind the card -->
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 75% 55% at 50% 0%, rgba(99,102,241,0.14) 0%, transparent 60%);" />
    <div ref="orbRef" class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] max-w-5xl h-[40rem]" style="background: radial-gradient(ellipse 50% 60% at 50% 42%, rgba(99,102,241,0.26) 0%, rgba(99,102,241,0.07) 45%, transparent 72%); filter: blur(48px);" />

    <div class="mx-auto max-w-4xl px-6">
      <div
        ref="cardRef"
        class="relative rounded-[2rem] overflow-hidden glass-card"
      >
        <!-- Static cool top hairline (replaces spinning conic border) -->
        <div class="absolute inset-x-0 top-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);" />

        <div class="relative z-10 px-8 py-20 max-sm:px-6 max-sm:py-12 sm:px-16 sm:py-28 md:py-32 text-center">
          <h2 ref="headingRef" class="text-[2.5rem] md:text-[3.75rem] font-semibold tracking-[-0.04em] text-text-primary leading-[1.05]">
            <WordsPullUp text="准备好开始了吗？" />
          </h2>
          <p ref="subRef" class="mx-auto mt-6 max-w-md text-body-lg text-text-secondary opacity-0 translate-y-6">
            12–15 天，9 个真实项目，从第一次焊接到最终答辩
          </p>

          <!-- CTA Button with magnetic hover — restrained warm accent -->
          <div ref="ctaWrapperRef" class="mt-14 md:mt-16 opacity-0 translate-y-6">
            <button
              ref="ctaBtnRef"
              @mouseenter="onBtnEnter"
              @mousemove="onBtnMove"
              @mouseleave="onBtnLeave"
              @focus="prefetchSignup"
              @click="onBtnClick"
              class="group cta-btn relative inline-flex items-center justify-center gap-3 rounded-full text-[16px] font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-coral/50 overflow-hidden"
              style="padding: 20px 48px;"
            >
              <!-- Inner gradient sheen -->
              <span class="absolute inset-0 rounded-full opacity-15" style="background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);" />
              <span class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 tracking-wide">立即报名</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              <span ref="rippleRef" class="pointer-events-none absolute inset-0 overflow-hidden rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Signup modal — teleports to body; reduced-motion-friendly -->
    <SignupModal :open="signupOpen" @close="signupOpen = false" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import SignupModal from '~/components/SignupModal.vue'

const cardRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const ctaWrapperRef = ref<HTMLElement | null>(null)
const ctaBtnRef = ref<HTMLElement | null>(null)
const rippleRef = ref<HTMLElement | null>(null)
const orbRef = ref<HTMLElement | null>(null)

const signupOpen = ref(false)

const reduce = useReducedMotion()
let gsapInstance: any = null
let orbScrollHandler: (() => void) | null = null
let ticking = false

// Warm the signup-image cache before the user can click, so the modal image is
// near-instant. Fires once — on CTA hover/focus (intent) and when the card
// scrolls into view (proximity). Not motion, so it runs under reduced-motion too.
let signupPrefetched = false
function prefetchSignup() {
  if (signupPrefetched || typeof window === 'undefined') return
  signupPrefetched = true
  // Both responsive variants are tiny (26 KB + 17 KB); warming both guarantees
  // a cache hit on any viewport.
  const a = new Image()
  a.src = '/media/signup-link.webp'
  const b = new Image()
  b.src = '/media/signup-link-672.webp'
}

function onBtnEnter() {
  prefetchSignup()
  if (!gsapInstance || !ctaBtnRef.value || reduce.value) return
  gsapInstance.to(ctaBtnRef.value, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
}

function onBtnMove(e: MouseEvent) {
  if (!gsapInstance || !ctaBtnRef.value || reduce.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) * 0.25
  const dy = (e.clientY - cy) * 0.25
  gsapInstance.to(ctaBtnRef.value, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
}

function onBtnLeave() {
  if (!gsapInstance || !ctaBtnRef.value || reduce.value) return
  gsapInstance.to(ctaBtnRef.value, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
}

function onBtnClick(e: MouseEvent) {
  // The signup modal opens unconditionally — it is reduced-motion-friendly,
  // so it shows even under prefers-reduced-motion. The ripple below is the
  // only motion piece and stays gated on !reduce.
  signupOpen.value = true

  if (!gsapInstance || !rippleRef.value || !ctaBtnRef.value || reduce.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const size = Math.max(rect.width, rect.height) * 2

  const ripple = document.createElement('span')
  ripple.style.cssText = `
    position: absolute;
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0);
    pointer-events: none;
  `
  rippleRef.value.appendChild(ripple)

  gsapInstance.to(ripple, {
    scale: 1,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    onComplete: () => ripple.remove(),
  })
}

onMounted(async () => {
  const gsap = (await import('gsap')).default
  gsapInstance = gsap

  // Prefetch the signup image as soon as the CTA card nears the viewport, so
  // the click is near-instant. Always on (independent of reduced-motion).
  if (cardRef.value && typeof IntersectionObserver !== 'undefined') {
    const prefetchObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          prefetchSignup()
          prefetchObserver.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    prefetchObserver.observe(cardRef.value)
  }

  // headingRef is revealed by <WordsPullUp>; only the subtitle + CTA animate here.
  const els = [subRef.value, ctaWrapperRef.value].filter(Boolean) as HTMLElement[]
  if (els.length) {
    if (reduce.value) {
      gsap.set(els, { opacity: 1, y: 0 })
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.value) observer.observe(cardRef.value)
  }

  // Orb scroll parallax
  if (!reduce.value && orbRef.value) {
    const section = document.getElementById('contact')
    orbScrollHandler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (!orbRef.value || !section) return
        const rect = section.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.04
        // Clamp to max +-20px drift
        const clamped = Math.max(-20, Math.min(20, offset))
        orbRef.value.style.transform = `translate(-50%, calc(-50% + ${clamped}px))`
      })
    }
    window.addEventListener('scroll', orbScrollHandler, { passive: true })
    orbScrollHandler()
  }
})

onUnmounted(() => {
  gsapInstance = null
  if (orbScrollHandler) window.removeEventListener('scroll', orbScrollHandler)
})
</script>
