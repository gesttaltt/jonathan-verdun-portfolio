import { render, screen } from '@testing-library/react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { SiteFooter } from '@/components/SiteFooter'
import { siteConfig } from '@/lib/siteConfig'

const wrap = () =>
  render(
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="always">
        <SiteFooter />
      </MotionConfig>
    </LazyMotion>
  )

describe('SiteFooter', () => {
  it('renders as a footer landmark', () => {
    wrap()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the site name', () => {
    wrap()
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument()
  })

  it('renders GitHub link with correct href and rel', () => {
    wrap()
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', siteConfig.socialLinks.github.url)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders LinkedIn link with correct href and rel', () => {
    wrap()
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', siteConfig.socialLinks.linkedin.url)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders email link without target="_blank"', () => {
    wrap()
    const link = screen.getByRole('link', { name: /email/i })
    expect(link).toHaveAttribute('href', `mailto:${siteConfig.contact.email}`)
    expect(link).not.toHaveAttribute('target')
  })

  it('renders the current year in the copyright line', () => {
    wrap()
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders the @gesttaltt GitHub handle as a link', () => {
    wrap()
    const handleLink = screen.getByRole('link', { name: /@gesttaltt/i })
    expect(handleLink).toHaveAttribute('href', siteConfig.socialLinks.github.url)
  })

  it('renders the tech stack line', () => {
    wrap()
    expect(screen.getByText(/Next\.js/i)).toBeInTheDocument()
    expect(screen.getByText(/Tailwind CSS/i)).toBeInTheDocument()
  })
})
