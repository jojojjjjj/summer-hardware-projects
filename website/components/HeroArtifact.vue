<template>
  <div
    ref="rootRef"
    class="hero-artifact"
    :class="{ 'is-3d': running }"
    role="img"
    aria-label="9 个硬件项目组成的 3D 星座图，中央的机械守护者会随鼠标转头，悬停或点击节点可进入对应项目"
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
let nodeData: { project: { slug: string; titleZh: string; colorHex: string }; cur: number }[] = []
const disposables: { dispose: () => void }[] = []
let rafId: number | null = null
let io: IntersectionObserver | null = null
let visible = false
let disposed = false
let entranceStart = 0
let hoverIndex = -1
// neutral pose; pointer parallax lerps toward target then settles (NO autorotate)
const targetRot = { x: -0.16, y: 0.42 }
const curRot = { x: -0.16, y: 0.42 }

// ── V5: mechanical figure (shares the constellation's scene/group/camera/lights) ──
// Cool indigo body + copper metal accents; emissive AdditiveBlending accents
// (chest core, eyes) speak the same glow language as the constellation nodes.
let figureGroup: THREE.Group | null = null
let headGroup: THREE.Group | null = null
let eyeGroup: THREE.Group | null = null
let figureParts: THREE.Mesh[] = [] // solid occluders for raycast (figure is not clickable)
// head tracking reuses onPointerMove's vx/vy (no new listener); local yaw/pitch
// layered on top of the constellation group tilt → "turning head inside the chamber"
let headTargetYaw = 0
let headTargetPitch = 0
const FIG_BASE_Y = -0.18 // settled vertical offset (head sits near frame centre)
const FIG_SCALE = 1.25
// head-turn sensitivity: vx/vy ∈ ±0.5 → yaw ±35°, pitch ±15°
const HEAD_YAW_K = 1.22 // 35°/0.5
const HEAD_PITCH_K = 0.52 // 15°/0.5
const HEAD_YAW_MAX = 0.61 // 35°
const HEAD_PITCH_MAX = 0.26 // 15°

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

/** V5: procedural mechanical figure — a floating "operator/guardian" bust that
 *  shares the constellation's scene, camera, lights and depth buffer. Built from
 *  basic geometry (≤12 parts). Cool indigo body + copper metal accents, with
 *  emissive AdditiveBlending accents (chest core, eyes) that share the glow
 *  language of the constellation nodes → same-source harmony. Returns the figure
 *  group, the head group (mouse-driven tracking), the eye group (subtle pupil
 *  shift) and the solid parts used as raycast occluders. */
function buildFigure(): {
  group: THREE.Group
  head: THREE.Group
  eyes: THREE.Group
  parts: THREE.Mesh[]
} {
  const g = new THREE.Group()

  // ── materials (shared; cool palette, copper metal accents) ──
  // Faint emissive on the indigo body bridges the lit-solid figure to the
  // constellation's self-emissive nodes — shadowed areas keep a low indigo
  // glow instead of going dead black, so the figure reads as part of the same
  // energy field while the key light still gives it real 3D form.
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x34384f, metalness: 0.5, roughness: 0.55, emissive: 0x1a2040, emissiveIntensity: 0.35 })
  const headMat = new THREE.MeshStandardMaterial({ color: 0x3d4263, metalness: 0.55, roughness: 0.5, emissive: 0x1c2244, emissiveIntensity: 0.35 })
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x14172a, metalness: 0.4, roughness: 0.6, emissive: 0x0a0c18, emissiveIntensity: 0.3 })
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xc9944a, metalness: 0.9, roughness: 0.3, emissive: 0x3a2a10, emissiveIntensity: 0.15 })
  // emissive accents — same AdditiveBlending language as the constellation nodes/halos
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
  const coreHaloMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false })
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
  const eyeHaloMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false })
  disposables.push(bodyMat, headMat, darkMat, copperMat, coreMat, coreHaloMat, eyeMat, eyeHaloMat)

  const parts: THREE.Mesh[] = []
  const mark = (m: THREE.Mesh) => { m.userData.isFigure = true; parts.push(m); return m }

  // ── torso: square-tapered frustum (wide shoulders → narrow waist) ──
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.28, 0.95, 4), bodyMat)
  torso.rotation.y = Math.PI / 4
  torso.position.y = -0.05
  disposables.push(torso.geometry)
  g.add(mark(torso))

  // ── chest core: a glowing "heart node" (harmony bridge with the constellation).
  //     The halo reuses the exact node-halo idiom (additive sphere) so the core
  //     reads as "a constellation node embedded in the figure's chest". ──
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.1, 0), coreMat)
  core.position.set(0, 0.14, 0.3)
  disposables.push(core.geometry)
  g.add(core)
  const coreHalo = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), coreHaloMat)
  coreHalo.position.copy(core.position)
  disposables.push(coreHalo.geometry)
  g.add(coreHalo)

  // ── neck (torso-level, so the head rotates above it cleanly) ──
  const neckGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.16, 12)
  disposables.push(neckGeo)
  const neck = new THREE.Mesh(neckGeo, bodyMat)
  neck.position.y = 0.5
  g.add(mark(neck))

  // ── head group (pivot at top of neck; mouse-driven yaw/pitch layered on group tilt) ──
  const head = new THREE.Group()
  head.position.set(0, 0.58, 0)
  const headShell = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.38), headMat)
  headShell.position.y = 0.2
  disposables.push(headShell.geometry)
  head.add(mark(headShell))
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.15, 0.02), darkMat)
  visor.position.set(0, 0.2, 0.2)
  disposables.push(visor.geometry)
  head.add(mark(visor))
  // eyes (emissive, in a sub-group for a subtle pupil shift toward the cursor)
  const eyes = new THREE.Group()
  eyes.position.set(0, 0.2, 0.205)
  const eyeGeo = new THREE.SphereGeometry(0.04, 12, 12)
  disposables.push(eyeGeo)
  const eyeHaloGeo = new THREE.SphereGeometry(0.075, 12, 12)
  disposables.push(eyeHaloGeo)
  const eL = new THREE.Mesh(eyeGeo, eyeMat); eL.position.x = -0.09; eyes.add(eL)
  const eR = new THREE.Mesh(eyeGeo, eyeMat); eR.position.x = 0.09; eyes.add(eR)
  // eye halos (additive) — same glow language as the constellation nodes
  const ehL = new THREE.Mesh(eyeHaloGeo, eyeHaloMat); ehL.position.x = -0.09; eyes.add(ehL)
  const ehR = new THREE.Mesh(eyeHaloGeo, eyeHaloMat); ehR.position.x = 0.09; eyes.add(ehR)
  head.add(eyes)
  g.add(head)

  // ── shoulders (copper metal) ──
  const shoulderGeo = new THREE.SphereGeometry(0.12, 16, 16)
  disposables.push(shoulderGeo)
  const sL = new THREE.Mesh(shoulderGeo, copperMat); sL.position.set(-0.31, 0.28, 0); g.add(mark(sL))
  const sR = new THREE.Mesh(shoulderGeo, copperMat); sR.position.set(0.31, 0.28, 0); g.add(mark(sR))

  // ── arms: single tapered cylinders, slight outward angle (clean guardian silhouette) ──
  const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.62, 12)
  disposables.push(armGeo)
  const aL = new THREE.Mesh(armGeo, bodyMat); aL.position.set(-0.33, -0.04, 0); aL.rotation.z = 0.1; g.add(mark(aL))
  const aR = new THREE.Mesh(armGeo, bodyMat); aR.position.set(0.33, -0.04, 0); aR.rotation.z = -0.1; g.add(mark(aR))

  // ── base ring: tilted copper "projector platform" the figure emerges from ──
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.035, 14, 44), copperMat)
  ring.position.y = -0.6
  ring.rotation.x = 1.15
  disposables.push(ring.geometry)
  g.add(mark(ring))

  // final placement + scale (figure ~2 units tall, centred, head near upper-centre)
  g.position.set(0, FIG_BASE_Y, 0)
  g.scale.setScalar(FIG_SCALE)

  return { group: g, head, eyes, parts }
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
  camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100)
  camera.position.set(0, 0, 9)

  group = new THREE.Group()
  group.rotation.set(curRot.x, curRot.y, 0)
  scene.add(group)

  // ── V5: scene lights. Shape ONLY the MeshStandardMaterial figure — the
  //     constellation nodes are MeshBasicMaterial (unlit), so adding lights
  //     here cannot wash them out; the constellation look is preserved. Cool
  //     palette so the lit figure reads as the same deep-space language. ──
  scene.add(new THREE.AmbientLight(0x2a3358, 0.7))
  const keyLight = new THREE.DirectionalLight(0xb8c4ff, 1.3)
  keyLight.position.set(-3, 5, 4)
  scene.add(keyLight)
  const rimLight = new THREE.DirectionalLight(0xc9944a, 0.4)
  rimLight.position.set(3, -2, 2)
  scene.add(rimLight)

  const pts = fibSphere(props.projects.length, 3.1)
  const coreGeo = new THREE.IcosahedronGeometry(0.17, 1)
  const haloGeo = new THREE.SphereGeometry(0.36, 18, 18)
  disposables.push(coreGeo, haloGeo)

  const cores: THREE.Mesh[] = []
  const halos: THREE.Mesh[] = []
  const data: typeof nodeData = []
  props.projects.forEach((p, i) => {
    const col = new THREE.Color(p.colorHex)
    const coreMat = new THREE.MeshBasicMaterial({ color: col })
    const haloMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })
    disposables.push(coreMat, haloMat)
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.set(pts[i][0], pts[i][1], pts[i][2])
    core.userData.index = i
    const halo = new THREE.Mesh(haloGeo, haloMat)
    halo.position.copy(core.position)
    group!.add(core)
    group!.add(halo)
    cores.push(core)
    halos.push(halo)
    data.push({ project: p, cur: 0 })
  })
  nodeCores = cores
  nodeHalos = halos
  nodeData = data

  // circuit traces — connect each node to its 2 nearest neighbours
  const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.22 })
  disposables.push(lineMat)
  const lp: number[] = []
  pts.forEach((p, i) => {
    const ds = pts.map((q, j) => (i === j ? Infinity : Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])))
    const order = ds.map((d, j) => [d, j] as const).sort((a, b) => a[0] - b[0])
    for (let k = 0; k < 2; k++) {
      const j = order[k][1]
      if (j > i) lp.push(p[0], p[1], p[2], pts[j][0], pts[j][1], pts[j][2])
    }
  })
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3))
  disposables.push(lineGeo)
  group.add(new THREE.LineSegments(lineGeo, lineMat))

  // ── V5: procedural mechanical figure, same scene/group as the constellation ──
  const fig = buildFigure()
  figureGroup = fig.group
  headGroup = fig.head
  eyeGroup = fig.eyes
  figureParts = fig.parts
  group.add(figureGroup)

  raycaster = new THREE.Raycaster()

  entranceStart = performance.now()
  running.value = true

  // Verification probe (?probe=1): expose each node's projected screen position
  // so automated tests can hover/click real nodes instead of blind-sweeping.
  // Harmless DOM property, no visual/behaviour change in normal use.
  if (new URLSearchParams(window.location.search).get('probe') === '1') {
    ;(root as any).__getNodes = () =>
      nodeCores.map((c, i) => {
        const v = c.getWorldPosition(new THREE.Vector3()).project(camera!)
        const r = root.getBoundingClientRect()
        return {
          x: r.left + (v.x * 0.5 + 0.5) * r.width,
          y: r.top + (-v.y * 0.5 + 0.5) * r.height,
          slug: nodeData[i].project.slug,
        }
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
  const eRaw = Math.min((now - entranceStart) / 1100, 1)

  // rotation eases toward pointer target; settles when idle (no infinite spin)
  curRot.x += (targetRot.x - curRot.x) * 0.05
  curRot.y += (targetRot.y - curRot.y) * 0.05
  group.rotation.x = curRot.x
  group.rotation.y = curRot.y

  // ── V5: figure one-shot entrance (rises + scales in, aligned to the
  //     constellation's 1.1s timing; begins after the first nodes appear) ──
  const figE = Math.max(0, Math.min(1, (eRaw - 0.25) / 0.75))
  const figEase = 1 - Math.pow(1 - figE, 3) // power3.out, same family as nodes
  if (figureGroup) {
    figureGroup.position.y = FIG_BASE_Y - (1 - figEase) * 0.9
    figureGroup.scale.setScalar(0.6 + figEase * (FIG_SCALE - 0.6))
  }
  // head tracks the cursor: local yaw/pitch layered on the group tilt
  if (headGroup) {
    headGroup.rotation.y += (headTargetYaw - headGroup.rotation.y) * 0.08
    headGroup.rotation.x += (headTargetPitch - headGroup.rotation.x) * 0.08
  }
  // subtle pupil shift toward the cursor (alive feel, very small amplitude)
  if (eyeGroup) {
    const tx = headTargetYaw * 0.04
    const ty = 0.2 - headTargetPitch * 0.04
    eyeGroup.position.x += (tx - eyeGroup.position.x) * 0.1
    eyeGroup.position.y += (ty - eyeGroup.position.y) * 0.1
  }

  // scroll-driven camera dolly (user-driven, only while hero in view)
  const maxScroll = Math.max(1, window.innerHeight)
  const sp = Math.min(window.scrollY / maxScroll, 1)
  camera.position.z = 9 - sp * 2.6
  camera.lookAt(0, 0, 0)

  // one-shot entrance + hover scale per node
  for (let i = 0; i < nodeCores.length; i++) {
    const delay = i * 0.05
    const local = Math.max(0, Math.min(1, (eRaw - delay) / Math.max(0.0001, 1 - delay)))
    const ent = 1 - Math.pow(1 - local, 3)
    const hoverTarget = i === hoverIndex ? 1.5 : 1
    nodeData[i].cur += (hoverTarget - nodeData[i].cur) * 0.15
    const s = Math.max(0.0001, ent * nodeData[i].cur)
    nodeCores[i].scale.setScalar(s)
    nodeHalos[i].scale.setScalar(s * (i === hoverIndex ? 1.3 : 1))
    ;(nodeHalos[i].material as THREE.MeshBasicMaterial).opacity = (i === hoverIndex ? 0.32 : 0.16) * ent
  }

  // hover raycast + tooltip follow. The figure's solid parts are occluders: if
  // the nearest hit is a figure part, no node is hovered (the figure is not
  // clickable and reads as a solid object in front of the constellation).
  if (raycaster && camera) {
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects([...nodeCores, ...figureParts], false)
    let idx = -1
    for (const h of hits) {
      if (h.object.userData.isFigure) { idx = -1; break }
      if (h.object.userData.index !== undefined) { idx = h.object.userData.index as number; break }
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
}

function onPointerMove(e: PointerEvent) {
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
  // V5: head tracking reuses the same pointer input (no new listener)
  headTargetYaw = Math.max(-HEAD_YAW_MAX, Math.min(HEAD_YAW_MAX, vx * HEAD_YAW_K))
  headTargetPitch = Math.max(-HEAD_PITCH_MAX, Math.min(HEAD_PITCH_MAX, vy * HEAD_PITCH_K))
}

function onPointerLeave() {
  pointer.set(-2, -2)
  targetRot.x = -0.16
  targetRot.y = 0.42
  headTargetYaw = 0
  headTargetPitch = 0
}

function onClick() {
  if (!raycaster || !camera || hoverIndex < 0) return
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(nodeCores, false)
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
  figureGroup = null
  headGroup = null
  eyeGroup = null
  figureParts = []
  nodeCores = []
  nodeHalos = []
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
