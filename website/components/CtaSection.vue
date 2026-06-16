<template>
  <section id="contact" class="relative overflow-hidden py-24 md:py-36" style="background: linear-gradient(180deg, #0d0b09 0%, #0f0c0a 50%, #0d0b09 100%);">
    <!-- Background decorations — PROMINENT large blurred warm circles -->
    <div class="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.35]" style="background: radial-gradient(circle, #ff9a76 0%, transparent 70%); filter: blur(80px);" />
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-[0.30]" style="background: radial-gradient(circle, #ff6b6b 0%, transparent 70%); filter: blur(80px);" />
    <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.22]" style="background: radial-gradient(circle, #ffd93d 0%, transparent 60%); filter: blur(100px);" />
    <!-- Subtle grid pattern -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.08]" style="background-image: linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 60px 60px;" />

    <div class="mx-auto max-w-4xl px-6">
      <div
        ref="cardRef"
        class="relative rounded-[2rem] overflow-hidden"
        style="box-shadow: 0 0 80px rgba(255,154,118,0.25), 0 0 160px rgba(255,107,107,0.15);"
      >
        <!-- PROMINENT animated gradient border — thicker, more visible -->
        <div class="absolute -inset-[2px] rounded-[2rem] animate-[spin_12s_linear_infinite] overflow-hidden">
          <div class="absolute inset-0" style="background: conic-gradient(from 0deg, transparent 0%, rgba(255,154,118,1.0) 8%, transparent 18%, transparent 48%, rgba(255,107,107,1.0) 56%, transparent 66%, transparent 82%, rgba(255,217,61,0.8) 88%, transparent 100%); filter: blur(1.5px);" />
        </div>

        <!-- Inner card — slightly warm-tinted background -->
        <div class="relative rounded-[2rem] overflow-hidden inner-glow" style="background: linear-gradient(180deg, #16120f 0%, #12100d 40%, #0f0d0b 100%);">
          <!-- Noise texture overlay -->
          <div class="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');" />

          <!-- PROMINENT warm glow at top of card — immediately visible -->
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-peach/80 to-transparent" />
          <div
            class="pointer-events-none absolute inset-x-0 top-0 h-72"
            style="background: radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,154,118,0.35) 0%, rgba(255,107,107,0.12) 40%, transparent 70%);"
          />
          <!-- PROMINENT warm-colored blurred circles in card — CLEARLY VISIBLE -->
          <div class="pointer-events-none absolute top-[8%] right-[10%] w-[180px] h-[180px] rounded-full" style="background: radial-gradient(circle, rgba(255,154,118,0.18) 0%, transparent 70%); filter: blur(40px);" />
          <div class="pointer-events-none absolute bottom-[12%] left-[8%] w-[150px] h-[150px] rounded-full" style="background: radial-gradient(circle, rgba(255,107,107,0.14) 0%, transparent 70%); filter: blur(40px);" />
          <!-- Second warm wash — stronger -->
          <div
            class="pointer-events-none absolute inset-0"
            style="background: radial-gradient(ellipse 50% 60% at 50% 60%, rgba(255,107,107,0.14) 0%, transparent 60%);"
          />

          <!-- Bottom gradient line -->
          <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-warm-peach/50 to-transparent" />

          <!-- Deep shadow layers — PROMINENT warm inner glow -->
          <div class="pointer-events-none absolute inset-0" style="box-shadow: inset 0 0 120px rgba(255,154,118,0.14), inset 0 0 60px rgba(255,107,107,0.08);" />

          <!-- Floating decorative orbs — animated -->
          <div class="pointer-events-none absolute inset-0 z-[2]">
            <span class="absolute left-[10%] top-[15%] h-3 w-3 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,154,118,0.45), transparent); animation-delay: 0s; animation-duration: 7s;" />
            <span class="absolute right-[15%] top-[25%] h-2 w-2 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,107,107,0.35), transparent); animation-delay: 1.5s; animation-duration: 8s;" />
            <span class="absolute left-[20%] bottom-[20%] h-2.5 w-2.5 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,217,61,0.30), transparent); animation-delay: 3s; animation-duration: 6s;" />
            <span class="absolute right-[8%] bottom-[25%] h-1.5 w-1.5 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,154,118,0.35), transparent); animation-delay: 0.8s; animation-duration: 9s;" />
            <span class="absolute left-[40%] top-[45%] h-1 w-1 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,107,107,0.25), transparent); animation-delay: 2s; animation-duration: 7.5s;" />
            <span class="absolute right-[35%] top-[60%] h-2 w-2 rounded-full animate-float" style="background: radial-gradient(circle, rgba(255,154,118,0.30), transparent); animation-delay: 4s; animation-duration: 6.5s;" />
          </div>

          <div class="relative z-10 px-8 py-20 sm:px-16 sm:py-28 md:py-32 text-center">
            <h2 ref="headingRef" class="text-[2.75rem] md:text-[4rem] font-extrabold tracking-[-0.04em] text-text-primary opacity-0 translate-y-8 leading-[1.05]">
              准备好<span class="bg-gradient-to-r from-warm-peach via-warm-coral to-warm-honey bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">开始</span>了吗？
            </h2>
            <p ref="subRef" class="mx-auto mt-6 max-w-md text-body-lg text-text-secondary opacity-0 translate-y-6">
              加入我们，开启你的硬件之旅
            </p>

            <!-- CTA Button with magnetic hover — Apple Buy button -->
            <div ref="ctaWrapperRef" class="mt-14 md:mt-16 opacity-0 translate-y-6">
              <button
                ref="ctaBtnRef"
                @mouseenter="onBtnEnter"
                @mousemove="onBtnMove"
                @mouseleave="onBtnLeave"
                @click="onBtnClick"
                class="group relative inline-flex items-center justify-center gap-3 rounded-full text-[16px] font-semibold text-white transition-shadow duration-400 hover:shadow-glow-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-peach/50 overflow-hidden"
                style="background: linear-gradient(135deg, #ff9a76, #ff6b6b); padding: 20px 48px;"
              >
                <!-- Shine sweep animation -->
                <span class="absolute inset-0 overflow-hidden rounded-full">
                  <span class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] opacity-50" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);" />
                </span>
                <!-- Inner gradient sheen -->
                <span class="absolute inset-0 rounded-full opacity-20" style="background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);" />
                <span class="relative z-10 transition-all duration-300 group-hover:[text-shadow:0_0_16px_rgba(255,255,255,0.5)] tracking-wide">立即报名</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <!-- Ripple container -->
                <span ref="rippleRef" class="pointer-events-none absolute inset-0 overflow-hidden rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cardRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const ctaWrapperRef = ref<HTMLElement | null>(null)
const ctaBtnRef = ref<HTMLElement | null>(null)
const rippleRef = ref<HTMLElement | null>(null)

// Magnetic hover state
let gsapInstance: any = null

function onBtnEnter() {
  if (!gsapInstance || !ctaBtnRef.value) return
  gsapInstance.to(ctaBtnRef.value, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
}

function onBtnMove(e: MouseEvent) {
  if (!gsapInstance || !ctaBtnRef.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) * 0.25
  const dy = (e.clientY - cy) * 0.25
  gsapInstance.to(ctaBtnRef.value, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
}

function onBtnLeave() {
  if (!gsapInstance || !ctaBtnRef.value) return
  gsapInstance.to(ctaBtnRef.value, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
}

function onBtnClick(e: MouseEvent) {
  if (!gsapInstance || !rippleRef.value || !ctaBtnRef.value) return
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

  // Animate elements in
  const els = [headingRef.value, subRef.value, ctaWrapperRef.value].filter(Boolean) as HTMLElement[]
  if (els.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'expo.out',
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.value) observer.observe(cardRef.value)
  }
})

onUnmounted(() => {
  gsapInstance = null
})
</script>
