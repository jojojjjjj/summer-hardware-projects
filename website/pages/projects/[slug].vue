<template>
  <main>
    <AppNavbar />

    <!-- Hero -->
    <section class="relative min-h-[55vh] sm:min-h-[65vh] pt-24 sm:pt-28 pb-16 sm:pb-20"
      :style="{ background: `radial-gradient(ellipse at top, ${project.colorHex}12, transparent 70%)` }">
      <div class="mx-auto max-w-5xl px-6">
        <NuxtLink to="/#projects" class="mb-8 inline-flex items-center gap-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          返回项目列表
        </NuxtLink>

        <div class="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: project.colorHex }" />
              <span class="text-xs font-semibold font-mono uppercase tracking-[0.12em]" :style="{ color: project.colorHex }">
                Project {{ project.id }}
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{{ project.titleZh }}</h1>
            <p class="mt-2 text-lg sm:text-xl text-text-secondary font-mono">{{ project.titleEn }}</p>
            <p class="mt-5 text-[15px] sm:text-base text-text-secondary leading-relaxed">{{ project.description }}</p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span :class="['rounded-full px-3 py-1 text-[12px] font-medium', getDifficultyBg(project.difficulty)]">{{ project.difficultyLabel }}</span>
              <span class="flex items-center gap-1.5 rounded-full border border-white/[0.10] px-3 py-1 text-[12px] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ project.duration }} {{ project.durationUnit }}
              </span>
              <span class="flex items-center gap-1.5 rounded-full border border-white/[0.10] px-3 py-1 text-[12px] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {{ project.cost }}
              </span>
              <span class="flex items-center gap-1.5 rounded-full border border-white/[0.10] px-3 py-1 text-[12px] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
                {{ project.mcu }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-center order-first md:order-last">
            <div class="aspect-video w-full max-w-lg rounded-2xl" :style="{ background: `linear-gradient(135deg, ${project.colorHex}0a, ${project.colorHex}03)` }">
              <div class="flex h-full items-center justify-center">
                <span class="text-6xl sm:text-8xl font-mono font-bold opacity-[0.05]" :style="{ color: project.colorHex }">{{ project.titleEn }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="section-elevated py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-16 text-center">
          <p class="eyebrow mb-4">技能</p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">你将学到什么</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <div v-for="cat in skillCategories" :key="cat.key"
            class="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl" :style="{ backgroundColor: `${cat.color}18` }">
                <component :is="cat.iconComponent" class="w-4 h-4" :style="{ color: cat.color }" />
              </div>
              <h3 class="text-base font-semibold text-text-primary">{{ cat.label }}</h3>
            </div>
            <ul class="space-y-2">
              <li v-for="skill in project.skills[cat.key]" :key="skill" class="flex items-center gap-2 text-[14px] text-text-secondary">
                <span class="h-1 w-1 rounded-full bg-text-tertiary" />
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section-dark py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-16 text-center">
          <p class="eyebrow mb-4">时间线</p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">学习计划</h2>
        </div>
        <div class="space-y-6">
          <div v-for="(phase, i) in project.timeline" :key="i"
            class="flex gap-5">
            <div class="flex flex-col items-center">
              <div class="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold font-mono bg-warm-peach/20 text-warm-peach shrink-0">
                {{ i + 1 }}
              </div>
              <div v-if="i < project.timeline.length - 1" class="w-px flex-1 bg-white/[0.08] mt-2" />
            </div>
            <div class="pb-8">
              <p class="text-[11px] font-mono text-text-tertiary mb-1">{{ phase.days }}</p>
              <h3 class="text-base font-semibold text-text-primary mb-1">{{ phase.title }}</h3>
              <p class="text-[14px] text-text-secondary leading-relaxed">{{ phase.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hardware -->
    <section class="section-elevated py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-16 text-center">
          <p class="eyebrow mb-4">硬件</p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">硬件清单</h2>
        </div>
        <div class="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table class="w-full text-[13px] sm:text-sm">
            <thead>
              <tr class="border-b border-white/[0.08] bg-white/[0.03]">
                <th class="px-4 sm:px-6 py-3 text-left font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">部件</th>
                <th class="px-4 sm:px-6 py-3 text-left font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">规格</th>
                <th class="px-4 sm:px-6 py-3 text-right font-semibold text-text-tertiary text-[11px] uppercase tracking-wider">参考价格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in project.hardware" :key="item.name" class="border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]">
                <td class="px-4 sm:px-6 py-3 font-medium text-text-primary">{{ item.name }}</td>
                <td class="px-4 sm:px-6 py-3 text-text-secondary">{{ item.spec }}</td>
                <td class="px-4 sm:px-6 py-3 text-right font-mono text-text-secondary">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Links -->
    <section class="section-dark py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6 text-center">
        <div class="mb-16 text-center">
          <p class="eyebrow mb-4">开源</p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">开源资源</h2>
        </div>
        <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub
          </a>
          <a v-if="project.links.bilibili" :href="project.links.bilibili" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="2 4 6 4 8 2 10 4 14 4 16 2 18 4 22 4 22 18 2 18"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>
            B站视频
          </a>
          <a v-if="project.links.oshwhub" :href="project.links.oshwhub" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            OSHWhub
          </a>
          <a v-for="link in project.links.other" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-text-primary transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            {{ link.label }}
          </a>
        </div>

        <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a :href="project.links.github || '#projects'"
            target="_blank" rel="noopener noreferrer"
            class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-lg"
            :style="{ backgroundColor: project.colorHex, boxShadow: `0 4px 20px ${project.colorHex}20` }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            开始学习
          </a>
          <NuxtLink to="/#projects" class="inline-flex w-full sm:w-auto items-center justify-center gap-2 text-[15px] font-medium text-text-secondary transition-colors hover:text-warm-peach">
            浏览其他项目
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Project navigation -->
    <section class="section-dark border-t border-white/[0.06] py-12">
      <div class="mx-auto max-w-5xl px-6">
        <div class="flex items-center justify-between">
          <NuxtLink v-if="prevProject" :to="`/projects/${prevProject.slug}`"
            class="group flex items-center gap-3 text-text-secondary transition-colors hover:text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <div>
              <p class="text-[11px] text-text-tertiary">上一个</p>
              <p class="text-[14px] font-medium">{{ prevProject.titleZh }}</p>
            </div>
          </NuxtLink>
          <div v-else />

          <NuxtLink to="/projects" class="text-[13px] text-text-tertiary hover:text-warm-peach transition-colors">
            全部项目
          </NuxtLink>

          <NuxtLink v-if="nextProject" :to="`/projects/${nextProject.slug}`"
            class="group flex items-center gap-3 text-text-secondary transition-colors hover:text-text-primary text-right">
            <div>
              <p class="text-[11px] text-text-tertiary">下一个</p>
              <p class="text-[14px] font-medium">{{ nextProject.titleZh }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="m12 19 7-7-7-7"/><path d="M5 12h14"/></svg>
          </NuxtLink>
          <div v-else />
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { projects, getProjectBySlug, getAllProjectSlugs, getDifficultyBg } from '~/content/projects'
import type { Project } from '~/content/projects'
import { h, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string
const project = getProjectBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

// Navigation: previous/next project
const currentIndex = projects.findIndex((p) => p.slug === slug)
const prevProject = computed(() => currentIndex > 0 ? projects[currentIndex - 1] : null)
const nextProject = computed(() => currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null)

// For static generation
definePageMeta({
  validate: (route) => {
    const slug = route.params.slug as string
    return getAllProjectSlugs().includes(slug)
  }
})

// SVG icon components using render functions (avoids v-html entity encoding issues)
const HardwareIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }),
    h('rect', { x: '9', y: '9', width: '6', height: '6' }),
    h('path', { d: 'M15 2v2' }), h('path', { d: 'M15 20v2' }),
    h('path', { d: 'M2 15h2' }), h('path', { d: 'M2 9h2' }),
    h('path', { d: 'M20 15h2' }), h('path', { d: 'M20 9h2' }),
    h('path', { d: 'M9 2v2' }), h('path', { d: 'M9 20v2' }),
  ]),
}

const SoftwareIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('polyline', { points: '16 18 22 12 16 6' }),
    h('polyline', { points: '8 6 2 12 8 18' }),
  ]),
}

const SystemIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }),
    h('polyline', { points: '2 17 12 22 22 17' }),
    h('polyline', { points: '2 12 12 17 22 12' }),
  ]),
}

const EngineeringIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' }),
  ]),
}

const skillCategories = [
  { key: 'hardware' as const, label: '硬件', color: '#3d8b5e', iconComponent: HardwareIcon },
  { key: 'software' as const, label: '软件', color: '#ff9a76', iconComponent: SoftwareIcon },
  { key: 'system' as const, label: '系统', color: '#ff9a76', iconComponent: SystemIcon },
  { key: 'engineering' as const, label: '工程', color: '#3d8b5e', iconComponent: EngineeringIcon },
]

useHead({
  title: `${project.titleZh} ${project.titleEn} — 暑期硬件实践课程`,
  meta: [
    { name: 'description', content: project.descriptionEn },
  ],
})
</script>
