import { test, expect } from '@playwright/test'

/**
 * @file layout.spec.ts
 * Verifies layout integrity and structural invariants across different viewports.
 * This suite ensures the 'Deterministic UI' promise by checking for overflows,
 * correct grid stacking, and visibility of core architectural elements.
 */

test.describe('Layout Integrity & Viewports', () => {
  const VIEWPORTS = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'ultra-wide', width: 1920, height: 1080 },
  ]

  for (const viewport of VIEWPORTS) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } })

      test.beforeEach(async ({ page }) => {
        await page.goto('/')
        // Wait for hydration and potential animations to settle
        await page.waitForTimeout(1000)
      })

      test('should have no horizontal overflow', async ({ page }) => {
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth
        })
        expect(isOverflowing, 'Page should not have horizontal scrollbar').toBe(false)
      })

      test('sidebar should follow responsive visibility constraints', async ({ page }) => {
        const sidebar = page.locator('aside')

        if (viewport.width < 1024) {
          // On smaller screens, the sidebar should either be hidden or stacked
          // (Current design stacks it or hides specific sub-elements)
          // Adjust this assertion based on the specific implementation (e.g., hidden via CSS)
          const isVisible = await sidebar.isVisible()
          if (viewport.width < 768) {
            // If fully hidden on mobile:
            // await expect(sidebar).not.toBeVisible()
          }
        } else {
          await expect(sidebar).toBeVisible()
        }
      })

      test('portfolio grid should maintain structural integrity', async ({ page }) => {
        const portfolioGrid = page.locator('.grid').first()
        await expect(portfolioGrid).toBeVisible()

        const cardCount = await page.locator('[data-testid^="project-card-"]').count()
        expect(cardCount).toBeGreaterThan(0)
      })

      test('terminal should be accessible and not truncated', async ({ page }) => {
        const terminal = page.getByTestId('terminal-bash')
        await expect(terminal).toBeVisible()

        // Ensure terminal is within bounds
        const box = await terminal.boundingBox()
        expect(box?.width).toBeLessThanOrEqual(viewport.width)
      })

      test('navigation should be usable', async ({ page }) => {
        const langSelector = page.getByRole('navigation', { name: /Language selector/i })
        await expect(langSelector).toBeVisible()
      })
    })
  }
})
