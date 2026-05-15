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

  it('uses NEXT_PUBLIC_SITE_URL if provided', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://custom.com'
    const { siteConfig } = require('../lib/siteConfig')
    expect(siteConfig.url).toBe('https://custom.com')
  })

  it('uses github.io URL if BASE_PATH is provided', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    process.env.BASE_PATH = '/portfolio'
    const { siteConfig } = require('../lib/siteConfig')
    expect(siteConfig.url).toBe('https://gesttaltt.github.io/portfolio')
  })

  it('uses github.io URL if NEXT_PUBLIC_BASE_PATH is provided', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.BASE_PATH
    process.env.NEXT_PUBLIC_BASE_PATH = '/next-portfolio'
    const { siteConfig } = require('../lib/siteConfig')
    expect(siteConfig.url).toBe('https://gesttaltt.github.io/next-portfolio')
  })

  it('defaults to jonathanverdun.com if no env vars are provided', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.BASE_PATH
    delete process.env.NEXT_PUBLIC_BASE_PATH
    const { siteConfig } = require('../lib/siteConfig')
    expect(siteConfig.url).toBe('https://jonathanverdun.com')
  })

  it('correctly computes basePath from env vars', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/test'
    const { siteConfig } = require('../lib/siteConfig')
    expect(siteConfig.basePath).toBe('/test')
  })
})
