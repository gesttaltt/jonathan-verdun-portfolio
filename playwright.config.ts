import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command:
      process.env.MOCK_CI === 'true' ? 'npx --yes serve out -l 3000 --no-clipboard' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: process.env.MOCK_CI === 'true' ? 30_000 : 120_000,
    env: {
      NEXT_TELEMETRY_DISABLED: '1',
      // Provide a synthetic Formspree ID so the contact form renders in E2E.
      // The honeypot and error-state tests need the form to be active.
      // Real submissions are intercepted by page.route() in those tests.
      NEXT_PUBLIC_FORMSPREE_ID: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'e2e-test-form',
    },
  },
})
