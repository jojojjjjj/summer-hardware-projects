<template>
  <section ref="sectionRef" class="relative flex min-h-screen items-center overflow-hidden">
    <!-- Background layers (parallax) -->
    <div ref="bgLayer1" class="absolute inset-0 bg-background" />
    <!-- Directional volumetric light: a soft corner bloom (light source, top-left) + faint diagonal wash -->
    <div ref="bgLayer2" class="absolute inset-0" style="background: radial-gradient(ellipse 55% 65% at 14% 6%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 35%, transparent 60%), linear-gradient(125deg, rgba(99,102,241,0.06) 0%, transparent 45%);" />
    <!-- Faint cool grid texture -->
    <div ref="bgLayer3" class="absolute inset-0 opacity-[0.018]" style="background-image: linear-gradient(rgba(120,130,180,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,180,0.18) 1px, transparent 1px); background-size: 80px 80px;" />

    <!-- Content — 7:5 asymmetric, left-aligned -->
    <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div class="lg:col-span-7 text-left">
          <!-- Eyebrow -->
          <div ref="eyebrowRef" class="mb-6">
            <span class="eyebrow inline-flex items-center rounded-full px-4 py-1.5" style="background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.16);">2026 暑期</span>
          </div>

          <!-- Main title — animated reveal -->
          <h1 ref="titleRef" class="text-hero font-bold tracking-tight text-text-primary">
            <span class="block" data-split-line>从零开始</span>
            <span class="block" data-split-line>亲手打造 9 个真实硬件项目</span>
          </h1>

          <!-- Subtitle -->
          <p ref="subtitleRef" class="mt-8 text-xl sm:text-2xl text-text-secondary font-normal max-w-xl leading-relaxed">
            高中生暑期硬件实践课程
          </p>

          <!-- CTAs -->
          <div ref="ctaRef" class="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              ref="ctaBtnRef"
              href="#projects"
              class="magnetic-btn cta-btn group relative inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-[15px] font-semibold text-white overflow-hidden"
            >
              <span class="relative z-10">查看项目</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
            </a>
            <a href="#value-props" class="text-[15px] font-medium text-text-secondary/80 transition-colors duration-300 hover:text-text-primary hover:underline underline-offset-4 decoration-cool-indigo/40">
              了解更多
            </a>
          </div>
        </div>

        <!-- Specs — right column (desktop), full-width row (mobile) -->
        <div ref="specsRef" class="lg:col-span-5 lg:pl-8">
          <div class="grid grid-cols-3 gap-6 sm:gap-8 lg:border-l lg:border-white/[0.06] lg:pl-8">
            <div class="text-left">
              <div class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-accent tabular-nums font-mono tracking-tighter">
                {{ countUp.projects }}
              </div>
              <p class="mt-2 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">项目</p>
            </div>
            <div class="text-left">
              <div class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-accent tabular-nums font-mono tracking-tighter">
                10–20
              </div>
              <p class="mt-2 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">天</p>
            </div>
            <div class="text-left">
              <div class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-accent tabular-nums font-mono tracking-tighter">
                ≤¥500
              </div>
              <p class="mt-2 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">每套</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator (static, no infinite float) -->
    <div ref="scrollIndicatorRef" class="absolute bottom-10 left-1/2 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2.5">
        <div class="scroll-line h-10 w-px bg-gradient-to-b from-text-tertiary/50 to-transparent" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

// ── Refs ──
const sectionRef = ref<HTMLElement | null>(null)
const bgLayer1 = ref<HTMLElement | null>(null)
const bgLayer2 = ref<HTMLElement | null>(null)
const bgLayer3 = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const ctaBtnRef = ref<HTMLElement | null>(null)
const specsRef = ref<HTMLElement | null>(null)
const scrollIndicatorRef = ref<HTMLElement | null>(null)

// ── Count-up state (RAF) ──
const countUp = reactive({ projects: 0 })
let rafId: number | null = null

// ── Magnetic CTA ──
const magnetic = ref({ x: 0, y: 0 })

const reduce = useReducedMotion()

function onCtaMouseMove(e: MouseEvent) {
  if (!ctaBtnRef.value || reduce.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  magnetic.value.x = (e.clientX - cx) * 0.25
  magnetic.value.y = (e.clientY - cy) * 0.25
  gsap.to(ctaBtnRef.value, { x: magnetic.value.x, y: magnetic.value.y, duration: 0.4, ease: 'power2.out' })
}

function onCtaMouseLeave() {
  if (!ctaBtnRef.value || reduce.value) return
  gsap.to(ctaBtnRef.value, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
}

// ── Parallax on scroll ──
let scrollHandler: (() => void) | null = null

function setupParallax() {
  scrollHandler = () => {
    const scrollY = window.scrollY
    const vh = window.innerHeight
    if (scrollY > vh * 1.5) return
    const progress = scrollY / vh
    gsap.set(bgLayer2.value, { y: progress * 40 })
    gsap.set(bgLayer3.value, { y: progress * 60 })
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
}

// ── Main timeline ──
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  const lines = titleRef.value?.querySelectorAll('[data-split-line]') || []

  if (reduce.value) {
    // Snap everything to final state — no motion
    gsap.set([eyebrowRef.value, titleRef.value, subtitleRef.value, ctaRef.value, specsRef.value].filter(Boolean), { opacity: 1, y: 0 })
    gsap.set(scrollIndicatorRef.value, { opacity: 0.3 })
    countUp.projects = 9
    ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
    ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)
    return
  }

  // Set initial states
  gsap.set(eyebrowRef.value, { opacity: 0, y: 20 })
  gsap.set(lines, { opacity: 0, y: 50 })
  gsap.set(subtitleRef.value, { opacity: 0, y: 25 })
  gsap.set(ctaRef.value, { opacity: 0, y: 25 })
  gsap.set(specsRef.value, { opacity: 0, y: 20 })
  gsap.set(scrollIndicatorRef.value, { opacity: 0 })

  // Build timeline
  tl = gsap.timeline({ delay: 0.3 })

  tl.to(eyebrowRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
    .to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .to(ctaRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35')
    .to(specsRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', onStart: startCountUp }, '-=0.3')
    .to(scrollIndicatorRef.value, { opacity: 0.3, duration: 1, ease: 'power2.out' }, '-=0.2')

  // Magnetic CTA
  ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)

  // Parallax
  setupParallax()
})

// ── RAF count-up ──
function startCountUp() {
  if (reduce.value) { countUp.projects = 9; return }
  const duration = 2200
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(2, -10 * progress)
    countUp.projects = Math.floor(eased * 9)
    if (progress < 1) {
      rafId = requestAnimationFrame(tick)
    }
  }
  rafId = requestAnimationFrame(tick)
}

onUnmounted(() => {
  tl?.kill()
  if (rafId !== null) cancelAnimationFrame(rafId)
  ctaBtnRef.value?.removeEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.removeEventListener('mouseleave', onCtaMouseLeave)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>
