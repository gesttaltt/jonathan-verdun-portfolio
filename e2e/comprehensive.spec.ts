import { test, expect } from '@playwright/test'

test.describe('Comprehensive Metadata & Interaction Audit', () => {
  test('verifies EN metadata and canonicals', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jonathan Verdun | QA Automation Engineer/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /QA Automation Engineer/)

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://gesttaltt.github.io/')

    const hreflangEn = page.locator('link[hreflang="en"]')
    await expect(hreflangEn).toHaveAttribute('href', 'https://gesttaltt.github.io/')

    const hreflangEs = page.locator('link[hreflang="es"]')
    await expect(hreflangEs).toHaveAttribute('href', 'https://gesttaltt.github.io/es/')
  })

  test('verifies ES metadata and translated content', async ({ page }) => {
    await page.goto('/es/')
    await expect(page).toHaveTitle(/Jonathan Verdun | Ingeniero de Automatización QA/)
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /Portafolio/)

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'https://gesttaltt.github.io/es/')
  })

  test('verifies terminal input is disabled during boot and enabled once boot completes', async ({
    page,
  }) => {
    await page.goto('/')
    const input = page.getByRole('textbox', { name: /terminal command input/i })

    // Should be disabled initially
    await expect(input).toBeDisabled()

    // Input stays disabled for the whole boot sequence — Terminal.tsx's handleKeyDown
    // guards on isBooting, there's no way to interrupt it early — so this just waits
    // for boot to finish normally and confirms the input becomes usable.
    await expect(input).toBeEnabled({ timeout: 15_000 })

    await input.fill('help')
    await input.press('Enter')
    await expect(
      page
        .getByRole('log')
        .getByText(/available commands/i)
        .last()
    ).toBeVisible()
  })

  test('verifies Spanish terminal interaction', async ({ page }) => {
    await page.goto('/es/')
    const input = page.getByRole('textbox', { name: /terminal command input/i })
    await expect(input).toBeEnabled({ timeout: 15_000 })

    await input.fill('ayuda')
    await input.press('Enter')
    await expect(
      page
        .getByRole('log')
        .getByText(/Comandos disponibles/i)
        .last()
    ).toBeVisible()

    await input.fill('limpiar')
    await input.press('Enter')
    await expect(page.getByRole('log').getByText(/whoami/i)).not.toBeVisible()
  })

  test('verifies command history navigation (ArrowUp)', async ({ page }) => {
    await page.goto('/')
    const input = page.getByRole('textbox', { name: /terminal command input/i })
    await expect(input).toBeEnabled({ timeout: 15_000 })

    await input.fill('about')
    await input.press('Enter')

    await input.fill('projects')
    await input.press('Enter')

    await page.keyboard.press('ArrowUp')
    await expect(input).toHaveValue('projects')

    await page.keyboard.press('ArrowUp')
    await expect(input).toHaveValue('about')

    await page.keyboard.press('ArrowDown')
    await expect(input).toHaveValue('projects')
  })
})
