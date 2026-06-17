<template>
  <!-- 08 upgrade: Jack-style scroll-driven marquee of ProjectSignature tiles.
       Two rows scroll in opposite directions driven by page scroll position.
       SSG-safe: no window access at render time; transforms applied only in onMounted. -->
  <section ref="sectionRef" class="bg-background pt-24 sm:pt-32 md:pt-40 pb-10">
    <!-- Row 1: projects 1-5, moves RIGHT on scroll -->
    <div class="overflow-hidden">
      <div ref="row1Ref" class="flex gap-3 will-change-transform">
        <div
          v-for="(p, i) in row1Tiles"
          :key="'r1-' + i"
          class="relative w-[420px] h-[270px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.06]"
        >
          <ProjectSignature :project="p" />
        </div>
      </div>
    </div>

    <!-- Row 2: projects 6-9, moves LEFT on scroll -->
    <div class="overflow-hidden mt-3">
      <div ref="row2Ref" class="flex gap-3 will-change-transform">
        <div
          v-for="(p, i) in row2Tiles"
          :key="'r2-' + i"
          class="relative w-[420px] h-[270px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/[0.06]"
        >
          <ProjectSignature :project="p" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/content/projects'

const reduce = useReducedMotion()
const sectionRef = ref<HTMLElement | null>(null)
const row1Ref = ref<HTMLElement | null>(null)
const row2Ref = ref<HTMLElement | null>(null)

// Tile arrays: slice then triple for seamless loop width
const row1 = projects.slice(0, 5)
const row2 = projects.slice(5)
const row1Tiles = [...row1, ...row1, ...row1]
const row2Tiles = [...row2, ...row2, ...row2]

// Cleanup handles
let rafId = 0
let scrollHandler: (() => void) | null = null
let resizeHandler: (() => void) | null = null

onMounted(() => {
  // Reduced-motion: freeze both rows at translateX(0), no listeners
  if (reduce.value) return
  if (!sectionRef.value || !row1Ref.value || !row2Ref.value) return

  let sectionTop = sectionRef.value.getBoundingClientRect().top + window.scrollY
  let ticking = false

  const updateTransforms = () => {
    const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
    row1Ref.value!.style.transform = `translateX(${offset - 200}px)`
    row2Ref.value!.style.transform = `translateX(${-(offset - 200)}px)`
    ticking = false
  }

  scrollHandler = () => {
    if (!ticking) {
      ticking = true
      rafId = requestAnimationFrame(updateTransforms)
    }
  }

  resizeHandler = () => {
    if (sectionRef.value) {
      sectionTop = sectionRef.value.getBoundingClientRect().top + window.scrollY
    }
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
  window.addEventListener('resize', resizeHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>
