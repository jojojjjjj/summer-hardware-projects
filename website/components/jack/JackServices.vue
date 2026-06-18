<template>
  <section id="services" class="relative z-0 bg-white text-[#0b0d12] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <h2
      class="font-black uppercase tracking-tight text-center text-[#0b0d12] mb-16 sm:mb-20 md:mb-28"
      style="font-size: clamp(3rem, 12vw, 160px)"
    >
      课程阶段
    </h2>

    <div class="max-w-5xl mx-auto relative">
      <!-- Vertical spine — desktop -->
      <div
        class="hidden md:block absolute left-[35px] top-0 bottom-0 w-px"
        style="background: linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(165,172,235,0.15), rgba(12,12,12,0.06))"
      />
      <!-- Vertical spine — mobile -->
      <div
        class="md:hidden absolute left-[19px] top-0 bottom-0 w-px"
        style="background: linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(165,172,235,0.15), rgba(12,12,12,0.06))"
      />

      <!-- Stages -->
      <div
        v-for="(stage, i) in stages"
        :key="i"
        class="relative mb-12 md:mb-16 last:mb-0"
      >
        <JackFadeIn :delay="i * 0.12" :duration="0.7" :y="30">
          <!-- Desktop layout -->
          <div class="hidden md:flex items-start gap-8">
            <!-- Left: number node on spine -->
            <div class="relative flex-shrink-0 w-[70px] flex flex-col items-center">
              <!-- Spine dot -->
              <div
                class="w-3.5 h-3.5 rounded-full border-[2.5px] border-white shadow-sm z-10"
                :style="{ backgroundColor: stage.color }"
              />
              <!-- Stage number -->
              <span
                class="font-black font-mono leading-none mt-3 select-none"
                :style="{
                  color: stage.color,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  opacity: 0.7,
                }"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>

            <!-- Right: rich card -->
            <div
              class="flex-1 min-w-0 rounded-2xl border p-6 lg:p-8 transition-all duration-300 hover:shadow-lg group"
              :style="{
                borderColor: stage.color + '20',
                backgroundColor: stage.color + '06',
                '--accent': stage.color,
              }"
            >
              <!-- Accent top bar -->
              <div
                class="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                :style="{ backgroundColor: stage.color + '30' }"
              />

              <!-- Header: icon + day badge -->
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                  :style="{ backgroundColor: stage.color + '15', color: stage.color }"
                >
                  <component :is="stage.icon" class="h-5 w-5" />
                </span>
                <span
                  class="font-mono text-xs font-medium px-2.5 py-1 rounded-full"
                  :style="{
                    backgroundColor: stage.color + '12',
                    color: stage.color,
                  }"
                >
                  {{ stage.days }}
                </span>
              </div>

              <!-- Title row: CN + EN -->
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3
                  class="font-semibold text-[#0b0d12]"
                  style="font-size: clamp(1.1rem, 2vw, 1.5rem)"
                >
                  {{ stage.title }}
                </h3>
                <span
                  class="font-medium opacity-40"
                  style="font-size: clamp(0.75rem, 1.2vw, 0.95rem)"
                >
                  {{ stage.titleEn }}
                </span>
              </div>

              <!-- Description: CN + EN -->
              <p
                class="leading-relaxed text-[#0b0d12] opacity-60 mb-1"
                style="font-size: clamp(0.85rem, 1.4vw, 1.1rem)"
              >
                {{ stage.description }}
              </p>
              <p
                class="leading-relaxed text-[#0b0d12] opacity-35 mb-5"
                style="font-size: clamp(0.8rem, 1.2vw, 0.95rem)"
              >
                {{ stage.descriptionEn }}
              </p>

              <!-- Bullets -->
              <div class="space-y-2.5">
                <div
                  v-for="bullet in stage.bullets"
                  :key="bullet"
                  class="flex items-center gap-2.5"
                >
                  <span
                    class="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: stage.color + '40' }"
                  />
                  <span
                    class="text-[#0b0d12] opacity-55"
                    style="font-size: clamp(0.8rem, 1.2vw, 0.95rem)"
                  >
                    {{ bullet }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile layout -->
          <div class="md:hidden flex items-start gap-4">
            <!-- Left: spine node -->
            <div class="relative flex-shrink-0 w-[38px] flex flex-col items-center">
              <div
                class="w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm z-10"
                :style="{ backgroundColor: stage.color }"
              />
              <span
                class="font-black font-mono leading-none mt-2 select-none"
                :style="{
                  color: stage.color,
                  fontSize: '1.25rem',
                  opacity: 0.6,
                }"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>

            <!-- Right: card -->
            <div
              class="flex-1 min-w-0 rounded-xl border p-4 transition-shadow duration-300"
              :style="{
                borderColor: stage.color + '20',
                backgroundColor: stage.color + '06',
              }"
            >
              <!-- Header -->
              <div class="flex items-center gap-2 mb-2.5">
                <span
                  class="flex h-7 w-7 items-center justify-center rounded-lg"
                  :style="{ backgroundColor: stage.color + '15', color: stage.color }"
                >
                  <component :is="stage.icon" class="h-3.5 w-3.5" />
                </span>
                <span
                  class="font-mono text-[10px] font-medium px-2 py-0.5 rounded-full"
                  :style="{
                    backgroundColor: stage.color + '12',
                    color: stage.color,
                  }"
                >
                  {{ stage.days }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="font-semibold text-sm text-[#0b0d12] mb-1">
                {{ stage.title }}
                <span class="font-medium opacity-40 text-xs ml-1.5">{{ stage.titleEn }}</span>
              </h3>

              <!-- Description -->
              <p class="text-xs leading-relaxed text-[#0b0d12] opacity-55 mb-3">
                {{ stage.description }}
              </p>

              <!-- Bullets -->
              <div class="space-y-1.5">
                <div
                  v-for="bullet in stage.bullets"
                  :key="bullet"
                  class="flex items-center gap-2"
                >
                  <span
                    class="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    :style="{ backgroundColor: stage.color + '40' }"
                  />
                  <span class="text-[11px] text-[#0b0d12] opacity-50">{{ bullet }}</span>
                </div>
              </div>
            </div>
          </div>
        </JackFadeIn>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Search, Cpu, Code2, Sparkles, Presentation } from 'lucide-vue-next'

interface Stage {
  days: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  color: string
  icon: Component
  bullets: string[]
}

const stages: Stage[] = [
  {
    days: 'Day 1-3',
    title: '项目调研与选型',
    titleEn: 'Research & Selection',
    description: '研究开源项目，评估可行性，选择最适合的技术方案与硬件平台',
    descriptionEn: 'Research open-source projects, evaluate feasibility, and select the optimal technical approach and hardware platform',
    color: '#6366f1',
    icon: Search,
    bullets: ['开源项目调研', '可行性评估', '技术方案确定'],
  },
  {
    days: 'Day 4-6',
    title: '硬件搭建与调试',
    titleEn: 'Hardware Build',
    description: '元器件选型、电路搭建、接线调试，让硬件跑起来',
    descriptionEn: 'Component selection, circuit assembly, and wiring debug — get the hardware running',
    color: '#3b82f6',
    icon: Cpu,
    bullets: ['元器件选型', '电路搭建', '接线调试'],
  },
  {
    days: 'Day 7-9',
    title: '软件开发与集成',
    titleEn: 'Software Dev',
    description: '固件编写、传感器集成、模块调试，让系统联动起来',
    descriptionEn: 'Firmware coding, sensor integration, and module debug — make the system work as a whole',
    color: '#8b5cf6',
    icon: Code2,
    bullets: ['固件编写', '传感器集成', '模块调试'],
  },
  {
    days: 'Day 10-12',
    title: '系统优化与完善',
    titleEn: 'System Optimize',
    description: '性能调优、边界测试、细节打磨，让产品稳定可靠',
    descriptionEn: 'Performance tuning, edge-case testing, and polish — make the product stable and reliable',
    color: '#9aa3d4',
    icon: Sparkles,
    bullets: ['性能调优', '边界测试', '细节打磨'],
  },
  {
    days: 'Day 13-15',
    title: '文档撰写与展示',
    titleEn: 'Docs & Demo',
    description: '技术文档、最终演示、项目答辩，完成从做到讲的全闭环',
    descriptionEn: 'Technical documentation, final demo, and project defense — close the loop from doing to presenting',
    color: '#a5aceb',
    icon: Presentation,
    bullets: ['技术文档', '最终演示', '项目答辩'],
  },
]
</script>
