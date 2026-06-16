<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'navbar-blur border-b border-white/[0.08]' : 'bg-transparent'
    ]"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <NuxtLink to="/" class="flex items-center">
        <img
          :src="logoSrc"
          alt="多维国际教育"
          class="h-7 w-auto object-contain"
        />
      </NuxtLink>

      <div class="hidden items-center gap-8 md:flex">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="text-[13px] font-medium text-text-secondary/80 transition-colors duration-200 hover:text-text-primary">
          {{ link.label }}
        </a>
      </div>

      <div class="hidden md:flex">
        <a href="#projects"
          class="rounded-full bg-gradient-warm px-5 py-1.5 text-[13px] font-medium text-white transition-all duration-200 hover:shadow-glow">
          查看项目
        </a>
      </div>

      <button class="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden text-text-secondary"
        @click="mobileOpen = !mobileOpen" :aria-label="mobileOpen ? '关闭' : '菜单'">
        <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </nav>

    <Transition name="mobile-menu">
      <div v-if="mobileOpen"
        class="navbar-blur border-t border-white/[0.08] md:hidden">
        <div class="flex flex-col gap-0.5 px-6 py-4">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="flex min-h-[44px] items-center text-[15px] text-text-secondary hover:text-text-primary"
          @click="mobileOpen = false">
          {{ link.label }}
        </a>
        <a href="#projects"
          class="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-gradient-warm px-4 py-2 text-[15px] font-medium text-white"
          @click="mobileOpen = false">
          查看项目
        </a>
      </div>
    </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const logoSrc = '/logo.png'

const navLinks = [
  { href: '#projects', label: '项目' },
  { href: '#learning-path', label: '学习路径' },
  { href: '#testimonials', label: '学员反馈' },
  { href: '#contact', label: '联系我们' },
]

// Close mobile menu on route change
watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 40
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.mobile-menu-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-leave-active {
  transition: all 0.2s ease-in;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
