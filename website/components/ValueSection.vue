<template>
  <section id="value-props" class="section-elevated py-24 md:py-36 lg:py-44">
    <div class="mx-auto max-w-6xl px-6">
      <!-- Header -->
      <div class="mb-16 md:mb-20 text-center">
        <p class="eyebrow mb-4">为什么选择我们</p>
        <h2 class="text-section font-bold tracking-tight text-text-primary">
          不只是夏令营，<br />是真正的工程训练
        </h2>
        <p class="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
          从课程标准到完整脚手架，每一个环节都经过精心设计
        </p>
      </div>

      <!-- 3-column feature grid -->
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="(item, i) in values" :key="i"
          class="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.04]">
          <!-- Icon -->
          <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
            :style="{ backgroundColor: `${item.accent}14` }">
            <component :is="item.iconComponent" :style="{ color: item.accent }" />
          </div>
          <!-- Eyebrow -->
          <p class="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2" :style="{ color: item.accent }">{{ item.eyebrow }}</p>
          <!-- Title -->
          <h3 class="text-xl md:text-2xl font-bold tracking-tight text-text-primary mb-3">{{ item.title }}</h3>
          <!-- Description -->
          <p class="text-[14px] sm:text-[15px] text-text-secondary leading-relaxed mb-5">{{ item.description }}</p>
          <!-- Points -->
          <ul class="space-y-2.5">
            <li v-for="point in item.points" :key="point" class="flex items-start gap-2.5 text-[14px] text-text-secondary">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" :style="{ backgroundColor: item.accent }" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

// SVG icon components using render functions
const GraduationIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
    h('path', { d: 'M6 12v5c0 2 2 3 6 3s6-1 6-3v-5' }),
  ]),
}

const WrenchIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' }),
  ]),
}

const ClipboardIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 }),
    h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
    h('path', { d: 'M12 11h4' }),
    h('path', { d: 'M12 16h4' }),
    h('path', { d: 'M8 11h.01' }),
    h('path', { d: 'M8 16h.01' }),
  ]),
}

const values = [
  {
    iconComponent: GraduationIcon,
    eyebrow: '课程标准',
    title: '大学级课程体系',
    description: '知识深度对标大学大二水平，配备正式的项目提案、评分体系与 Git 工作流规范。',
    points: ['正式项目提案与评分体系', '周进度汇报 + 最终展示', 'Git 工作流与代码提交规范'],
    accent: '#ff9a76',
  },
  {
    iconComponent: WrenchIcon,
    eyebrow: '真实项目',
    title: '基于开源硬件改编',
    description: '每个项目都源自社区验证的开源项目，有真实论坛支持和可控的硬件成本。',
    points: ['社区验证的开源项目改编', '硬件选型成本 ≈¥500/套', '标准暑期时间内可完成 MVP'],
    accent: '#c9944a',
  },
  {
    iconComponent: ClipboardIcon,
    eyebrow: '课程体系',
    title: '完整的学习脚手架',
    description: '每日分步任务、完整代码框架与接线指南，每一步都解释「为什么」。',
    points: ['每日分步任务，从基础到进阶', '完整的代码框架与接线指南', '常见错误与调试指南'],
    accent: '#d4845a',
  },
]
</script>
