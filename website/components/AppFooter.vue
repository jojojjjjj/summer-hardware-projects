<template>
  <footer class="relative border-t border-white/[0.06] bg-background noise-overlay">
    <!-- Cool 1px top divider (replaces warm gradient) -->
    <div
      class="absolute top-0 left-0 right-0 h-px opacity-60"
      style="background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.16) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.16) 75%, transparent 100%);"
    />
    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
        <!-- Left: Logo + copyright -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="group inline-block transition-opacity duration-300 hover:opacity-70">
            <img src="/logo.png" alt="Logo" class="h-5 w-auto object-contain opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
          </NuxtLink>
          <span class="text-caption text-text-tertiary/50">© 2026 <span class="text-text-secondary/60">暑期硬件实践课程</span></span>
        </div>

        <!-- Center: Navigation -->
        <nav class="flex items-center gap-6">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="text-caption text-text-tertiary transition-colors duration-300 hover:text-text-primary underline-offset-4 decoration-cool-indigo/30 hover:underline"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Right: External links + back-to-top -->
        <div class="flex items-center gap-4">
          <a
            v-for="ext in externalLinks"
            :key="ext.label"
            :href="ext.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-caption text-text-tertiary/50 transition-colors duration-300 hover:text-text-primary underline-offset-4 decoration-cool-indigo/30 hover:underline"
            :aria-label="ext.label"
          >
            {{ ext.label }}
          </a>
          <span class="text-text-faint/30">|</span>
          <a
            href="#"
            class="group flex items-center gap-1 text-caption text-text-tertiary/50 transition-colors duration-300 hover:text-text-primary"
            @click.prevent="scrollToTop"
          >
            回到顶部
            <svg
              class="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navLinks = [
  { label: '项目', href: '#projects' },
  { label: '学习路径', href: '#learning-path' },
  { label: '关于我们', href: '#value-props' },
]

const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/jojojjjjj/summer-hardware-projects' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
