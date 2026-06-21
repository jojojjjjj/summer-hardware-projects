<template>
  <section id="projects" class="relative overflow-hidden bg-background">
    <!-- V4 · Direct-fusion hardware backdrop: 3D circuit board, dimmed + overlay.
         Sits behind all section content (header / filters / shelf are z-10 above). -->
    <div class="pointer-events-none absolute inset-0 z-0">
      <img src="/media/circuit-3d.jpg" alt="" class="h-full w-full object-cover opacity-[0.12]" loading="lazy" decoding="async" />
      <div class="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/90" />
    </div>
    <!-- Section header — formula B: oversized bleeding "02" (z-overlap graphic) +
         asymmetric 7:5 (title / legend), no eyebrow (distinct from Value's formula A) -->
    <div class="relative mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-12 md:pb-16">
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
        <div class="md:col-span-7">
          <h2
            class="text-section font-semibold tracking-tight text-text-primary"
            ref="headingRef"
          >
            <WordsPullUp text="选择你的项目" />
          </h2>
        </div>
        <div class="md:col-span-5 md:text-right">
          <span
            class="inline-block mb-3 rounded-full px-3 py-1 text-[12px] max-md:text-[13px] font-medium"
            style="background: rgba(99,102,241,0.10); color: #a5aceb; border: 1px solid rgba(99,102,241,0.20);"
          >9 个项目 · 5 级难度</span>
          <p
            class="text-body-lg text-text-secondary"
            ref="subRef"
            :style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s' }"
          >
            从入门到专家，每个都基于真实开源项目改编
          </p>
        </div>
      </div>
    </div>

    <!-- Difficulty filters -->
    <div class="relative z-10 mx-auto max-w-6xl px-6 pb-10 md:pb-14">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="filter in difficultyFilters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="rounded-full px-5 py-2 max-md:py-3 text-[14px] font-semibold transition-all duration-300"
          :class="activeFilter === filter.value
            ? 'text-white shadow-glow scale-105'
            : 'bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary'"
          :style="activeFilter === filter.value ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 0 16px rgba(99,102,241,0.28)' } : {}"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Horizontal scroll shelf -->
    <div class="relative z-10">
      <!-- Left fade + arrow -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 max-md:w-16 bg-gradient-to-r from-background to-transparent" />
      <button
        @click="scrollBy(-380)"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 max-md:hidden items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300"
        aria-label="向左滚动"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <!-- Right fade + arrow -->
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 max-md:w-16 bg-gradient-to-l from-background to-transparent" />
      <button
        @click="scrollBy(380)"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 max-md:hidden items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300"
        aria-label="向右滚动"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <!-- Scroll hint (visible on desktop before first scroll) -->
      <div
        v-if="!hasScrolled"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-cool-indigo/60 text-[12px] max-md:text-[13px] select-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        左右滑动浏览
      </div>

      <!-- Scrollable area -->
      <div
        ref="scrollContainer"
        @scroll="onScroll"
        class="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        <div
          ref="trackRef"
          class="flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          style="min-width: max-content;"
        >
          <div
            v-for="(project, i) in filteredProjects"
            :key="project.id"
            class="shrink-0"
            :style="{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }"
          >
            <ProjectCard
              :project="project"
              :video-poster="project.slug === 'pocket-signal-generator' ? '/media/code-river.jpg' : undefined"
              :video-src="''"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom spacing -->
    <div class="h-20 md:h-28" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects, difficultyFilters } from '~/content/projects'
import ProjectCard from './ProjectCard.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const activeFilter = ref(0)
const filteredProjects = computed(() =>
  activeFilter.value === 0 ? projects : projects.filter((p) => p.difficulty === activeFilter.value)
)

const scrollContainer = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

// Animation states
const headerVisible = ref(false)
const cardsVisible = ref(false)
const hasScrolled = ref(false)

const reduce = useReducedMotion()

function scrollBy(delta: number) {
  scrollContainer.value?.scrollBy({ left: delta, behavior: 'smooth' })
}

function onScroll() {
  if (!hasScrolled.value && scrollContainer.value && scrollContainer.value.scrollLeft > 10) {
    hasScrolled.value = true
  }
}

onMounted(async () => {
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Animate header in
  headerVisible.value = true

  // Animate cards in with ScrollTrigger (or snap visible under reduced motion)
  if (reduce.value) {
    cardsVisible.value = true
    return
  }

  if (trackRef.value) {
    ScrollTrigger.create({
      trigger: trackRef.value,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        cardsVisible.value = true
      },
    })
  }
})
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>
