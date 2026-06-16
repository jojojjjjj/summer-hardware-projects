<template>
  <section ref="sectionRef" class="relative flex h-screen items-center justify-center overflow-hidden">
    <!-- Background layers (parallax) -->
    <div ref="bgLayer1" class="absolute inset-0 bg-background" />
    <div ref="bgLayer2" class="absolute inset-0" style="background: radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,154,118,0.10) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 55% 60%, rgba(255,107,107,0.05) 0%, transparent 60%); animation: gradientShift 8s ease infinite;" />
    <!-- Faint grid texture -->
    <div ref="bgLayer3" class="absolute inset-0 opacity-[0.015]" style="background-image: linear-gradient(rgba(255,154,118,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,154,118,0.22) 1px, transparent 1px); background-size: 80px 80px;" />
    <!-- Noise texture overlay -->
    <div class="pointer-events-none absolute inset-0 noise opacity-[0.015]" />

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-5xl px-6 text-center">
      <!-- Eyebrow -->
      <div ref="eyebrowRef" class="mb-6">
        <span class="eyebrow inline-flex items-center rounded-full px-4 py-1.5" style="background: linear-gradient(135deg, rgba(255,154,118,0.12), rgba(255,107,107,0.08));">2026 暑期</span>
      </div>

      <!-- Main title — animated reveal -->
      <h1 ref="titleRef" class="text-hero font-extrabold tracking-tight text-text-primary">
        <span class="block" data-split-line>从零开始</span>
        <span class="block" data-split-line>亲手打造 9 个真实硬件项目</span>
      </h1>

      <!-- Subtitle -->
      <p ref="subtitleRef" class="mt-8 text-xl sm:text-2xl text-text-secondary/80 font-normal max-w-xl mx-auto leading-relaxed">
        高中生暑期硬件实践课程
      </p>

      <!-- CTAs -->
      <div ref="ctaRef" class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
        <a
          ref="ctaBtnRef"
          href="#projects"
          class="magnetic-btn group relative inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-[15px] font-semibold text-white overflow-hidden transition-shadow duration-300 hover:shadow-glow-strong"
          style="background: linear-gradient(135deg, #ff9a76, #ff6b6b);"
        >
          <span class="relative z-10">查看项目</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
          <!-- Inner glow on hover -->
          <span class="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style="background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 70%);" />
        </a>
        <a href="#value-props" class="text-[15px] font-medium text-text-secondary/80 transition-all duration-300 hover:text-warm-peach hover:underline underline-offset-4 decoration-warm-peach/30">
          了解更多
        </a>
      </div>

      <!-- Specs bar (desktop) -->
      <div ref="specsRef" class="mt-28 hidden sm:flex items-center justify-center gap-16">
        <div class="text-center">
          <div class="text-5xl sm:text-6xl font-extrabold text-gradient-warm tabular-nums font-mono tracking-tighter">
            {{ countUp.projects }}
          </div>
          <p class="mt-2.5 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">项目</p>
        </div>
        <div class="h-12 w-px bg-white/[0.08]" />
        <div class="text-center">
          <div class="text-5xl sm:text-6xl font-extrabold text-gradient-warm tabular-nums font-mono tracking-tighter">
            10–20
          </div>
          <p class="mt-2.5 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">天</p>
        </div>
        <div class="h-12 w-px bg-white/[0.08]" />
        <div class="text-center">
          <div class="text-5xl sm:text-6xl font-extrabold text-gradient-warm tabular-nums font-mono tracking-tighter">
            ≤¥500
          </div>
          <p class="mt-2.5 text-[11px] text-text-tertiary uppercase tracking-[0.2em] font-semibold">每套</p>
        </div>
      </div>

      <!-- Mobile specs -->
      <div class="mt-14 flex sm:hidden items-center justify-center gap-5 text-[13px] text-text-tertiary">
        <span class="font-mono"><span class="text-gradient-warm font-bold">{{ countUp.projects }}</span> 项目</span>
        <span class="text-white/[0.10]">·</span>
        <span class="font-mono"><span class="text-gradient-warm font-bold">10–20</span> 天</span>
        <span class="text-white/[0.10]">·</span>
        <span class="font-mono"><span class="text-gradient-warm font-bold">≤¥500</span>/套</span>
      </div>
    </div>

    <!-- Scroll indicator -->
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

function onCtaMouseMove(e: MouseEvent) {
  if (!ctaBtnRef.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  magnetic.value.x = (e.clientX - cx) * 0.25
  magnetic.value.y = (e.clientY - cy) * 0.25
  gsap.to(ctaBtnRef.value, { x: magnetic.value.x, y: magnetic.value.y, duration: 0.4, ease: 'power2.out' })
}

function onCtaMouseLeave() {
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
  // Get title lines
  const lines = titleRef.value?.querySelectorAll('[data-split-line]') || []

  // Set initial states
  gsap.set(eyebrowRef.value, { opacity: 0, y: 20 })
  gsap.set(lines, { opacity: 0, y: 50 })
  gsap.set(subtitleRef.value, { opacity: 0, y: 25 })
  gsap.set(ctaRef.value, { opacity: 0, y: 25 })
  gsap.set(specsRef.value, { opacity: 0, y: 20 })
  gsap.set(scrollIndicatorRef.value, { opacity: 0 })

  // Build timeline
  tl = gsap.timeline({ delay: 0.3 })

  tl.to(eyebrowRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
  .to(lines, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power3.out',
  }, '-=0.3')
  .to(subtitleRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  }, '-=0.4')
  .to(ctaRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.35')
  .to(specsRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    onStart: startCountUp,
  }, '-=0.3')
  .to(scrollIndicatorRef.value, {
    opacity: 0.3,
    duration: 1,
    ease: 'power2.out',
  }, '-=0.2')

  // Scroll indicator float
  gsap.to('.scroll-line', {
    y: 4,
    duration: 1.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })

  // Magnetic CTA
  ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)

  // Parallax
  setupParallax()
})

// ── RAF count-up ──
function startCountUp() {
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

<style scoped>
@keyframes gradientShift {
  0%, 100% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  50% {
    transform: scale(1.05) translate(1%, -1%);
    opacity: 0.85;
  }
}

.noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
</style>
