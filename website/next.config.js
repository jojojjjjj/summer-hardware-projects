/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出 — 用于 GitHub Pages 部署
  output: 'export',

  // GitHub Pages 部署在 /<repo-name>/ 子路径下
  basePath: process.env.NODE_ENV === 'production' ? '/summer-hardware-projects' : '',

  // 静态导出时图片优化不可用，禁用
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
