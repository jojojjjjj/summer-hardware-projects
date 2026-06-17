<template>
  <section ref="sectionRef" class="relative flex min-h-screen items-center overflow-hidden">
    <!-- Background layers (parallax) -->
    <div ref="bgLayer1" class="absolute inset-0 bg-background" />
    <!-- Directional volumetric light: a soft corner bloom (light source, top-left) + faint diagonal wash -->
    <div ref="bgLayer2" class="absolute inset-0" style="background: radial-gradient(ellipse 55% 65% at 14% 6%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 35%, transparent 60%), linear-gradient(125deg, rgba(99,102,241,0.06) 0%, transparent 45%);" />
    <!-- Faint cool grid texture -->
    <div ref="bgLayer3" class="absolute inset-0 opacity-[0.018]" style="background-image: linear-gradient(rgba(120,130,180,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,130,180,0.18) 1px, transparent 1px); background-size: 80px 80px;" />

    <!-- Static ambient orbs (spatial depth — NO animation, never events) -->
    <div class="ambient-orb" style="width:420px;height:420px;background:#3b82f6;top:-90px;right:8%;opacity:0.05" />
    <div class="ambient-orb" style="width:600px;height:600px;background:#8b5cf6;bottom:-200px;left:4%;opacity:0.045" />

    <!-- Global mouse-follow orb (interaction-driven; lerped via useGlobalMouse) -->
    <div
      ref="orbRef"
      class="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
      style="background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 38%, transparent 66%); filter: blur(40px); opacity: 0; will-change: transform;"
    />

    <!-- Content — 7:5 asymmetric, left-aligned -->
    <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div class="lg:col-span-7 text-left">
          <!-- Brand logo -->
          <div ref="logoRef" class="mb-8 md:mb-10">
            <img src="/logo.png" alt="暑期硬件实践课程" class="h-14 md:h-20 w-auto object-contain" />
          </div>

          <!-- Eyebrow -->
          <div ref="eyebrowRef" class="mb-6">
            <span class="eyebrow inline-flex items-center rounded-full px-4 py-1.5" style="background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.16);">2026 暑期</span>
          </div>

          <!-- Main title — animated reveal + scroll parallax wrapper + magnetic char field -->
          <div ref="titleParallaxRef">
            <h1 ref="titleRef" class="text-hero font-bold tracking-tight text-text-primary">
              <span v-for="(line, li) in titleLines" :key="li" class="block" data-split-line>
                <span
                  v-for="(ch, ci) in line"
                  :key="ci"
                  class="hero-char inline-block"
                  style="will-change: transform;"
                >{{ ch === ' ' ? ' ' : ch }}</span>
              </span>
            </h1>
          </div>

          <!-- Subtitle -->
          <p ref="subtitleRef" class="mt-8 text-xl sm:text-2xl text-text-secondary font-normal max-w-xl leading-relaxed">
            高中生暑期硬件实践课程
          </p>

          <!-- CTAs -->
          <div ref="ctaRef" class="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              ref="ctaBtnRef"
              href="#projects"
              @click="onHeroRipple"
              class="magnetic-btn cta-btn group relative inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-[15px] font-semibold text-white overflow-hidden"
            >
              <span class="relative z-10">查看项目</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
              <span ref="rippleRef" class="pointer-events-none absolute inset-0 overflow-hidden rounded-full" />
            </a>
            <a href="#value-props" class="text-[15px] font-medium text-text-secondary/80 transition-colors duration-300 hover:text-text-primary hover:underline underline-offset-4 decoration-cool-indigo/40">
              了解更多
            </a>
          </div>
        </div>

        <!-- Specs — right column: two stacked stats -->
        <div ref="specsRef" class="lg:col-span-5 lg:pl-8" style="perspective: 900px;">
          <div ref="specsGridRef" class="flex flex-col gap-8 lg:border-l lg:border-white/[0.06] lg:pl-10" style="transform-origin: center top; will-change: transform;">
            <div>
              <div class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-accent tabular-nums font-mono tracking-tighter leading-none">
                {{ countUp.projects }}
              </div>
              <p class="mt-3 text-[11px] text-text-tertiary uppercase tracking-[0.22em] font-semibold">真实项目</p>
            </div>
            <div class="h-px w-14 bg-white/[0.08]" />
            <div>
              <div class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-accent tabular-nums font-mono tracking-tighter leading-none">
                12–15
              </div>
              <p class="mt-3 text-[11px] text-text-tertiary uppercase tracking-[0.22em] font-semibold">天完成</p>
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
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useGlobalMouse } from '~/composables/useGlobalMouse'

gsap.registerPlugin(ScrollTrigger)

// Title lines — pre-split into chars in the template for the magnetic field.
const titleLines = ['从零开始', '亲手打造 9 个真实硬件项目']

// ── Refs ──
const sectionRef = ref<HTMLElement | null>(null)
const bgLayer1 = ref<HTMLElement | null>(null)
const bgLayer2 = ref<HTMLElement | null>(null)
const bgLayer3 = ref<HTMLElement | null>(null)
const orbRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const titleParallaxRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const ctaBtnRef = ref<HTMLElement | null>(null)
const rippleRef = ref<HTMLElement | null>(null)
const specsRef = ref<HTMLElement | null>(null)
const specsGridRef = ref<HTMLElement | null>(null)
const scrollIndicatorRef = ref<HTMLElement | null>(null)

// ── Count-up state (RAF) ──
const countUp = reactive({ projects: 0 })
let rafId: number | null = null

// ── Magnetic CTA ──
const magnetic = ref({ x: 0, y: 0 })

const reduce = useReducedMotion()
const { x: mouseX, y: mouseY, enabled: mouseEnabled } = useGlobalMouse(0.12)

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

// ── CTA ripple (click feedback) ──
function onHeroRipple(e: MouseEvent) {
  if (!rippleRef.value || !ctaBtnRef.value || reduce.value) return
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
    background: rgba(255, 255, 255, 0.28);
    transform: scale(0);
    pointer-events: none;
  `
  rippleRef.value.appendChild(ripple)
  gsap.to(ripple, {
    scale: 1,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove(),
  })
}

// ── Main timeline ──
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  const lines = titleRef.value?.querySelectorAll('[data-split-line]') || []

  if (reduce.value) {
    // Snap everything to final state — no motion
    gsap.set([logoRef.value, eyebrowRef.value, titleRef.value, subtitleRef.value, ctaRef.value, specsRef.value].filter(Boolean), { opacity: 1, y: 0 })
    gsap.set(scrollIndicatorRef.value, { opacity: 0.3 })
    gsap.set(specsGridRef.value, { rotateX: 0 })
    countUp.projects = 9
    return
  }

  // Set initial states
  gsap.set(logoRef.value, { opacity: 0, y: 20 })
  gsap.set(eyebrowRef.value, { opacity: 0, y: 20 })
  gsap.set(lines, { opacity: 0, y: 50 })
  gsap.set(subtitleRef.value, { opacity: 0, y: 25 })
  gsap.set(ctaRef.value, { opacity: 0, y: 25 })
  gsap.set(specsRef.value, { opacity: 0, y: 20 })
  gsap.set(scrollIndicatorRef.value, { opacity: 0 })

  // Build timeline
  tl = gsap.timeline({ delay: 0.3 })

  tl.to(logoRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(eyebrowRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to(lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
    .to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .to(ctaRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35')
    .to(specsRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', onStart: startCountUp }, '-=0.3')
    .to(scrollIndicatorRef.value, { opacity: 0.3, duration: 1, ease: 'power2.out' }, '-=0.2')

  // ── Scroll-driven parallax (title rises + fades; specs 3D tilt; bg drifts) ──
  const stOpts = { trigger: sectionRef.value!, start: 'top top', end: 'bottom top', scrub: 0.8 }
  gsap.to(titleParallaxRef.value, { y: -70, opacity: 0, ease: 'none', scrollTrigger: { ...stOpts } })
  gsap.to(specsGridRef.value, { rotateX: -14, ease: 'none', scrollTrigger: { ...stOpts } })
  gsap.to(bgLayer2.value, { y: 45, ease: 'none', scrollTrigger: { ...stOpts } })
  gsap.to(bgLayer3.value, { y: 70, ease: 'none', scrollTrigger: { ...stOpts } })

  // Magnetic CTA
  ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)
})

// ── Global-mouse-driven: background orb follow + title magnetic char field ──
watch([mouseX, mouseY], () => {
  if (!mouseEnabled.value || !sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const localX = mouseX.value - rect.left
  const localY = mouseY.value - rect.top

  // Orb follows the smoothed cursor (centered on cursor)
  if (orbRef.value) {
    gsap.set(orbRef.value, { x: localX - 250, y: localY - 250, opacity: 0.08 })
  }

  // Title magnetic field — chars within `influence` push away from the cursor (max ~3.2px)
  const chars = titleRef.value?.querySelectorAll<HTMLElement>('.hero-char')
  if (!chars || !chars.length) return
  const outside = mouseY.value < rect.top - 80 || mouseY.value > rect.bottom + 80
  const influence = 150
  chars.forEach((el) => {
    if (outside) { gsap.set(el, { x: 0, y: 0 }); return }
    const r = el.getBoundingClientRect()
    const ccx = r.left + r.width / 2
    const ccy = r.top + r.height / 2
    const dx = ccx - mouseX.value
    const dy = ccy - mouseY.value
    const dist = Math.hypot(dx, dy)
    if (dist > influence) { gsap.set(el, { x: 0, y: 0 }); return }
    const factor = 1 - dist / influence
    const inv = 1 / (dist || 1)
    gsap.set(el, { x: dx * inv * factor * 3.2, y: dy * inv * factor * 3.2 })
  })
})

// ── RAF count-up ──
function startCountUp() {
  if (reduce.value) { countUp.projects = 9; return }
  const duration = 2200
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    if (progress >= 1) { countUp.projects = 9; return }
    const eased = 1 - Math.pow(2, -10 * progress)
    countUp.projects = Math.floor(eased * 9)
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

onUnmounted(() => {
  tl?.kill()
  if (rafId !== null) cancelAnimationFrame(rafId)
  ctaBtnRef.value?.removeEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.removeEventListener('mouseleave', onCtaMouseLeave)
  // Kill only this component's ScrollTriggers
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === sectionRef.value) st.kill()
  })
})
</script>
