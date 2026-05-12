import { test, expect } from '@playwright/test'

test.describe('Visual Regression — Design Stability @visual', () => {
  test.beforeEach(async ({ page }) => {
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

  test('Portfolio Home — Mobile Viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Skipping desktop projects for mobile-specific test')

    await expect(page).toHaveScreenshot('home-mobile.png', {
      mask: MASK_SELECTORS.map((s) => page.locator(s)),
      fullPage: true,
      timeout: 30_000,
    })
  })
})
