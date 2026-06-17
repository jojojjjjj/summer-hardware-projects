<template>
  <section id="testimonials" class="relative overflow-hidden bg-background py-28 md:py-40 lg:py-52">
    <div class="mx-auto max-w-4xl px-6">
      <!-- Header (left-aligned, not centered) -->
      <div class="mb-16 md:mb-24">
        <h2 ref="headingRef" class="text-section font-semibold tracking-tight text-text-primary opacity-0 translate-y-8">
          听听他们怎么说
        </h2>
      </div>

      <!-- Testimonial content — glass float card, left-aligned -->
      <div ref="cardRef" class="relative rounded-[2rem] glass-card p-8 md:p-14 overflow-hidden">
        <!-- Cool top accent line -->
        <div class="absolute inset-x-0 top-0 h-px" style="background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);" />

        <div class="relative min-h-[160px] md:min-h-[200px] flex items-center">
          <TransitionGroup name="quote-fade">
            <blockquote
              v-for="(t, i) in testimonials"
              v-show="i === activeIndex"
              :key="i"
              class="absolute inset-0 flex items-center"
            >
              <p class="text-[1.4rem] sm:text-[1.7rem] md:text-[2.2rem] leading-snug font-semibold text-text-primary tracking-[-0.02em] max-w-3xl text-balance">
                {{ t.quote }}
              </p>
            </blockquote>
          </TransitionGroup>
        </div>

        <!-- Author info -->
        <div class="relative mt-8 md:mt-12 min-h-[56px]">
          <TransitionGroup name="quote-fade">
            <div
              v-for="(t, i) in testimonials"
              v-show="i === activeIndex"
              :key="'author-' + i"
              class="absolute inset-0 flex items-center gap-4"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-full text-[16px] font-bold" style="background: rgba(99,102,241,0.16); color: #a5aceb;">
                {{ t.name[0] }}
              </div>
              <div>
                <span class="text-[15px] font-semibold text-text-primary">{{ t.name }}</span>
                <div class="text-[13px] text-text-tertiary">{{ t.school }}</div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Dot indicators (manual navigation only — no autoplay) -->
        <div class="mt-5 flex items-center gap-2.5">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            @click="goTo(i)"
            :class="[
              'h-2 rounded-full transition-all duration-500 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-cool-indigo/50',
              activeIndex === i ? 'w-8 bg-cool-indigo' : 'w-2 bg-white/[0.14] hover:bg-white/[0.24]'
            ]"
            :style="activeIndex === i ? { boxShadow: '0 0 12px rgba(99,102,241,0.5)' } : {}"
            :aria-label="`查看第 ${i + 1} 条反馈`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const headingRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

const reduce = useReducedMotion()

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

function goTo(index: number) {
  activeIndex.value = index
}

onMounted(async () => {
  const gsap = (await import('gsap')).default

  // Animate header
  const headerEls = [headingRef.value].filter(Boolean) as HTMLElement[]
  if (headerEls.length) {
    if (reduce.value) {
      gsap.set(headerEls, { opacity: 1, y: 0 })
    } else {
      gsap.to(headerEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', delay: 0.1 })
    }
  }
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
