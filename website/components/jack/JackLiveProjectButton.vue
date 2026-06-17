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
  background: color-mix(in srgb, var(--accent, #d7e2ea) 10%, transparent);
  transform: translateY(-2px);
}
</style>
