import { buildMetadata, SHARED_VIEWPORT } from '@/lib/metadata'
import { siteConfig } from '@/lib/siteConfig'

describe('buildMetadata', () => {
  describe('EN', () => {
    const m = buildMetadata('en')

    it('uses siteConfig title', () => {
      expect(m.title).toBe(siteConfig.title)
    })

    it('uses siteConfig description', () => {
      expect(m.description).toBe(siteConfig.description)
    })

    it('canonical points to root', () => {
      expect((m.alternates as { canonical: string }).canonical).toBe(siteConfig.url)
    })

    it('openGraph locale is siteConfig.locale', () => {
      expect((m.openGraph as { locale: string }).locale).toBe(siteConfig.locale)
    })

    it('twitter card is summary_large_image', () => {
      expect((m.twitter as { card: string }).card).toBe('summary_large_image')
    })
  })

  describe('ES', () => {
    const m = buildMetadata('es')

    it('title is Spanish', () => {
      expect(m.title).toContain('Automatización')
    })

    it('description is Spanish', () => {
      expect(m.description).toContain('Portafolio')
    })

    it('canonical points to /es/', () => {
      expect((m.alternates as { canonical: string }).canonical).toBe(`${siteConfig.url}/es/`)
    })

    it('openGraph locale is es_ES', () => {
      expect((m.openGraph as { locale: string }).locale).toBe('es_ES')
    })

    it('hreflang includes both languages', () => {
      const langs = (m.alternates as { languages: Record<string, string> }).languages
      expect(langs.en).toBe(siteConfig.url)
      expect(langs.es).toBe(`${siteConfig.url}/es/`)
    })
  })
})

describe('SHARED_VIEWPORT', () => {
  it('themeColor is dark background', () => {
    expect(SHARED_VIEWPORT.themeColor).toBe('#0a0a0a')
  })
})
