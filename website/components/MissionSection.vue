<template>
  <!-- V4 · MissionSection — the "from code to hardware" narrative beat. A dimmed
       blackhole-code.jpg backdrop (code streaming into a singularity) sits behind
       a scroll-linked per-character reveal of the mission statement (reuses the
       existing JackAnimatedText — the §5.4 scroll-linked char-reveal effect).
       A gears placeholder MediaSlot on desktop (poster now, future flowing-gears
       video) carries the "code → hardware" metaphor into the right column. -->
  <section id="mission" class="relative overflow-hidden bg-background py-28 md:py-36">
    <MediaSlot
      class="absolute inset-0"
      mode="static"
      poster="/media/blackhole-code.jpg"
      overlay-class="bg-gradient-to-b from-background/80 via-background/65 to-background/90"
    />

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <!-- Left: mission copy -->
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">使命 · MISSION</p>
          <h2 class="text-section font-semibold tracking-tight text-text-primary mb-8">
            <WordsPullUp text="从代码到硬件" />
          </h2>
          <div class="text-body-lg text-text-secondary leading-relaxed max-w-xl">
            <JackAnimatedText :text="missionCn" tag="p" />
          </div>
          <p class="mt-5 max-w-xl text-sm leading-relaxed text-text-tertiary">
            {{ missionEn }}
          </p>
        </div>

        <!-- Right: gears placeholder (desktop only — future flowing-gears video) -->
        <div class="hidden lg:col-span-5 lg:block">
          <div class="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
            <MediaSlot
              class="absolute inset-0"
              mode="bg-autoplay"
              poster="/media/gears-flow.webp"
              src=""
              overlay-class="bg-gradient-to-t from-background/70 via-transparent to-background/20"
            />
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">齿轮 · GEARS</p>
              <p class="mt-1 text-sm text-text-secondary">未来视频占位 · future video slot</p>
            </div>
            <!-- MEDIA-PLACEHOLDER: drop flowing-gears video at /media/gears-flow.mp4, set :src -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const missionCn =
  '每一件伟大的硬件，都始于一行代码。最好的学习，是亲手把想法变成现实——从焊盘上的第一滴锡，到屏幕上亮起的第一行字。'
const missionEn =
  'Every great piece of hardware begins with a line of code. The best learning is making ideas real with your own hands — from the first bead of solder on the pad to the first line lighting up the screen.'
</script>
