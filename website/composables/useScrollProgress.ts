import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const progress = ref(0)

  function handleScroll() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? scrollTop / docHeight : 0
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { progress }
}
