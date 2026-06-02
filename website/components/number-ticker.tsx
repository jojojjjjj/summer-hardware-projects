"use client"

/**
 * Number Ticker 数字滚动动画
 *
 * 来源: Magic UI NumberTicker
 * 实现: 自定义 hook + requestAnimationFrame
 * 性能: 使用 transform (GPU 加速)，不触发 layout
 */
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number  // 动画持续时间（毫秒）
  className?: string
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const startValue = 0

    // 使用 requestAnimationFrame 实现平滑计数 — 性能优于 setInterval
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // easeOutExpo 缓动函数 — 开始快，结尾慢
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.floor(startValue + (value - startValue) * eased)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  )
}
