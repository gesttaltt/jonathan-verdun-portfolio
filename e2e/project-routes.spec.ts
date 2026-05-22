import { test, expect } from '@playwright/test'

test.describe('Project Detail Pages', () => {
  test('EN project detail renders heading and content', async ({ page }) => {
    await page.goto('/projects/qa-arxiv-mobile')

    await expect(page).toHaveTitle(/QA Arxiv Mobile/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/Challenge|Approach|Results/i)).toBeVisible()
  })

  test('ES project detail renders in Spanish', async ({ page }) => {
    await page.goto('/es/projects/qa-arxiv-mobile')

    await expect(page).toHaveTitle(/QA Arxiv Mobile/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('navigates from project grid to detail page', async ({ page }) => {
    await page.goto('/')

    const firstCard = page.locator('[data-testid^="project-card-"]').first()
    await expect(firstCard).toBeVisible()

    const projectLink = firstCard.locator('a[href^="/projects/"]').first()
    const href = await projectLink.getAttribute('href')
    await projectLink.click()

    await expect(page).toHaveURL(href ?? /\/projects\//)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('back navigation from project detail returns to previous page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')

    await page.goto('/projects/functionome-atlas')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jonathan Verdun')
  })
})
