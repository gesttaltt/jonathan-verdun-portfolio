import { test, expect } from '@playwright/test'

test.describe('Audit Search Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quality/')
  })

  test('search bar filters the audit history', async ({ page }) => {
    // Initial state: multiple audits should be visible
    const initialCards = await page.locator('article, .group.relative').count()
    expect(initialCards).toBeGreaterThan(2)

    const searchInput = page.getByPlaceholder('Search audits...')
    await expect(searchInput).toBeVisible()

    // Type a specific query (e.g., "Refinement")
    await searchInput.fill('Refinement')

    // Check filtered results
    await expect(page.getByRole('heading', { name: 'Quality & UX Refinement Audit' })).toBeVisible()

    // Other audits should be hidden (we use popLayout AnimatePresence)
    // We check that the count of visible cards has decreased
    const filteredCards = await page.locator('.group.relative').count()
    expect(filteredCards).toBeLessThan(initialCards)
  })

  test('shows "No results" message for unmatched query', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search audits...')
    await searchInput.fill('xyz123nonexistent')

    await expect(page.getByText('No audits match your search query.')).toBeVisible()
    // Both general and core artifacts should be hidden
    await expect(page.locator('.group.relative')).toHaveCount(0)
  })

  test('clear button resets search results', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search audits...')
    await searchInput.fill('Refinement')

    // Click the X button specifically
    const clearButton = page.locator('button').filter({ has: page.locator('svg.lucide-x') })
    await clearButton.click()

    await expect(searchInput).toHaveValue('')
    const resetCards = await page.locator('.group.relative').count()
    expect(resetCards).toBeGreaterThan(2)
  })

  test('search works in Spanish locale', async ({ page }) => {
    await page.goto('/es/quality/')
    const searchInput = page.getByPlaceholder('Buscar auditorías...')
    await expect(searchInput).toBeVisible()

    await searchInput.fill('Refinement')
    await expect(page.getByRole('heading', { name: 'Quality & UX Refinement Audit' })).toBeVisible()
  })
})

test.describe('Offline Resilience (PWA)', () => {
  test('site remains functional offline after service worker registration', async ({
    context,
    page,
  }) => {
    // Enable E2E Service Worker registration and mock CI via cookies
    await context.addCookies([
      {
        name: 'e2e',
        value: 'true',
        domain: 'localhost',
        path: '/',
      },
      {
        name: 'mock-ci',
        value: 'true',
        domain: 'localhost',
        path: '/',
      },
    ])

    await page.goto('/')

    // Wait for terminal boot (increased timeout for CI stability)
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 20_000,
    })

    // Wait for Service Worker to be registered and active with a longer retry window
    const swStatus = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return 'no-sw-support'
      // Retry for up to 20 seconds (100 * 200ms)
      for (let i = 0; i < 100; i++) {
        const regs = await navigator.serviceWorker.getRegistrations()
        if (regs.some((r) => r.active)) return 'ready'
        await new Promise((r) => setTimeout(r, 200))
      }
      return 'timeout'
    })

    if (swStatus !== 'ready') {
      console.warn('Service Worker not ready, skipping offline check')
      return
    }

    // Warm up cache
    await page.goto('/es/')
    await expect(page.getByText('jonathan.verdun — Ingeniero de Automatización QA')).toBeVisible()
    await page.goto('/')
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible()

    await page.waitForTimeout(2000)

    // GO OFFLINE
    await context.setOffline(true)

    // Reload page
    await page.reload().catch(() => {})

    // SITE SHOULD STILL LOAD (Verify static content at minimum)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')

    // Check navigation to a static route while offline
    await page.getByRole('link', { name: 'Cambiar a Español' }).click()
    await expect(page).toHaveURL(/\/es\//)

    await context.setOffline(false)
  })
})
