// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  app: {
    // GitHub Pages 项目页用 /summer-hardware-projects；Cloudflare Pages / 自定义根域名
    // 用 DEPLOY_TARGET=cf 切到根路径。注意：别用官方的 NUXT_APP_BASE_URL——实测在
    // nuxt generate 时它会触发 prerender 把根路由渲染成 "Redirecting..." 空壳（bug）。
    baseURL: process.env.DEPLOY_TARGET === 'cf' ? '/' : (process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : '/'),
    // Page-flow transitions are driven by the native View Transitions API
    // (plugins/view-transitions.client.ts). Disable Vue's <Transition> on
    // <NuxtPage> so the two systems don't double-animate — out-in would also
    // delay the new-page mount and break the shared-element morph.
    pageTransition: false,
    head: {
      htmlAttrs: { lang: 'zh-CN', class: 'dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'description', content: '12-15 天亲手打造热成像仪、机械键盘、轮足机器人等 9 个真实硬件项目。大学级难度，完整课程体系，全部基于开源项目。' },
        { property: 'og:title', content: '高中生暑期硬件实践课程' },
        { property: 'og:description', content: '9 个真实开源硬件项目 · 12-15 天完成 · 大学级难度' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Kanit:wght@400;600;800;900&display=swap' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    prerender: { crawlLinks: true },
  },

  hooks: {
    'nitro:config'(config) {
      config.prerender = config.prerender || {}
      config.prerender.routes = config.prerender.routes || []
      config.prerender.routes.push('/')
      config.prerender.routes.push('/projects')
    },
  },
})
