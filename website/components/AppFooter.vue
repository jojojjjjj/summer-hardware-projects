<template>
  <footer class="border-t border-white/[0.08] bg-background">
    <div class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div class="grid gap-10 md:grid-cols-4">
        <div class="md:col-span-1">
          <NuxtLink to="/" class="inline-block">
            <img src="/logo.png" alt="Logo" class="h-6 w-auto object-contain opacity-70" />
          </NuxtLink>
          <p class="mt-4 text-[13px] text-text-tertiary leading-relaxed">
            面向高中生的暑期硬件实践课程，9 个真实开源硬件项目。
          </p>
          <div class="mt-5 flex gap-2">
            <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank" rel="noopener noreferrer"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-text-tertiary transition-all duration-200 hover:bg-white/[0.08] hover:text-text-secondary"
              :aria-label="social.label">
              <component :is="social.icon" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div v-for="section in footerSections" :key="section.title">
          <h4 class="mb-3 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">{{ section.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.label">
              <a :href="link.href" class="text-[13px] text-text-tertiary transition-colors duration-200 hover:text-text-secondary">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 border-t border-white/[0.08] pt-6">
        <div class="flex flex-col items-center justify-between gap-3 text-[11px] text-text-tertiary/60 md:flex-row">
          <p>© 2026 硬件夏令营</p>
          <p>本项目基于多个开源项目改编，遵循各自的开源协议</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { h } from 'vue'

// Proper SVG icon components instead of v-html with encoded entities
const GithubIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4' }),
    h('path', { d: 'M9 18c-4.51 2-5-2-7-2' }),
  ]),
}

const BilibiliIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('polygon', { points: '2 4 6 4 8 2 10 4 14 4 16 2 18 4 22 4 22 18 2 18' }),
    h('circle', { cx: '9', cy: '10', r: '1' }),
    h('circle', { cx: '15', cy: '10', r: '1' }),
  ]),
}

const WechatIcon = {
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }),
  ]),
}

const footerSections = [
  { title: '项目', links: [{ label: '全部项目', href: '/projects' }, { label: '学习路径', href: '#learning-path' }, { label: '学员反馈', href: '#testimonials' }] },
  { title: '资源', links: [{ label: 'GitHub 仓库', href: 'https://github.com/jojojjjjj/summer-hardware-projects' }, { label: 'B站教程', href: 'https://bilibili.com' }, { label: 'OSHWhub 开源', href: 'https://oshwhub.com' }] },
  { title: '关于', links: [{ label: '课程设计理念', href: '#value-props' }, { label: '联系我们', href: '#contact' }] },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/jojojjjjj/summer-hardware-projects', icon: GithubIcon },
  { label: 'Bilibili', href: 'https://bilibili.com', icon: BilibiliIcon },
  { label: '微信', href: '#', icon: WechatIcon },
]
</script>
