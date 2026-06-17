<template>
  <!-- 08 · Jack ContactButton — magenta→orange gradient pill (spec-faithful).
       Used as a single Jack accent on the About section; the rest of the site
       keeps the warm .cta-btn (hybrid identity decision). -->
  <component :is="as" class="jack-contact-btn" :to="to" :href="href">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: string
    to?: string
    href?: string
    label?: string
  }>(),
  { as: 'a', to: undefined, href: undefined, label: 'Contact Me' },
)
</script>

<style scoped>
.jack-contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;
  font-size: 0.75rem;
  line-height: 1;
  background: linear-gradient(123deg, #18011f 7%, #b600a8 37%, #7621b0 72%, #be4c00 100%);
  box-shadow: 0 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721b1;
  outline: 2px solid #fff;
  outline-offset: -3px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.jack-contact-btn:hover {
  transform: translateY(-2px);
}
@media (min-width: 640px) {
  .jack-contact-btn { padding: 0.875rem 2.5rem; font-size: 0.875rem; }
}
@media (min-width: 768px) {
  .jack-contact-btn { padding: 1rem 3rem; font-size: 1rem; }
}
</style>
