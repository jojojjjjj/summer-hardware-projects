<template>
  <section id="learning-path" ref="sectionRef" class="relative overflow-hidden bg-bg-secondary">
    <!-- PROMINENT warm gradient wash background -->
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,154,118,0.15) 0%, transparent 70%);" />
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 50% 40% at 30% 70%, rgba(255,107,107,0.10) 0%, transparent 60%);" />

    <!-- LARGE warm-colored blurred orbs — CLEARLY VISIBLE in the background -->
    <div class="pointer-events-none absolute top-[10%] right-[5%] w-[280px] h-[280px] rounded-full" style="background: radial-gradient(circle, rgba(255,154,118,0.18) 0%, rgba(255,107,107,0.08) 40%, transparent 70%); filter: blur(60px);" />
    <div class="pointer-events-none absolute bottom-[15%] left-[3%] w-[240px] h-[240px] rounded-full" style="background: radial-gradient(circle, rgba(255,107,107,0.15) 0%, rgba(255,217,61,0.06) 40%, transparent 70%); filter: blur(55px);" />
    <div class="pointer-events-none absolute top-[45%] left-[40%] w-[200px] h-[200px] rounded-full" style="background: radial-gradient(circle, rgba(255,217,61,0.10) 0%, transparent 70%); filter: blur(50px);" />

    <!-- Header -->
    <div class="mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-16 md:pb-24 text-center">
      <p ref="eyebrowRef" class="eyebrow mb-5 opacity-0 translate-y-6">学习路径</p>
      <div class="flex items-center justify-center gap-4 mb-5">
        <h2 ref="headingRef" class="text-section font-extrabold tracking-tight text-text-primary opacity-0 translate-y-8">
          从零到一，步步为营
        </h2>
      </div>
      <div class="flex items-center justify-center gap-3 mb-6">
        <span class="inline-flex items-center rounded-full px-3 py-1 text-[13px] font-medium" style="background: linear-gradient(135deg, rgba(255,154,118,0.15), rgba(255,107,107,0.15)); color: #ff9a76; border: 1px solid rgba(255,154,118,0.2);">
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
      <!-- Progress line — DRAMATIC warm light beam, not subtle -->
      <div class="hidden md:block absolute left-1/2 top-0 w-[5px] -translate-x-1/2 origin-top"
        :style="{
          height: progressHeight + 'px',
          background: 'linear-gradient(to bottom, #ff9a76, #ff6b6b, #ffd93d)',
          boxShadow: '0 0 24px rgba(255,154,118,0.80), 0 0 50px rgba(255,107,107,0.50), 0 0 100px rgba(255,154,118,0.35), 0 0 160px rgba(255,107,107,0.18)',
          borderRadius: '4px',
        }"
      />
      <!-- Progress line dot indicator — PROMINENT pulsing warm light -->
      <div
        v-if="progressHeight > 0"
        class="hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
        :style="{
          top: progressHeight + 'px',
          background: 'linear-gradient(135deg, #ff9a76, #ff6b6b)',
          boxShadow: '0 0 30px rgba(255,154,118,1.0), 0 0 60px rgba(255,107,107,0.70), 0 0 100px rgba(255,154,118,0.40)',
          animation: 'pulseSoft 2s ease-in-out infinite',
        }"
      />

      <!-- Mobile line -->
      <div class="md:hidden absolute left-6 top-0 bottom-0 w-px" style="background: linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" />
      <div
        class="md:hidden absolute left-6 top-0 w-[5px] origin-top"
        :style="{
          height: progressHeight + 'px',
          background: 'linear-gradient(to bottom, #ff9a76, #ff6b6b, #ffd93d)',
          boxShadow: '0 0 24px rgba(255,154,118,0.80), 0 0 50px rgba(255,107,107,0.50), 0 0 100px rgba(255,154,118,0.30)',
          borderRadius: '4px',
        }"
      />
      <!-- Mobile progress line dot indicator — pulsing -->
      <div
        v-if="progressHeight > 0"
        class="md:hidden absolute left-6 -translate-x-1/2 w-2 h-2 rounded-full"
        :style="{
          top: progressHeight + 'px',
          background: 'linear-gradient(135deg, #ff9a76, #ff6b6b)',
          boxShadow: '0 0 12px rgba(255,154,118,0.8), 0 0 24px rgba(255,107,107,0.4)',
          animation: 'pulseSoft 2s ease-in-out infinite',
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
          <!-- Left card (even steps) — premium glass-morphism -->
          <div v-if="i % 2 === 0" class="step-card" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="relative rounded-2xl border border-white/[0.15] p-6 lg:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow-strong group overflow-hidden"
              :style="{ '--glow-color': step.color, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(255,255,255,0.025)' }">
              <!-- Animated left border fill -->
              <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
                <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                  :style="{
                    height: activatedSteps[i] ? '100%' : '0%',
                    backgroundColor: step.color,
                    boxShadow: `0 0 12px ${step.color}60`,
                  }"
                />
              </div>
              <!-- Top accent gradient line -->
              <div class="absolute top-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, ${step.color}40, transparent)` }" />
              <!-- Warm gradient overlay on hover -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                :style="{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}0c, transparent 70%)` }" />
              <!-- Subtle background warmth -->
              <div class="absolute inset-0 pointer-events-none"
                :style="{ background: `radial-gradient(ellipse at 30% 50%, ${step.color}10 0%, transparent 60%)` }" />
              <div class="flex items-center gap-3 mb-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl text-[14px] transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" :style="{ background: step.color + '20', color: step.color, boxShadow: `0 0 20px ${step.color}18` }">
                  <component :is="step.icon" class="h-4 w-4" />
                </span>
                <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2.5 group-hover:text-gradient-warm transition-colors duration-300">{{ step.title }}</h3>
              <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
              <!-- Animated bullet points -->
              <div class="mt-4 space-y-2">
                <div v-for="bullet in step.bullets" :key="bullet" class="flex items-start gap-2.5 text-[13px] text-text-tertiary">
                  <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 group-hover:scale-125" :style="{ backgroundColor: step.color + '50' }" />
                  <span>{{ bullet }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="hidden md:block" />

          <!-- Center node — BIG numbers, Apple-like -->
          <div class="flex flex-col items-center pt-2">
            <!-- Large step number behind node — MUCH more visible with warm glow -->
            <span
              class="absolute font-mono font-extrabold leading-none select-none pointer-events-none"
              :style="{
                color: step.color,
                fontSize: 'clamp(7rem, 12vw, 12rem)',
                opacity: activatedSteps[i] ? 0.25 : 0.12,
                letterSpacing: '-0.06em',
                top: '-2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                textShadow: activatedSteps[i] ? `0 0 80px ${step.color}50, 0 0 160px ${step.color}25` : `0 0 40px ${step.color}18`,
                transition: 'opacity 0.8s, text-shadow 0.8s',
              }"
            >
              {{ i + 1 }}
            </span>
            <div class="relative flex h-14 w-14 items-center justify-center">
              <!-- PROMINENT warm glow ring when activated — clearly visible warm light -->
              <div
                class="absolute inset-[-8px] rounded-full transition-all duration-700"
                :style="{
                  background: activatedSteps[i] ? `radial-gradient(circle, ${step.color}40, transparent 70%)` : 'none',
                  boxShadow: activatedSteps[i] ? `0 0 80px ${step.color}55, 0 0 160px ${step.color}28, 0 0 240px ${step.color}12` : 'none',
                }"
              />
              <!-- Visible warm-colored border ring around active node -->
              <div
                class="absolute inset-[-4px] rounded-full transition-all duration-700"
                :style="{
                  border: activatedSteps[i] ? `2px solid ${step.color}50` : 'none',
                  boxShadow: activatedSteps[i] ? `0 0 20px ${step.color}30` : 'none',
                }"
              />
              <div v-if="activatedSteps[i]" class="absolute inset-0 rounded-full animate-ping opacity-40" :style="{ backgroundColor: step.color }" />
              <div
                class="relative flex h-14 w-14 items-center justify-center rounded-full text-[15px] font-bold font-mono transition-all duration-500"
                :style="{
                  background: activatedSteps[i] ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)` : 'rgba(255,255,255,0.04)',
                  color: activatedSteps[i] ? '#0a0a0b' : '#6e6e73',
                  boxShadow: activatedSteps[i] ? `0 0 50px ${step.color}90, 0 0 100px ${step.color}45, 0 0 160px ${step.color}20` : 'none',
                }"
              >
                {{ i + 1 }}
              </div>
            </div>
          </div>

          <!-- Right card (odd steps) — premium glass-morphism -->
          <div v-if="i % 2 !== 0" class="step-card" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="relative rounded-2xl border border-white/[0.15] p-6 lg:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-glow-strong group overflow-hidden"
              :style="{ '--glow-color': step.color, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(255,255,255,0.025)' }">
              <!-- Animated right border fill -->
              <div class="absolute right-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
                <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                  :style="{
                    height: activatedSteps[i] ? '100%' : '0%',
                    backgroundColor: step.color,
                    boxShadow: `0 0 12px ${step.color}60`,
                  }"
                />
              </div>
              <!-- Top accent gradient line -->
              <div class="absolute top-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, transparent, ${step.color}40)` }" />
              <!-- Warm gradient overlay on hover -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                :style="{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}0c, transparent 70%)` }" />
              <!-- Subtle background warmth -->
              <div class="absolute inset-0 pointer-events-none"
                :style="{ background: `radial-gradient(ellipse at 70% 50%, ${step.color}10 0%, transparent 60%)` }" />
              <div class="flex items-center gap-3 mb-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-xl text-[14px] transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg" :style="{ background: step.color + '20', color: step.color, boxShadow: `0 0 20px ${step.color}18` }">
                  <component :is="step.icon" class="h-4 w-4" />
                </span>
                <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2.5 group-hover:text-gradient-warm transition-colors duration-300">{{ step.title }}</h3>
              <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
              <!-- Animated bullet points -->
              <div class="mt-4 space-y-2">
                <div v-for="bullet in step.bullets" :key="bullet" class="flex items-start gap-2.5 text-[13px] text-text-tertiary">
                  <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 group-hover:scale-125" :style="{ backgroundColor: step.color + '50' }" />
                  <span>{{ bullet }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="hidden md:block" />
        </div>

        <!-- Mobile: simple list -->
        <div class="md:hidden flex items-start gap-5">
          <div class="flex flex-col items-center pt-1">
            <div class="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <div v-if="activatedSteps[i]" class="absolute inset-0 rounded-full animate-ping opacity-40" :style="{ backgroundColor: step.color }" />
              <div
                class="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold font-mono transition-all duration-500"
                :style="{
                  background: activatedSteps[i] ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)` : 'rgba(255,255,255,0.04)',
                  color: activatedSteps[i] ? '#0a0a0b' : '#6e6e73',
                  boxShadow: activatedSteps[i] ? `0 0 30px ${step.color}70, 0 0 60px ${step.color}30` : 'none',
                }"
              >
                {{ i + 1 }}
              </div>
            </div>
          </div>
          <div class="relative rounded-2xl border border-white/[0.15] p-5 flex-1 overflow-hidden group transition-all duration-500 hover:scale-[1.01]"
            :style="{ '--glow-color': step.color, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.025)' }">
            <!-- Animated left border fill -->
            <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-full overflow-hidden" :style="{ backgroundColor: step.color + '20' }">
              <div class="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ease-out"
                :style="{
                  height: activatedSteps[i] ? '100%' : '0%',
                  backgroundColor: step.color,
                  boxShadow: `0 0 8px ${step.color}60`,
                }"
              />
            </div>
            <div class="absolute top-0 left-0 right-0 h-px" :style="{ background: `linear-gradient(90deg, ${step.color}40, transparent)` }" />
            <!-- Subtle background warmth -->
            <div class="absolute inset-0 pointer-events-none"
              :style="{ background: `radial-gradient(ellipse at 30% 50%, ${step.color}10 0%, transparent 60%)` }" />
            <div class="flex items-center gap-2 mb-2">
              <span class="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] transition-transform duration-500 group-hover:scale-110" :style="{ background: step.color + '20', color: step.color }">
                <component :is="step.icon" class="h-3.5 w-3.5" />
              </span>
              <span class="text-caption font-mono text-text-tertiary">{{ step.days }}</span>
            </div>
            <h3 class="text-base font-bold text-text-primary mb-1">{{ step.title }}</h3>
            <p class="text-body-sm text-text-secondary leading-relaxed">{{ step.description }}</p>
            <!-- Mobile bullet points -->
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
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, type Component } from 'vue'
import { Search, Cpu, Code2, Sparkles, Presentation } from 'lucide-vue-next'

const sectionRef = ref<HTMLElement | null>(null)
const timelineRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const stepRefs = ref<Record<number, HTMLElement>>({})

const progressHeight = ref(0)
const activatedSteps = reactive<Record<number, boolean>>({})

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
    color: '#3d8b5e',
    icon: Search,
    bullets: ['开源项目调研', '可行性评估', '技术方案确定'],
  },
  {
    days: 'Day 4–7',
    title: '硬件搭建与调试',
    description: '元器件选型、电路搭建、接线调试，让硬件跑起来',
    color: '#ff9a76',
    icon: Cpu,
    bullets: ['元器件选型', '电路搭建', '接线调试'],
  },
  {
    days: 'Day 8–12',
    title: '软件开发与集成',
    description: '固件编写、传感器集成、模块调试，让系统联动起来',
    color: '#c9944a',
    icon: Code2,
    bullets: ['固件编写', '传感器集成', '模块调试'],
  },
  {
    days: 'Day 13–16',
    title: '系统优化与完善',
    description: '性能调优、边界测试、细节打磨，让产品稳定可靠',
    color: '#ff6b6b',
    icon: Sparkles,
    bullets: ['性能调优', '边界测试', '细节打磨'],
  },
  {
    days: 'Day 17–20',
    title: '文档撰写与展示',
    description: '技术文档、最终演示、项目答辩，完成从做到讲的全闭环',
    color: '#ffd93d',
    icon: Presentation,
    bullets: ['技术文档', '最终演示', '项目答辩'],
  },
]

let scrollHandler: (() => void) | null = null
let gsapInstance: any = null

onMounted(async () => {
  const gsap = (await import('gsap')).default
  gsapInstance = gsap

  // Animate header
  const headerEls = [eyebrowRef.value, headingRef.value, subRef.value].filter(Boolean) as HTMLElement[]
  if (headerEls.length) {
    gsap.to(headerEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'expo.out',
      delay: 0.1,
    })
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

    // Update progress line height
    const timeline = timelineRef.value
    if (timeline) {
      progressHeight.value = progress * timeline.offsetHeight
    }

    // Activate steps based on scroll position
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

  // Initial step card animations with GSAP ScrollTrigger-like behavior
  Object.keys(stepRefs.value).forEach((key) => {
    const i = Number(key)
    const el = stepRefs.value[i]
    if (!el) return

    const cards = el.querySelectorAll('.step-card')
    const icons = el.querySelectorAll('.step-card span:first-child')
    gsap.set(cards, { opacity: 0, y: 40 })
    if (icons.length) gsap.set(icons, { scale: 0.8 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'expo.out',
              stagger: 0.08,
            })
            if (icons.length) {
              gsap.to(icons, {
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.08,
              })
            }
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
  })
})

onUnmounted(() => {
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>
