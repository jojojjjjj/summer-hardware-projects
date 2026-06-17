<template>
  <main>
    <AppNavbar />
    <HeroSection />

    <!-- Bridge 1 · Hero → Value: full-bleed color-shift + hairline (was an identical ScrollDivider) -->
    <SectionBridge variant="color-shift" from="#0b0d12" to="#11141b" />

    <ValueSection />

    <!-- Bridge 2 · Value → Projects: left-aligned index rule (NOT a centered line) -->
    <SectionBridge variant="overlap-lip" tag="02 — Projects" />

    <ProjectsSection />

    <!-- Bridge 3 · Projects → LearningPath: parallax row of the 9 project colours -->
    <SectionBridge variant="dots" />

    <!-- Tight band (≤0.5 screen): the height-rhythm counterpoint to the long LearningPath -->
    <SectionBridge variant="tight" number="15">天，从第一次焊接到最终答辩</SectionBridge>

    <LearningPath />

    <!-- Bridge 4 · LearningPath → CTA: soft full-bleed glow merging the two atmospheres -->
    <SectionBridge variant="glow-merge" />

    <CtaSection />
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: '高中生暑期硬件实践课程 — 9 个真实开源硬件项目',
})
</script>
