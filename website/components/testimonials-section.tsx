"use client"

/**
 * 学员评价 Section — Marquee 无限滚动
 *
 * 设计参考: Brilliant.org（学员评价展示）+ Framer.com（客户证言轮播）
 * 实现: Marquee CSS animation — 无 JS 开销
 * 来源: design-spec.md 5. 学员评价 Section
 */
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Marquee } from "./marquee"

/** 模拟学员评价数据 */
const testimonials = [
  {
    nameZh: "张同学",
    nameEn: "Alex",
    grade: "高一",
    project: "天气魔方",
    quote:
      "第一次自己焊接电路板，虽然手抖了好几次，但看到 OLED 屏幕亮起来的时候超有成就感！",
  },
  {
    nameZh: "李同学",
    nameEn: "Lisa",
    grade: "高二",
    project: "桌宠机器人",
    quote:
      "让机器人说话的那一刻，感觉自己在做科幻电影里的东西。AI 对话比我想象中容易实现。",
  },
  {
    nameZh: "王同学",
    nameEn: "Tom",
    grade: "高一",
    project: "轮足机器人",
    quote:
      "PID 调参真的很上头，调了两天终于让机器人站起来了。物理课学的控制理论终于派上用场。",
  },
  {
    nameZh: "陈同学",
    nameEn: "Chen",
    grade: "高二",
    project: "4 模式键盘",
    quote:
      "FOC 电机旋钮太酷了！虽然只完成了核心功能，但拿给同学看都以为我买的成品。",
  },
  {
    nameZh: "赵同学",
    nameEn: "Zhao",
    grade: "高三",
    project: "ElectronBot",
    quote:
      "这个项目让我确定了大学要学电子工程。从 PCB 到 Unity 上位机，真正体验了全栈开发。",
  },
  {
    nameZh: "刘同学",
    nameEn: "Liu",
    grade: "高一",
    project: "环境监测站",
    quote:
      "用 Grafana 画出温度曲线图的时候，感觉自己真的做了一个 IoT 产品。给爸妈看，他们也觉得厉害。",
  },
]

/** 单条评价卡片 */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  return (
    <div className="w-[340px] shrink-0 rounded-radius-xl border border-border bg-bg-secondary p-6">
      <Quote size={20} className="mb-3 text-text-tertiary opacity-30" />

      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        {/* 头像占位 — 渐变色块 */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent text-sm font-bold text-white">
          {testimonial.nameZh[0]}
        </div>
        <div>
          <div className="text-sm font-medium">
            {testimonial.nameZh}
            <span className="ml-1 text-text-tertiary">
              {testimonial.nameEn}
            </span>
          </div>
          <div className="text-xs text-text-tertiary">
            {testimonial.grade} · {testimonial.project}
          </div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              className="fill-warning text-warning"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="section-divider mb-24" />

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-responsive-section font-bold tracking-tighter">
          学员怎么说
        </h2>
        <p className="mt-3 text-lg text-text-secondary">
          What Our Students Say
        </p>
      </motion.div>

      {/* Marquee 滚动评价 — 上行 */}
      <Marquee speed={40} pauseOnHover className="mb-6">
        {testimonials.slice(0, 3).map((t) => (
          <TestimonialCard key={t.nameEn} testimonial={t} />
        ))}
      </Marquee>

      {/* Marquee 滚动评价 — 下行（反向） */}
      <Marquee speed={45} reverse pauseOnHover>
        {testimonials.slice(3).map((t) => (
          <TestimonialCard key={t.nameEn} testimonial={t} />
        ))}
      </Marquee>
    </section>
  )
}
