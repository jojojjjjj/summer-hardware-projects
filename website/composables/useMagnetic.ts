import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseMagneticOptions {
  /** Pull strength (0-1). Default 0.3 */
  strength?: number
  /** Activation radius in px from element center. Default 200 */
  radius?: number
  /** Scale applied on hover. Default 1.08 */
  hoverScale?: number
  /** Spring stiffness for return animation. Default 0.15 */
  springStiffness?: number
  /** Spring damping. Default 0.25 */
  springDamping?: number
}

interface Vec2 {
  x: number
  y: number
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const {
    strength = 0.3,
    radius = 200,
    hoverScale = 1.08,
    springStiffness = 0.15,
    springDamping = 0.25,
  } = options

  const elementRef: Ref<HTMLElement | null> = ref(null)
  const position = ref<Vec2>({ x: 0, y: 0 })
  const scale = ref(1)
  const isHovering = ref(false)

  // Internal spring state
  let currentX = 0
  let currentY = 0
  let currentScale = 1
  let velocityX = 0
  let velocityY = 0
  let velocityScale = 0

  let targetX = 0
  let targetY = 0
  let targetScale = 1
  let rafId: number | null = null

  function springTick(): void {
    // Spring physics: F = -k * displacement - d * velocity
    const forceX = (targetX - currentX) * springStiffness - velocityX * springDamping
    const forceY = (targetY - currentY) * springStiffness - velocityY * springDamping
    const forceScale = (targetScale - currentScale) * springStiffness - velocityScale * springDamping

    velocityX += forceX
    velocityY += forceY
    velocityScale += forceScale

    currentX += velocityX
    currentY += velocityY
    currentScale += velocityScale

    position.value = { x: currentX, y: currentY }
    scale.value = currentScale

    // Continue animation while still moving
    const totalMovement = Math.abs(velocityX) + Math.abs(velocityY) + Math.abs(velocityScale)
    const distanceFromTarget = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) + Math.abs(targetScale - currentScale)

    if (totalMovement > 0.01 || distanceFromTarget > 0.01) {
      rafId = requestAnimationFrame(springTick)
    } else {
      // Snap to final values
      currentX = targetX
      currentY = targetY
      currentScale = targetScale
      velocityX = 0
      velocityY = 0
      velocityScale = 0
      position.value = { x: currentX, y: currentY }
      scale.value = currentScale
      rafId = null
    }
  }

  function startAnimation(): void {
    if (rafId === null) {
      rafId = requestAnimationFrame(springTick)
    }
  }

  function handleMouseMove(e: MouseEvent): void {
    const el = elementRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist <= radius) {
      // Ease based on distance within radius
      const ease = 1 - dist / radius
      targetX = dx * strength * ease
      targetY = dy * strength * ease
      targetScale = hoverScale
      isHovering.value = true
    } else {
      targetX = 0
      targetY = 0
      targetScale = 1
      isHovering.value = false
    }

    startAnimation()
  }

  function handleMouseLeave(): void {
    targetX = 0
    targetY = 0
    targetScale = 1
    isHovering.value = false
    startAnimation()
  }

  onMounted(() => {
    const el = elementRef.value
    if (!el) return

    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    const el = elementRef.value
    if (el) {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return {
    elementRef,
    position,
    scale,
    isHovering,
  }
}