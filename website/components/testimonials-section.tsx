"use client"

/**
 * 学员评价 Section
 *
 * 去掉了:
 * - Marquee 无限滚动 → 静态网格
 * - 5 星评分
 * - 双语姓名 (张同学 Alex)
 * - Quote 大引号图标
 *
 * 保留:
 * - 真实感引言
 * - 学生信息
 */
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "张同学",
    grade: "高一",
    project: "天气魔方",
    quote: "第一次自己焊接电路板，虽然手抖了好几次，但看到 OLED 屏幕亮起来的时候超有成就感。",
  },
  {
    name: "李同学",
    grade: "高二",
    project: "桌宠机器人",
    quote: "让机器人说话的那一刻，感觉自己在做科幻电影里的东西。AI 对话比我想象中容易实现。",
  },
  {
    name: "王同学",
    grade: "高一",
    project: "轮足机器人",
    quote: "PID 调参真的很上头，调了两天终于让机器人站起来了。物理课学的控制理论终于派上用场。",
  },
  {
    name: "陈同学",
    grade: "高二",
    project: "4 模式键盘",
    quote: "FOC 电机旋钮太酷了！虽然只完成了核心功能，但拿给同学看都以为我买的成品。",
  },
  {
    name: "赵同学",
    grade: "高三",
    project: "ElectronBot",
    quote: "这个项目让我确定了大学要学电子工程。从 PCB 到 Unity 上位机，真正体验了全栈开发。",
  },
  {
    name: "刘同学",
    grade: "高一",
    project: "环境监测站",
    quote: "用 Grafana 画出温度曲线图的时候，感觉自己真的做了一个 IoT 产品。给爸妈看，他们也觉得厉害。",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-16 md:py-24 lg:py-32">
      <div className="section-divider mb-16 md:mb-24" />

      {/* 标题 — 单语 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-responsive-section font-bold tracking-tighter">
          学员反馈
        </h2>
      </motion.div>

      {/* 静态网格 — 替代 Marquee */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-radius-xl border border-border bg-bg-secondary p-5 sm:p-6"
            >
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 text-xs text-text-tertiary">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-primary/15 text-[11px] font-semibold text-accent-primary">
                  {t.name[0]}
                </div>
                <span>{t.name}</span>
                <span className="text-border">·</span>
                <span>{t.grade}</span>
                <span className="text-border">·</span>
                <span>{t.project}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
