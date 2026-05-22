import { test, expect } from '@playwright/test'

test.describe('Language Persistence', () => {
  test('EN to ES switch persists across direct navigation', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Cambiar a Español' }).click()
    await expect(page).toHaveURL(/\/es\//)

    await page.goto('/es/blog/')
    await expect(page).toHaveURL(/\/es\/blog/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog')

    await page.goto('/es/quality/')
    await expect(page).toHaveURL(/\/es\/quality/)
  })

  test('ES to EN switch persists across direct navigation', async ({ page }) => {
    await page.goto('/es/')
    await page.getByRole('link', { name: 'Switch to English' }).click()
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/$/)

    await page.goto('/quality/')
    await expect(page).toHaveURL(/\/quality\//)
    await expect(page.getByText(/Quality Transparency/i)).toBeVisible()
  })
})

test.describe('Navigation Flow', () => {
  test('back button from quality audit detail returns to quality index', async ({ page }) => {
    await page.goto('/quality/')
    await expect(page).toHaveURL('/quality/')

    await page.goto('/quality/audit-2026-04-27')
    await expect(page.locator('article, h1, h2').first()).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL('/quality/')
  })

  test('back button from blog post returns to blog index', async ({ page }) => {
    await page.goto('/blog/')
    await expect(page).toHaveURL('/blog/')

    const firstPostLink = page
      .getByRole('link')
      .filter({ has: page.locator('h2, h3') })
      .first()
    const href = await firstPostLink.getAttribute('href')
    await firstPostLink.click()
    await expect(page).toHaveURL(href ?? '/blog/')

    await page.goBack()
    await expect(page).toHaveURL('/blog/')
  })
})
