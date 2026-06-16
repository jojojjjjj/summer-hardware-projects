<template>
  <section id="learning-path" class="section-elevated py-24 md:py-36 lg:py-44">
    <div class="mx-auto max-w-5xl px-6">
      <div class="mb-20 text-center">
        <p class="eyebrow mb-4">学习路径</p>
        <h2 class="text-section font-bold tracking-tight text-text-primary">循序渐进，<br />从焊接到系统</h2>
        <p class="mx-auto mt-5 max-w-lg text-[15px] text-text-secondary">
          5 个难度梯度，每个阶段都对应可完成的项目
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Desktop: Center line -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.08] -translate-x-1/2" />
        <!-- Desktop: Progress line -->
        <div class="hidden md:block absolute left-1/2 top-0 w-px bg-gradient-to-b from-accent-patina via-warm-peach to-warm-coral -translate-x-1/2 transition-all duration-300"
          :style="{ height: scrollProgress + '%' }" />

        <!-- Mobile: Left line -->
        <div class="md:hidden absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />
        <!-- Mobile: Progress line -->
        <div class="md:hidden absolute left-5 top-0 w-px bg-gradient-to-b from-accent-patina via-warm-peach to-warm-coral transition-all duration-300"
          :style="{ height: scrollProgress + '%' }" />

        <!-- Stages -->
        <div v-for="(stage, i) in pathStages" :key="i"
          class="relative mb-12 md:mb-16 last:mb-0">
          <!-- Desktop: Center dot -->
          <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
            <div class="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold font-mono"
              :style="{ backgroundColor: stage.color, color: '#0a0a0b', boxShadow: `0 0 0 4px #111113, 0 0 0 5px ${stage.color}40` }">
              {{ i + 1 }}
            </div>
          </div>

          <!-- Mobile: Left dot -->
          <div class="md:hidden absolute left-5 -translate-x-1/2 top-5 z-10">
            <div class="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold font-mono"
              :style="{ backgroundColor: stage.color, color: '#0a0a0b', boxShadow: `0 0 0 3px #111113, 0 0 0 4px ${stage.color}30` }">
              {{ i + 1 }}
            </div>
          </div>

          <!-- Desktop Card -->
          <div class="hidden md:block md:w-[calc(50%-2.5rem)]"
            :class="i % 2 === 0 ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'">
            <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
              <div class="h-1" :style="{ backgroundColor: stage.color }" />
              <div class="p-5 md:p-6">
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-[13px] font-bold font-mono" :style="{ color: stage.color }">{{ stage.level }}</span>
                  <span class="text-[10px] font-mono text-text-tertiary">{{ stage.days }}</span>
                </div>
                <p class="mb-4 text-[13px] text-text-secondary leading-relaxed">{{ stage.description }}</p>
                <div class="mb-3 space-y-1">
                  <div v-for="p in stage.projects" :key="p" class="text-[12px] font-medium text-text-primary">{{ p }}</div>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span v-for="skill in stage.skills" :key="skill"
                    class="rounded-full px-1.5 py-0.5 text-[11px] font-medium bg-white/[0.06] text-text-secondary">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Card -->
          <div class="md:hidden ml-10">
            <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
              <div class="h-1" :style="{ backgroundColor: stage.color }" />
              <div class="p-4">
                <div class="mb-1 flex items-center justify-between">
                  <span class="text-[12px] font-bold font-mono" :style="{ color: stage.color }">{{ stage.level }}</span>
                  <span class="text-[10px] font-mono text-text-tertiary">{{ stage.days }}</span>
                </div>
                <p class="mb-3 text-[12px] text-text-secondary leading-relaxed">{{ stage.description }}</p>
                <div class="mb-2 space-y-0.5">
                  <div v-for="p in stage.projects" :key="p" class="text-[11px] font-medium text-text-primary">{{ p }}</div>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span v-for="skill in stage.skills" :key="skill"
                    class="rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-white/[0.06] text-text-secondary">
                    {{ skill }}
                  </span>
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
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

function handleScroll() {
  const section = document.getElementById('learning-path')
  if (!section) return
  const rect = section.getBoundingClientRect()
  const sectionTop = -rect.top
  const sectionHeight = rect.height - window.innerHeight
  scrollProgress.value = Math.max(0, Math.min(100, (sectionTop / sectionHeight) * 100))
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const pathStages = [
  { level: '入门', days: 'Day 1–4', color: '#3d8b5e', projects: ['P06 天气魔方'], description: '零基础入门，掌握嵌入式开发基础', skills: ['Arduino IDE', 'C 语言', 'WiFi 联网', 'I2C/SPI'] },
  { level: '基础', days: 'Day 5–8', color: '#5aad7a', projects: ['P02 环境感知监测站'], description: '构建完整 IoT 系统，理解数据流', skills: ['MicroPython', 'MQTT', 'Web 仪表盘', '传感器'] },
  { level: '中等', days: 'Day 9–12', color: '#c9944a', projects: ['P01 热成像仪', 'P05 桌宠机器人'], description: '多模块系统开发，引入 AI 能力', skills: ['ESP-IDF', 'OpenCV', 'LLM API', 'LVGL'] },
  { level: '进阶', days: 'Day 13–16', color: '#d4845a', projects: ['P03 机械键盘', 'P09 卫星气象站'], description: '复杂 PCB 设计，多 MCU 协作', skills: ['FOC 控制', '四层 PCB', 'USB HID', '电源管理'] },
  { level: '高级', days: 'Day 17–20', color: '#e85d3a', projects: ['P04 信号发生器', 'P07 轮足机器人', 'P08 ElectronBot'], description: '全栈项目，从 FPGA 到 Unity 上位机', skills: ['FPGA/Verilog', 'PID', 'Unity/C#', 'OpenPose'] },
]
</script>
