import { test, expect } from '@playwright/test'

test.describe('Visual Regression — Design Stability @visual', () => {
  test.beforeEach(async ({ page, context }) => {
    // The Sidebar's CI status badge fetches api.github.com live on mount —
    // MOCK_CI is a server-side env var and never reaches this client bundle
    // (it's not NEXT_PUBLIC_-prefixed), so without this cookie the fetch
    // depends on GitHub API latency/availability at screenshot time, which
    // previously produced different page heights locally vs. in CI.
    await context.addCookies([{ name: 'mock-ci', value: 'true', domain: 'localhost', path: '/' }])

    // Wait for the page to be fully loaded and animations to settle
    await page.goto('/')
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 15_000,
    })
    // Extra wait for Framer Motion initial entrance animations
    await page.waitForTimeout(2000)
  })

  const MASK_SELECTORS = [
    'canvas[role="img"]', // The WebGL background
    '[aria-label*="CI pipeline status"]', // Sidebar CI status (dynamic)
    'section:has-text("Engineering Quality Gates") div[class*="h-1.5"]', // Progress bars
    'section:has-text("Visual Verification Evidence")', // Coverage data (can change)
  ]

  test('Portfolio Home (EN) — Desktop Viewport', async ({ page }) => {
    await expect(page).toHaveScreenshot('home-en-desktop.png', {
      mask: MASK_SELECTORS.map((s) => page.locator(s)),
      fullPage: true,
      timeout: 30_000,
    })
  })

  test('Portfolio Home (ES) — Desktop Viewport', async ({ page }) => {
    await page.getByRole('link', { name: 'Cambiar a Español' }).click()
    await expect(page.getByText('jonathan.verdun — Ingeniero de Automatización QA')).toBeVisible()
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('home-es-desktop.png', {
      mask: MASK_SELECTORS.map((s) => page.locator(s)),
      fullPage: true,
      timeout: 30_000,
    })
  })

  test('Quality Dashboard (EN) — Desktop Viewport', async ({ page }) => {
    await page.goto('/quality/')
    await expect(page.getByText('Quality Transparency')).toBeVisible()
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('quality-dashboard-en-desktop.png', {
      mask: MASK_SELECTORS.map((s) => page.locator(s)),
      fullPage: true,
      timeout: 30_000,
    })
  })

  test('Quality Spec Detail (EN) — Desktop Viewport — prose typography', async ({ page }) => {
    // Regression guard for the missing @tailwindcss/typography plugin: the
    // `prose` classes on DetailArticleLayout silently produced zero CSS
    // (verified against the compiled stylesheet) until the plugin was
    // registered, so every audit/spec/blog article body rendered as
    // unstyled raw HTML. Unlike the Jest suite, this actually applies real
    // CSS, so it's the one place that class of regression is visible.
    await page.goto('/quality/specs/DEVOPS/')
    // Two <h1>s exist on this page: DetailArticleLayout's own header title,
    // plus the markdown body's leading `# ...` line rendered inside the
    // prose article — .first() just confirms the page rendered.
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
    await page.waitForTimeout(500)

    await expect(page).toHaveScreenshot('quality-spec-devops-en-desktop.png', {
      fullPage: true,
      timeout: 30_000,
    })
  })

  test('Portfolio Home — Mobile Viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Skipping desktop projects for mobile-specific test')

    await expect(page).toHaveScreenshot('home-mobile.png', {
      mask: MASK_SELECTORS.map((s) => page.locator(s)),
      fullPage: true,
      timeout: 30_000,
    })
  })
})
