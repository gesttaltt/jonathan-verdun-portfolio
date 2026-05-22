import { test, expect } from '@playwright/test'

test.describe('RSS Feed', () => {
  test('feed.xml is accessible and valid XML', async ({ request }) => {
    const response = await request.get('/feed.xml')
    expect(response.ok()).toBeTruthy()
    expect(response.headers()['content-type'] || '').toMatch(/xml|text\/plain/)

    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('<rss')
    expect(body).toContain('<channel>')
    expect(body).toContain('<item>')
    expect(body).toContain('jonathanverdun.com')
    expect(body).not.toContain('undefined')
  })

  test('feed contains blog posts', async ({ request }) => {
    const body = await (await request.get('/feed.xml')).text()

    // Count <item> entries
    const itemCount = (body.match(/<\/item>/g) || []).length
    expect(itemCount).toBeGreaterThanOrEqual(3)

    // Each item should have required RSS fields
    expect(body).toContain('<title>')
    expect(body).toContain('<link>')
    expect(body).toContain('<pubDate>')
    expect(body).toContain('<guid')
  })
})

test.describe('Content Security Policy', () => {
  test('EN pages include CSP meta tag', async ({ page }) => {
    await page.goto('/')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toBeAttached()
    const content = await csp.getAttribute('content')
    expect(content).toContain("default-src 'self'")
    expect(content).toContain('script-src')
    expect(content).toContain('style-src')
  })

  test('ES pages include CSP meta tag', async ({ page }) => {
    await page.goto('/es/')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toBeAttached()
  })

  test('blog pages include CSP meta tag', async ({ page }) => {
    await page.goto('/blog/')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toBeAttached()
  })

  test('resume pages include CSP meta tag', async ({ page }) => {
    await page.goto('/resume/')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toBeAttached()
  })

  test('quality pages include CSP meta tag', async ({ page }) => {
    await page.goto('/quality/')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toBeAttached()
  })
})

test.describe('Contact Form Honeypot', () => {
  test('honeypot field exists when form is active', async ({ page }) => {
    await page.goto('/')

    // Check if form is disabled (no Formspree ID in static export)
    const disabledMsg = page.getByText(/contact form is not configured/i)
    if (await disabledMsg.isVisible().catch(() => false)) {
      test.skip(true, 'ContactForm disabled -- Formspree not configured')
      return
    }

    // Honeypot div is aria-hidden and positioned off-screen
    const honeypotInput = page.locator('input[name="_hp"]')
    await expect(honeypotInput).toBeAttached()

    // Container should be off-screen
    const container = page.locator('div[aria-hidden="true"]').filter({
      has: page.locator('input[name="_hp"]'),
    })
    await expect(container).toBeAttached()
  })

  test('filling honeypot silently pretends success', async ({ page }) => {
    await page.goto('/')

    const disabledMsg = page.getByText(/contact form is not configured/i)
    if (await disabledMsg.isVisible().catch(() => false)) {
      test.skip(true, 'ContactForm disabled -- Formspree not configured')
      return
    }

    const honeypotInput = page.locator('input[name="_hp"]')
    await expect(honeypotInput).toBeAttached()

    await honeypotInput.fill('spam-bot-value')

    // Submit the form
    const sendButton = page.getByRole('button', { name: /send message/i })
    await expect(sendButton).toBeEnabled({ timeout: 5_000 })
    await sendButton.click()

    // Honeypot guard should silently succeed
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 5_000 })
  })
})
