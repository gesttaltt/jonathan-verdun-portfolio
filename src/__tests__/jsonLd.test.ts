import { personJsonLd, websiteJsonLd, buildWebPageJsonLd } from '@/lib/jsonLd'
import { siteConfig } from '@/lib/siteConfig'

describe('websiteJsonLd', () => {
  it('has correct @context and @type', () => {
    expect(websiteJsonLd['@context']).toBe('https://schema.org')
    expect(websiteJsonLd['@type']).toBe('WebSite')
  })

  it('includes English and Spanish inLanguage', () => {
    expect(websiteJsonLd.inLanguage).toContain('en')
    expect(websiteJsonLd.inLanguage).toContain('es')
  })
})

describe('buildWebPageJsonLd', () => {
  it('returns default EN metadata when no locale provided', () => {
    const pageLd = buildWebPageJsonLd()
    expect(pageLd.inLanguage).toBe('en')
    expect(pageLd.url).toBe(`${siteConfig.url}/`)
  })

  it('returns ES metadata when locale is es', () => {
    const pageLd = buildWebPageJsonLd('es')
    expect(pageLd.inLanguage).toBe('es')
    expect(pageLd.url).toBe(`${siteConfig.url}/es/`)
    expect(pageLd.name).toContain('Jonathan Verdun')
  })
})

describe('personJsonLd — required fields', () => {
  it('has correct @context and @type', () => {
    expect(personJsonLd['@context']).toBe('https://schema.org')
    expect(personJsonLd['@type']).toBe('Person')
  })

  it('name, jobTitle, url, email are non-empty strings matching siteConfig', () => {
    expect(personJsonLd.name).toBe(siteConfig.name)
    expect(personJsonLd.jobTitle).toBe(siteConfig.jobTitle)
    expect(personJsonLd.url).toBe(siteConfig.url)
    expect(personJsonLd.email).toBe(siteConfig.contact.email)
  })

  it('sameAs contains GitHub and LinkedIn URLs', () => {
    expect(personJsonLd.sameAs).toContain(siteConfig.socialLinks.github.url)
    expect(personJsonLd.sameAs).toContain(siteConfig.socialLinks.linkedin.url)
  })
})

describe('personJsonLd — knowsAbout', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(personJsonLd.knowsAbout)).toBe(true)
    expect(personJsonLd.knowsAbout.length).toBeGreaterThan(0)
  })

  it('includes specific QA tooling', () => {
    const tools = personJsonLd.knowsAbout as readonly string[]
    expect(tools).toContain('Playwright')
    expect(tools).toContain('pytest')
    expect(tools).toContain('Appium')
    expect(tools).toContain('GitHub Actions CI')
    expect(tools).toContain('QA Automation')
  })
})

describe('personJsonLd — worksFor absent', () => {
  it('does not include worksFor (role ended Apr 2026)', () => {
    expect(Object.keys(personJsonLd)).not.toContain('worksFor')
  })
})
