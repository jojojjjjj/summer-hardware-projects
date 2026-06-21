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
            <img
              src="/media/signup-link.png"
              alt="报名链接"
              class="w-[94vw] max-h-[86vh] rounded-2xl border border-white/10 object-contain shadow-2xl md:w-[1344px] md:max-w-[calc(100vw-2rem)]"
              @click.stop
            />

            <!-- Close button -->
            <button
              ref="closeBtnRef"
              type="button"
              aria-label="关闭"
              class="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              @click="emit('close')"
            >
              <X class="h-5 w-5" aria-hidden="true" />
            </button>

            <!-- Caption -->
            <p class="mt-3 text-center text-xs text-text-tertiary">
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

let prevOverflow = ''
let keydownHandler: ((e: KeyboardEvent) => void) | null = null

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
</style>
