import { test, expect } from '@playwright/test'

test.describe('Resume Page — Content Routes', () => {
  test('EN resume page renders and shows download button', async ({ page }) => {
    await page.goto('/resume/')

    await expect(page).toHaveTitle(/Resume/)
    await expect(page.getByText('Experience')).toBeVisible()
    await expect(page.getByText('Core Expertise')).toBeVisible()

    const downloadBtn = page.getByRole('link', { name: /download.*pdf/i })
    await expect(downloadBtn).toBeVisible()
    await expect(downloadBtn).toHaveAttribute('href', '/resume-jonathan-verdun.pdf')
    await expect(downloadBtn).toHaveAttribute('download', '')
  })

  test('ES resume page renders in Spanish', async ({ page }) => {
    await page.goto('/es/resume/')

    await expect(page).toHaveTitle(/Currículum/)
    await expect(page.getByText('Experiencia')).toBeVisible()
    await expect(page.getByText('Habilidades')).toBeVisible()

    const downloadBtn = page.getByRole('link', { name: /descargar.*pdf/i })
    await expect(downloadBtn).toBeVisible()
    await expect(downloadBtn).toHaveAttribute('href', '/resume-jonathan-verdun.pdf')
    await expect(downloadBtn).toHaveAttribute('download', '')
  })
})

test.describe('Blog — List and Detail Pages', () => {
  test('EN blog index shows post cards', async ({ page }) => {
    await page.goto('/blog/')

    await expect(page).toHaveTitle(/Blog/)
    // Expect at least one blog post card
    const postCards = page.locator('[data-testid^="blog-card-"], article').first()
    await expect(postCards).toBeVisible()
  })

  test('EN blog post renders MDX content', async ({ page }) => {
    // Navigate to blog index and click the first post link
    await page.goto('/blog/')
    const firstPost = page
      .getByRole('link')
      .filter({ has: page.locator('h2, h3') })
      .first()

    await expect(firstPost).toBeVisible()
    const href = await firstPost.getAttribute('href')
    await firstPost.click()

    await expect(page).toHaveURL(href ?? '/blog/')
    // An individual post page should have an article or heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // MDX content should be rendered
    await expect(page.locator('article, [data-testid="blog-content"]')).toBeVisible()
  })

  test('ES blog index is accessible', async ({ page }) => {
    await page.goto('/es/blog/')

    await expect(page).toHaveTitle(/Blog/)
    const postCards = page.locator('[data-testid^="blog-card-"], article').first()
    await expect(postCards).toBeVisible()
  })

  test('ES blog post renders content', async ({ page }) => {
    await page.goto('/es/blog/')
    const firstLink = page
      .getByRole('link')
      .filter({ has: page.locator('h2, h3') })
      .first()

    await expect(firstLink).toBeVisible()
    const href = await firstLink.getAttribute('href')
    await firstLink.click()

    await expect(page).toHaveURL(href ?? '/es/blog/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})

test.describe('Quality Audit Detail Pages', () => {
  test('EN quality audit detail renders content', async ({ page }) => {
    await page.goto('/quality/audit-2026-04-27')

    await expect(page.locator('article, h1, h2').first()).toBeVisible()
    await expect(page.getByText(/Portfolio Audit/i).first()).toBeVisible()
  })

  test('ES quality audit detail renders', async ({ page }) => {
    await page.goto('/es/quality/audit-2026-04-27')

    await expect(page.locator('article, h1, h2').first()).toBeVisible()
  })
})
