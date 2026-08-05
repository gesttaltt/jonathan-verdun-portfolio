import { buildMetadata, buildPageMetadata, SHARED_VIEWPORT } from '@/lib/metadata'
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

    it('openGraph includes images array with correct URL', () => {
      const images = (m.openGraph as { images: Array<{ url: string }> }).images
      expect(images).toHaveLength(1)
      expect(images[0]!.url).toContain('/opengraph-image')
    })

    it('twitter includes images array with correct URL', () => {
      const images = (m.twitter as { images: Array<{ url: string }> }).images
      expect(images).toHaveLength(1)
      expect(images[0]!.url).toContain('/opengraph-image')
    })
  })

  describe('ES', () => {
    const m = buildMetadata('es')

    it('title is Spanish', () => {
      expect(m.title).toContain('Ingeniero de Automatización QA')
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

describe('buildPageMetadata', () => {
  // Regression coverage for the sixth bug-hunt pass: every non-homepage route
  // used to leak the homepage's canonical/openGraph/alternates because
  // Next.js metadata resolution replaces whole top-level keys rather than
  // deep-merging. These assertions target exactly the fields that leaked —
  // not just title/description, which were never the broken part.
  const page = { title: 'Blog — Jonathan Verdun', description: 'Articles on QA engineering.' }

  describe('EN', () => {
    const m = buildPageMetadata('en', '/blog/', page)

    it('passes through title and description unchanged', () => {
      expect(m.title).toBe(page.title)
      expect(m.description).toBe(page.description)
    })

    it('canonical points to the route, not the homepage', () => {
      expect((m.alternates as { canonical: string }).canonical).toBe(`${siteConfig.url}/blog/`)
    })

    it('hreflang alternates point to the route in both locales', () => {
      const langs = (m.alternates as { languages: Record<string, string> }).languages
      expect(langs.en).toBe(`${siteConfig.url}/blog/`)
      expect(langs.es).toBe(`${siteConfig.url}/es/blog/`)
    })

    it('openGraph.url matches canonical, not the homepage', () => {
      expect((m.openGraph as { url: string }).url).toBe(`${siteConfig.url}/blog/`)
    })

    it('openGraph title/description match the page, not siteConfig', () => {
      const og = m.openGraph as { title: string; description: string }
      expect(og.title).toBe(page.title)
      expect(og.description).toBe(page.description)
      expect(og.title).not.toBe(siteConfig.title)
    })

    it('openGraph locale is siteConfig.locale', () => {
      expect((m.openGraph as { locale: string }).locale).toBe(siteConfig.locale)
    })

    it('twitter title/description match the page', () => {
      const tw = m.twitter as { title: string; description: string }
      expect(tw.title).toBe(page.title)
      expect(tw.description).toBe(page.description)
    })
  })

  describe('ES', () => {
    const m = buildPageMetadata('es', '/blog/', page)

    it('canonical points to the ES route, not the ES homepage', () => {
      expect((m.alternates as { canonical: string }).canonical).toBe(`${siteConfig.url}/es/blog/`)
    })

    it('openGraph.url matches the ES canonical', () => {
      expect((m.openGraph as { url: string }).url).toBe(`${siteConfig.url}/es/blog/`)
    })

    it('openGraph locale is es_ES', () => {
      expect((m.openGraph as { locale: string }).locale).toBe('es_ES')
    })
  })

  it('a nested routePath produces a nested canonical (quality/[...slug] case)', () => {
    const m = buildPageMetadata('en', '/quality/specs/CONTRACTS/', page)
    expect((m.alternates as { canonical: string }).canonical).toBe(
      `${siteConfig.url}/quality/specs/CONTRACTS/`
    )
  })

  it('URL-encodes a routePath segment without touching the "/" separators', () => {
    const m = buildPageMetadata('en', '/blog/a slug/', page)
    expect((m.alternates as { canonical: string }).canonical).toBe(
      `${siteConfig.url}/blog/a%20slug/`
    )
  })
})

describe('SHARED_VIEWPORT', () => {
  it('themeColor is dark background', () => {
    expect(SHARED_VIEWPORT.themeColor).toBe('#0a0a0a')
  })
})
