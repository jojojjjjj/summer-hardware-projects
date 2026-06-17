<template>
  <section id="services" class="relative z-0 bg-white text-[#0b0d12] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <h2
      class="font-black uppercase tracking-tight text-center text-[#0b0d12] mb-16 sm:mb-20 md:mb-28"
      style="font-size: clamp(3rem, 12vw, 160px)"
    >
      课程阶段
    </h2>

    <div class="max-w-5xl mx-auto">
      <div
        v-for="(stage, i) in stages"
        :key="i"
        :class="i !== 0 ? 'border-t' : ''"
        class="border-[rgba(12,12,12,0.15)]"
      >
        <JackFadeIn :delay="i * 0.1" :duration="0.7" :y="30">
          <div class="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12">
            <!-- Number -->
            <span
              class="font-black leading-none flex-shrink-0"
              :style="{
                fontSize: 'clamp(3rem, 10vw, 140px)',
                color: stage.color,
              }"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <!-- Name + Description -->
            <div class="flex flex-col justify-center pt-1 sm:pt-2 md:pt-4 min-w-0">
              <!-- Name row -->
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span
                  class="font-medium uppercase"
                  style="font-size: clamp(1rem, 2.2vw, 2.1rem)"
                >
                  {{ stage.title }}
                </span>
                <span
                  class="font-medium uppercase opacity-50"
                  style="font-size: clamp(0.7rem, 1.4vw, 1.1rem)"
                >
                  {{ stage.titleEn }}
                </span>
                <span class="font-mono text-xs opacity-50">{{ stage.days }}</span>
              </div>

              <!-- Description -->
              <p
                class="font-light leading-relaxed max-w-2xl opacity-60"
                style="font-size: clamp(0.85rem, 1.6vw, 1.25rem)"
              >
                {{ stage.description }}
              </p>
              <p
                class="font-light leading-relaxed max-w-2xl opacity-40 mt-1"
                style="font-size: clamp(0.8rem, 1.4vw, 1.1rem)"
              >
                {{ stage.descriptionEn }}
              </p>
            </div>
          </div>
        </JackFadeIn>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stages: {
  days: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  color: string
}[] = [
  {
    days: 'Day 1–3',
    title: '项目调研与选型',
    titleEn: 'Research & Selection',
    description: '研究开源项目，评估可行性，选择最适合的技术方案与硬件平台',
    descriptionEn: 'Research open-source projects, evaluate feasibility, and select the optimal technical approach and hardware platform',
    color: '#6366f1',
  },
  {
    days: 'Day 4–6',
    title: '硬件搭建与调试',
    titleEn: 'Hardware Build',
    description: '元器件选型、电路搭建、接线调试，让硬件跑起来',
    descriptionEn: 'Component selection, circuit assembly, and wiring debug — get the hardware running',
    color: '#3b82f6',
  },
  {
    days: 'Day 7–9',
    title: '软件开发与集成',
    titleEn: 'Software Dev',
    description: '固件编写、传感器集成、模块调试，让系统联动起来',
    descriptionEn: 'Firmware coding, sensor integration, and module debug — make the system work as a whole',
    color: '#8b5cf6',
  },
  {
    days: 'Day 10–12',
    title: '系统优化与完善',
    titleEn: 'System Optimize',
    description: '性能调优、边界测试、细节打磨，让产品稳定可靠',
    descriptionEn: 'Performance tuning, edge-case testing, and polish — make the product stable and reliable',
    color: '#9aa3d4',
  },
  {
    days: 'Day 13–15',
    title: '文档撰写与展示',
    titleEn: 'Docs & Demo',
    description: '技术文档、最终演示、项目答辩，完成从做到讲的全闭环',
    descriptionEn: 'Technical documentation, final demo, and project defense — close the loop from doing to presenting',
    color: '#a5aceb',
  },
]
</script>
