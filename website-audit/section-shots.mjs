// Per-section viewport screenshots for thorough visual verification.
// Captures each landing section (scrolled-to, in-view states activated) at 1440 + 375.
import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'

const require = createRequire('D:/coding/Summer_project/website/package.json')
const { chromium } = require('playwright')

const base = 'http://localhost:3000'
const outDir = path.resolve('website-audit', 'sections')
fs.mkdirSync(outDir, { recursive: true })

// [label, url, [scrollTarget, ...captures-within]]
// Each capture: { name, scrollY } — viewport screenshot at that scroll position
const jobs = [
  {
    page: 'home', url: `${base}/`,
    captures: [
      { name: 'hero', sel: null, offset: 0 },          // top
      { name: 'value-intro', sel: '#value-props', offset: 0 },
      { name: 'value-feature', sel: '#value-props', offset: 900 },
      { name: 'projects', sel: '#projects', offset: 0 },
      { name: 'learning-path', sel: '#learning-path', offset: 0 },
      { name: 'learning-steps', sel: '#learning-path', offset: 700 },
      { name: 'testimonials', sel: '#testimonials', offset: 0 },
      { name: 'contact', sel: '#contact', offset: 0 },
    ],
  },
  {
    page: 'projects', url: `${base}/projects`,
    captures: [{ name: 'grid', sel: null, offset: 0 }],
  },
  {
    page: 'detail', url: `${base}/projects/weather-cube`,
    captures: [
      { name: 'hero', sel: null, offset: 0 },
      { name: 'skills', sel: null, offset: 700 },
    ],
  },
]

const viewports = [
  { label: '1440', width: 1440, height: 900 },
  { label: '375', width: 375, height: 760 },
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: 'no-preference' })

for (const v of viewports) {
  for (const job of jobs) {
    const page = await ctx.newPage()
    await page.setViewportSize({ width: v.width, height: v.height })
    await page.goto(job.url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(2500)
    // Full scroll-through to activate all in-view / IntersectionObserver / scroll-driven states
    const docH = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y <= docH; y += Math.max(250, Math.floor(v.height * 0.75))) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(140)
    }
    await page.waitForTimeout(400)
    // Capture each target
    for (const cap of job.captures) {
      if (cap.sel) {
        await page.evaluate((sel) => { const el = document.querySelector(sel); if (el) el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }, cap.sel)
      } else {
        await page.evaluate(() => window.scrollTo(0, 0))
      }
      if (cap.offset) await page.evaluate((o) => window.scrollBy(0, o), cap.offset)
      await page.waitForTimeout(700)
      const file = path.join(outDir, `${job.page}-${cap.name}-${v.label}.png`)
      await page.screenshot({ path: file, fullPage: false, animations: 'disabled' })
      console.log(`  ✓ ${job.page}/${cap.name} @ ${v.label}`)
    }
    await page.close()
  }
}
await browser.close()
console.log(`\nDone — sections in ${outDir}`)
