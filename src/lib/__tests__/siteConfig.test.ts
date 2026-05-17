/* eslint-disable @typescript-eslint/no-require-imports */
describe('siteConfig', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('has a default url if env var is missing', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.BASE_PATH
    delete process.env.NEXT_PUBLIC_BASE_PATH
    const { siteConfig } = require('../siteConfig')
    expect(siteConfig.url).toBe('https://jonathanverdun.com')
  })

  it('uses NEXT_PUBLIC_SITE_URL if provided', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
    const { siteConfig } = require('../siteConfig')
    expect(siteConfig.url).toBe('https://example.com')
  })

  it('contains essential metadata', () => {
    const { siteConfig } = require('../siteConfig')
    expect(siteConfig.name).toBe('Jonathan Verdun')
  })

  it('correctly generates CI URLs', () => {
    const { siteConfig } = require('../siteConfig')
    expect(siteConfig.repo.ciWorkflowUrl).toContain('actions/workflows/ci.yml')
    expect(siteConfig.repo.ciBadgeUrl).toContain('.svg')
  })
})
