<template>
  <!-- V3 §4.6: replaces the placeholder fake image (project titleEn at 5% opacity)
       with a real, per-project signature graphic built from colorHex + a motif
       chosen by slug. Pure SVG → SSG-safe, crisp at any size, no external assets. -->
  <div class="project-signature" :style="{ '--accent': project.colorHex }">
    <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <!-- shared background: accent-tinted wash + faint grid -->
      <defs>
        <radialGradient :id="'ps-bg-' + uid" cx="50%" cy="38%" r="70%">
          <stop offset="0%" :stop-color="project.colorHex" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" :fill="`url(#ps-bg-${uid})`" />
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
        <line v-for="x in 11" :key="'gx'+x" :x1="x*33.3" y1="0" :x2="x*33.3" y2="225" />
        <line v-for="y in 7" :key="'gy'+y" x1="0" :y1="y*28" x2="400" :y2="y*28" />
      </g>

      <!-- motif -->
      <g v-if="variant === 'wave'" :stroke="project.colorHex" stroke-width="2" stroke-linecap="round" fill="none">
        <path d="M10 112 Q 60 40, 110 112 T 210 112 T 310 112 T 390 112" stroke-opacity="0.95" />
        <path d="M10 140 Q 70 80, 130 140 T 250 140 T 390 140" stroke-opacity="0.5" />
        <path d="M10 84 Q 50 130, 90 84 T 170 84 T 250 84 T 330 84 T 390 84" stroke-opacity="0.3" />
        <circle cx="310" cy="112" r="4" :fill="project.colorHex" stroke="none" />
      </g>

      <g v-else-if="variant === 'grid'">
        <rect v-for="(c, i) in gridCells" :key="i" :x="c.x" :y="c.y" width="30" height="30" rx="4"
          :fill="project.colorHex" :fill-opacity="c.lit ? 0.5 : 0.06" :stroke="project.colorHex" :stroke-opacity="c.lit ? 0 : 0.18" />
      </g>

      <g v-else-if="variant === 'radial'" :stroke="project.colorHex" fill="none">
        <circle cx="200" cy="112" r="30" stroke-opacity="0.9" stroke-width="2" />
        <circle cx="200" cy="112" r="58" stroke-opacity="0.4" stroke-width="1.5" />
        <circle cx="200" cy="112" r="86" stroke-opacity="0.2" stroke-width="1.5" />
        <line v-for="a in 12" :key="a" :x1="200" :y1="112" :x2="200 + Math.cos((a*30)*Math.PI/180)*92" :y2="112 + Math.sin((a*30)*Math.PI/180)*92" stroke-opacity="0.18" stroke-width="1" />
        <circle cx="200" cy="112" r="5" :fill="project.colorHex" stroke="none" />
        <circle cx="258" cy="112" r="3.5" :fill="project.colorHex" stroke="none" fill-opacity="0.7" />
      </g>

      <g v-else-if="variant === 'cube'" :stroke="project.colorHex" stroke-width="2" fill="none" stroke-linejoin="round">
        <!-- isometric cube -->
        <path d="M200 40 L285 88 L285 168 L200 216 L115 168 L115 88 Z" stroke-opacity="0.85" />
        <path d="M200 40 L200 120" stroke-opacity="0.4" />
        <path d="M115 88 L200 120 L285 88" stroke-opacity="0.55" />
        <path d="M200 120 L200 216" stroke-opacity="0.4" />
        <path d="M200 120 L200 216" :stroke="project.colorHex" />
        <circle cx="200" cy="120" r="4" :fill="project.colorHex" stroke="none" />
      </g>

      <g v-else :fill="project.colorHex">
        <!-- matrix: dot grid, denser toward centre -->
        <circle v-for="(d, i) in matrixDots" :key="i" :cx="d.x" :cy="d.y" :r="d.r" :fill-opacity="d.o" />
      </g>
    </svg>

    <!-- real label (NOT a 5% watermark) -->
    <div class="ps-label">
      <span class="ps-label-dot" :style="{ background: project.colorHex }" />
      <span class="ps-label-id">P{{ project.id }}</span>
      <span class="ps-label-name">{{ project.titleEn }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '~/content/projects'

const props = defineProps<{ project: Project }>()

// deterministic per-instance id for gradient refs (avoid SVG id collisions)
const uid = Math.floor(100000 + (props.project.id.charCodeAt(0) || 0) * 911 + props.project.slug.length * 37)

type Motif = 'wave' | 'grid' | 'radial' | 'cube' | 'matrix'
const motifMap: Record<string, Motif> = {
  'binocular-thermal-imager': 'grid',
  'env-monitor': 'wave',
  '4mode-keyboard': 'grid',
  'pocket-signal-generator': 'wave',
  'desktop-pet': 'radial',
  'weather-cube': 'cube',
  'bipedal-wheeled-robot': 'matrix',
  'electronbot': 'radial',
  'desk-satellite': 'cube',
}
const variant = computed<Motif>(() => motifMap[props.project.slug] || 'matrix')

// grid motif cells — a 6×3 matrix, lit pattern varies by project id
const gridCells = computed(() => {
  const cells: { x: number; y: number; lit: boolean }[] = []
  const seed = (props.project.id.charCodeAt(0) || 1)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      cells.push({ x: 60 + c * 50, y: 50 + r * 45, lit: ((c + r * 2 + seed) % 3 === 0) })
    }
  }
  return cells
})

// matrix motif dots
const matrixDots = computed(() => {
  const dots: { x: number; y: number; r: number; o: number }[] = []
  const seed = (props.project.id.charCodeAt(0) || 1)
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 12; c++) {
      const x = 40 + c * 30
      const y = 30 + r * 28
      const cx = 200, cy = 112
      const dist = Math.hypot(x - cx, y - cy)
      const o = Math.max(0.05, 0.6 - dist / 260)
      dots.push({ x, y, r: ((c + r + seed) % 4 === 0 ? 3.4 : 2), o })
    }
  }
  return dots
})
</script>

<style scoped>
.project-signature {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.project-signature svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.ps-label {
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px;
  border-radius: 999px;
  background: rgba(11, 13, 18, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 600;
  color: #f4f5f7;
  z-index: 2;
}
.ps-label-dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }
.ps-label-id { font-family: 'JetBrains Mono', monospace; color: #9aa0ac; }
.ps-label-name { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em; }
</style>
