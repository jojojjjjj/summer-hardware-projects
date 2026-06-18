<template>
  <div
    ref="rootRef"
    class="hero-artifact"
    :class="{ 'is-3d': running }"
    role="img"
    aria-label="9 个硬件项目组成的 3D 光电星座，鼠标移动时整体倾斜，悬停或点击节点可进入对应项目"
  >
    <ConstellationPoster :projects="projects" class="poster" />
    <canvas ref="canvasRef" class="canvas" />
    <Transition name="tip">
      <div v-if="hovered" class="artifact-tooltip" :style="{ left: hovered.x + 'px', top: hovered.y + 'px' }">
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
const reduce = useReducedMotion()

const running = ref(false)
const hovered = ref<{ title: string; color: string; x: number; y: number } | null>(null)

// ── three.js handles (all client-only; init() guards everything) ──
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let group: THREE.Group | null = null
let raycaster: THREE.Raycaster | null = null
const pointer = new THREE.Vector2(-2, -2)
let nodeCores: THREE.Mesh[] = []
let nodeHalos: THREE.Mesh[] = []
let nodeSprites: THREE.Sprite[] = []
let nodeHits: THREE.Mesh[] = [] // invisible fat spheres — forgiving hover/click targets
let nodeData: { project: { slug: string; titleZh: string; colorHex: string }; cur: number; lineMat: THREE.LineBasicMaterial | null }[] = []
const disposables: { dispose: () => void }[] = []
let rafId: number | null = null
let io: IntersectionObserver | null = null
let visible = false
let disposed = false
let entranceStart = 0
let hoverIndex = -1

// ── Constellation geometry (10: premium additive glow + un-clipped). ──
// Sphere radius, camera and glow are tuned together so the FULL sphere +
// halos + glow sprites + 1.5× hover all land inside the canvas with ≥8% margin
// at every breakpoint and every tilt extreme (verified via ?probe=1). The
// binding case is the narrow lg artifact column (~372px at a 1024 viewport);
// the dolly only engages on wider canvases so it never eats that margin.
const SPHERE_R = 2.4
const CAM_FOV = 46
const CAM_Z_IDLE = 11.5
const GLOW_R = 0.45 // additive sprite world half-extent (hover grows it)
const HALO_R = 0.32
const CORE_R = 0.14
const HIT_R = 0.34
const HOVER_SCALE = 1.5
const LINE_OPACITY = 0.3
const LINE_OPACITY_HOVER = 0.82

// neutral pose; pointer parallax lerps toward target then settles (NO autorotate).
// tilt range (used by the ?probe clipping test): y 0.07..0.77, x -0.41..0.09.
const targetRot = { x: -0.16, y: 0.42 }
const curRot = { x: -0.16, y: 0.42 }
const ROT_MIN = { x: -0.41, y: 0.07 }
const ROT_MAX = { x: 0.09, y: 0.77 }

// camera z (idle + scroll-dolly floor), recomputed from the live canvas size so
// the constellation always fits — see fitZ(). Never closer than the safe z.
let baseZ = CAM_Z_IDLE
let dollyZ = CAM_Z_IDLE

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

/** White radial-gradient canvas texture for the soft additive node glow.
 *  Tinted per-node via SpriteMaterial.color → each node glows in its project
 *  colour. Additive + depthTest off → transparent-safe bloom over the scrub
 *  video (video shows through everywhere there is no node). */
function makeGlowTexture(): THREE.Texture {
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0.0, 'rgba(255,255,255,1)')
  g.addColorStop(0.16, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.42, 'rgba(255,255,255,0.32)')
  g.addColorStop(1.0, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Min camera z so every node + its hover-glow fits the canvas with 10% margin,
 *  at every tilt corner. Solves the perspective projection per node:
 *    z_cam >= Z_node + (|X|+E) / (tan(vFov/2) * aspect * (1-margin))   [x binds when aspect<1]
 *    z_cam >= Z_node + (|Y|+E) / (tan(vFov/2) * (1-margin))            [y binds when aspect>1]
 *  where (X,Y,Z_node) is the node position after the group rotation (Rx then Ry,
 *  matching three's default XYZ Euler with z=0) and E is the hover-glow extent.
 *  Auto-adapts to any box size → no clipping at any breakpoint, no per-size camera. */
function fitZ(w: number, h: number): number {
  const aspect = w / h
  const tanH = Math.tan((CAM_FOV * Math.PI) / 180 / 2)
  const E = GLOW_R * HOVER_SCALE // hover-glow world extent beyond the node centre
  const bound = 1 - 0.10 // 10% margin (stricter than the 8% red line → buffer)
  const corners: [number, number][] = [
    [ROT_MIN.x, ROT_MIN.y], [ROT_MAX.x, ROT_MAX.y],
    [ROT_MIN.x, ROT_MAX.y], [ROT_MAX.x, ROT_MIN.y],
    [-0.16, 0.42], // neutral
  ]
  const pts = fibSphere(props.projects.length, SPHERE_R)
  let zMin = CAM_Z_IDLE
  for (const [rx, ry] of corners) {
    const cr = Math.cos(rx), sr = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry)
    for (const p of pts) {
      const x = p[0], y = p[1], z = p[2]
      const y1 = y * cr - z * sr
      const z1 = y * sr + z * cr
      const x2 = x * cy + z1 * sy
      const z2 = -x * sy + z1 * cy
      const needX = z2 + (Math.abs(x2) + E) / (tanH * aspect * bound)
      const needY = z2 + (Math.abs(y1) + E) / (tanH * bound)
      if (needX > zMin) zMin = needX
      if (needY > zMin) zMin = needY
    }
  }
  return zMin
}

/** Recompute the idle + dolly-floor camera z for the current canvas. The dolly
 *  never goes below dollyZ (= fitZ), so scrolling can never cause a clip; on
 *  narrow canvases baseZ == dollyZ and the dolly becomes a no-op (constant z). */
function recomputeZ(w: number, h: number) {
  const fz = fitZ(w, h)
  baseZ = Math.max(CAM_Z_IDLE, fz)
  dollyZ = fz
}

/** Decide whether to run WebGL at all: skip reduced-motion, skip touch+narrow
 *  (no hover/parallax value, too heavy), skip when WebGL is unavailable. Never
 *  screen-width-only. */
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
  renderer.setClearColor(0x000000, 0) // transparent — the scrub video shows through

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(CAM_FOV, w / h, 0.1, 100)
  recomputeZ(w, h)
  camera.position.set(0, 0, baseZ)

  group = new THREE.Group()
  group.rotation.set(curRot.x, curRot.y, 0)
  scene.add(group)

  // No scene lights: every constellation element is MeshBasicMaterial / Sprite
  // (unlit, self-emissive additive), so lights would do nothing. (The old 09
  // figure lights are gone with the figure.)

  const pts = fibSphere(props.projects.length, SPHERE_R)
  const coreGeo = new THREE.IcosahedronGeometry(CORE_R, 1)
  const haloGeo = new THREE.SphereGeometry(HALO_R, 18, 18)
  const hitGeo = new THREE.SphereGeometry(HIT_R, 12, 12)
  disposables.push(coreGeo, haloGeo, hitGeo)
  const glowTex = makeGlowTexture()
  disposables.push(glowTex)

  const cores: THREE.Mesh[] = []
  const halos: THREE.Mesh[] = []
  const sprites: THREE.Sprite[] = []
  const hits: THREE.Mesh[] = []
  const data: typeof nodeData = []

  props.projects.forEach((p, i) => {
    const col = new THREE.Color(p.colorHex)
    const pos = new THREE.Vector3(pts[i][0], pts[i][1], pts[i][2])

    // crisp solid gem — the discrete node point (small enough to read as a
    // pinpoint, not the old "small block")
    const coreMat = new THREE.MeshBasicMaterial({ color: col })
    disposables.push(coreMat)
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.copy(pos)
    core.userData.index = i

    // additive halo (mid glow)
    const haloMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
    disposables.push(haloMat)
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.position.copy(pos)

    // additive sprite — soft outer bloom, the premium glow (transparent-safe)
    const sprMat = new THREE.SpriteMaterial({ map: glowTex, color: col, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
    disposables.push(sprMat)
    const spr = new THREE.Sprite(sprMat)
    spr.position.copy(pos)
    spr.scale.setScalar(GLOW_R * 2)

    // invisible fat hit-sphere (material.visible=false → not rendered, but
    // still raycastable) so hover/click is forgiving on the small cores
    const hitMat = new THREE.MeshBasicMaterial({ visible: false })
    disposables.push(hitMat)
    const hit = new THREE.Mesh(hitGeo, hitMat)
    hit.position.copy(pos)
    hit.userData.index = i

    group!.add(spr, halo, core, hit)
    cores.push(core); halos.push(halo); sprites.push(spr); hits.push(hit)
    data.push({ project: p, cur: 0, lineMat: null })
  })
  nodeCores = cores; nodeHalos = halos; nodeSprites = sprites; nodeHits = hits; nodeData = data

  // circuit traces — each node owns its 2 nearest-neighbour segments as its
  // own LineSegments (additive) so a hovered node can light up its traces, and
  // the whole web "powers on" (opacity 0→target) staggered with the nodes.
  pts.forEach((p, i) => {
    const ds = pts.map((q, j) => (i === j ? Infinity : Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])))
    const order = ds.map((d, j) => [d, j] as const).sort((a, b) => a[0] - b[0])
    const lp: number[] = []
    for (let k = 0; k < 2; k++) {
      const j = order[k][1]
      if (j > i) lp.push(p[0], p[1], p[2], pts[j][0], pts[j][1], pts[j][2])
    }
    if (!lp.length) return
    const lineMat = new THREE.LineBasicMaterial({ color: 0x8b9bff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false })
    disposables.push(lineMat)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3))
    disposables.push(lineGeo)
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    group!.add(lines)
    if (nodeData[i]) nodeData[i].lineMat = lineMat
  })

  raycaster = new THREE.Raycaster()

  entranceStart = performance.now()
  running.value = true

  // Verification probe (?probe=1). Exposes canvas bounds + each node's
  // projected centre and a perspective-correct glow radius (px, at 1.5× hover
  // worst-case) so node_repl can assert nothing is clipped. Accepts forced
  // tilt/z overrides to test the worst case directly (?tilt=max|min, or pass
  // explicit yRot/xRot/z). Harmless DOM property; no visual/behaviour change.
  const params = new URLSearchParams(window.location.search)
  if (params.get('probe') === '1') {
    ;(root as any).__getNodes = () =>
      nodeCores.map((c, i) => {
        const v = c.getWorldPosition(new THREE.Vector3()).project(camera!)
        const r = root.getBoundingClientRect()
        return { x: r.left + (v.x * 0.5 + 0.5) * r.width, y: r.top + (-v.y * 0.5 + 0.5) * r.height, slug: nodeData[i].project.slug }
      })
    ;(root as any).__probe = (opts?: { yRot?: number; xRot?: number; z?: number; tilt?: 'max' | 'min' }) => {
      if (!camera || !group) return null
      const prevRot = { x: group.rotation.x, y: group.rotation.y }
      const prevZ = camera.position.z
      let yRot = opts?.yRot
      let xRot = opts?.xRot
      if (opts?.tilt === 'max') { yRot = ROT_MAX.y; xRot = ROT_MAX.x }
      else if (opts?.tilt === 'min') { yRot = ROT_MIN.y; xRot = ROT_MIN.x }
      if (yRot !== undefined) group.rotation.y = yRot
      if (xRot !== undefined) group.rotation.x = xRot
      if (opts?.z !== undefined) camera.position.z = opts.z
      group.updateMatrixWorld(true)
      camera.updateMatrixWorld(true)
      const rect = root.getBoundingClientRect()
      const vFov = (CAM_FOV * Math.PI) / 180
      const nodes = nodeCores.map((c, i) => {
        const wp = c.getWorldPosition(new THREE.Vector3())
        const dist = camera.position.distanceTo(wp)
        const v = wp.clone().project(camera)
        // px-per-world-unit at this node's depth → perspective-correct glow px
        const pxPerUnit = rect.height / (2 * Math.tan(vFov / 2) * Math.max(0.001, dist))
        return {
          x: (v.x * 0.5 + 0.5) * rect.width,
          y: (-v.y * 0.5 + 0.5) * rect.height,
          glowPx: GLOW_R * HOVER_SCALE * pxPerUnit, // worst-case (hover) glow
          slug: nodeData[i].project.slug,
        }
      })
      group.rotation.set(prevRot.x, prevRot.y, 0)
      camera.position.z = prevZ
      return { canvas: { w: rect.width, h: rect.height }, baseZ, dollyZ, nodes }
    }
    // debug: raycast at client coords — isolates hover hit-testing
    ;(root as any).__ray = (cx: number, cy: number) => {
      if (!raycaster || !camera) return null
      const rect = root.getBoundingClientRect()
      const px = ((cx - rect.left) / rect.width) * 2 - 1
      const py = -((cy - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(new THREE.Vector2(px, py), camera)
      group.updateMatrixWorld(true)
      const test = (arr: THREE.Object3D[]) => { const h = raycaster.intersectObjects(arr, false); return { idx: h.length ? (h[0].object.userData.index ?? -1) : -1, n: h.length } }
      return { core: test(nodeCores), halo: test(nodeHalos), hit: test(nodeHits) }
    }
    ;(root as any).__raw = () => nodeCores.map((c, i) => {
      const w = c.getWorldPosition(new THREE.Vector3())
      const p = w.clone().project(camera!)
      return { i, wx: +w.x.toFixed(2), wy: +w.y.toFixed(2), wz: +w.z.toFixed(2), sxpct: +((p.x * 0.5 + 0.5) * 100).toFixed(1), sypct: +((-p.y * 0.5 + 0.5) * 100).toFixed(1) }
    })
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
  // mousemove fallback alongside pointermove: real input fires both (idempotent),
  // and some environments/tests deliver mousemove more reliably than pointermove.
  window.addEventListener('mousemove', onPointerMove, { passive: true })
  root.addEventListener('click', onClick)
  root.addEventListener('pointerleave', onPointerLeave)

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

  // rotation eases toward pointer target; settles when idle (no infinite spin)
  curRot.x += (targetRot.x - curRot.x) * 0.05
  curRot.y += (targetRot.y - curRot.y) * 0.05
  group.rotation.x = curRot.x
  group.rotation.y = curRot.y

  // scroll-driven camera dolly (user-driven, only while the hero is in view).
  // dollyZ is the fitZ floor, so the dolly can never push closer than the
  // no-clip distance; on narrow canvases baseZ == dollyZ and this is a no-op.
  const maxScroll = Math.max(1, window.innerHeight)
  const sp = Math.min(window.scrollY / maxScroll, 1)
  camera.position.z = baseZ - sp * (baseZ - dollyZ)
  camera.lookAt(0, 0, 0)

  // one-shot entrance + hover per node; traces power on staggered with nodes
  for (let i = 0; i < nodeCores.length; i++) {
    const delay = i * 0.06
    const local = Math.max(0, Math.min(1, (eRaw - delay) / Math.max(0.0001, 1 - delay)))
    const ent = 1 - Math.pow(1 - local, 3)
    const isHover = i === hoverIndex
    const hoverTarget = isHover ? HOVER_SCALE : 1
    nodeData[i].cur += (hoverTarget - nodeData[i].cur) * 0.15
    const cur = nodeData[i].cur
    const hv = Math.max(0, Math.min(1, (cur - 1) / (HOVER_SCALE - 1))) // 0..1 hover amount
    const s = Math.max(0.0001, ent * cur)
    nodeCores[i].scale.setScalar(s)
    nodeHalos[i].scale.setScalar(s)
    nodeSprites[i].scale.setScalar(GLOW_R * 2 * ent * (1 + 0.4 * hv))
    ;(nodeHalos[i].material as THREE.MeshBasicMaterial).opacity = (0.16 + 0.22 * hv) * ent
    ;(nodeSprites[i].material as THREE.SpriteMaterial).opacity = (0.8 + 0.2 * hv) * ent
    if (nodeData[i].lineMat) {
      nodeData[i].lineMat.opacity = (LINE_OPACITY + (LINE_OPACITY_HOVER - LINE_OPACITY) * hv) * ent
    }
  }

  // hover raycast (against the invisible hit-spheres) + tooltip follow.
  // Update world matrices first so hit-sphere positions match the current tilt
  // (render() runs after this, so without this the raycast would test one-frame
  // stale matrices and miss nodes that moved with the tilt).
  group.updateMatrixWorld(true)
  if (raycaster && camera) {
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(nodeHits, false)
    let idx = -1
    for (const hh of hits) {
      if (hh.object.userData.index !== undefined) { idx = hh.object.userData.index as number; break }
    }
    if (idx !== hoverIndex) {
      hoverIndex = idx
      if (rootRef.value) rootRef.value.style.cursor = idx >= 0 ? 'pointer' : ''
    }
    if (idx >= 0) {
      const v = nodeCores[idx].getWorldPosition(new THREE.Vector3()).project(camera)
      const rect = rootRef.value!.getBoundingClientRect()
      hovered.value = {
        title: nodeData[idx].project.titleZh,
        color: nodeData[idx].project.colorHex,
        x: (v.x * 0.5 + 0.5) * rect.width,
        y: (-v.y * 0.5 + 0.5) * rect.height,
      }
    } else if (hovered.value) {
      hovered.value = null
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
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  // whole-window parallax: constellation tilts toward the cursor
  const vx = e.clientX / window.innerWidth - 0.5
  const vy = e.clientY / window.innerHeight - 0.5
  targetRot.y = 0.42 + vx * 0.7
  targetRot.x = -0.16 + vy * 0.5
}

function onPointerLeave() {
  pointer.set(-2, -2)
  targetRot.x = -0.16
  targetRot.y = 0.42
}

function onClick() {
  if (!raycaster || !camera || hoverIndex < 0) return
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(nodeHits, false)
  if (hits.length) {
    const idx = hits[0].object.userData.index as number
    router.push('/projects/' + nodeData[idx].project.slug)
  }
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
  rootRef.value?.removeEventListener('click', onClick)
  rootRef.value?.removeEventListener('pointerleave', onPointerLeave)
  disposables.forEach((d) => {
    try {
      d.dispose()
    } catch {
      /* noop */
    }
  })
  disposables.length = 0
  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  group = null
  nodeCores = []
  nodeHalos = []
  nodeSprites = []
  nodeHits = []
  nodeData = []
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

.artifact-tooltip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 14px));
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
  background: rgba(11, 13, 18, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 28px -10px rgba(0, 0, 0, 0.6);
  z-index: 4;
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
