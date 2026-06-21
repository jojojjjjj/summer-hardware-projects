<template>
  <section id="about" class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20">

    <!-- Decorative corner icons -->
    <!-- Top-left: Cpu -->
    <JackFadeIn :tag="'div'" :delay="0.1" :x="-80" :y="0" :duration="0.9" class="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
      <Cpu class="w-[120px] max-sm:w-[80px] sm:w-[160px] md:w-[210px] h-auto opacity-15 text-indigo-400/60" aria-hidden="true" />
    </JackFadeIn>

    <!-- Bottom-left: CircuitBoard -->
    <JackFadeIn :tag="'div'" :delay="0.25" :x="-80" :y="0" :duration="0.9" class="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
      <CircuitBoard class="w-[100px] max-sm:w-[72px] sm:w-[140px] md:w-[180px] h-auto opacity-15 text-indigo-400/60" aria-hidden="true" />
    </JackFadeIn>

    <!-- Top-right: Bot -->
    <JackFadeIn :tag="'div'" :delay="0.15" :x="80" :y="0" :duration="0.9" class="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
      <Bot class="w-[120px] max-sm:w-[80px] sm:w-[160px] md:w-[210px] h-auto opacity-15 text-indigo-400/60" aria-hidden="true" />
    </JackFadeIn>

    <!-- Bottom-right: hand-art accent (V4 direct fusion) — "动手造物" motif.
         Replaces the generic Satellite icon with the real art, framed + tilted. -->
    <JackFadeIn :tag="'div'" :delay="0.3" :x="80" :y="0" :duration="0.9" class="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
      <img src="/media/hand-art.webp" alt="" width="440" height="982" class="w-[130px] max-sm:w-[88px] sm:w-[170px] md:w-[220px] h-auto rotate-3 rounded-2xl border border-white/10 object-cover opacity-30" style="filter: saturate(0.9);" loading="lazy" decoding="async" />
    </JackFadeIn>

    <!-- Heading -->
    <JackFadeIn :tag="'div'" :y="40" :duration="0.9">
      <h2
        class="hero-heading font-black uppercase tracking-tight leading-none text-center"
        style="font-size: clamp(3rem, 12vw, 160px)"
      >
        关于课程
      </h2>
    </JackFadeIn>

    <!-- Animated CN paragraph -->
    <div class="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
      <div class="flex flex-col items-center gap-6">
        <div
          class="text-text-secondary font-medium text-center leading-relaxed max-w-[560px]"
          style="font-size: clamp(1rem, 2vw, 1.35rem)"
        >
          <JackAnimatedText :text="aboutTextCn" tag="p" />
        </div>
        <p class="text-text-tertiary text-center max-w-[560px] text-sm leading-relaxed">
          {{ aboutTextEn }}
        </p>
      </div>

      <!-- Contact button -->
      <JackContactButton as="a" href="#contact" label="联系我们">联系我们</JackContactButton>
    </div>

    <!-- Value-props row (absorbed from ValueSection) -->
    <div class="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
      <JackFadeIn
        v-for="(prop, i) in valueProps"
        :key="i"
        :tag="'div'"
        :delay="0.1 + i * 0.12"
        :y="24"
        :duration="0.7"
      >
        <div
          class="glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:scale-[1.02]"
          :style="{ borderTop: `2px solid ${prop.accent}40` }"
        >
          <span class="text-4xl md:text-5xl font-bold font-mono tracking-tight block mb-2" :style="{ color: prop.accent }">
            {{ prop.value }}
          </span>
          <span class="text-text-primary font-semibold block mb-1">{{ prop.label }}</span>
          <span class="text-text-tertiary text-sm leading-relaxed">{{ prop.desc }}</span>
        </div>
      </JackFadeIn>
    </div>

  </section>
</template>

<script setup lang="ts">
import { Cpu, CircuitBoard, Bot } from 'lucide-vue-next'

const aboutTextCn = '这是一个为高中生设计的暑期硬件实践课程。12–15 天，从第一次焊接到最后一次答辩，亲手打造 9 个真实开源硬件项目。不只是夏令营，是真正的工程训练。'

const aboutTextEn = 'A summer hardware practicum for high school students. In 12–15 days, from your first solder joint to your final defense, you will build 9 real open-source hardware projects hands-on. Not just a summer camp — real engineering training.'

const valueProps = [
  {
    value: '真实',
    label: '开源硬件项目',
    desc: '改编自社区验证的开源项目，能焊、能跑、能改',
    accent: '#9aa3d4',
  },
  {
    value: '严谨',
    label: '大学级工程训练',
    desc: '提案、周报、评分、Git 工作流，一套完整的工程闭环',
    accent: '#6366f1',
  },
  {
    value: '在场',
    label: 'TA 全程辅导',
    desc: '每堂课都有 TA 在现场，焊接、调试、报错随时问',
    accent: '#8b5cf6',
  },
]
</script>
