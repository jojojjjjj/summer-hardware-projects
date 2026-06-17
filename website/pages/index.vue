<template>
  <main>
    <AppNavbar />
    <HeroSection />
    <div class="h-16 md:h-24"><ScrollDivider /></div>
    <ValueSection />
    <div class="h-16 md:h-24"><ScrollDivider /></div>
    <ProjectsSection />
    <div class="h-16 md:h-24"><ScrollDivider /></div>
    <LearningPath />
    <div class="h-16 md:h-24"><ScrollDivider /></div>
    <TestimonialsSection />
    <div class="h-16 md:h-24"><ScrollDivider /></div>
    <CtaSection />
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: '高中生暑期硬件实践课程 — 9 个真实开源硬件项目',
})
</script>
