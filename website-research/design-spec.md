# 网站设计方案 | Website Design Specification

> 基于调研报告的综合设计方案
> 日期：2026-06-01

---

## 一、设计概览

### 网站定位
一个面向高中生（及家长/教师）的暑期硬件项目课程宣传网站，采用科技极简风格（Apple + Linear启发），强调项目成果展示和学习价值传达。

### 核心设计原则
1. **信息传递优先** — 高中生和家长需要快速理解"这是什么、能学到什么、多少钱"
2. **视觉冲击力** — 高质量项目图片/视频，第一时间激发兴趣
3. **信任建立** — 开源项目背书、学校合作、学员评价
4. **行动引导** — 清晰的CTA路径：浏览项目 → 了解详情 → 联系报名

---

## 二、视觉系统

### 2.1 色彩系统

```css
:root {
  /* 基础色 */
  --bg-primary: #09090b;        /* 页面背景 */
  --bg-secondary: #111113;      /* 卡片/面板背景 */
  --bg-tertiary: #18181b;       /* 次级背景 */
  --border: #27272a;            /* 边框 */
  --border-hover: #3f3f46;      /* 边框hover */

  /* 文字色 */
  --text-primary: #fafafa;      /* 主文字 */
  --text-secondary: #a1a1aa;    /* 次要文字 */
  --text-tertiary: #71717a;     /* 辅助文字 */

  /* 强调色 */
  --accent-primary: #6366f1;    /* 靛蓝紫（主CTA） */
  --accent-secondary: #06b6d4;  /* 青色（硬件/电路感） */
  --accent-gradient: linear-gradient(135deg, #6366f1, #06b6d4);

  /* 语义色 */
  --success: #22c55e;           /* 完成/入门级 */
  --warning: #f59e0b;           /* 中等难度 */
  --danger: #ef4444;            /* 高级难度 */

  /* 项目特色色（每个项目一个主色） */
  --project-01: #f97316;        /* 热成像 - 橙色 */
  --project-02: #22c55e;        /* 环境监测 - 绿色 */
  --project-03: #8b5cf6;        /* 机械键盘 - 紫色 */
  --project-04: #ec4899;        /* 信号发生器 - 粉色 */
  --project-05: #f59e0b;        /* 桌宠机器人 - 琥珀色 */
  --project-06: #06b6d4;        /* 天气魔方 - 青色 */
  --project-07: #ef4444;        /* 轮足机器人 - 红色 */
  --project-08: #a855f7;        /* ElectronBot - 深紫 */
  --project-09: #3b82f6;        /* 桌面卫星 - 蓝色 */
}
```

### 2.2 字体系统

```css
:root {
  --font-sans: "Inter Variable", "Noto Sans SC", "PingFang SC", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
  --font-display: "Inter Variable", sans-serif;  /* 大标题 */
}

/* 字号层级 */
--text-xs: 0.75rem;     /* 12px - 标签 */
--text-sm: 0.875rem;    /* 14px - 辅助文字 */
--text-base: 1rem;      /* 16px - 正文 */
--text-lg: 1.125rem;    /* 18px - 大正文 */
--text-xl: 1.25rem;     /* 20px - 小标题 */
--text-2xl: 1.5rem;     /* 24px - section标题 */
--text-3xl: 1.875rem;   /* 30px - 大section标题 */
--text-4xl: 2.25rem;    /* 36px - 页面标题 */
--text-5xl: 3rem;       /* 48px - Hero副标题 */
--text-6xl: 3.75rem;    /* 60px - Hero主标题 */
--text-7xl: 4.5rem;     /* 72px - 超大数字 */
--text-8xl: 6rem;       /* 96px - 关键数字 */

/* 字重 */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### 2.3 间距系统

```
基于8px网格：
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px — section间距 */
```

### 2.4 圆角/阴影

```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* 胶囊形 */

/* 卡片阴影 */
--shadow-card: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
--shadow-card-hover: 0 10px 40px rgba(0,0,0,0.4);
--shadow-glow: 0 0 40px rgba(99,102,241,0.15);
```

---

## 三、页面详细设计

### 3.1 Hero Section

```
┌─────────────────────────────────────────────────────┐
│                    [渐变背景动画]                      │
│                （粒子/电路图案/渐变流动）                │
│                                                       │
│           🎓 高中生暑期硬件实践课程                      │
│     High School Summer Hardware Practicum             │
│                                                       │
│     ┌─── 超大标题 ───────────────────────┐           │
│     │  从零开始，亲手打造                  │           │
│     │  9 个真实硬件项目                    │           │
│     └──────────────────────────────────┘           │
│                                                       │
│     10-20天 | 大学级难度 | 全部开源 | ≤¥500/套        │
│                                                       │
│     [🚀 探索项目]    [📖 了解更多]                      │
│                                                       │
│     ┌────┐ ┌────┐ ┌────┐                             │
│     │ 9  │ │ 20 │ │¥500│                             │
│     │项目│ │ 天 │ │/套 │                             │
│     └────┘ └────┘ └────┘                             │
│          ↓ 滚动探索更多 ↓                              │
└─────────────────────────────────────────────────────┘
```

**技术实现**：
- 背景：CSS渐变动画 或 轻量Canvas粒子（参考Stripe的WebGL渐变简化版）
- 标题：Framer Motion的TextGenerateEffect
- 数字：Magic UI的NumberTicker
- 布局：flex居中，max-width: 800px

### 3.2 价值主张 Section

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│           为什么选择我们的课程？                         │
│           Why Choose Our Program?                     │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ 🎓       │ │ 🔧       │ │ 📋       │             │
│  │ 大学标准  │ │ 真实项目  │ │ 完整体系  │             │
│  │          │ │          │ │          │             │
│  │ 知识难度  │ │ 基于社区  │ │ 每日任务  │             │
│  │ 达大二水平│ │ 验证的开源│ │ 代码框架  │             │
│  │ 评分标准  │ │ 项目改编  │ │ 调试指南  │             │
│  └──────────┘ └──────────┘ └──────────┘             │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 3.3 项目展示 Section（核心）

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│           🔍 探索9个硬件项目                           │
│                                                       │
│  [全部] [⭐入门] [⭐⭐基础] [⭐⭐⭐中等] [⭐⭐⭐⭐进阶]    │
│                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ [项目图] │ │ [项目图] │ │ [项目图] │               │
│  │          │ │          │ │          │               │
│  │ P01      │ │ P02      │ │ P03      │               │
│  │ 双目热   │ │ 环境感知  │ │ 4模式    │               │
│  │ 成像仪   │ │ 监测站   │ │ 机械键盘  │               │
│  │          │ │          │ │          │               │
│  │ ⭐⭐⭐    │ │ ⭐⭐      │ │ ⭐⭐⭐⭐   │               │
│  │ 15天     │ │ 12天     │ │ 20天     │               │
│  │ ~¥300    │ │ ~¥200    │ │ ~¥500    │               │
│  │          │ │          │ │          │               │
│  │ STM32    │ │ ESP32    │ │ ESP32    │               │
│  │ OpenCV   │ │ MQTT     │ │ FOC      │               │
│  │ [查看→]  │ │ [查看→]  │ │ [查看→]  │               │
│  └─────────┘ └─────────┘ └─────────┘               │
│                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ P04      │ │ P05      │ │ P06      │               │
│  │ 口袋信号 │ │ 桌宠机器  │ │ 天气魔方  │               │
│  │ 发生器   │ │ 人       │ │          │               │
│  │ ⭐⭐⭐⭐⭐ │ │ ⭐⭐⭐    │ │ ⭐        │               │
│  │ ...      │ │ ...      │ │ ...      │               │
│  └─────────┘ └─────────┘ └─────────┘               │
│                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ P07      │ │ P08      │ │ P09      │               │
│  │ 轮足机器 │ │ Electron │ │ 桌面卫星  │               │
│  │ 人       │ │ Bot      │ │ 气象站    │               │
│  │ ⭐⭐⭐⭐⭐ │ │ ⭐⭐⭐⭐⭐ │ │ ⭐⭐⭐⭐   │               │
│  │ ...      │ │ ...      │ │ ...      │               │
│  └─────────┘ └─────────┘ └─────────┘               │
│                                                       │
└─────────────────────────────────────────────────────┘
```

**项目卡片设计规格**：
- 宽度：responsive grid（桌面3列，平板2列，手机1列）
- 高度：auto（图片区固定比例 + 内容区自适应）
- 图片：aspect-ratio: 16/10，项目渲染图或实物照片
- Hover：border-glow + 微微上移(translateY(-4px)) + 阴影加深
- 圆角：radius-xl (16px)
- 边框：1px solid var(--border)

### 3.4 项目详情页

```
┌─────────────────────────────────────────────────────┐
│  ← 返回项目列表                                       │
│                                                       │
│  ┌───────────────────────────────────────┐           │
│  │         [项目大图/视频]                 │           │
│  │          全宽 Hero                     │           │
│  └───────────────────────────────────────┘           │
│                                                       │
│  P03 · 4模式机械键盘 "幻想键盘"                        │
│  ⭐⭐⭐⭐ 进阶 | 20天 | ~¥500                         │
│                                                       │
│  ┌── 项目参数卡片 ──────────────────────┐            │
│  │ 主控    │ ESP32-S3                    │            │
│  │ 通信    │ USB HID / BLE / 2.4GHz      │            │
│  │ 特色    │ FOC电机旋钮 + 语音交互       │            │
│  │ PCB数   │ 12块                        │            │
│  │ 难度    │ ⭐⭐⭐⭐ 进阶                │            │
│  └───────────────────────────────────────┘            │
│                                                       │
│  ── 你能学到什么 ──────────────────────               │
│                                                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │
│  │硬件  │ │软件  │ │系统  │ │工程  │               │
│  │      │ │      │ │      │ │      │               │
│  │SPI   │ │C/C++ │ │FOC   │ │PCB   │               │
│  │PCB   │ │ESP   │ │电机  │ │焊接  │               │
│  │焊接  │ │IDF   │ │控制  │ │调试  │               │
│  └──────┘ └──────┘ └──────┘ └──────┘               │
│                                                       │
│  ── 课程时间线 ──────────────────────                 │
│                                                       │
│  Day 1-3  ●━━━━━━━━○  电子学基础 + 焊接练习           │
│  Day 4-6  ●━━━━━━━━○  子系统原型验证                  │
│  Day 7-10 ●━━━━━━━━○  PCB设计与固件开发               │
│  Day 11-15●━━━━━━━━○  组装调试与功能完善              │
│  Day 16-20●━━━━━━━━○  最终测试 + 展示准备             │
│                                                       │
│  ── 最终成果 ──────────────────────                   │
│  [成果照片/视频画廊]                                   │
│                                                       │
│  ── 开源信息 ──────────────────────                   │
│  [GitHub仓库] [B站视频] [OSHWhub]                     │
│                                                       │
│  [🚀 开始学习]  [📧 联系咨询]                          │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## 四、动效规格

### 4.1 动效清单

| 区域 | 动效 | 触发方式 | 库 | 持续时间 |
|------|------|---------|-----|---------|
| Hero背景 | 渐变流动 | 页面加载 | CSS Animation | infinite |
| Hero标题 | 逐字出现 | 页面加载 | Framer Motion | 1.5s |
| Hero数字 | 数字滚动 | 页面加载 | Magic UI NumberTicker | 2s |
| 价值卡片 | Fade-up | 滚动进入视口 | Framer Motion | 0.6s |
| 项目卡片 | Fade-up + stagger | 滚动进入视口 | Framer Motion | 0.4s × 9 |
| 项目卡片Hover | Border glow + 上移 | 鼠标悬停 | CSS transition | 0.3s |
| 筛选器 | 内容切换动画 | 点击 | Framer Motion layout | 0.4s |
| 时间线 | 进度条展开 | 滚动进入视口 | Framer Motion | 1s |
| Logo墙 | 无限滚动 | 自动 | CSS Animation | infinite |
| 导航栏 | 背景模糊+浮动 | 滚动超过100px | CSS transition | 0.3s |

### 4.2 性能预算

- Framer Motion bundle: ~30KB gzipped
- 自定义动画代码: ~5KB gzipped
- 总JS动画成本: ~35KB gzipped
- **不使用** Three.js / WebGL（节省 ~150KB）

---

## 五、响应式断点

```css
/* Mobile First */
--breakpoint-sm: 640px;    /* 大手机/小平板 */
--breakpoint-md: 768px;    /* 平板 */
--breakpoint-lg: 1024px;   /* 小笔记本 */
--breakpoint-xl: 1280px;   /* 标准桌面 */
--breakpoint-2xl: 1536px;  /* 大桌面 */

/* 布局变化 */
/* < 640px: 单列 */
/* 640-1023px: 双列 */
/* >= 1024px: 三列（项目卡片） */
/* >= 1280px: 居中，max-width: 1280px */
```

---

## 六、SEO & 元数据

```html
<!-- 基础Meta -->
<title>高中生暑期硬件实践课程 — 9个真实开源项目</title>
<meta name="description" content="10-20天亲手打造热成像仪、机械键盘、轮足机器人等9个真实硬件项目。大学级难度，完整课程体系，全部基于开源项目。">
<meta name="keywords" content="高中生,暑期课程,硬件项目,开源,ESP32,STM32,嵌入式,IoT,机器人">

<!-- Open Graph -->
<meta property="og:title" content="高中生暑期硬件实践课程">
<meta property="og:description" content="9个真实开源硬件项目 · 10-20天完成 · 大学级难度">
<meta property="og:image" content="/og-image.png">
<meta property="og:type" content="website">

<!-- 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "高中生暑期硬件实践课程",
  "description": "9个真实开源硬件项目，10-20天完成",
  "provider": {
    "@type": "Organization",
    "name": "Summer Hardware Projects"
  }
}
</script>
```

---

## 七、文件结构（Next.js项目）

```
website/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（单页滚动）
│   ├── projects/
│   │   ├── page.tsx        # 项目列表页
│   │   └── [slug]/
│   │       └── page.tsx    # 项目详情页（9个）
│   └── globals.css         # 全局样式
├── components/
│   ├── ui/                 # 基础UI组件（shadcn）
│   ├── hero/               # Hero区域组件
│   ├── projects/           # 项目展示组件
│   ├── learning-path/      # 学习路径组件
│   ├── testimonials/       # 评价组件
│   └── layout/             # 导航/Footer组件
├── lib/
│   ├── projects-data.ts    # 9个项目的数据
│   └── utils.ts            # 工具函数
├── public/
│   ├── images/             # 图片资源
│   └── fonts/              # 字体文件
├── tailwind.config.ts
├── next.config.js
└── package.json
```
