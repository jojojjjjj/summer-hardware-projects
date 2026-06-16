<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden">
    <!-- Background layers -->
    <div class="absolute inset-0 bg-background" />
    <div class="absolute inset-0" style="background: radial-gradient(ellipse 60% 45% at 50% 45%, rgba(255,154,118,0.07) 0%, transparent 65%), radial-gradient(ellipse 30% 25% at 50% 55%, rgba(255,107,107,0.03) 0%, transparent 50%);" />
    <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(255,154,118,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,154,118,0.3) 1px, transparent 1px); background-size: 60px 60px;" />

    <div class="relative z-10 mx-auto max-w-5xl px-6 text-center">
      <!-- Logo -->
      <div ref="logoRef" class="mb-10 flex justify-center opacity-0 translate-y-6 transition-all duration-700" :class="{ 'opacity-100 translate-y-0': visible }">
        <img src="/logo.png" alt="多维国际教育" class="h-16 sm:h-20 md:h-24 w-auto object-contain opacity-90" />
      </div>

      <!-- Main title -->
      <h1 ref="titleRef" class="text-hero font-bold tracking-tight text-text-primary opacity-0 translate-y-8 transition-all duration-700 delay-150" :class="{ 'opacity-100 translate-y-0': visible }">
        从零开始，亲手打造<br />9 个真实硬件项目
      </h1>

      <!-- Subtitle -->
      <p ref="subRef" class="mt-6 text-lg sm:text-xl text-text-secondary/80 font-normal max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-6 transition-all duration-700 delay-300" :class="{ 'opacity-100 translate-y-0': visible }">
        高中生暑期硬件实践课程
      </p>

      <!-- CTAs -->
      <div ref="ctaRef" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 translate-y-6 transition-all duration-700 delay-[400ms]" :class="{ 'opacity-100 translate-y-0': visible }">
        <a href="#projects"
          class="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-warm px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-glow-strong">
          查看项目
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200 group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="#value-props" class="text-[15px] font-medium text-text-secondary transition-colors duration-200 hover:text-warm-peach">
          了解更多
        </a>
      </div>

      <!-- Specs bar (desktop) -->
      <div ref="specsRef" class="mt-20 hidden sm:flex items-center justify-center gap-12 opacity-0 translate-y-6 transition-all duration-700 delay-500" :class="{ 'opacity-100 translate-y-0': visible }">
        <div class="text-center">
          <div class="text-4xl sm:text-5xl font-bold text-warm-peach tabular-nums font-mono tracking-tight">
            {{ animatedNumbers.projects }}
          </div>
          <p class="mt-2 text-xs text-text-tertiary uppercase tracking-[0.15em] font-medium">项目</p>
        </div>
        <div class="h-10 w-px bg-white/[0.10]" />
        <div class="text-center">
          <div class="text-4xl sm:text-5xl font-bold text-warm-peach tabular-nums font-mono tracking-tight">
            10–20
          </div>
          <p class="mt-2 text-xs text-text-tertiary uppercase tracking-[0.15em] font-medium">天</p>
        </div>
        <div class="h-10 w-px bg-white/[0.10]" />
        <div class="text-center">
          <div class="text-4xl sm:text-5xl font-bold text-warm-peach tabular-nums font-mono tracking-tight">
            ≈¥500
          </div>
          <p class="mt-2 text-xs text-text-tertiary uppercase tracking-[0.15em] font-medium">每套</p>
        </div>
      </div>

      <!-- Mobile specs -->
      <div class="mt-10 flex sm:hidden items-center justify-center gap-4 text-[13px] text-text-tertiary">
        <span class="font-mono"><span class="text-warm-peach font-semibold">9</span> 项目</span>
        <span class="text-white/[0.12]">·</span>
        <span class="font-mono"><span class="text-warm-peach font-semibold">10–20</span> 天</span>
        <span class="text-white/[0.12]">·</span>
        <span class="font-mono"><span class="text-warm-peach font-semibold">≈¥500</span>/套</span>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-700 delay-700"
      :class="{ 'opacity-40': visible }">
      <div class="flex flex-col items-center gap-2">
        <span class="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">Scroll</span>
        <div class="h-6 w-px bg-gradient-to-b from-text-tertiary/60 to-transparent animate-bounce" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const animatedNumbers = ref({ projects: 0 })

let rafId: number | null = null

onMounted(() => {
  requestAnimationFrame(() => { visible.value = true })
  // Animate number
  const duration = 2000
  const start = performance.now()
  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(2, -10 * progress)
    animatedNumbers.value.projects = Math.floor(eased * 9)
    if (progress < 1) {
      rafId = requestAnimationFrame(tick)
    }
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
