<template>
  <TiltCard :max-tilt="tiltConfig.maxTilt" :duration="tiltConfig.duration" glow="cool">
    <NuxtLink :to="`/projects/${project.slug}`" class="block group">
      <div
        ref="cardRef"
        class="spotlight relative w-[320px] sm:w-[360px] rounded-[1.75rem] overflow-hidden transition-all duration-500"
        :style="{
          background: cardGradient,
          '--glow-cool': glowRgb(project.colorHex),
          boxShadow: isHovered
            ? tiltConfig.hoverShadow
            : '0 2px 8px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.22)',
          border: '1px solid ' + project.colorHex + '20',
        }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <!-- Top area — gradient (default) or video/poster slot (featured card, V4) -->
        <div class="relative aspect-[4/3] flex items-center justify-center overflow-hidden px-6 pt-6">
          <MediaSlot
            v-if="coverImage"
            class="absolute inset-0"
            mode="bg-autoplay"
            :poster="coverImage"
            :src="videoSrc"
            overlay-class="bg-gradient-to-b from-black/30 via-transparent to-black/75"
          />
          <div v-else class="absolute inset-0" :style="{ background: `linear-gradient(180deg, ${project.colorHex}18 0%, ${project.colorHex}06 50%, transparent 100%)` }" />

          <!-- Large project number watermark (hidden over a cover image for clarity) -->
          <span
            v-if="!coverImage"
            class="absolute font-mono font-bold leading-none select-none pointer-events-none transition-transform duration-700"
            :style="{
              color: project.colorHex,
              opacity: 0.13,
              fontSize: 'clamp(7rem, 14vw, 10rem)',
              letterSpacing: '-0.06em',
              top: '-0.1em',
              right: '-0.05em',
              transform: isHovered ? 'scale(1.05) translateX(2px)' : 'scale(1)',
            }"
          >
            {{ project.id }}
          </span>

          <!-- Project ID pill -->
          <div class="absolute top-5 left-5 z-[2]">
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold font-mono tracking-wide backdrop-blur-md"
              :style="{ backgroundColor: `${project.colorHex}20`, color: project.colorHex }"
            >
              <span class="h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: project.colorHex }" />
              P{{ project.id }}
            </span>
          </div>

          <!-- Difficulty pill -->
          <div class="absolute top-5 right-5 z-[2]">
            <span
              class="rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md"
              :style="{ backgroundColor: `${difficultyColor}20`, color: difficultyColor }"
            >
              {{ project.difficultyLabel }}
            </span>
          </div>

          <!-- MCU label centered -->
          <div class="relative z-[1] flex flex-col items-center gap-3 text-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5"
              :style="{
                background: `linear-gradient(145deg, ${project.colorHex}30, ${project.colorHex}10)`,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${project.colorHex}20`,
              }"
            >
              <span class="text-lg font-bold font-mono" :style="{ color: project.colorHex }">
                {{ project.mcu.split('-')[0] }}
              </span>
            </div>
            <span class="text-[12px] font-mono text-text-tertiary tracking-wider">{{ project.coreTech }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="relative px-6 pb-6 pt-2">
          <!-- Subtle separator line -->
          <div class="absolute top-0 left-6 right-6 h-px" :style="{ background: `linear-gradient(90deg, transparent, ${project.colorHex}25, transparent)` }" />

          <!-- Title -->
          <h3
            class="text-[18px] font-semibold tracking-tight text-text-primary transition-all duration-500 group-hover:text-text-primary group-hover:-translate-y-0.5"
          >
            {{ project.titleZh }}
          </h3>
          <p class="mt-1.5 text-[13px] text-text-secondary leading-relaxed line-clamp-2">
            {{ project.subtitle }}
          </p>

          <!-- Duration -->
          <div class="mt-4 flex items-center gap-5 text-[12px] text-text-tertiary bg-white/[0.02] rounded-xl px-3 py-1.5 -mx-3">
            <span class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-60">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {{ project.duration }}{{ project.durationUnit }}
            </span>
          </div>

          <!-- Color tags -->
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag.label"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-300"
              :style="{
                backgroundColor: `${project.colorHex}20`,
                color: project.colorHex,
                border: `1px solid ${project.colorHex}25`,
              }"
            >
              {{ tag.label }}
            </span>
          </div>

          <!-- Arrow -->
          <div class="mt-5 flex items-center justify-between">
            <span class="text-[11px] text-text-faint transition-colors duration-300 group-hover:text-text-tertiary">查看详情</span>
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 text-text-tertiary group-hover:text-white group-hover:scale-110"
              :style="{ backgroundColor: isHovered ? project.colorHex : 'rgba(255,255,255,0.04)' }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </TiltCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '~/content/projects'
import TiltCard from './TiltCard.vue'
import { useSpotlight } from '~/composables/useSpotlight'

const props = defineProps<{
  project: Project
  /** V4: when set, the card's top area becomes a video/poster slot (featured card). */
  videoPoster?: string
  videoSrc?: string
}>()

const isHovered = ref(false)
const cardRef = ref<HTMLElement | null>(null)
useSpotlight(cardRef, { glow: 'cool' })

/** Cover image (project.cover) or the legacy video poster — either turns the card
 *  top into a photo surface; the project-number watermark hides over a photo. */
const coverImage = computed(() => props.project.cover || props.videoPoster)

// Map a hex accent to "r, g, b" so the .spotlight follow-light tints to the card's own accent
function glowRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

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

/** Difficulty-scaled tilt configuration — heavier projects tilt more and feel "weightier" */
const tiltConfig = computed(() => {
  const d = props.project.difficulty
  const hex = props.project.colorHex

  // Shadow depth scales with difficulty (beginner = light, expert = deep)
  const shadowMap: Record<number, string> = {
    1: `0 12px 40px -16px rgba(0,0,0,0.4), 0 0 0 1px ${hex}40`,
    2: `0 12px 40px -16px rgba(0,0,0,0.4), 0 0 0 1px ${hex}40`,
    3: `0 18px 60px -12px rgba(0,0,0,0.45), 0 0 0 1px ${hex}55`,
    4: `0 22px 68px -14px rgba(0,0,0,0.5), 0 0 0 1px ${hex}55`,
    5: `0 28px 80px -14px rgba(0,0,0,0.55), 0 0 0 1px ${hex}55`,
  }

  const configMap: Record<number, { maxTilt: number; duration: number }> = {
    1: { maxTilt: 4, duration: 0.32 },
    2: { maxTilt: 4, duration: 0.32 },
    3: { maxTilt: 6, duration: 0.4 },
    4: { maxTilt: 8, duration: 0.46 },
    5: { maxTilt: 10, duration: 0.5 },
  }

  const base = configMap[d] || configMap[3]
  return {
    maxTilt: base.maxTilt,
    duration: base.duration,
    hoverShadow: shadowMap[d] || shadowMap[3],
  }
})

const cardGradient = computed(() => {
  const hex = props.project.colorHex
  return `linear-gradient(160deg, ${hex}22 0%, ${hex}0a 35%, #0b0d12 100%)`
})
</script>
