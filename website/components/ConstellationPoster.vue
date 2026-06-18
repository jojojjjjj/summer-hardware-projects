<template>
  <svg class="constellation-poster" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="cp-bg" cx="50%" cy="42%" r="62%">
        <stop offset="0%" stop-color="#1a2036" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
      </radialGradient>
      <!-- soft additive glow filter for the poster nodes (matches the WebGL
           constellation's additive bloom; keeps the SSG/reduced-motion fallback
           in the same "photo-electric" language, not flat dots) -->
      <filter id="cp-glow" x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="3.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="0" y="0" width="360" height="360" fill="url(#cp-bg)" />
    <!-- circuit traces -->
    <g stroke="#6366f1" stroke-opacity="0.24" stroke-width="1">
      <line v-for="(l, i) in lines" :key="'l' + i" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
    </g>
    <!-- nodes -->
    <g v-for="(n, i) in nodes2d" :key="'n' + i" filter="url(#cp-glow)">
      <circle :cx="n.x" :cy="n.y" r="11" :fill="n.color" fill-opacity="0.14" />
      <circle :cx="n.x" :cy="n.y" r="3.8" :fill="n.color" />
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
