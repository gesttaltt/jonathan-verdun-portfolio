import { screen } from '@testing-library/react'
import { SiteFooter } from '@/components/SiteFooter'
import { renderWithMotion } from '@/test-utils'

jest.mock('@/lib/siteConfig', () => {
  const actual = jest.requireActual('@/lib/siteConfig')
  return {
    siteConfig: { ...actual.siteConfig, basePath: '/jonathan-verdun-portfolio' },
  }
})

describe('SiteFooter under a non-empty basePath (GitHub Pages project deploy)', () => {
  it('prefixes the static /docs/api/ and /sitemap.xml links with basePath', () => {
    renderWithMotion(<SiteFooter />)
    expect(screen.getByRole('link', { name: /api docs/i })).toHaveAttribute(
      'href',
      '/jonathan-verdun-portfolio/docs/api/'
    )
    expect(screen.getByRole('link', { name: /sitemap/i })).toHaveAttribute(
      'href',
      '/jonathan-verdun-portfolio/sitemap.xml'
    )
  })
})
