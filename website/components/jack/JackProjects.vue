<template>
  <!-- 08 · JackProjects — sticky-stacking project cards. Each card (JackProjectCard)
       self-manages its non-pinning scale ScrollTrigger on its own root; this section
       just lays out the h-[85vh] stick wrappers + the "view all" link. SSG-safe:
       cards render at scale:1 without JS. -->
  <section id="projects" class="jack-projects bg-background relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14">
    <!-- Heading -->
    <h2 class="hero-heading font-black uppercase tracking-tight text-center pt-20 sm:pt-24 md:pt-28 mb-12 md:mb-16" style="font-size: clamp(3rem, 12vw, 160px)">
      项目
    </h2>

    <!-- Sticky-stack wrappers: each card gets an 85vh scroll-stick distance -->
    <div
      v-for="(p, i) in featured"
      :key="p.slug"
      class="h-[85vh] flex items-center justify-center px-4 sm:px-6 md:px-10"
    >
      <JackProjectCard :project="p" :index="i" :total="3" />
    </div>

    <!-- View all link -->
    <NuxtLink to="/projects" class="jack-projects-all">
      查看全部 9 个项目 &rarr;
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/content/projects'

// ── Featured projects: beginner / intermediate / expert ──
const featured = [
  projects.find((p) => p.slug === 'weather-cube')!,
  projects.find((p) => p.slug === 'binocular-thermal-imager')!,
  projects.find((p) => p.slug === 'electronbot')!,
]
</script>

<style scoped>
.jack-projects-all {
  display: block;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 5rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #9aa0ac;
  transition: color 0.3s ease;
}
.jack-projects-all:hover {
  color: #f4f5f7;
}
</style>
