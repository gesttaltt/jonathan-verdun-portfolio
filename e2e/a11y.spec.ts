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
    // The dashboard's top FadeInSection sits above the fold, so its
    // whileInView opacity transition (TIMING.standard = 600ms in
    // lib/animations.ts) starts firing as soon as the page loads rather than
    // staying at a clean, axe-excluded opacity:0 like below-the-fold
    // sections. Scanning mid-transition catches text blended toward the
    // background and axe reports a false color-contrast violation — wait
    // for the fade to finish before scanning.
    await page.waitForTimeout(700)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('Keyboard Accessibility', () => {
  test('skip-to-content link appears on Tab press', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 10_000,
    })

    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: /skip/i })
    await expect(skipLink).toBeVisible()
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('language selector is reachable via keyboard', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 10_000,
    })

    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: /skip/i })
    await expect(skipLink).toBeVisible()

    await page.keyboard.press('Tab')
    const langSelector = page.getByRole('link', { name: /cambiar a español|cambiar a/i })
    await expect(langSelector).toBeVisible()
  })
})
