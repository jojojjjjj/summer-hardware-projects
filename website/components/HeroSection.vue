<template>
  <section ref="sectionRef" class="relative flex min-h-screen items-center overflow-hidden">
    <!-- Background layers (parallax) -->
    <div ref="bgLayer1" class="absolute inset-0 bg-background" />

    <!-- V4·10 · Mouse-scrub video as ambient base. The self-hosted Mainframe
         "little person" clip scrubs with horizontal mouse movement (turns its
         head as you move the cursor) — the 2D hero layer. The 3D constellation
         (right column) floats over it: video is atmosphere + interaction, the
         glowing constellation is the subject. src is one-swap: replace
         public/media/hero-scrub.mp4 to change the video (no code edit).
         ⚠️ Licensing: this clip is Higgsfield/Mainframe's demo asset, not ours
         — swap for a self-generated/licensed clip before public launch. -->
    <MediaSlot
      class="absolute inset-0"
      mode="mouse-scrub"
      poster=""
      src="/media/hero-scrub.mp4"
      overlay-class="bg-gradient-to-r from-background/75 via-background/20 to-transparent"
    />
    <!-- Indigo+cream grade: a warm-cream multiply wash pulls the video's natural
         tones into the site palette (Aetheris/Prisma move) so the video + dock +
         chrome share one color family. Contrast comes from the glass chrome, not
         from dimming the video (light left-only gradient above keeps copy readable). -->
    <div class="pointer-events-none absolute inset-0" style="background: rgba(222,219,200,0.1); mix-blend-mode: multiply;" />
    <!-- Grain blanket (Prisma .noise-overlay): a full-bleed feTurbulence grain
         over the video + dock area, low opacity, mix-blend-overlay. This is the
         cinematic UNIFIER — it ties the video person, the glass shelf, and the
         copy into one film-still (the dock alone read as flat "pagination"; the
         grain makes everything feel like the same cinematic frame). Sits under
         the copy (z-10) so text stays sharp; the dock's backdrop-filter blurs
         the grainy video behind its glass. -->
    <div class="pointer-events-none absolute inset-0 z-[6]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;); opacity: 0.32; mix-blend-mode: overlay;" />
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

    <!-- Content — 7:5 asymmetric, left-aligned. The dock lives in the right column
         (beneath the figure), not bottom-center, so it never overlaps the copy. -->
    <div class="relative z-10 mx-auto w-full max-w-6xl px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div class="lg:col-span-7 text-left">
          <!-- Brand logo -->
          <div ref="logoRef" class="mb-8 md:mb-10">
            <img src="/logo.webp" alt="暑期硬件实践课程" width="826" height="201" loading="eager" decoding="async" class="h-14 md:h-20 w-auto object-contain" />
          </div>

          <!-- Eyebrow -->
          <div ref="eyebrowRef" class="mb-6">
            <span class="eyebrow inline-flex items-center rounded-full px-4 py-1.5" style="background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.16);">2026 暑期</span>
          </div>

          <!-- Main title — animated reveal + scroll parallax wrapper.
               08: .hero-heading gradient sits on the LINE spans (direct text
               containers), NOT the h1. The old per-char .hero-char inline-block
               spans broke background-clip:text — inline-block + will-change paint
               independently, so the parent's clipped gradient never reached the
               glyphs and the title was invisible. The magnetic char field is
               disabled, so char spans are gone; each line is plain text. -->
          <div ref="titleParallaxRef">
            <h1 ref="titleRef" class="text-hero font-black tracking-tight">
              <span v-for="(line, li) in titleLines" :key="li" class="hero-heading block" data-split-line>{{ line }}</span>
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
            <a href="#value-props" class="text-[15px] font-medium text-text-secondary/80 transition-colors duration-300 hover:text-text-primary hover:underline underline-offset-4 decoration-cool-indigo/40 max-md:inline-flex max-md:items-center max-md:min-h-[44px] max-md:-ml-2 max-md:px-2">
              了解更多
            </a>
          </div>

          <!-- 10v5 · dock directly below the "查看项目" CTA, in the left column —
               same mt-12 gap as the subtitle→CTA. The 9 glowing light-points as a
               liquid-glass shelf. Pure DOM (no WebGL → no clipping; SSG/reduced-
               motion/touch all render the same dock). -->
          <div ref="specsRef" class="mt-12 flex flex-col items-start gap-3">
            <HeroDock :projects="projects" />
            <div class="text-[11px] max-md:text-[13px] uppercase tracking-[0.2em] text-text-tertiary font-semibold">12–15 天完成</div>
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
import { projects } from '~/content/projects'

gsap.registerPlugin(ScrollTrigger)

// Title lines — rendered as plain text in .hero-heading line spans (08: no more
// per-char splitting; the magnetic char field was removed for the gradient clip).
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
    countUp.projects = 9
    return
  }

  // V3 §6: visibility must NOT depend on JS. CSS baseline is visible (opacity:1
  // in the template); gsap.from animates FROM a near-hidden state quickly. If JS
  // fails to run, content stays visible. The artifact column (specsRef) is never
  // hidden — only a subtle y-slide — so the signature visual shows immediately.
  tl = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } })

  tl.from(eyebrowRef.value, { opacity: 0, y: 14, duration: 0.5 })
    .from(lines, { opacity: 0, y: 24, duration: 0.7, stagger: 0.09 }, '-=0.15')
    .from(logoRef.value, { opacity: 0, y: 14, duration: 0.5 }, '-=0.55')
    .from(subtitleRef.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
    .from(ctaRef.value, { opacity: 0, y: 16, duration: 0.6 }, '-=0.3')
    .from(scrollIndicatorRef.value, { opacity: 0, duration: 0.8 }, '-=0.3')

  // ── Scroll-driven parallax (title rises + fades; specs 3D tilt; bg drifts) ──
  const stOpts = { trigger: sectionRef.value!, start: 'top top', end: 'bottom top', scrub: 0.8 }
  gsap.to(titleParallaxRef.value, { y: -70, opacity: 0, ease: 'none', scrollTrigger: { ...stOpts } })
  gsap.to(bgLayer2.value, { y: 45, ease: 'none', scrollTrigger: { ...stOpts } })
  gsap.to(bgLayer3.value, { y: 70, ease: 'none', scrollTrigger: { ...stOpts } })

  // Magnetic CTA
  ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)
})

// ── Global-mouse-driven: background orb follow.
// 08: per-char title magnetic field removed — the h1 uses .hero-heading gradient
// (background-clip:text) and transformed child chars dropped the clipped gradient
// (turned invisible). Orb follow + entrance stagger + magnetic CTA remain. ──
watch([mouseX, mouseY], () => {
  if (!mouseEnabled.value || !sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const localX = mouseX.value - rect.left
  const localY = mouseY.value - rect.top

  // Orb follows the smoothed cursor (centered on cursor)
  if (orbRef.value) {
    gsap.set(orbRef.value, { x: localX - 250, y: localY - 250, opacity: 0.08 })
  }
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
