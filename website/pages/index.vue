<template>
  <main>
    <AppNavbar />
    <HeroSection />

    <!-- 08 · Jack-style flow: Hero → Marquee → About → Services (white flip) →
         Projects (sticky-stack) → CTA. SectionBridge rhythm preserved from 07;
         the white Services → dark Projects transition is the Jack -mt overlap. -->
    <JackMarquee />

    <!-- Bridge · Marquee → About: left-aligned index rule -->
    <SectionBridge variant="overlap-lip" tag="01 — 关于" />

    <JackAbout />

    <!-- Bridge · About → Services: parallax row of the 9 project colours -->
    <SectionBridge variant="dots" />

    <JackServices />

    <!-- Bridge · Services (white) → Projects (dark): white→dark color shift -->
    <SectionBridge variant="color-shift" from="#ffffff" to="#0b0d12" />

    <!-- Projects: reverted to the original horizontal-scroll shelf + difficulty
         filters (JackProjects sticky-stack reverted per user request). -->
    <ProjectsSection />

    <!-- Bridge · Projects → CTA: soft glow merging the two atmospheres -->
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
