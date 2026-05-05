import { test, expect } from '@playwright/test'

test.describe('EN route (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('h1 contains the portfolio name', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })

  test('terminal boots and shows whoami output', async ({ page }) => {
    await expect(page.getByText('jonathan.verdun — QA Automation Engineer')).toBeVisible({
      timeout: 10_000,
    })
  })

  test('project cards are visible', async ({ page }) => {
    await expect(page.getByText('QA Arxiv Mobile')).toBeVisible()
  })

  test('EN is marked as active in language selector', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Switch to English' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})

test.describe('ES route (/es/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/')
  })

  test('h1 contains the portfolio name', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })

  test('terminal title is in Spanish', async ({ page }) => {
    await expect(page.getByText('bash — interactivo')).toBeVisible()
  })

  test('terminal boots in Spanish', async ({ page }) => {
    await expect(page.getByText('jonathan.verdun — Ingeniero de Automatización QA')).toBeVisible({
      timeout: 10_000,
    })
  })

  test('ES is marked as active in language selector', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Cambiar a Español' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})

test.describe('Language switcher', () => {
  test('navigates from EN to ES', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Cambiar a Español' }).click()
    await expect(page).toHaveURL(/\/es\//)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })

  test('navigates from ES to EN', async ({ page }) => {
    await page.goto('/es/')
    await page.getByRole('link', { name: 'Switch to English' }).click()
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })
})

test.describe('Terminal interactive mode', () => {
  test('help command returns available commands list', async ({ page }) => {
    await page.goto('/')
    const input = page.getByRole('textbox', { name: /terminal command input/i })
    await expect(input).toBeVisible({ timeout: 10_000 })
    await input.fill('help')
    await input.press('Enter')
    await expect(page.getByRole('log').getByText(/available commands:/i)).toBeVisible()
  })

  test('unknown command shows error with hint', async ({ page }) => {
    await page.goto('/')
    const input = page.getByRole('textbox', { name: /terminal command input/i })
    await expect(input).toBeVisible({ timeout: 10_000 })
    await input.fill('noop')
    await input.press('Enter')
    await expect(page.getByText(/command not found/i)).toBeVisible()
  })
})
