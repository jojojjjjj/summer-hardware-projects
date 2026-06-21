<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'navbar-blur border-b border-white/[0.06]' : 'bg-transparent border-b border-transparent'
    ]"
    style="view-transition-name: site-navbar"
  >
    <!-- Subtle cool divider line when scrolled -->
    <div
      v-if="scrolled"
      class="absolute bottom-0 left-0 right-0 h-px opacity-70"
      style="background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.18) 30%, rgba(99,102,241,0.28) 50%, rgba(99,102,241,0.18) 70%, transparent 100%);"
    />
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80">
        <img src="/logo.webp" alt="Logo" width="826" height="201" loading="eager" decoding="async" class="h-7 w-auto object-contain transition-opacity duration-500 group-hover:opacity-90" />
      </NuxtLink>

      <!-- Center links (desktop) -->
      <div class="hidden items-center gap-9 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link relative text-[13px] font-medium text-text-secondary/70 transition-colors duration-300 hover:text-text-primary underline-offset-4 decoration-cool-indigo/40 hover:underline"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- CTA (desktop) -->
      <div class="hidden md:flex">
        <a
          ref="ctaBtnRef"
          href="#projects"
          class="magnetic-btn cta-btn relative rounded-full px-5 py-1.5 text-[13px] font-semibold text-white"
        >
          查看项目
        </a>
      </div>

      <!-- Hamburger (mobile) -->
      <button
        class="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg md:hidden text-text-secondary transition-transform duration-200 active:scale-90"
        @click="mobileOpen = !mobileOpen"
        :aria-label="mobileOpen ? '关闭' : '菜单'"
      >
        <div class="hamburger-icon" :class="{ open: mobileOpen }">
          <span /><span /><span />
        </div>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="navbar-blur border-t border-white/[0.06] md:hidden overflow-hidden"
      >
        <div class="flex flex-col gap-0.5 px-6 py-4">
          <a
            v-for="(link, i) in navLinks"
            :key="link.href"
            :href="link.href"
            class="mobile-menu-link flex min-h-[44px] items-center text-[15px] text-text-secondary hover:text-text-primary transition-colors"
            :style="{ opacity: 0, transform: 'translateY(8px)' }"
            :data-mobile-index="i"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </a>
          <a
            href="#projects"
            class="mobile-cta-link cta-btn mt-3 flex min-h-[44px] items-center justify-center rounded-full text-[15px] font-semibold text-white"
            style="opacity: 0; transform: translateY(8px);"
            @click="mobileOpen = false"
          >
            查看项目
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)
const ctaBtnRef = ref<HTMLElement | null>(null)
const reduce = useReducedMotion()

const navLinks = [
  { href: '#about', label: '关于' },
  { href: '#services', label: '课程' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' },
]

// ── Scroll detection ──
let ticking = false
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 30
      ticking = false
    })
    ticking = true
  }
}

// ── Magnetic CTA ──
function onCtaMouseMove(e: MouseEvent) {
  if (!ctaBtnRef.value || reduce.value) return
  const rect = ctaBtnRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) * 0.3
  const dy = (e.clientY - cy) * 0.3
  gsap.to(ctaBtnRef.value, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
}

function onCtaMouseLeave() {
  if (!ctaBtnRef.value || reduce.value) return
  gsap.to(ctaBtnRef.value, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
}

// ── Mobile menu animation ──
watch(mobileOpen, async (open) => {
  if (open) {
    await nextTick()
    const links = document.querySelectorAll('.mobile-menu-link')
    const cta = document.querySelector('.mobile-cta-link')
    const els = [...links, cta] as HTMLElement[]
    if (reduce.value) {
      gsap.set(els, { opacity: 1, y: 0 })
      return
    }
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.1,
    })
  }
})

watch(() => route.fullPath, () => { mobileOpen.value = false })

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  ctaBtnRef.value?.addEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.addEventListener('mouseleave', onCtaMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  ctaBtnRef.value?.removeEventListener('mousemove', onCtaMouseMove)
  ctaBtnRef.value?.removeEventListener('mouseleave', onCtaMouseLeave)
})
</script>

<style scoped>
/* Hamburger icon */
.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 20px;
}

.hamburger-icon span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: currentColor;
  border-radius: 1px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.hamburger-icon.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-icon.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* Mobile menu transition */
.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-leave-active {
  transition: all 0.2s ease-in;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
