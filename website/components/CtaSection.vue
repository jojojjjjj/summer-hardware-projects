<template>
  <section id="contact" class="section-elevated py-24 md:py-36 lg:py-44">
    <div class="mx-auto max-w-4xl px-6">
      <div class="relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-8 py-20 text-center sm:px-12 md:py-28">
        <!-- Top glow -->
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm-peach/30 to-transparent" />

        <p class="eyebrow mb-5">开始</p>
        <h2 class="text-section font-bold tracking-tight text-text-primary">准备好开始了吗？</h2>
        <p class="mx-auto mt-5 max-w-lg text-[15px] sm:text-base text-text-secondary leading-relaxed">
          从焊接第一块 PCB 到调试完整的机器人系统，10–20 天，你将完成一次从零到一的硬件开发之旅。
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="mailto:hello@summer-hardware.dev"
            class="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-warm px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-glow-strong">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            联系我们
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href="#projects" class="text-[15px] font-medium text-text-secondary transition-colors duration-200 hover:text-warm-peach">
            查看项目
          </a>
        </div>
      </div>
    </div>
  </section>
</template>