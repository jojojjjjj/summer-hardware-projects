// Multi-viewport screenshot tool for the visual-upgrade audit.
// Usage:  node website-audit/screenshot-audit.mjs before   [port]
//         node website-audit/screenshot-audit.mjs after    [port]
// Captures /, /projects, /projects/weather-cube at 375 / 768 / 1440 wide.
import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'

const require = createRequire('D:/coding/Summer_project/website/package.json')
const { chromium } = require('playwright')

const phase = process.argv[2] || 'before'
const port = process.argv[3] || '3000'
const base = `http://localhost:${port}`

const outDir = path.resolve('website-audit', phase === 'after' ? 'after-upgrade' : 'before-upgrade')
fs.mkdirSync(outDir, { recursive: true })

const pages = [
  { name: 'home', url: `${base}/` },
  { name: 'projects', url: `${base}/projects` },
  { name: 'detail', url: `${base}/projects/weather-cube` },
]
const viewports = [
  { label: '375', width: 375, height: 760 },
  { label: '768', width: 768, height: 1000 },
  { label: '1440', width: 1440, height: 900 },
]

// Horizontal-overflow check at mobile width.
async function checkOverflow(page) {
  return page.evaluate(() => {
    const docW = document.documentElement.clientWidth
    return Math.max(0, ...Array.from(document.querySelectorAll('*')).map(el => {
      const r = el.getBoundingClientRect()
      return Math.ceil(r.right)
    })) - docW
  })
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: 'reduce' })
const results = []

for (const p of pages) {
  for (const v of viewports) {
    const page = await ctx.newPage()
    await page.setViewportSize({ width: v.width, height: v.height })
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 60000 })
    // Let hero timeline + fonts settle
    await page.waitForTimeout(2500)
    // Scroll through the page to fire IntersectionObserver / GSAP reveals
    const prev = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y <= prev; y += Math.max(200, Math.floor(v.height * 0.8))) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(120)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)
    const file = path.join(outDir, `${p.name}-${v.label}.png`)
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled' })
    let overflow = 0
    if (v.label === '375') overflow = await checkOverflow(page)
    results.push({ page: p.name, w: v.label, file, overflow })
    await page.close()
    console.log(`  ✓ ${p.name} @ ${v.label}${overflow ? `  ⚠ overflow +${overflow}px` : ''}`)
  }
}
await browser.close()
const summaryPath = path.join(outDir, 'screenshots.json')
fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2))
console.log(`\nDone — ${results.length} screenshots in ${outDir}`)
if (results.some(r => r.overflow > 0)) {
  console.log('Horizontal overflow detected at 375px:')
  results.filter(r => r.overflow > 0).forEach(r => console.log(`  ${r.page}: +${r.overflow}px`))
}
