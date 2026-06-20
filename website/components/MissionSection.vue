<template>
  <!-- V9 · MissionSection — the "from code to hardware" beat, upgraded.
       Background: a dynamic black-hole video (code spiralling into a glowing
       singularity) replaces the static blackhole-code.jpg — `MediaSlot` bg-autoplay
       lazy-plays it on desktop (IO gate) and falls back to the poster on touch /
       reduced-motion. A left-biased dimming overlay keeps the left-column copy
       readable over the accretion disk. Right column: a gear-tower video carries
       the "→ hardware" half of the metaphor (the bg carries the "code →" half).
       Mission copy is the provided 4-line poem + dash coda, revealed line-by-line
       — CN reuses JackAnimatedText's per-char scroll reveal, EN reuses WordsPullUp's
       per-word pull-up — with the closing line set weaker (smaller / dimmer / indented). -->
  <section id="mission" class="relative overflow-hidden bg-background py-28 md:py-36">
    <MediaSlot
      class="absolute inset-0"
      mode="bg-autoplay"
      poster="/media/blackhole-code.jpg"
      src="/media/blackhole-code-bg.mp4"
      overlay-class="bg-gradient-to-r from-background/90 via-background/78 to-background/62"
    />

    <div class="relative z-10 mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <!-- Left: mission copy -->
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6">使命 · MISSION</p>
          <h2 class="text-section font-semibold tracking-tight text-text-primary mb-8">
            <WordsPullUp text="从代码到硬件" />
          </h2>

          <!-- CN poem: per-line char scroll-reveal (reuses JackAnimatedText).
               Each array entry is its own line; the closing dash line is weaker. -->
          <div class="flex max-w-xl flex-col gap-1.5 text-body-lg leading-relaxed text-text-secondary">
            <JackAnimatedText
              v-for="(line, i) in missionCnLines"
              :key="`cn-${i}`"
              :text="line"
              tag="p"
              :class="i === missionCnLines.length - 1 ? 'mt-2 pl-4 text-base italic text-text-tertiary' : ''"
            />
          </div>

          <!-- EN poem: per-line word pull-up (reuses WordsPullUp), line-corresponding
               to the CN; closing dash line weaker. -->
          <div class="mt-6 flex max-w-xl flex-col gap-1 text-sm leading-relaxed text-text-tertiary">
            <WordsPullUp
              v-for="(line, i) in missionEnLines"
              :key="`en-${i}`"
              :text="line"
              as="p"
              :class="i === missionEnLines.length - 1 ? 'mt-1.5 pl-4 text-xs italic text-text-tertiary/70' : ''"
            />
          </div>
        </div>

        <!-- Right: gear-tower video (desktop only) — the "→ hardware" half of the metaphor -->
        <div class="hidden lg:col-span-5 lg:block">
          <div class="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
            <MediaSlot
              class="absolute inset-0"
              mode="bg-autoplay"
              poster="/media/gears-tower-hd.webp"
              src="/media/gears-tower-card.mp4"
              overlay-class="bg-gradient-to-t from-background/70 via-transparent to-background/20"
            />
            <div class="absolute bottom-0 left-0 right-0 p-5">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">齿轮 · GEARS</p>
              <p class="mt-1 text-sm text-text-secondary">从代码到硬件 · from code to hardware</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Mission poem (CN) — two couplets + a dash coda. Kept as separate array entries so
// each line renders on its own line (preserving the poem's structure, not compressed).
const missionCnLines = [
  '伟大的硬件，萌芽于第一行代码；',
  '真正的成长，始于亲手把想象焊进现实。',
  '锡尖跃动，是电路板上最初的脉搏；',
  '字符点亮，是屏幕深处第一次呼吸。',
  '——从这里，从此刻，从你的双手开始。',
]

// Professional EN translation — line-corresponding to the CN. Preserves the "first"
// motif (first line of code → first pulse → first breath) and the solder-tip / pulse
// / character / breath parallelism; em-dash coda mirrors the CN's ——.
const missionEnLines = [
  'Great hardware sprouts from the first line of code;',
  'true growth begins when you solder imagination into reality.',
  'The dancing solder tip — the first pulse along the circuit board;',
  'A character alight — the first breath from deep within the screen.',
  '— From here, from this moment, from your own two hands, it begins.',
]
</script>
