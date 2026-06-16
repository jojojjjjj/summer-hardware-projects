<template>
  <TiltCard>
    <NuxtLink :to="`/projects/${project.slug}`" class="block group">
      <div class="w-72 sm:w-80 rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden snap-start">
        <!-- Cover -->
        <div class="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
          :style="{ background: `linear-gradient(145deg, ${project.colorHex}0c 0%, ${project.colorHex}04 60%, transparent 100%)` }">
          <!-- Watermark text -->
          <span class="font-mono font-bold tracking-tighter text-5xl sm:text-6xl opacity-[0.06] select-none"
            :style="{ color: project.colorHex }">
            {{ project.titleEn }}
          </span>

          <!-- Project ID -->
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
          <h3 class="text-base font-semibold tracking-tight text-text-primary">{{ project.titleZh }}</h3>
          <p class="mt-1 text-[13px] text-text-secondary">{{ project.subtitle }}</p>

          <div class="mt-3 flex items-center gap-4 text-[12px] text-text-tertiary">
            <span class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-60"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ project.duration }}{{ project.durationUnit }}
            </span>
            <span class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-60"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {{ project.cost }}
            </span>
          </div>

          <div class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="tag in project.tags.slice(0, 3)" :key="tag.label"
              class="rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/[0.05] text-text-secondary">
              {{ tag.label }}
            </span>
          </div>

          <div class="mt-4 flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-tertiary/40 transition-all duration-200 group-hover:text-warm-peach group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </div>
        </div>
      </div>
    </NuxtLink>
  </TiltCard>
</template>

<script setup lang="ts">
import type { Project } from '~/content/projects'
import { getDifficultyBg } from '~/content/projects'

defineProps<{
  project: Project
}>()
</script>