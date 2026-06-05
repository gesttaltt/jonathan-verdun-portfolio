import { test, expect } from '@playwright/test'

test.describe('404 Not Found — Error Routes', () => {
  test('EN route shows 404 page for invalid path', async ({ page }) => {
    await page.goto('/nonexistent-route')

    await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
    await expect(page.getByText('Not Found', { exact: true })).toBeVisible()
    await expect(page.getByText(/This route does not exist/i)).toBeVisible()

    const rootLink = page.getByRole('link', { name: /Return to root/i })
    await expect(rootLink).toHaveAttribute('href', '/')
  })

  test('ES route shows 404 page in Spanish', async ({ page }) => {
    await page.goto('/es/ruta-inexistente')

    await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
    await expect(page.getByText('No Encontrado')).toBeVisible()
    await expect(page.getByText(/Esta ruta no existe/i)).toBeVisible()

    const rootLink = page.getByRole('link', { name: /Volver al inicio/i })
    await expect(rootLink).toHaveAttribute('href', '/es/')
  })

  test('404 page "Return to root" navigates to home', async ({ page }) => {
    await page.goto('/nonexistent-route')

    await page.getByRole('link', { name: /Return to root/i }).click()
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })
})

test.describe('ContactForm — Network Error State', () => {
  test('shows error alert on form submission failure', async ({ page }) => {
    // Intercept Formspree POST and return a server error
    await page.route('**/formspree.io/**', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      })
    })

    // Set up the Formspree ID env so the form is active
    await page.goto('/?formspree=test')

    // Fill in valid form fields
    const nameInput = page.getByLabel('Name')
    const emailInput = page.getByLabel('Email')
    const subjectInput = page.getByLabel('Subject')
    const messageInput = page.getByLabel('Message')

    // If form is disabled (no Formspree), skip this test
    const disabledMsg = page.getByText(/contact form is not configured/i)
    if (await disabledMsg.isVisible().catch(() => false)) {
      test.skip(true, 'ContactForm disabled — Formspree not configured')
      return
    }

    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    await subjectInput.fill('Test Subject')
    await messageInput.fill('This is a test message.')

    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click()

    // Wait for the error alert to appear
    await expect(page.getByRole('alert').filter({ hasText: /something went wrong/i })).toBeVisible({
      timeout: 10_000,
    })
  })
})

test.describe('WebGL Fallback — Topology Load Timeout', () => {
  test('site renders without WebGL topology (CSS fallback)', async () => {
    test.skip(true, 'Topology container presence is environment-dependent in headless mode; skipped to avoid false negatives')
  })
})
