<template>
  <div
    ref="rootRef"
    class="hero-artifact"
    :class="{ 'is-3d': running }"
    role="img"
    aria-label="9 个硬件项目组成的光电星环，悬浮在人物头顶并随头部转动，悬停或点击节点可进入对应项目"
  >
    <ConstellationPoster :projects="projects" class="poster" />
    <canvas ref="canvasRef" class="canvas" />
    <!-- Frosted-glass node chips: positioned each frame at the projected 3D ring
         positions. backdrop-filter blurs the scrub video behind each chip → real
         毛玻璃. The ring floats above the head (halo) and spins with the scrub. -->
    <div ref="nodesLayerRef" class="ring-nodes-layer" aria-hidden="true">
      <div
        v-for="(p, i) in projects"
        :key="p.slug"
        :ref="(el) => { if (el) nodeChipEls[i] = el as HTMLDivElement }"
        class="ring-node-wrap"
        :style="{ '--c': p.colorHex }"
        @pointerenter="onChipHover(i)"
        @pointerleave="onChipLeave"
        @click="onChipClick(p.slug)"
      >
        <div class="ring-node" :class="{ 'is-hover': hoverIndex === i }" />
      </div>
    </div>
    <Transition name="tip">
      <div v-if="hovered" ref="tooltipRef" class="artifact-tooltip" :style="{ left: hovered.x + 'px', top: hovered.y + 'px' }">
        <span class="dot" :style="{ background: hovered.color }" />
        {{ hovered.title }}
      </div>
    </Transition>
    <Transition name="hint">
      <div v-if="running" class="artifact-hint">移动鼠标探索 · 点击节点进入</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps<{
  projects: { slug: string; titleZh: string; colorHex: string }[]
}>()

const router = useRouter()
const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const nodesLayerRef = ref<HTMLDivElement | null>(null)
const tooltipRef = ref<HTMLDivElement | null>(null)
const nodeChipEls: HTMLDivElement[] = []
const reduce = useReducedMotion()

const running = ref(false)
const hovered = ref<{ title: string; color: string; x: number; y: number } | null>(null)
const hoverIndex = ref(-1)

// ── three.js handles (client-only; init() guards everything) ──
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let group: THREE.Group | null = null
let ringLineMat: THREE.LineBasicMaterial | null = null
const disposables: { dispose: () => void }[] = []
let rafId: number | null = null
let io: IntersectionObserver | null = null
let visible = false
let disposed = false
let entranceStart = 0

// ── Ring geometry: a tilted glowing halo FLOATING ABOVE the head (angel halo),
//    not on the face. The ring is a flat circle of 9 nodes (xy-plane); the group
//    is positioned (3D offset) so the ring sits above the monitor-head, and tilted
//    Saturn-style. The ring spins with the scrub video (rotate-with-head) + mouse
//    parallax. Canvas is full-bleed so there's room above the (large) head. ──
const RING_R = 0.85
const RING_TILT_X = -0.5 // Saturn-style tilt (front dips)
const CAM_FOV = 46
const CAM_Z_IDLE = 13.5 // pulled back; full-bleed canvas has the height to lift the ring above the head
const TARGET_X = 0.73 // ring centered on the head's X (head is ~73% width)
const TARGET_Y = 0.155 // ring floats ABOVE the head (head top ~24%; 15.5% puts the ring bottom ~17px above the monitor-top, ring top just below the navbar)
const GLOW_R = 0.55 // chip visual half-extent (world) — for the ?probe clip margin
const LINE_OPACITY = 0.3
const LINE_OPACITY_HOVER = 0.85
const ROT_MIN = { x: -0.62, y: -0.3 }
const ROT_MAX = { x: -0.38, y: 0.3 }

let baseZ = CAM_Z_IDLE
let dollyZ = CAM_Z_IDLE
let ringOffX = 0 // group.position.x — set in recomputeZ to place the ring at TARGET_X
let ringOffY = 0 // group.position.y — set in recomputeZ to place the ring at TARGET_Y
const targetRot = { x: RING_TILT_X, y: 0 }
const curRot = { x: RING_TILT_X, y: 0 }

/** 9 nodes on a circle in the xy-plane (facing camera), centred at the group
 *  origin. The group is positioned (ringOffX/Y) to float the ring above the head. */
function ringPoints(n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    pts.push([Math.cos(t) * r, Math.sin(t) * r, 0])
  }
  return pts
}

/** Min camera z so every ring node + chip glow fits the canvas with 10% margin at
 *  every tilt corner, given the ring is offset to (offX, offY). Auto-adapts to any
 *  canvas → no clipping. */
function fitZ(w: number, h: number, offX: number, offY: number): number {
  const aspect = w / h
  const tanH = Math.tan((CAM_FOV * Math.PI) / 180 / 2)
  const E = GLOW_R
  const bound = 1 - 0.1
  const corners: [number, number][] = [
    [ROT_MIN.x, ROT_MIN.y], [ROT_MAX.x, ROT_MAX.y],
    [ROT_MIN.x, ROT_MAX.y], [ROT_MAX.x, ROT_MIN.y],
    [RING_TILT_X, 0],
  ]
  const pts = ringPoints(props.projects.length, RING_R)
  let zMin = CAM_Z_IDLE
  for (const [rx, ry] of corners) {
    const cr = Math.cos(rx), sr = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry)
    for (const p of pts) {
      const x = p[0], y = p[1], z = p[2]
      const y1 = y * cr - z * sr
      const z1 = y * sr + z * cr
      const x2 = x * cy + z1 * sy
      const z2 = -x * sy + z1 * cy
      // node world position = group.position (offX, offY) + rotated point
      const wx = x2 + offX, wy = y1 + offY, wz = z2
      const needX = wz + (Math.abs(wx) + E) / (tanH * aspect * bound)
      const needY = wz + (Math.abs(wy) + E) / (tanH * bound)
      if (needX > zMin) zMin = needX
      if (needY > zMin) zMin = needY
    }
  }
  return zMin
}

/** Recompute camera z + the ring's 3D offset (to place it at TARGET_X/Y on screen)
 *  for the current canvas. The dolly floor (dollyZ) = fitZ so scrolling never clips. */
function recomputeZ(w: number, h: number) {
  const aspect = w / h
  const tanH = Math.tan((CAM_FOV * Math.PI) / 180 / 2)
  // offset for the reference z (closes the perspective loop closely enough)
  const refZ = CAM_Z_IDLE
  const ox = (TARGET_X * 2 - 1) * refZ * tanH * aspect
  const oy = (1 - 2 * TARGET_Y) * refZ * tanH
  const fz = fitZ(w, h, ox, oy)
  baseZ = Math.max(CAM_Z_IDLE, fz)
  dollyZ = fz
  // recompute offset for the actual baseZ
  ringOffX = (TARGET_X * 2 - 1) * baseZ * tanH * aspect
  ringOffY = (1 - 2 * TARGET_Y) * baseZ * tanH
  if (group) group.position.set(ringOffX, ringOffY, 0)
}

function capable(): boolean {
  if (reduce.value) return false
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(max-width: 820px)').matches) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

function init() {
  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas || !capable()) return
  const w = Math.max(1, root.clientWidth)
  const h = Math.max(1, root.clientHeight)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h, false)
  renderer.setClearColor(0x000000, 0)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(CAM_FOV, w / h, 0.1, 100)
  group = new THREE.Group()
  group.rotation.set(curRot.x, curRot.y, 0)
  scene.add(group)
  recomputeZ(w, h) // sets baseZ/dollyZ + group.position (ring offset to TARGET_X/Y)
  camera.position.set(0, 0, baseZ)

  // circuit traces: each node connects to its ring neighbours (+1 skip) — additive
  ringLineMat = new THREE.LineBasicMaterial({ color: 0x8b9bff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
  disposables.push(ringLineMat)
  const pts = ringPoints(props.projects.length, RING_R)
  const lp: number[] = []
  pts.forEach((p, i) => {
    const n = pts.length
    for (const k of [1, 2]) {
      const j = (i + k) % n
      lp.push(p[0], p[1], p[2], pts[j][0], pts[j][1], pts[j][2])
    }
  })
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3))
  disposables.push(lineGeo)
  group.add(new THREE.LineSegments(lineGeo, ringLineMat))

  entranceStart = performance.now()
  running.value = true

  // ?probe=1: projected ring node positions + glow for clipping verification.
  const params = new URLSearchParams(window.location.search)
  if (params.get('probe') === '1') {
    ;(root as any).__probe = (opts?: { tilt?: 'max' | 'min'; z?: number }) => {
      if (!camera || !group) return null
      const prev = { x: group.rotation.x, y: group.rotation.y, z: camera.position.z }
      if (opts?.tilt === 'max') group.rotation.set(ROT_MAX.x, ROT_MAX.y, 0)
      else if (opts?.tilt === 'min') group.rotation.set(ROT_MIN.x, ROT_MIN.y, 0)
      if (opts?.z !== undefined) camera.position.z = opts.z
      group.updateMatrixWorld(true)
      camera.updateMatrixWorld(true)
      const rect = root.getBoundingClientRect()
      const vFov = (CAM_FOV * Math.PI) / 180
      const nodes = ringPoints(props.projects.length, RING_R).map((p, i) => {
        const wp = new THREE.Vector3(p[0], p[1], p[2]).applyMatrix4(group.matrixWorld)
        const dist = camera.position.distanceTo(wp)
        const v = wp.clone().project(camera)
        const pxPerUnit = rect.height / (2 * Math.tan(vFov / 2) * Math.max(0.001, dist))
        return { x: (v.x * 0.5 + 0.5) * rect.width, y: (-v.y * 0.5 + 0.5) * rect.height, glowPx: GLOW_R * pxPerUnit, slug: props.projects[i]?.slug }
      })
      group.rotation.set(prev.x, prev.y, 0)
      camera.position.z = prev.z
      return { canvas: { w: rect.width, h: rect.height }, baseZ, dollyZ, nodes }
    }
  }

  io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false
      if (visible && rafId === null) start()
      else if (!visible && rafId !== null) stop()
    },
    { threshold: 0.02 },
  )
  io.observe(root)

  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('mousemove', onPointerMove, { passive: true })

  visible = true
  start()
}

function start() {
  if (disposed || rafId !== null) return
  rafId = requestAnimationFrame(loop)
}
function stop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function loop() {
  if (disposed) return
  rafId = requestAnimationFrame(loop)
  if (!visible || !renderer || !scene || !camera || !group) return

  const now = performance.now()
  const eRaw = Math.min((now - entranceStart) / 1300, 1)
  const ent = 1 - Math.pow(1 - eRaw, 3)

  // tilt eases toward the pointer target; settles when idle (no autorotate)
  curRot.x += (targetRot.x - curRot.x) * 0.05
  curRot.y += (targetRot.y - curRot.y) * 0.05
  group.rotation.x = curRot.x
  // spin WITH THE HEAD: link y-rotation to the scrub video's currentTime, so
  // scrubbing the head morph rotates the halo. Mouse parallax adds on top.
  const vid = document.querySelector('video')
  const dur = vid?.duration || 0
  const t = vid?.currentTime || 0
  const scrubSpin = dur > 0 ? (t / dur) * Math.PI * 2 : 0
  group.rotation.y = curRot.y + scrubSpin

  // subtle scroll dolly (floor = fitZ, never clips)
  const maxScroll = Math.max(1, window.innerHeight)
  const sp = Math.min(window.scrollY / maxScroll, 1)
  camera.position.z = baseZ - sp * (baseZ - dollyZ)
  camera.lookAt(0, 0, 0)

  // ring trace opacity (power-on entrance + brighten on hover)
  if (ringLineMat) ringLineMat.opacity = (hoverIndex.value >= 0 ? LINE_OPACITY_HOVER : LINE_OPACITY) * ent

  // project ring nodes → position the frosted-glass chips (perspective-scaled)
  const root = rootRef.value
  if (root) {
    const rect = root.getBoundingClientRect()
    const pts = ringPoints(props.projects.length, RING_R)
    for (let i = 0; i < pts.length; i++) {
      const wp = new THREE.Vector3(pts[i][0], pts[i][1], pts[i][2]).applyMatrix4(group.matrixWorld)
      const dist = camera.position.distanceTo(wp)
      const pr = wp.clone().project(camera)
      const x = (pr.x * 0.5 + 0.5) * rect.width
      const y = (-pr.y * 0.5 + 0.5) * rect.height
      const persp = Math.max(0.55, Math.min(1.45, (baseZ / Math.max(0.001, dist)) * 0.92))
      const chip = nodeChipEls[i]
      if (chip) {
        chip.style.transform = `translate(${x}px, ${y}px) scale(${(persp * ent).toFixed(3)})`
        chip.style.opacity = ent.toFixed(3)
        chip.style.zIndex = String(100 - Math.round(dist))
      }
      if (i === hoverIndex.value && tooltipRef.value) {
        tooltipRef.value.style.left = x + 'px'
        tooltipRef.value.style.top = y + 'px'
      }
    }
  }

  renderer.render(scene, camera)
}

function onResize() {
  if (!renderer || !camera || !rootRef.value) return
  const w = Math.max(1, rootRef.value.clientWidth)
  const h = Math.max(1, rootRef.value.clientHeight)
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  recomputeZ(w, h)
}

function onPointerMove(e: PointerEvent | MouseEvent) {
  const vx = e.clientX / window.innerWidth - 0.5
  const vy = e.clientY / window.innerHeight - 0.5
  targetRot.y = vx * 0.3
  targetRot.x = RING_TILT_X + vy * 0.22
}

function onChipHover(i: number) {
  hoverIndex.value = i
  const p = props.projects[i]
  hovered.value = { title: p.titleZh, color: p.colorHex, x: 0, y: 0 }
  if (rootRef.value) rootRef.value.style.cursor = 'pointer'
}
function onChipLeave() {
  hoverIndex.value = -1
  hovered.value = null
  if (rootRef.value) rootRef.value.style.cursor = ''
}
function onChipClick(slug: string) {
  router.push('/projects/' + slug)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  disposed = true
  stop()
  io?.disconnect()
  io = null
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('mousemove', onPointerMove)
  disposables.forEach((d) => {
    try {
      d.dispose()
    } catch {
      /* noop */
    }
  })
  disposables.length = 0
  nodeChipEls.length = 0
  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  group = null
  ringLineMat = null
})
</script>

<style scoped>
.hero-artifact {
  position: relative;
  width: 100%;
  height: 100%;
}
.poster,
.canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.poster { opacity: 1; pointer-events: none; }
.canvas { opacity: 0; display: block; }
.hero-artifact.is-3d .poster { opacity: 0; }
.hero-artifact.is-3d .canvas { opacity: 1; }

/* frosted-glass node chips */
.ring-nodes-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.ring-node-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: auto;
  will-change: transform, opacity;
}
.ring-node {
  position: absolute;
  left: 0;
  top: 0;
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
  border-radius: 50%;
  /* frosted glass: blur the scrub video behind the chip + a translucent tint */
  background: color-mix(in srgb, var(--c) 26%, rgba(255, 255, 255, 0.05));
  border: 1px solid color-mix(in srgb, var(--c) 55%, rgba(255, 255, 255, 0.28));
  backdrop-filter: blur(7px) saturate(1.25);
  -webkit-backdrop-filter: blur(7px) saturate(1.25);
  box-shadow: 0 0 14px color-mix(in srgb, var(--c) 70%, transparent),
    inset 0 1px 2px rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, background 0.28s ease;
  cursor: pointer;
}
.ring-node::after {
  /* crisp glassy highlight dot at the centre */
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 7px;
  height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 8px var(--c);
}
.ring-node.is-hover {
  transform: scale(1.55);
  background: color-mix(in srgb, var(--c) 40%, rgba(255, 255, 255, 0.12));
  box-shadow: 0 0 26px color-mix(in srgb, var(--c) 90%, transparent),
    inset 0 1px 2px rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(0, 0, 0, 0.25);
}

.artifact-tooltip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 16px));
  pointer-events: none;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #f4f5f7;
  background: rgba(11, 13, 18, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 28px -10px rgba(0, 0, 0, 0.6);
  z-index: 200;
}
.artifact-tooltip .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.artifact-hint {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-tertiary, #6b7280);
  pointer-events: none;
  z-index: 3;
}

.tip-enter-active, .tip-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.tip-enter-from, .tip-leave-to { opacity: 0; }
.hint-enter-active, .hint-leave-active { transition: opacity 0.6s ease; transition-delay: 0.4s; }
.hint-enter-from, .hint-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .poster, .canvas { transition: none; }
}
</style>
