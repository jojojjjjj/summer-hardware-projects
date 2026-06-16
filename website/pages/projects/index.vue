<template>
  <main class="min-h-screen bg-background">
    <AppNavbar />

    <!-- Page hero -->
    <section class="pt-28 pb-12 md:pt-36 md:pb-16">
      <div class="mx-auto max-w-6xl px-6 text-center">
        <p class="eyebrow mb-4">9 个项目</p>
        <h1 class="text-section font-bold tracking-tight text-text-primary">选择你的项目</h1>
        <p class="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
          从入门级天气魔方到专家级 FPGA 信号发生器，每个项目都基于真实开源硬件改编
        </p>
      </div>
    </section>

    <!-- Filter + Grid -->
    <section class="pb-24 md:pb-36">
      <div class="mx-auto max-w-6xl px-6">
        <!-- Filter pills -->
        <div class="mb-10 flex flex-wrap items-center gap-2 justify-center">
          <button v-for="filter in difficultyFilters" :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200',
              activeFilter === filter.value
                ? 'bg-text-primary text-background'
                : 'bg-white/[0.05] text-text-secondary hover:bg-white/[0.08] hover:text-text-primary'
            ]">
            {{ filter.label }}
            <span class="ml-1 text-[11px] opacity-50">{{ getFilterCount(filter.value) }}</span>
          </button>
        </div>

        <!-- Project grid -->
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink v-for="project in filteredProjects" :key="project.id"
            :to="`/projects/${project.slug}`"
            class="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
            <!-- Cover -->
            <div class="relative aspect-[16/10] flex items-center justify-center overflow-hidden"
              :style="{ background: `linear-gradient(145deg, ${project.colorHex}0c 0%, ${project.colorHex}04 60%, transparent 100%)` }">
              <!-- Watermark -->
              <span class="font-mono font-bold tracking-tighter text-5xl opacity-[0.05] select-none"
                :style="{ color: project.colorHex }">
                {{ project.titleEn }}
              </span>
              <!-- ID badge -->
              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold font-mono tracking-wide"
                  :style="{ backgroundColor: `${project.colorHex}20`, color: project.colorHex }">
                  <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: project.colorHex }" />
                  P{{ project.id }}
                </span>
              </div>
              <!-- Difficulty -->
              <div class="absolute top-3 right-3">
                <span :class="['rounded-full px-2.5 py-1 text-[11px] font-medium', getDifficultyBg(project.difficulty)]">
                  {{ project.difficultyLabel }}
                </span>
              </div>
            </div>
            <!-- Content -->
            <div class="p-5">
              <h3 class="text-base font-semibold tracking-tight text-text-primary group-hover:text-warm-peach transition-colors duration-200">{{ project.titleZh }}</h3>
              <p class="mt-1 text-[13px] text-text-secondary">{{ project.subtitle }}</p>
              <div class="mt-3 flex items-center gap-4 text-[12px] text-text-tertiary">
                <span>{{ project.duration }}{{ project.durationUnit }}</span>
                <span>{{ project.cost }}</span>
                <span>{{ project.mcu }}</span>
              </div>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag.label"
                  class="rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/[0.05] text-text-secondary">
                  {{ tag.label }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projects, difficultyFilters, getDifficultyBg } from '~/content/projects'

const activeFilter = ref(0)

const filteredProjects = computed(() =>
  activeFilter.value === 0
    ? projects
    : projects.filter((p) => p.difficulty === activeFilter.value)
)

function getFilterCount(value: number): number {
  if (value === 0) return projects.length
  return projects.filter((p) => p.difficulty === value).length
}

useHead({
  title: '全部项目 — 暑期硬件实践课程',
})
</script>
