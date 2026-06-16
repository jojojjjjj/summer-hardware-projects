/**
 * 视觉验证脚本 — 使用 Playwright 逐 section 截图
 *
 * 用法: PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="path/to/edge" npx playwright test verify-screenshot.js
 * 或直接用 playwright CLI 运行
 */
const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'http://localhost:8765';
const OUTPUT_DIR = path.join(__dirname, 'verify', 'v1');

async function run() {
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // ========== 首页 ==========
  console.log('📸 验证首页...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // 等待动画完成
  await page.waitForTimeout(2000);

  // 1. Hero section — 全屏
  console.log('  → Hero Section (viewport)');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-hero-viewport.png'),
    fullPage: false
  });

  // 2. Hero section — 滚动到价值主张
  console.log('  → 价值主张 Section');
  await page.evaluate(() => {
    document.querySelector('#value-props')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-value-props.png'),
    fullPage: false
  });

  // 3. 项目展示
  console.log('  → 项目展示 Section');
  await page.evaluate(() => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '03-projects.png'),
    fullPage: false
  });

  // 4. 项目卡片细节 — 筛选栏 + 前3张卡片
  console.log('  → 项目卡片细节');
  await page.evaluate(() => {
    const section = document.querySelector('#projects');
    if (section) {
      const grid = section.querySelector('.grid');
      if (grid) grid.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-project-cards-detail.png'),
    fullPage: false
  });

  // 5. 学习路径
  console.log('  → 学习路径 Section');
  await page.evaluate(() => {
    document.querySelector('#learning-path')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-learning-path.png'),
    fullPage: false
  });

  // 6. 学员反馈
  console.log('  → 学员反馈 Section');
  await page.evaluate(() => {
    document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06-testimonials.png'),
    fullPage: false
  });

  // 7. CTA + Footer
  console.log('  → CTA + Footer');
  await page.evaluate(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-cta-footer.png'),
    fullPage: false
  });

  // 8. 导航栏 — 滚动后显示
  console.log('  → 导航栏 (滚动后)');
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-navbar-scrolled.png'),
    fullPage: false
  });

  // ========== 项目详情页 ==========
  console.log('\n📸 验证项目详情页...');
  await page.goto(`${BASE_URL}/projects/binocular-thermal-imager`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 9. 项目详情 Hero
  console.log('  → 项目详情 Hero');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-detail-hero.png'),
    fullPage: false
  });

  // 10. 项目详情 — 信息卡片
  console.log('  → 项目详情 信息卡片');
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '10-detail-info-cards.png'),
    fullPage: false
  });

  // 11. 技能
  console.log('  → 项目详情 技能');
  await page.evaluate(() => {
    const skills = document.querySelectorAll('section')[1];
    if (skills) skills.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-detail-skills.png'),
    fullPage: false
  });

  // 12. 时间线
  console.log('  → 项目详情 时间线');
  await page.evaluate(() => {
    const timeline = document.querySelectorAll('section')[2];
    if (timeline) timeline.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '12-detail-timeline.png'),
    fullPage: false
  });

  // 13. 硬件清单
  console.log('  → 项目详情 硬件清单');
  await page.evaluate(() => {
    const hw = document.querySelectorAll('section')[3];
    if (hw) hw.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '13-detail-hardware.png'),
    fullPage: false
  });

  // 14. 开源资源
  console.log('  → 项目详情 开源资源');
  await page.evaluate(() => {
    const resources = document.querySelectorAll('section')[4];
    if (resources) resources.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '14-detail-resources.png'),
    fullPage: false
  });

  // ========== 移动端 ==========
  console.log('\n📸 验证移动端 (375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 15. 移动端 Hero
  console.log('  → 移动端 Hero');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '15-mobile-hero.png'),
    fullPage: false
  });

  // 16. 移动端 项目卡片
  console.log('  → 移动端 项目卡片');
  await page.evaluate(() => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '16-mobile-projects.png'),
    fullPage: false
  });

  // 17. 移动端 学习路径
  console.log('  → 移动端 学习路径');
  await page.evaluate(() => {
    document.querySelector('#learning-path')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '17-mobile-learning-path.png'),
    fullPage: false
  });

  await browser.close();
  console.log('\n✅ 视觉验证完成! 截图已保存到 verify/v1/');
}

run().catch(err => {
  console.error('❌ 验证失败:', err.message);
  process.exit(1);
});
