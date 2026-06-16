<template>
  <section id="testimonials" class="section-dark py-24 md:py-36 lg:py-44">
    <div class="mx-auto max-w-4xl px-6">
      <div class="mb-20 text-center">
        <p class="eyebrow mb-4">学员反馈</p>
        <h2 class="text-section font-bold tracking-tight text-text-primary">他们的第一次</h2>
      </div>

      <!-- Quote -->
      <div class="text-center">
        <div class="mb-6">
          <span class="text-6xl sm:text-7xl md:text-8xl font-serif leading-none text-gradient-warm">"</span>
        </div>

        <Transition name="testimonial" mode="out-in">
          <blockquote :key="activeIndex" class="text-2xl sm:text-3xl md:text-4xl leading-snug font-semibold text-text-primary tracking-tight">
            {{ testimonials[activeIndex].quote }}
          </blockquote>
        </Transition>

        <Transition name="testimonial" mode="out-in">
          <div :key="'author-' + activeIndex" class="mt-10 flex items-center justify-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-semibold"
              style="background: linear-gradient(135deg, #ff9a7630, #ff6b6b30); color: #ff9a76;">
              {{ testimonials[activeIndex].name[0] }}
            </div>
            <div class="text-[14px]">
              <span class="font-medium text-text-primary">{{ testimonials[activeIndex].name }}</span>
              <span class="text-text-tertiary"> · {{ testimonials[activeIndex].grade }}</span>
              <span class="text-text-tertiary"> · </span>
              <NuxtLink :to="`/projects/${testimonials[activeIndex].slug}`" class="text-warm-peach hover:text-warm-coral transition-colors duration-200">{{ testimonials[activeIndex].project }}</NuxtLink>
            </div>
          </div>
        </Transition>

        <!-- Dots -->
        <div class="mt-10 flex items-center justify-center gap-2">
          <button v-for="(_, i) in testimonials" :key="i"
            @click="setTestimonial(i)"
            :class="[
              'h-2 rounded-full transition-all duration-300',
              activeIndex === i ? 'w-8 bg-warm-peach' : 'w-2 bg-white/[0.15] hover:bg-white/[0.25]'
            ]"
            :aria-label="`查看第 ${i+1} 条评价`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeIndex = ref(0)
let interval: ReturnType<typeof setInterval> | null = null
let userInteracted = false
let resumeTimeout: ReturnType<typeof setTimeout> | null = null

const testimonials = [
  { name: '张同学', grade: '高一', project: '天气魔方', slug: 'weather-cube', quote: '第一次自己焊接电路板，虽然手抖了好几次，但看到 OLED 屏幕亮起来的时候超有成就感。' },
  { name: '王同学', grade: '高一', project: '轮足机器人', slug: 'bipedal-wheeled-robot', quote: 'PID 调参真的会上头，调了两天终于让机器人站起来了。物理课学的控制理论终于派上用场。' },
  { name: '赵同学', grade: '高三', project: 'ElectronBot', slug: 'electronbot', quote: '这个项目让我确定了大学要学电子工程。从 PCB 到 Unity 上位机，真正体验了全栈开发。' },
  { name: '李同学', grade: '高二', project: '四模键盘', slug: '4mode-keyboard', quote: '从画原理图到焊四层板，最后敲出第一个字的时候感觉像变魔术一样。原来键盘后面这么复杂。' },
  { name: '陈同学', grade: '高一', project: '桌宠机器人', slug: 'desktop-pet', quote: '给小机器人接上 AI 大脑之后，它居然能听懂我说话了。室友们都抢着跟它聊天。' },
]

function setTestimonial(index: number) {
  activeIndex.value = index
  userInteracted = true
  if (resumeTimeout) clearTimeout(resumeTimeout)
  resumeTimeout = setTimeout(() => { userInteracted = false }, 8000)
}

onMounted(() => {
  interval = setInterval(() => {
    if (!userInteracted) {
      activeIndex.value = (activeIndex.value + 1) % testimonials.length
    }
  }, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (resumeTimeout) clearTimeout(resumeTimeout)
})
</script>

<style scoped>
.testimonial-enter-active,
.testimonial-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
