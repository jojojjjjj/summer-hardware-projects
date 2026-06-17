<template>
  <div
    ref="rootRef"
    class="hero-artifact"
    :class="{ 'is-3d': running }"
    role="img"
    aria-label="9 个硬件项目组成的 3D 星座图，悬停或点击节点可进入对应项目"
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

  // hover raycast + tooltip follow
  if (raycaster && camera) {
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(nodeCores, false)
    const idx = hits.length ? (hits[0].object.userData.index as number) : -1
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
}

function onPointerLeave() {
  pointer.set(-2, -2)
  targetRot.x = -0.16
  targetRot.y = 0.42
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
