<template>
  <section id="projects" class="section-dark py-24 md:py-36 lg:py-44">
    <div class="mx-auto max-w-6xl px-6">
      <div class="mb-16 text-center">
        <p class="eyebrow mb-4">9 个项目</p>
        <h2 class="text-section font-bold tracking-tight text-text-primary">从入门到高级</h2>
        <p class="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
          每个项目都基于真实开源硬件改编，成本 ≈¥500
        </p>
      </div>

      <!-- Filter pills -->
      <div class="mb-12 flex flex-wrap items-center gap-2 justify-center">
        <button v-for="filter in difficultyFilters" :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200',
            activeFilter === filter.value
              ? 'bg-text-primary text-background'
              : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary'
          ]">
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Horizontal scroll with fade indicators -->
    <div class="relative">
      <!-- Left fade -->
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
      <!-- Right fade -->
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

      <!-- Scroll container -->
      <div class="overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        <div class="flex gap-5 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]" style="min-width: max-content;">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, difficultyFilters } from '~/content/projects'

const activeFilter = ref(0)

const filteredProjects = computed(() =>
  activeFilter.value === 0
    ? projects
    : projects.filter((p) => p.difficulty === activeFilter.value)
)
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
