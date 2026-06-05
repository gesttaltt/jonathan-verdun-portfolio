import { screen } from '@testing-library/react'
import { SiteFooter } from '@/components/SiteFooter'
import { siteConfig } from '@/lib/siteConfig'
import { renderWithMotion } from '@/test-utils'

describe('SiteFooter', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('renders as a footer landmark', () => {
    renderWithMotion(<SiteFooter />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the site name', () => {
    renderWithMotion(<SiteFooter />)
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()
  })

  it('renders GitHub link with correct href and rel', () => {
    renderWithMotion(<SiteFooter />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', siteConfig.socialLinks.github.url)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders LinkedIn link with correct href and rel', () => {
    renderWithMotion(<SiteFooter />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', siteConfig.socialLinks.linkedin.url)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders email link without target="_blank"', () => {
    renderWithMotion(<SiteFooter />)
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', `mailto:${siteConfig.contact.email}`)
    expect(link).not.toHaveAttribute('target')
  })

  it('renders the current year in the copyright line', () => {
    renderWithMotion(<SiteFooter />)
    // Year is fixed to 2026 via jest.setSystemTime in beforeAll
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders the @gesttaltt GitHub handle as a link', () => {
    renderWithMotion(<SiteFooter />)
    const handleLink = screen.getByRole('link', { name: /@gesttaltt/i })
    expect(handleLink).toHaveAttribute('href', siteConfig.socialLinks.github.url)
  })

  it('renders the tech stack line', () => {
    renderWithMotion(<SiteFooter />)
    expect(screen.getByText(/Next\.js/i)).toBeInTheDocument()
    expect(screen.getByText(/Tailwind CSS/i)).toBeInTheDocument()
  })
})
