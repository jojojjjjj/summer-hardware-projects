<template>
  <section id="value-props">
    <!-- Section intro -->
    <div class="bg-bg-secondary relative overflow-hidden">
      <div class="mx-auto max-w-6xl px-6 pt-28 md:pt-40 pb-20 md:pb-28">
        <p class="eyebrow mb-5 opacity-0 translate-y-6" ref="introEyebrow">为什么选择我们</p>
        <h2 class="text-section font-semibold tracking-tight text-text-primary opacity-0 translate-y-8 max-w-3xl" ref="introHeading">
          不只是夏令营<br />
          <span class="text-text-secondary">是真正的工程训练</span>
        </h2>
        <p class="mt-8 max-w-lg text-body-lg text-text-secondary opacity-0 translate-y-6" ref="introSub">
          从课程标准到完整交付，每一个环节都经过精心设计
        </p>
      </div>
    </div>

    <!-- Feature sections -->
    <div
      v-for="(item, i) in values"
      :key="i"
      :ref="(el) => { if (el) featureRefs[i] = el as HTMLElement }"
      :class="i % 2 === 0 ? 'bg-background' : 'bg-bg-secondary'"
      class="relative overflow-hidden"
    >
      <div class="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-36">
        <div
          class="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-24 items-center"
          :class="i % 2 !== 0 ? 'md:[direction:rtl]' : ''"
        >
          <!-- Visual side -->
          <div :class="i % 2 !== 0 ? 'md:col-span-5 md:[direction:ltr]' : 'md:col-span-5'" class="flex items-center justify-center">
            <div class="relative">
              <!-- Oversized number watermark (static, no breathe) -->
              <span
                class="font-mono font-bold leading-none select-none"
                :style="{
                  color: item.accent,
                  fontSize: 'clamp(9rem, 20vw, 16rem)',
                  opacity: 0.10,
                  letterSpacing: '-0.06em',
                }"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>

              <!-- Glass icon tile — local cool glow on in-view (one-shot) -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="group relative flex h-32 w-32 md:h-44 md:w-44 items-center justify-center rounded-[2rem] glass-card transition-all duration-700"
                  :class="visibleFeatures[i] ? 'glow-soft' : ''"
                  :style="{ '--glow-cool': glowRgb(item.accent) }"
                >
                  <!-- Inner glass sheen -->
                  <div
                    class="absolute inset-0 rounded-[2rem] opacity-30"
                    :style="{ background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)` }"
                  />
                  <component
                    :is="item.icon"
                    class="relative z-10 h-12 w-12 md:h-16 md:w-16 transition-transform duration-700"
                    :style="{
                      color: item.accent,
                      transform: visibleFeatures[i] ? 'scale(1) translateX(0)' : `scale(0.8) translateX(${i % 2 === 0 ? '-24px' : '24px'})`,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Text side -->
          <div :class="i % 2 !== 0 ? 'md:col-span-7 md:[direction:ltr]' : 'md:col-span-7'">
            <p
              class="text-[11px] font-mono uppercase tracking-[0.2em] mb-5 transition-all duration-700"
              :style="{ color: item.accent, opacity: visibleFeatures[i] ? 0.9 : 0, transform: visibleFeatures[i] ? 'translateY(0) translateX(0)' : `translateY(24px) translateX(${i % 2 === 0 ? '-24px' : '24px'})` }"
            >
              {{ item.eyebrow }}
            </p>
            <h3
              class="text-subsection font-semibold tracking-tight text-text-primary mb-6 transition-all duration-700 delay-75"
              :style="{ opacity: visibleFeatures[i] ? 1 : 0, transform: visibleFeatures[i] ? 'translateY(0) translateX(0)' : `translateY(24px) translateX(${i % 2 === 0 ? '-24px' : '24px'})` }"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-body-lg text-text-secondary leading-relaxed mb-10 max-w-md transition-all duration-700 delay-150"
              :style="{ opacity: visibleFeatures[i] ? 1 : 0, transform: visibleFeatures[i] ? 'translateY(0) translateX(0)' : `translateY(24px) translateX(${i % 2 === 0 ? '-24px' : '24px'})` }"
            >
              {{ item.description }}
            </p>
            <div class="space-y-5">
              <div
                v-for="(point, pi) in item.points"
                :key="point"
                class="border-l-2 pl-5 text-[15px] text-text-secondary transition-all duration-700"
                :style="{
                  borderColor: item.accent + '40',
                  opacity: visibleFeatures[i] ? 1 : 0,
                  transform: visibleFeatures[i] ? 'translateY(0) translateX(0)' : `translateY(20px) translateX(${i % 2 === 0 ? '-24px' : '24px'})`,
                  transitionDelay: `${200 + pi * 80}ms`,
                }"
              >
                {{ point }}
              </div>
            </div>

            <!-- Emphasis data point — solid accent, no gradient / no conic spin -->
            <div
              v-if="item.dataPoint"
              class="mt-10 inline-flex items-baseline gap-3 rounded-xl px-5 py-3 transition-all duration-700 glass-card"
              :style="{
                opacity: visibleFeatures[i] ? 1 : 0,
                transform: visibleFeatures[i] ? 'translateY(0) translateX(0)' : `translateY(16px) translateX(${i % 2 === 0 ? '-24px' : '24px'})`,
                transitionDelay: '400ms',
                borderLeft: `3px solid ${item.accent}`,
              }"
            >
              <span class="text-5xl md:text-6xl font-bold font-mono tracking-tight" :style="{ color: item.accent }">
                {{ item.dataPoint.value }}
              </span>
              <span class="text-body-sm text-text-tertiary">{{ item.dataPoint.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Thin divider line -->
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4"
        :style="{ background: `linear-gradient(90deg, transparent, ${item.accent}30, transparent)` }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, type Component } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { Code2, Layers, Wallet, Users } from 'lucide-vue-next'

const values: {
  eyebrow: string
  title: string
  description: string
  points: string[]
  accent: string
  icon: Component
  dataPoint?: { value: string; label: string }
}[] = [
  {
    eyebrow: '真实项目',
    title: '基于开源硬件改编',
    description: '每个项目都源自社区验证的真实开源项目，有论坛支持和可复现的成果，而非玩具示例。',
    points: [
      '社区验证的开源项目改编，非凭空设计',
      '真实 GitHub 仓库 + B站教程资源',
      '标准暑期时间内可完成 MVP',
    ],
    accent: '#9aa3d4',
    icon: Code2,
    dataPoint: { value: '9+', label: '真实开源项目' },
  },
  {
    eyebrow: '完整工程',
    title: '大学级课程体系',
    description: '知识深度对标大学大二水平，配备正式的项目提案、评分体系与 Git 工作流规范。',
    points: [
      '正式项目提案与评分体系',
      '周进度汇报 + 最终展示',
      'Git 工作流与代码提交规范',
    ],
    accent: '#6366f1',
    icon: Layers,
    dataPoint: { value: '5', label: '大维度评分标准' },
  },
  {
    eyebrow: '成本可控',
    title: '每套硬件不超 ¥500',
    description: '硬件选型经过成本优化，确保每个项目套件都在可承受范围内，让更多学生参与。',
    points: [
      '硬件选型成本 < ¥500/套',
      '常用模块可跨项目复用',
      '提供多家供应商比价参考',
    ],
    accent: '#3b82f6',
    icon: Wallet,
    dataPoint: { value: '≤¥500', label: '每套成本' },
  },
  {
    eyebrow: '社区支持',
    title: '活跃的开源社区',
    description: '基于社区已验证的开源项目改编，确保有真实的社区资源和论坛支持，遇到问题不孤立。',
    points: [
      '活跃的 GitHub 社区与 Issue 跟踪',
      '立创开源平台 + B站视频教程',
      '每步都有"为什么"解释和调试指南',
    ],
    accent: '#8b5cf6',
    icon: Users,
  },
]

// Map an accent hex to an "r, g, b" string for the --glow-cool token (so .glow-soft tints to the feature accent)
function glowRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

// Track visibility for each feature section
const featureRefs = ref<Record<number, HTMLElement>>({})
const visibleFeatures = reactive<Record<number, boolean>>({})

// Section intro animation refs
const introEyebrow = ref<HTMLElement | null>(null)
const introHeading = ref<HTMLElement | null>(null)
const introSub = ref<HTMLElement | null>(null)

const reduce = useReducedMotion()

// InView instances for each feature
const inViewCleanups: (() => void)[] = []

onMounted(async () => {
  const gsap = (await import('gsap')).default

  // Animate section intro
  const introEls = [introEyebrow.value, introHeading.value, introSub.value].filter(Boolean) as HTMLElement[]
  if (introEls.length) {
    if (reduce.value) {
      gsap.set(introEls, { opacity: 1, y: 0 })
    } else {
      gsap.to(introEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', delay: 0.2 })
    }
  }

  // Reduced-motion: force all features visible immediately (transforms resolve via CSS transition-duration: 0.001ms)
  if (reduce.value) {
    values.forEach((_, i) => { visibleFeatures[i] = true })
    return
  }

  // Set up IntersectionObserver for each feature
  values.forEach((_, i) => {
    const el = featureRefs.value[i]
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !visibleFeatures[i]) {
          visibleFeatures[i] = true
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    inViewCleanups.push(() => observer.disconnect())
  })
})

onUnmounted(() => {
  inViewCleanups.forEach((fn) => fn())
})
</script>
