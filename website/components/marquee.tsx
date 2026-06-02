"use client"

/**
 * Marquee 无限滚动组件
 *
 * 来源: Magic UI Marquee
 * 实现: CSS animation + translateX — 无 JS 开销
 * 参考: Brilliant.org 学员评价展示 + Framer.com Logo 墙
 */
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  speed?: number  // 动画时长（秒），越小越快
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  speed = 30,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee-container group flex overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 py-4",
          reverse ? "[animation-direction:reverse]" : "",
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        )}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {/* 重复两份内容实现无限滚动 */}
        {children}
        {children}
      </div>
    </div>
  )
}
