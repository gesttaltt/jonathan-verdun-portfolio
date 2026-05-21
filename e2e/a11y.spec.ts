import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility — EN route (/)', () => {
  test('has no detectable WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto('/')
    // Wait for terminal boot so all dynamic content is rendered before scanning.
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 10_000,
    })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('Accessibility — ES route (/es/)', () => {
  test('has no detectable WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto('/es/')
    await expect(page.getByText('jonathan.verdun — Ingeniero de Automatización QA')).toBeVisible({
      timeout: 10_000,
    })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('Accessibility — Quality route (/quality/)', () => {
  test('has no detectable WCAG 2.1 AA violations', async ({ page }) => {
    await page.goto('/quality/')
    // Wait for the QA dashboard to fully render — search input and section
    // heading confirm all dynamic content has mounted before scanning.
    await expect(page.getByText(/Live Verification Evidence/i)).toBeVisible({ timeout: 10_000 })
    await expect(page.getByPlaceholder(/Search/i)).toBeVisible({ timeout: 5_000 })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})
