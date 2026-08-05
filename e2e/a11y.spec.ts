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

  // Regression guard for the seventh (accessibility) bug-hunt pass: ProjectCard
  // and SpecCard's outer wrapper divs used to carry tabIndex={0} with no
  // click/keydown handler — a "dead" tab stop that received a visible focus
  // ring but did nothing on Enter/Space, forcing keyboard users through an
  // extra no-op stop per card. Traces real Tab order across the whole
  // homepage rather than special-casing one component, so any future
  // no-op-focusable element (not just these two) fails this test.
  test('tabbing through the homepage never lands on a non-interactive dead stop', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 10_000,
    })

    const INTERACTIVE_TAGS = new Set(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'])

    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab')

      const info = await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return null
        return {
          tag: el.tagName,
          tabIndex: el.getAttribute('tabindex'),
          contentEditable: (el as HTMLElement).isContentEditable,
        }
      })
      if (!info) continue
      // A focusable element must be a native interactive tag, OR carry a real
      // ARIA interactive role, OR (Terminal's hidden command input) be
      // contentEditable/an input. tabIndex="0" alone on a plain <div>/<span>
      // with no such role is exactly the dead-stop bug class.

      const role = await page.evaluate(() => document.activeElement?.getAttribute('role'))
      const isRealInteractive =
        INTERACTIVE_TAGS.has(info.tag) ||
        info.contentEditable ||
        (role !== null && role !== 'listitem')
      expect(
        isRealInteractive,
        `Tab stop #${i} focused a non-interactive <${info.tag}> (tabindex=${info.tabIndex}, role=${role}) — a dead tab stop`
      ).toBe(true)
    }
  })
})
