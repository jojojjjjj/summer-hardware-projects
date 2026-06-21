<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="signup-fade">
        <div
          v-if="open"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="报名链接 · Registration"
          @click.self="emit('close')"
        >
          <div ref="cardRef" class="relative">
            <!-- Image + skeleton share one box (width/height attrs reserve the
                 aspect-ratio up front, so no CLS; skeleton hides on @load). -->
            <div class="relative">
              <div
                v-if="!loaded"
                aria-hidden="true"
                class="signup-skeleton absolute inset-0 rounded-2xl border border-white/10"
              ></div>
              <img
                ref="imgRef"
                src="/media/signup-link.webp"
                srcset="/media/signup-link-672.webp 672w, /media/signup-link.webp 1088w"
                sizes="(max-width: 768px) calc(100vw - 2.5rem), 1344px"
                width="1088"
                height="581"
                alt="报名链接"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                class="w-[calc(100vw-2.5rem)] max-h-[86vh] rounded-2xl border border-white/10 object-contain shadow-2xl md:w-[1344px] md:max-w-[calc(100vw-2rem)]"
                @load="onImgLoad"
                @click.stop
              />
            </div>

            <!-- Close button -->
            <button
              ref="closeBtnRef"
              type="button"
              aria-label="关闭"
              class="absolute right-3 top-3 rounded-full bg-black/40 p-2 max-md:p-3 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              @click="emit('close')"
            >
              <X class="h-5 w-5" aria-hidden="true" />
            </button>

            <!-- Caption -->
            <p class="mt-3 text-center text-xs max-md:text-[13px] text-text-tertiary">
              扫码或长按识别报名 · Scan to register
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{ open: boolean }>(), { open: false })
const emit = defineEmits<{ (e: 'close'): void }>()

const closeBtnRef = ref<HTMLButtonElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
// loaded stays true once the image has decoded (it stays cached afterwards, so
// re-opening is instant and never re-shows the skeleton).
const loaded = ref(false)

let prevOverflow = ''
let keydownHandler: ((e: KeyboardEvent) => void) | null = null

function onImgLoad() {
  loaded.value = true
}

function lockBody() {
  if (typeof document === 'undefined') return
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockBody() {
  if (typeof document === 'undefined') return
  document.body.style.overflow = prevOverflow
  prevOverflow = ''
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      lockBody()
      await nextTick()
      // If the image is already cached (prefetched by CtaSection), mark it
      // loaded before paint so the skeleton never flashes on a warm cache.
      if (imgRef.value?.complete && imgRef.value.naturalWidth > 0) {
        loaded.value = true
      }
      // Focus close button (or card) for a11y; focus itself is not motion,
      // so this is fine under prefers-reduced-motion.
      const target = closeBtnRef.value ?? cardRef.value
      target?.focus({ preventScroll: true })
    } else {
      unlockBody()
    }
  }
)

onMounted(() => {
  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.open) {
      e.preventDefault()
      emit('close')
    }
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', keydownHandler)
  }
})

onUnmounted(() => {
  if (keydownHandler && typeof window !== 'undefined') {
    window.removeEventListener('keydown', keydownHandler)
  }
  // Defensive restore in case open was true at teardown.
  if (typeof document !== 'undefined' && document.body.style.overflow === 'hidden') {
    document.body.style.overflow = prevOverflow
  }
})
</script>

<style scoped>
.signup-fade-enter-active,
.signup-fade-leave-active {
  transition: opacity 200ms ease;
}
.signup-fade-enter-from,
.signup-fade-leave-to {
  opacity: 0;
}
/* Skeleton shown until the signup image decodes. Reduced-motion-safe. */
.signup-skeleton {
  background: rgba(255, 255, 255, 0.06);
  animation: signup-skeleton-pulse 1.4s ease-in-out infinite;
}
@keyframes signup-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}
@media (prefers-reduced-motion: reduce) {
  .signup-skeleton {
    animation: none;
  }
}
</style>
