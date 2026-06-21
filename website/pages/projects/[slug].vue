<template>
  <main>
    <AppNavbar />

    <!-- Hero -->
    <section class="relative min-h-[60vh] sm:min-h-[70vh] pt-24 sm:pt-28 pb-16 sm:pb-20"
      :style="{ background: 'radial-gradient(ellipse at top, ' + project.colorHex + '0a, transparent 70%)' }">
      <div class="mx-auto max-w-5xl px-6">
        <NuxtLink to="/#projects" class="mb-10 inline-flex items-center gap-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          返回项目列表
        </NuxtLink>

        <div class="grid gap-10 md:gap-16 grid-cols-1 md:grid-cols-2">
          <div>
            <div class="flex items-center gap-2.5 mb-5">
              <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: project.colorHex }" />
              <span class="eyebrow" :style="{ color: project.colorHex }">
                Project {{ project.id }}
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary">{{ project.titleZh }}</h1>
            <p class="mt-3 text-xl sm:text-2xl text-text-secondary font-mono font-medium">{{ project.titleEn }}</p>
            <p class="mt-6 text-body-lg text-text-secondary leading-relaxed">{{ project.description }}</p>

            <div class="mt-8 flex flex-wrap gap-2.5">
              <span class="rounded-full px-4 py-1.5 text-[12px] max-md:text-[13px] font-semibold"
                :style="{ backgroundColor: getDifficultyColor(project.difficulty) + '20', color: getDifficultyColor(project.difficulty) }">
                {{ project.difficultyLabel }}
              </span>
              <span class="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-4 py-1.5 text-[12px] max-md:text-[13px] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ project.duration }} {{ project.durationUnit }}
              </span>
              <span class="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-4 py-1.5 text-[12px] max-md:text-[13px] text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
                {{ project.mcu }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-center order-first md:order-last">
            <div class="aspect-video w-full max-w-lg rounded-3xl border border-white/[0.06] inner-glow overflow-hidden relative" :style="{ background: 'linear-gradient(135deg, ' + project.colorHex + '14, ' + project.colorHex + '05)', viewTransitionName: 'vt-project-' + project.slug }">
              <ProjectSignature :project="project" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="section-elevated py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-14 flex items-end justify-between gap-6">
          <div>
            <div class="mb-4 flex items-center gap-3">
              <span class="font-mono text-[12px] tracking-[0.2em] text-text-tertiary">01</span>
              <span class="h-px w-8 bg-white/10" />
              <p class="eyebrow">技能</p>
            </div>
            <h2 class="text-subsection font-semibold tracking-tight">你将学到什么</h2>
          </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2">
          <div v-for="cat in skillCategories" :key="cat.key"
            class="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 inner-glow">
            <div class="flex items-center gap-3 mb-5">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl" :style="{ backgroundColor: cat.color + '15' }">
                <component :is="cat.iconComponent" class="w-5 h-5" :style="{ color: cat.color }" />
              </div>
              <h3 class="text-base font-semibold text-text-primary">{{ cat.label }}</h3>
            </div>
            <ul class="space-y-2.5">
              <li v-for="skill in project.skills[cat.key]" :key="skill" class="flex items-center gap-2.5 text-[14px] text-text-secondary">
                <span class="h-1 w-1 rounded-full" :style="{ backgroundColor: cat.color }" />
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Hardware -->
    <section class="section-dark py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-14 flex items-end justify-between gap-6">
          <div>
            <div class="mb-4 flex items-center gap-3">
              <span class="font-mono text-[12px] tracking-[0.2em] text-text-tertiary">02</span>
              <span class="h-px w-8 bg-white/10" />
              <p class="eyebrow">硬件</p>
            </div>
            <h2 class="text-subsection font-semibold tracking-tight">所需材料</h2>
          </div>
          <span class="hidden sm:block text-[13px] font-mono text-text-tertiary">{{ project.hardware.length }} 件</span>
        </div>
        <div class="space-y-3">
          <div v-for="(item, i) in project.hardware" :key="i"
            class="flex items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 inner-glow">
            <div class="flex items-center gap-4">
              <span class="text-[13px] font-mono font-bold text-text-tertiary">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <p class="text-[14px] font-semibold text-text-primary">{{ item.name }}</p>
                <p class="text-[12px] max-md:text-[13px] text-text-tertiary">{{ item.spec }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section-elevated py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6">
        <div class="mb-14 relative">
          <span class="pointer-events-none absolute -top-10 -left-2 font-mono font-bold leading-none select-none text-text-primary" style="font-size: clamp(5rem, 12vw, 9rem); opacity: 0.05; letter-spacing: -0.06em;" aria-hidden="true">03</span>
          <div class="relative">
            <p class="eyebrow mb-4">日程</p>
            <h2 class="text-subsection font-semibold tracking-tight">项目时间线</h2>
          </div>
        </div>
        <div class="space-y-6">
          <div v-for="(phase, i) in project.timeline" :key="i"
            class="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 inner-glow">
            <div class="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" :style="{ background: 'linear-gradient(90deg, ' + project.colorHex + ', ' + project.colorHex + '60)' }" />
            <div class="flex items-center justify-between mb-3">
              <span class="text-[13px] font-bold font-mono" :style="{ color: project.colorHex }">{{ phase.days }}</span>
              <span class="text-[11px] font-mono text-text-tertiary tracking-wide">Phase {{ i + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ phase.title }}</h3>
            <p class="text-[14px] text-text-secondary leading-relaxed">{{ phase.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Links — original project (primary) + user's adaptation (secondary) + supporting -->
    <section v-if="hasLinks" class="section-dark py-20 sm:py-28">
      <div class="mx-auto max-w-5xl px-6 text-center">
        <p class="eyebrow mb-5">资源</p>
        <h2 class="text-subsection font-semibold tracking-tight">开源参考</h2>
        <p class="mt-4 text-[14px] max-md:text-[13px] text-text-tertiary max-w-xl mx-auto leading-relaxed">{{ project.links.adaptedRepo ? '本项目基于以下开源项目改编 · Adapted from the open-source project below' : '本项目开源仓库 · This project\'s open-source repo' }}</p>

        <div v-if="primaryLink" class="mt-10 flex flex-col items-center">
          <p class="eyebrow text-text-tertiary/70 mb-4">开源原项目 · Original project</p>
          <a :href="primaryLink.url" target="_blank" rel="noopener noreferrer"
            class="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-white font-semibold transition-all duration-200 hover:scale-[1.02] max-md:min-h-[44px] max-md:px-5"
            :style="{ background: 'linear-gradient(135deg, ' + project.colorHex + ', ' + project.colorHex + 'cc)', boxShadow: '0 10px 34px ' + project.colorHex + '33' }">
            <template v-if="primaryLink.kind !== 'other'">
              <span class="text-[11px] font-mono uppercase tracking-[0.18em] opacity-80">{{ primaryLink.platformTag }}</span>
              <span class="h-4 w-px bg-white/30" />
            </template>
            <span class="font-mono text-[14px] max-md:text-[13px]">{{ primaryLink.short }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>

          <!-- Secondary: user's adapted course-pack repo (small, below the original) -->
          <a v-if="project.links.adaptedRepo" :href="project.links.adaptedRepo" target="_blank" rel="noopener noreferrer"
            class="group mt-4 inline-flex items-center gap-1.5 text-[13px] max-md:text-[13px] text-text-tertiary transition-colors hover:text-text-secondary max-md:min-h-[44px] max-md:px-2">
            <span class="text-text-tertiary/70">我的改编版 · My adaptation:</span>
            <span class="font-mono underline-offset-4 group-hover:underline decoration-white/25">{{ adaptedRepoShort }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
          </a>
        </div>

        <!-- Supporting links: bilibili / other original sources (equal pills) -->
        <div v-if="supportingLinks.length" class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a v-for="link in supportingLinks" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 max-md:px-5 max-md:min-h-[44px] text-[13px] max-md:text-[13px] font-medium text-text-secondary transition-all duration-200 hover:border-white/[0.15] hover:text-text-primary">
            {{ link.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- Gallery-style prev/next (V3 §4.6) -->
    <section class="border-t border-white/[0.06] py-14 md:py-20">
      <div class="mx-auto max-w-5xl px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink v-if="prevProject" :to="'/projects/' + prevProject.slug"
            class="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04] inner-glow">
            <div class="absolute top-0 left-0 h-full w-1" :style="{ background: prevProject.colorHex }" />
            <p class="text-[11px] max-md:text-[13px] font-mono uppercase tracking-[0.2em] text-text-tertiary mb-2">← 上一个</p>
            <p class="text-lg font-semibold text-text-primary">{{ prevProject.titleZh }}</p>
            <p class="text-[13px] font-mono text-text-tertiary mt-0.5">{{ prevProject.titleEn }}</p>
          </NuxtLink>
          <div v-else />
          <NuxtLink v-if="nextProject" :to="'/projects/' + nextProject.slug"
            class="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04] inner-glow md:text-right">
            <div class="absolute top-0 right-0 h-full w-1" :style="{ background: nextProject.colorHex }" />
            <p class="text-[11px] max-md:text-[13px] font-mono uppercase tracking-[0.2em] text-text-tertiary mb-2">下一个 →</p>
            <p class="text-lg font-semibold text-text-primary">{{ nextProject.titleZh }}</p>
            <p class="text-[13px] font-mono text-text-tertiary mt-0.5">{{ nextProject.titleEn }}</p>
          </NuxtLink>
          <div v-else />
        </div>
        <div class="mt-6 text-center">
          <NuxtLink to="/projects" class="text-[13px] text-text-tertiary hover:text-text-primary transition-colors">查看全部项目</NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { projects, getProjectBySlug, getAllProjectSlugs } from '~/content/projects'
import type { Project } from '~/content/projects'
import { h, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string
const project = getProjectBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const currentIndex = projects.findIndex((p) => p.slug === slug)
const prevProject = computed(() => currentIndex > 0 ? projects[currentIndex - 1] : null)
const nextProject = computed(() => currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null)

const hasLinks = computed(() => {
  const l = project.links
  return l.github || l.bilibili || l.oshwhub || l.gitee || (l.other && l.other.length > 0) || l.adaptedRepo
})

/** Strip scheme+host → "owner/repo" (or trailing path) for compact display. */
function shortRepo(u: string): string {
  return u.replace(/^https?:\/\/[^/]+\//, '').replace(/\/+$/, '')
}

/** Primary original upstream link (priority: github → gitee → oshwhub → other[0]). */
const primaryLink = computed(() => {
  const l = project.links
  if (l.github) return { url: l.github, kind: 'github' as const, platformTag: 'GitHub', short: shortRepo(l.github) }
  if (l.gitee) return { url: l.gitee, kind: 'gitee' as const, platformTag: 'Gitee', short: shortRepo(l.gitee) }
  if (l.oshwhub) return { url: l.oshwhub, kind: 'oshwhub' as const, platformTag: '立创开源', short: shortRepo(l.oshwhub) }
  if (l.other && l.other.length) return { url: l.other[0].url, kind: 'other' as const, platformTag: 'Link', short: l.other[0].label }
  return null
})

/** Supporting links: bilibili + any original sources not used as the primary. */
const supportingLinks = computed(() => {
  const l = project.links
  const arr: { url: string; label: string }[] = []
  if (l.bilibili) arr.push({ url: l.bilibili, label: 'Bilibili' })
  if (l.other) {
    const start = primaryLink.value && primaryLink.value.kind === 'other' ? 1 : 0
    l.other.slice(start).forEach((o) => arr.push({ url: o.url, label: o.label }))
  }
  return arr
})

const adaptedRepoShort = computed(() => (project.links.adaptedRepo ? shortRepo(project.links.adaptedRepo) : ''))

definePageMeta({
  validate: (route) => {
    const slug = route.params.slug as string
    return getAllProjectSlugs().includes(slug)
  }
})

function getDifficultyColor(d: number): string {
  const colors: Record<number, string> = { 1: '#3d8b5e', 2: '#3d8b5e', 3: '#c9944a', 4: '#ff9a76', 5: '#ff6b6b' }
  return colors[d] || '#c9944a'
}

const HardwareIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }),
    h('rect', { x: '9', y: '9', width: '6', height: '6' }),
    h('path', { d: 'M15 2v2' }), h('path', { d: 'M15 20v2' }),
    h('path', { d: 'M2 15h2' }), h('path', { d: 'M2 9h2' }),
    h('path', { d: 'M20 15h2' }), h('path', { d: 'M20 9h2' }),
    h('path', { d: 'M9 2v2' }), h('path', { d: 'M9 20v2' }),
  ]),
}

const SoftwareIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('polyline', { points: '16 18 22 12 16 6' }),
    h('polyline', { points: '8 6 2 12 8 18' }),
  ]),
}

const SystemIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('polygon', { points: '12 2 2 7 12 12 22 7 12 2' }),
    h('polyline', { points: '2 17 12 22 22 17' }),
    h('polyline', { points: '2 12 12 17 22 12' }),
  ]),
}

const EngineeringIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' }),
  ]),
}

const skillCategories = [
  { key: 'hardware' as const, label: '硬件', color: '#3d8b5e', iconComponent: HardwareIcon },
  { key: 'software' as const, label: '软件', color: '#ff9a76', iconComponent: SoftwareIcon },
  { key: 'system' as const, label: '系统', color: '#c9944a', iconComponent: SystemIcon },
  { key: 'engineering' as const, label: '工程', color: '#d4845a', iconComponent: EngineeringIcon },
]

useHead({
  title: project.titleZh + ' ' + project.titleEn + ' — 暑期硬件实践课程',
  meta: [
    { name: 'description', content: project.descriptionEn },
  ],
})
</script>
