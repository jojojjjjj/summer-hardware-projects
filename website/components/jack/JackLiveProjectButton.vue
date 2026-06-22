<template>
  <!-- 08 · Jack LiveProjectButton — ghost pill. On project cards it links to the
       detail page; --accent is tinted to the project's colorHex by the card. -->
  <NuxtLink :to="to" class="jack-live-btn">
    <slot>Live Project</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<style scoped>
.jack-live-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 2px solid var(--accent, #d7e2ea);
  color: var(--accent, #d7e2ea);
  padding: 0.75rem 2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  line-height: 1;
  transition: background 0.3s ease, transform 0.3s ease;
}
@media (min-width: 640px) {
  .jack-live-btn { padding: 0.875rem 2.5rem; }
}
.jack-live-btn:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
}
/* color-mix override — Safari 16.2+/Chrome/etc. The static fallback above
   covers Safari 16.0-16.1 (color-mix dropped → no hover fill). Chrome supports
   color-mix → same value → pixel-identical. (Round 18 Safari completeness fix.) */
@supports (color: color-mix(in srgb, red, blue)) {
  .jack-live-btn:hover {
    background: color-mix(in srgb, var(--accent, #d7e2ea) 10%, transparent);
  }
}
</style>
