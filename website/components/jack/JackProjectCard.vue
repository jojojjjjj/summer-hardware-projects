<template>
  <!-- 08 · JackProjectCard — one sticky-stacking project card.
       Root is position:sticky (inline :style with dynamic top offset). The card
       self-manages its NON-PINNING scale ScrollTrigger on its own root ref (no
       cross-component $el extraction). view-transition-name matches the detail
       page hero for card↔detail morph. -->
  <div
    ref="rootRef"
    class="jack-project-card rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 bg-background p-4 sm:p-6 md:p-8 overflow-hidden w-full max-w-5xl"
    :style="{
      borderColor: project.colorHex,
      '--accent': project.colorHex,
      '--index-offset': index * 28 + 'px',
      position: 'sticky',
      top: stickyTopMobile,
      willChange: 'transform',
      viewTransitionName: 'vt-project-' + project.slug,
    }"
  >
    <!-- Top row: number + info | CTA button -->
    <div class="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
      <!-- Left: huge number + titles -->
      <div>
        <span
          class="font-black font-mono block leading-none"
          :style="{ fontSize: 'clamp(3rem, 10vw, 140px)', color: project.colorHex, lineHeight: '1' }"
        >
          P{{ project.id }}
        </span>
        <div class="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            class="rounded-full px-3 py-1 text-[11px] font-semibold"
            :style="{ backgroundColor: difficultyColor + '20', color: difficultyColor }"
          >
            {{ project.difficultyLabel }}
          </span>
          <span class="text-[12px] font-mono text-text-tertiary tracking-wide">{{ project.mcu }}</span>
        </div>
        <h3 class="mt-2 sm:mt-3 text-text-primary font-semibold text-lg sm:text-xl md:text-2xl">
          {{ project.titleZh }}
        </h3>
        <p class="text-text-tertiary font-mono text-sm sm:text-base mt-0.5">
          {{ project.titleEn }}
        </p>
      </div>

      <!-- Right: CTA -->
      <div class="flex-shrink-0 ml-4 mt-2">
        <JackLiveProjectButton :to="`/projects/${project.slug}`">查看项目</JackLiveProjectButton>
      </div>
    </div>

    <!-- Bottom row: 2-column image grid (2/5 + 3/5) -->
    <div class="grid grid-cols-5 gap-3 sm:gap-4">
      <!-- Left column: two stacked signature panels -->
      <div class="col-span-2 flex flex-col gap-3 sm:gap-4">
        <div
          class="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden"
          :style="{ background: `linear-gradient(160deg, ${project.colorHex}22, #0b0d12)`, height: 'clamp(130px, 16vw, 230px)' }"
        >
          <ProjectSignature :project="project" />
        </div>
        <div
          class="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden"
          :style="{ background: `linear-gradient(160deg, ${project.colorHex}22, #0b0d12)`, height: 'clamp(160px, 22vw, 340px)' }"
        >
          <ProjectSignature :project="project" />
        </div>
      </div>

      <!-- Right column: one tall signature panel -->
      <div class="col-span-3">
        <div
          class="relative rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden h-full min-h-[300px]"
          :style="{ background: `linear-gradient(160deg, ${project.colorHex}22, #0b0d12)` }"
        >
          <ProjectSignature :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Project } from '~/content/projects'

const props = defineProps<{
  project: Project
  index: number
  total: number
}>()

const reduce = useReducedMotion()
const rootRef = ref<HTMLElement | null>(null)
let ownedTrigger: { kill: () => void } | null = null

// ── Sticky top: mobile 6rem base + 28px per card offset; md: 8rem base ──
const stickyTopMobile = computed(() => `calc(6rem + ${props.index * 28}px)`)

// ── Difficulty color ──
const difficultyColor = computed(() => {
  const colors: Record<number, string> = {
    1: '#3d8b5e',
    2: '#3d8b5e',
    3: '#c9944a',
    4: '#ff9a76',
    5: '#ff6b6b',
  }
  return colors[props.project.difficulty] || '#c9944a'
})

onMounted(async () => {
  // Reduced motion: stay at scale:1, no ScrollTrigger.
  if (reduce.value || !rootRef.value) return

  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // targetScale = 1 - (total - 1 - index) * 0.03
  // Card 0 → 0.94, Card 1 → 0.97, Card 2 → 1.00
  const targetScale = 1 - (props.total - 1 - props.index) * 0.03

  const tween = gsap.to(rootRef.value, {
    scale: targetScale,
    ease: 'none',
    scrollTrigger: {
      trigger: rootRef.value,
      start: 'top 24%',
      end: 'bottom 24%',
      scrub: true,
      // NO pin — pin wraps the element and breaks position:sticky.
    },
  })
  ownedTrigger = tween.scrollTrigger ?? null
})

onUnmounted(() => {
  ownedTrigger?.kill()
  ownedTrigger = null
})
</script>

<style scoped>
/* md+ sticky-top override — base bumps from 6rem to 8rem, --index-offset set inline. */
@media (min-width: 768px) {
  .jack-project-card {
    top: calc(8rem + var(--index-offset)) !important;
  }
}
</style>
