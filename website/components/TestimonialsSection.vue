<template>
  <section id="testimonials" class="relative overflow-hidden bg-background py-28 md:py-40 lg:py-52">
    <!-- Subtle warm-tinted overlay -->
    <div class="pointer-events-none absolute inset-0" style="background: rgba(255,140,90,0.02);" />

    <!-- Decorative warm orbs -->
    <div class="pointer-events-none absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full" style="background: radial-gradient(circle, rgba(255,154,118,0.12) 0%, transparent 70%); filter: blur(60px);" />
    <div class="pointer-events-none absolute -bottom-16 -left-16 w-[250px] h-[250px] rounded-full" style="background: radial-gradient(circle, rgba(255,107,107,0.10) 0%, transparent 70%); filter: blur(60px);" />

    <!-- Warm gradient washes — more subtle -->
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,154,118,0.10) 0%, transparent 70%);" />
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse 50% 40% at 30% 60%, rgba(255,107,107,0.06) 0%, transparent 60%);" />

    <div class="mx-auto max-w-4xl px-6">
      <!-- Header -->
      <div class="mb-16 md:mb-24 text-center">
        <p ref="eyebrowRef" class="eyebrow mb-5 opacity-0 translate-y-6">学员反馈</p>
        <h2 ref="headingRef" class="text-section font-extrabold tracking-tight text-text-primary opacity-0 translate-y-8">
          听听他们怎么说
        </h2>
        <!-- Warm gradient underline below heading -->
        <div class="mx-auto mt-4 h-[2px] w-32 rounded-full" style="background: linear-gradient(90deg, transparent, #ff9a76, #ff6b6b, transparent);" />
      </div>

      <!-- Testimonial content with gradient frame -->
      <div class="relative text-center">
        <!-- PROMINENT gradient frame — thick, warm, clearly visible border -->
        <div class="absolute -inset-6 md:-inset-10 rounded-[2.5rem] pointer-events-none" style="background: linear-gradient(135deg, rgba(255,154,118,0.08), rgba(255,107,107,0.05), transparent 60%); border: 1px solid rgba(255,154,118,0.12); box-shadow: 0 0 30px rgba(255,154,118,0.06);" />
        <!-- Noise texture inside frame -->
        <div class="absolute -inset-6 md:-inset-10 rounded-[2.5rem] pointer-events-none opacity-[0.015]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');" />

        <!-- Decorative quotation mark — PROMINENT with solid colored background circle -->
        <div class="mb-6 md:mb-8 relative flex items-center justify-center">
          <!-- Warm glow behind quotation mark -->
          <div class="absolute flex items-center justify-center pointer-events-none" style="width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, rgba(255,154,118,0.12) 0%, transparent 70%); filter: blur(30px);" />
          <span class="relative inline-block text-8xl sm:text-9xl md:text-[10rem] leading-none select-none" style="background: linear-gradient(135deg, #ff9a76, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; opacity: 0.5;">
            “
          </span>
        </div>

        <!-- Top gradient line -->
        <div class="mx-auto mb-8 h-px w-32 md:w-48" style="background: linear-gradient(90deg, transparent, rgba(255,154,118,0.35), transparent);" />

        <!-- Quote with crossfade — LARGER, italic, text-shadow -->
        <div class="relative min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          <TransitionGroup name="quote-fade">
            <blockquote
              v-for="(t, i) in testimonials"
              v-show="i === activeIndex"
              :key="i"
              class="absolute inset-0 flex items-center justify-center px-4"
            >
              <p class="text-[1.6rem] sm:text-[1.9rem] md:text-[2.75rem] leading-snug font-bold text-text-primary tracking-[-0.02em] max-w-3xl mx-auto text-balance italic" style="text-shadow: 0 2px 12px rgba(0,0,0,0.18), 0 0 60px rgba(255,154,118,0.10), 0 0 120px rgba(255,154,118,0.05);">
                {{ t.quote }}
              </p>
            </blockquote>
          </TransitionGroup>
        </div>

        <!-- Bottom gradient line -->
        <div class="mx-auto mt-8 h-px w-32 md:w-48" style="background: linear-gradient(90deg, transparent, rgba(255,154,118,0.35), transparent);" />

        <!-- Author info with crossfade -->
        <div class="relative mt-10 md:mt-14 min-h-[72px]">
            <TransitionGroup name="quote-fade">
              <div
                v-for="(t, i) in testimonials"
                v-show="i === activeIndex"
                :key="'author-' + i"
                class="absolute inset-0 flex items-center justify-center gap-4"
              >
                <div class="flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold ring-2 ring-offset-2 ring-offset-background" style="background: linear-gradient(135deg, rgba(255,154,118,0.35), rgba(255,107,107,0.35)); color: #ff9a76; --tw-ring-color: rgba(255,154,118,0.55); box-shadow: 0 0 20px rgba(255,154,118,0.25);">
                  {{ t.name[0] }}
                </div>
                <div class="text-left">
                  <span class="text-[16px] font-semibold text-text-primary">{{ t.name }}</span>
                  <div class="text-[13px] text-text-tertiary">{{ t.school }}</div>
                </div>
              </div>
            </TransitionGroup>
          </div>

        <!-- Auto-rotation progress bar -->
        <div class="mt-10 md:mt-14 mx-auto w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-none"
            :style="{
              width: progressPercent + '%',
              background: 'linear-gradient(90deg, #ff9a76, #ff6b6b)',
              boxShadow: '0 0 8px rgba(255,154,118,0.4)',
            }"
          />
        </div>

        <!-- Dot indicators -->
        <div class="mt-6 flex items-center justify-center gap-2.5">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            @click="goTo(i)"
            :class="[
              'h-2.5 rounded-full transition-all duration-500 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-peach/50',
              activeIndex === i ? 'w-12 bg-gradient-warm shadow-[0_0_8px_rgba(255,154,118,0.5)]' : 'w-2.5 h-2.5 bg-white/[0.12] hover:bg-white/[0.2]'
            ]"
            :aria-label="`查看第 ${i + 1} 条反馈`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const eyebrowRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const progressPercent = ref(0)

let autoInterval: ReturnType<typeof setInterval> | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let userInteracted = false
let resumeTimeout: ReturnType<typeof setTimeout> | null = null

const AUTO_ROTATE_MS = 6500
const PROGRESS_STEP_MS = 50

const testimonials = [
  {
    quote: '从未想过高中生也能做出这样的项目。从焊接第一根线到最终展示，每一步都有清晰的指引。',
    name: '张同学',
    school: '深圳实验学校',
  },
  {
    quote: '最难的不是技术，而是学会了如何像工程师一样思考问题。',
    name: '李同学',
    school: '北京四中',
  },
  {
    quote: '这个暑假最大的收获不是做了什么，而是知道自己能做什么。',
    name: '王同学',
    school: '上海中学',
  },
]

function resetProgress() {
  progressPercent.value = 0
}

function goTo(index: number) {
  activeIndex.value = index
  userInteracted = true
  resetProgress()
  if (resumeTimeout) clearTimeout(resumeTimeout)
  resumeTimeout = setTimeout(() => { userInteracted = false }, 8000)
}

onMounted(async () => {
  const gsap = (await import('gsap')).default

  // Animate header
  const headerEls = [eyebrowRef.value, headingRef.value].filter(Boolean) as HTMLElement[]
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

  // Progress bar animation
  progressInterval = setInterval(() => {
    if (!userInteracted) {
      progressPercent.value = Math.min(100, progressPercent.value + (PROGRESS_STEP_MS / AUTO_ROTATE_MS) * 100)
    }
  }, PROGRESS_STEP_MS)

  // Auto-rotate
  autoInterval = setInterval(() => {
    if (!userInteracted) {
      activeIndex.value = (activeIndex.value + 1) % testimonials.length
      resetProgress()
    }
  }, AUTO_ROTATE_MS)
})

onUnmounted(() => {
  if (autoInterval) clearInterval(autoInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (resumeTimeout) clearTimeout(resumeTimeout)
})
</script>

<style scoped>
.quote-fade-enter-active {
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.quote-fade-leave-active {
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.quote-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.quote-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.99);
}
</style>
