<template>
  <svg class="constellation-poster" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="cp-bg" cx="50%" cy="42%" r="62%">
        <stop offset="0%" stop-color="#1a2036" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
      </radialGradient>
      <!-- V5: mechanical figure body gradient (cool indigo, matches the 3D figure) -->
      <linearGradient id="cp-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3d4263" />
        <stop offset="100%" stop-color="#262a40" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="360" height="360" fill="url(#cp-bg)" />
    <!-- circuit traces -->
    <g stroke="#6366f1" stroke-opacity="0.22" stroke-width="1">
      <line v-for="(l, i) in lines" :key="'l' + i" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
    </g>
    <!-- V5: mechanical guardian (static, front-facing) — same frame as the
         constellation. Drawn before the nodes so the orbiting nodes read as
         passing in front, mirroring the 3D depth composition. -->
    <g class="cp-figure">
      <!-- base ring: tilted copper projector platform -->
      <ellipse cx="180" cy="224" rx="34" ry="8" stroke="#c9944a" stroke-opacity="0.22" stroke-width="1.5" />
      <ellipse cx="180" cy="224" rx="30" ry="6.5" stroke="#c9944a" stroke-opacity="0.85" stroke-width="2.2" />
      <!-- arms (slim, darker indigo) -->
      <polygon points="153,180 160,180 158,213 152,213" fill="#2b3046" />
      <polygon points="200,180 207,180 208,213 202,213" fill="#2b3046" />
      <!-- torso: tapered trapezoid -->
      <polygon points="166,174 194,174 190,216 170,216" fill="url(#cp-body)" stroke="#3d4263" stroke-width="0.5" />
      <!-- chest core: glowing "heart node" (same glow idiom as the constellation) -->
      <circle cx="180" cy="192" r="7" fill="#8b5cf6" fill-opacity="0.18" />
      <circle cx="180" cy="192" r="3.3" fill="#8b5cf6" />
      <!-- shoulders (copper) -->
      <circle cx="160" cy="177" r="4.6" fill="#c9944a" />
      <circle cx="200" cy="177" r="4.6" fill="#c9944a" />
      <!-- neck -->
      <rect x="176" y="164" width="8" height="10" fill="#34384f" />
      <!-- head -->
      <rect x="163" y="143" width="34" height="28" rx="5" fill="#3d4263" />
      <!-- visor -->
      <rect x="168" y="153" width="24" height="8" rx="1.5" fill="#14172a" />
      <!-- eyes (emissive indigo) -->
      <circle cx="174" cy="157" r="4" fill="#6366f1" fill-opacity="0.2" />
      <circle cx="174" cy="157" r="2" fill="#6366f1" />
      <circle cx="186" cy="157" r="4" fill="#6366f1" fill-opacity="0.2" />
      <circle cx="186" cy="157" r="2" fill="#6366f1" />
    </g>
    <!-- nodes -->
    <g v-for="(n, i) in nodes2d" :key="'n' + i">
      <circle :cx="n.x" :cy="n.y" r="10" :fill="n.color" fill-opacity="0.12" />
      <circle :cx="n.x" :cy="n.y" r="3.6" :fill="n.color" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ projects: { slug: string; colorHex: string }[] }>()

/** Deterministic fibonacci-sphere distribution (matches the 3D layout) so the
 *  static poster reads as the same constellation as the WebGL scene. */
function fibSphere(n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2
    const rr = Math.sqrt(Math.max(0, 1 - y * y))
    const t = phi * i
    pts.push([Math.cos(t) * rr * r, y * r, Math.sin(t) * rr * r])
  }
  return pts
}

const CX = 180, CY = 182, SCALE = 46

const nodes2d = computed(() => {
  const pts = fibSphere(props.projects.length, 1)
  return pts.map((p, i) => {
    // slight isometric projection for 2.5D depth
    const x = CX + (p[0] * 0.92 + p[2] * 0.38) * SCALE
    const y = CY + (-p[1] + p[2] * 0.22) * SCALE
    return { x, y, color: props.projects[i]?.colorHex || '#6366f1' }
  })
})

const lines = computed(() => {
  const n = nodes2d.value
  const out: { x1: number; y1: number; x2: number; y2: number }[] = []
  n.forEach((a, i) => {
    const dists = n.map((b, j) => (i === j ? Infinity : Math.hypot(a.x - b.x, a.y - b.y)))
    const order = dists.map((d, j) => [d, j] as const).sort((u, v) => u[0] - v[0])
    for (let k = 0; k < 2; k++) {
      const j = order[k][1]
      if (j > i) out.push({ x1: a.x, y1: a.y, x2: n[j].x, y2: n[j].y })
    }
  })
  return out
})
</script>

<style scoped>
.constellation-poster { display: block; width: 100%; height: 100%; }
</style>
