<template>
  <section id="learning-path" ref="sectionRef" class="relative overflow-hidden bg-bg-secondary">
    <!-- Header -->
    <div class="mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-16 md:pb-24 text-center">
      <div class="flex items-center justify-center gap-4 mb-5">
        <h2 ref="headingRef" class="text-section font-semibold tracking-tight text-text-primary opacity-0 translate-y-8">
          从零到一，步步为营
        </h2>
      </div>
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium" style="background: rgba(99,102,241,0.10); color: #a5aceb; border: 1px solid rgba(99,102,241,0.20);">
          5 个阶段
        </span>
      </div>
      <p ref="subRef" class="mx-auto max-w-lg text-body-lg text-text-secondary opacity-0 translate-y-6">
        20 天，5 个阶段，从第一次焊接到最后一次展示
      </p>
    </div>

    <!-- Timeline -->
    <div ref="timelineRef" class="relative mx-auto max-w-5xl px-6 pb-28 md:pb-40">
      <!-- Vertical line (background track) -->
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style="background: linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" />
      <!-- Progress line — cool, solid (no glow; glow reserved for activated step nodes) -->
      <div class="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top"
        :style="{
          height: progressHeight + 'px',
          background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
          borderRadius: '4px',
          transition: 'height 0.1s linear',
        }"
      />
      <!-- Progress dot — solid, no glow -->
      <div
        v-if="progressHeight > 0"
        class="hidden md:block absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-[top] duration-100"
        :style="{
          top: 'calc(' + progressHeight + 'px - 5px)',
          background: '#6366f1',
        }"
      />

      <!-- Mobile line -->
      <div class="md:hidden absolute left-6 top-0 bottom-0 w-px" style="background: linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" />
      <div
        class="md:hidden absolute left-6 top-0 w-[2px] origin-top"
        :style="{
          height: progressHeight + 'px',
          background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
          borderRadius: '4px',
          transition: 'height 0.1s linear',
        }"
      />

      <!-- Steps -->
      <div
        v-for="(step, i) in steps"
        :key="i"
        :ref="(el) => { if (el) stepRefs[i] = el as HTMLElement }"
        class="relative mb-20 md:mb-28 last:mb-0"
      >
        <!-- Desktop: alternating layout -->
        <div class="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
          <!-- Left card (even steps) -->
          <div v-if="i % 2 === 0" class="step-card" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="relative rounded-2xl border border-white/[0.08] p-6 lg:p-8 transition-transform duration-500 hover:-translate-y-0.5 group overflow-hidden glass-card"
              :style="{ '--glow-cool': glowRgb(step.color) }">
              <!-- Animated left border fill -->
              <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
                <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                  :style="{ height: activatedSteps[i] ? '100%' : '0%', backgroundColor: step.color }"
                />
              </div>
              <div class="flex items-center gap-3 mb-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl text-[14px] transition-transform duration-500 group-hover:scale-110" :style="{ background: step.color + '20', color: step.color }">
                  <component :is="step.icon" class="h-4 w-4" />
                </span>
                <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
              </div>
              <h3 class="text-lg font-semibold text-text-primary mb-2.5 transition-colors duration-300 group-hover:text-text-primary">{{ step.title }}</h3>
              <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
              <div class="step-bullets overflow-hidden" style="max-height: 300px; opacity: 1;">
                <div class="mt-4 space-y-2">
                  <div v-for="bullet in step.bullets" :key="bullet" class="flex items-start gap-2.5 text-[13px] text-text-tertiary">
                    <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" :style="{ backgroundColor: step.color + '50' }" />
                    <span>{{ bullet }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="hidden md:block" />

          <!-- Center node -->
          <div class="flex flex-col items-center pt-2">
            <span
              class="absolute font-mono font-bold leading-none select-none pointer-events-none"
              :style="{
                color: step.color,
                fontSize: 'clamp(7rem, 12vw, 12rem)',
                opacity: activatedSteps[i] ? 0.22 : 0.10,
                letterSpacing: '-0.06em',
                top: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'opacity 0.8s',
              }"
            >
              {{ i + 1 }}
            </span>
            <button
              @click="toggleStep(i)"
              :aria-expanded="!!expandedSteps[i]"
              :aria-label="expandedSteps[i] ? `收起第${i+1}步详情` : `展开第${i+1}步详情`"
              class="relative flex h-14 w-14 items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded-full focus:outline-none"
            >
              <!-- Soft bloom when activated (feathered halo + directional glow, not a neon ring) -->
              <div
                class="absolute inset-[-10px] rounded-full transition-all duration-700"
                :style="{
                  background: activatedSteps[i] ? `radial-gradient(circle, ${step.color}40, transparent 70%)` : 'none',
                  boxShadow: activatedSteps[i] ? `0 12px 44px -10px ${step.color}66` : 'none',
                }"
              />
              <div
                class="relative flex h-14 w-14 items-center justify-center rounded-full text-[15px] font-bold font-mono transition-all duration-500"
                :style="{
                  background: activatedSteps[i] ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)` : 'rgba(255,255,255,0.04)',
                  color: activatedSteps[i] ? '#0b0d12' : '#6b7280',
                }"
              >
                {{ i + 1 }}
              </div>
            </button>
            <ChevronDown
              class="step-chevron mt-1 h-4 w-4"
              :style="{ color: step.color + '80', opacity: 0.6 }"
            />
          </div>

          <!-- Right card (odd steps) -->
          <div v-if="i % 2 !== 0" class="step-card" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="relative rounded-2xl border border-white/[0.08] p-6 lg:p-8 transition-transform duration-500 hover:-translate-y-0.5 group overflow-hidden glass-card"
              :style="{ '--glow-cool': glowRgb(step.color) }">
              <div class="absolute right-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
                <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                  :style="{ height: activatedSteps[i] ? '100%' : '0%', backgroundColor: step.color }"
                />
              </div>
              <div class="flex items-center gap-3 mb-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl text-[14px] transition-transform duration-500 group-hover:scale-110" :style="{ background: step.color + '20', color: step.color }">
                  <component :is="step.icon" class="h-4 w-4" />
                </span>
                <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
              </div>
              <h3 class="text-lg font-semibold text-text-primary mb-2.5 transition-colors duration-300 group-hover:text-text-primary">{{ step.title }}</h3>
              <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
              <div class="step-bullets overflow-hidden" style="max-height: 300px; opacity: 1;">
                <div class="mt-4 space-y-2">
                  <div v-for="bullet in step.bullets" :key="bullet" class="flex items-start gap-2.5 text-[13px] text-text-tertiary">
                    <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" :style="{ backgroundColor: step.color + '50' }" />
                    <span>{{ bullet }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="hidden md:block" />
        </div>

        <!-- Mobile: simple list -->
        <div class="md:hidden flex items-start gap-5">
          <div class="flex flex-col items-center pt-1">
            <button
              @click="toggleStep(i)"
              :aria-expanded="!!expandedSteps[i]"
              :aria-label="expandedSteps[i] ? `收起第${i+1}步详情` : `展开第${i+1}步详情`"
              class="relative flex h-9 w-9 shrink-0 items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary rounded-full focus:outline-none"
            >
              <div
                class="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold font-mono transition-all duration-500"
                :style="{
                  background: activatedSteps[i] ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)` : 'rgba(255,255,255,0.04)',
                  color: activatedSteps[i] ? '#0b0d12' : '#6b7280',
                  boxShadow: activatedSteps[i] ? `0 8px 28px -8px ${step.color}66` : 'none',
                }"
              >
                {{ i + 1 }}
              </div>
            </button>
            <ChevronDown
              class="step-chevron mt-0.5 h-3 w-3"
              :style="{ color: step.color + '80', opacity: 0.5 }"
            />
          </div>
          <div class="relative rounded-2xl border border-white/[0.08] p-5 flex-1 overflow-hidden group transition-transform duration-500 hover:-translate-y-0.5 glass-card"
            :style="{ '--glow-cool': glowRgb(step.color) }">
            <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
              <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                :style="{ height: activatedSteps[i] ? '100%' : '0%', backgroundColor: step.color }"
              />
            </div>
            <div class="flex items-center gap-2 mb-2">
              <span class="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] transition-transform duration-500 group-hover:scale-110" :style="{ background: step.color + '20', color: step.color }">
                <component :is="step.icon" class="h-3.5 w-3.5" />
              </span>
              <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
            </div>
            <h3 class="text-base font-semibold text-text-primary mb-1">{{ step.title }}</h3>
            <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
            <div class="step-bullets overflow-hidden" style="max-height: 300px; opacity: 1;">
              <div class="mt-3 space-y-1.5">
                <div v-for="bullet in step.bullets" :key="bullet" class="flex items-start gap-2 text-[12px] text-text-tertiary">
                  <span class="mt-1 h-1 w-1 shrink-0 rounded-full" :style="{ backgroundColor: step.color + '50' }" />
                  <span>{{ bullet }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, type Component } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { Search, Cpu, Code2, Sparkles, Presentation, ChevronDown } from 'lucide-vue-next'

const sectionRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const stepRefs = ref<Record<number, HTMLElement>>({})

const progressHeight = ref(0)
const activatedSteps = reactive<Record<number, boolean>>({})
const expandedSteps = reactive<Record<number, boolean>>({})

const reduce = useReducedMotion()
const observerCleanups: (() => void)[] = []

function toggleStep(i: number) {
  const newState = !expandedSteps[i]
  expandedSteps[i] = newState

  // Find bullet containers and chevrons for this step (desktop + mobile)
  const stepEl = stepRefs.value[i]
  if (!stepEl) return

  const bulletContainers = stepEl.querySelectorAll('.step-bullets')
  const chevrons = stepEl.querySelectorAll('.step-chevron')

  if (reduce.value || !gsapInstance) {
    // Reduced motion or GSAP not loaded: instant toggle
    bulletContainers.forEach((container) => {
      const el = container as HTMLElement
      el.style.maxHeight = newState ? '300px' : '0px'
      el.style.opacity = newState ? '1' : '0'
    })
    chevrons.forEach((chevron) => {
      const el = chevron as HTMLElement
      el.style.transform = newState ? 'rotate(0deg)' : 'rotate(180deg)'
    })
    return
  }

  // GSAP-driven animation
  bulletContainers.forEach((container) => {
    if (newState) {
      gsapInstance.to(container, {
        maxHeight: 300,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      gsapInstance.to(container, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
    }
  })

  chevrons.forEach((chevron) => {
    gsapInstance.to(chevron, {
      rotation: newState ? 0 : 180,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}

const steps: {
  days: string
  title: string
  description: string
  color: string
  icon: Component
  bullets: string[]
}[] = [
  {
    days: 'Day 1–3',
    title: '项目调研与选型',
    description: '研究开源项目，评估可行性，选择最适合的技术方案与硬件平台',
    color: '#6366f1',
    icon: Search,
    bullets: ['开源项目调研', '可行性评估', '技术方案确定'],
  },
  {
    days: 'Day 4–7',
    title: '硬件搭建与调试',
    description: '元器件选型、电路搭建、接线调试，让硬件跑起来',
    color: '#3b82f6',
    icon: Cpu,
    bullets: ['元器件选型', '电路搭建', '接线调试'],
  },
  {
    days: 'Day 8–12',
    title: '软件开发与集成',
    description: '固件编写、传感器集成、模块调试，让系统联动起来',
    color: '#8b5cf6',
    icon: Code2,
    bullets: ['固件编写', '传感器集成', '模块调试'],
  },
  {
    days: 'Day 13–16',
    title: '系统优化与完善',
    description: '性能调优、边界测试、细节打磨，让产品稳定可靠',
    color: '#9aa3d4',
    icon: Sparkles,
    bullets: ['性能调优', '边界测试', '细节打磨'],
  },
  {
    days: 'Day 17–20',
    title: '文档撰写与展示',
    description: '技术文档、最终演示、项目答辩，完成从做到讲的全闭环',
    color: '#a5aceb',
    icon: Presentation,
    bullets: ['技术文档', '最终演示', '项目答辩'],
  },
]

function glowRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

let scrollHandler: (() => void) | null = null
let gsapInstance: any = null

onMounted(async () => {
  const gsap = (await import('gsap')).default
  gsapInstance = gsap

  // Animate header
  const headerEls = [headingRef.value, subRef.value].filter(Boolean) as HTMLElement[]
  if (headerEls.length) {
    if (reduce.value) {
      gsap.set(headerEls, { opacity: 1, y: 0 })
    } else {
      gsap.to(headerEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', delay: 0.1 })
    }
  }

  // Scroll-driven progress line
  scrollHandler = () => {
    const section = sectionRef.value
    if (!section) return

    const rect = section.getBoundingClientRect()
    const viewportH = window.innerHeight
    const totalTravel = viewportH + rect.height
    const distance = viewportH - rect.top
    const progress = Math.max(0, Math.min(1, distance / totalTravel))

    const timeline = timelineRef.value
    if (timeline) {
      progressHeight.value = progress * timeline.offsetHeight
    }

    steps.forEach((_, i) => {
      const el = stepRefs.value[i]
      if (!el) return
      const stepRect = el.getBoundingClientRect()
      const stepProgress = (viewportH - stepRect.top) / (viewportH + stepRect.height)
      if (stepProgress > 0.3 && !activatedSteps[i]) {
        activatedSteps[i] = true
      }
    })
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()

  // Initialize expandedSteps (all expanded by default)
  steps.forEach((_, i) => {
    expandedSteps[i] = true
  })

  // Step card entrance
  Object.keys(stepRefs.value).forEach((key) => {
    const i = Number(key)
    const el = stepRefs.value[i]
    if (!el) return

    const cards = el.querySelectorAll('.step-card')
    const icons = el.querySelectorAll('.step-card span:first-child')
    if (reduce.value) {
      gsap.set(cards, { opacity: 1, y: 0 })
      if (icons.length) gsap.set(icons, { scale: 1 })
      return
    }

    gsap.set(cards, { opacity: 0, y: 40 })
    if (icons.length) gsap.set(icons, { scale: 0.8 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 })
            if (icons.length) {
              gsap.to(icons, { scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.08 })
            }
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    observerCleanups.push(() => observer.disconnect())
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  observerCleanups.forEach((fn) => fn())
})
</script>
