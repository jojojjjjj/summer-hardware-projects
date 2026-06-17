<template>
  <section id="projects" class="relative overflow-hidden bg-background">
    <!-- Section header -->
    <div class="mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-12 md:pb-16">
      <p
        class="eyebrow mb-5"
        ref="eyebrowRef"
        :style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }"
      >
        9 个项目
      </p>
      <h2
        class="text-section font-bold tracking-tight text-text-primary relative"
        ref="headingRef"
        :style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s' }"
      >
        <span class="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-[#6366f1]/[0.08] via-[#8b5cf6]/[0.05] to-transparent rounded-2xl blur-xl pointer-events-none" />
        <span class="relative">选择你的项目</span>
      </h2>
      <p
        class="mx-auto mt-6 max-w-xl text-body-lg text-text-secondary"
        ref="subRef"
        :style="{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s' }"
      >
        从入门到专家，每个都基于真实开源项目改编
      </p>
    </div>

    <!-- Difficulty filters -->
    <div class="mx-auto max-w-6xl px-6 pb-10 md:pb-14">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="filter in difficultyFilters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-300"
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
    <div class="relative">
      <!-- Left fade + arrow -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <button
        @click="scrollBy(-380)"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300"
        aria-label="向左滚动"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <!-- Right fade + arrow -->
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <button
        @click="scrollBy(380)"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300"
        aria-label="向右滚动"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <!-- Scroll hint (visible on desktop before first scroll) -->
      <div
        v-if="!hasScrolled"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-cool-indigo/60 text-[12px] select-none"
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
          <ProjectCard
            v-for="(project, i) in filteredProjects"
            :key="project.id"
            :project="project"
            :style="{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }"
          />
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
