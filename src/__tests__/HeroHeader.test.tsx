import React from 'react'
import { render, screen } from '@testing-library/react'
import { MotionConfig } from 'framer-motion'
import { HeroHeader } from '@/components/HeroHeader'
import { siteConfig } from '@/lib/siteConfig'

const wrap = () =>
  render(
    <MotionConfig reducedMotion="always">
      <HeroHeader />
    </MotionConfig>
  )

describe('HeroHeader', () => {
  it('renders the name as an h1 heading', () => {
    wrap()
    expect(screen.getByRole('heading', { level: 1, name: /Jonathan Verdun/i })).toBeInTheDocument()
  })

  it('renders the tagline from siteConfig', () => {
    wrap()
    expect(screen.getByText(siteConfig.tagline)).toBeInTheDocument()
  })

  it('GitHub link has rel="noopener noreferrer" and target="_blank"', () => {
    wrap()
    const link = screen.getByRole('link', { name: /GitHub profile/i })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('GitHub link has a descriptive aria-label', () => {
    wrap()
    expect(screen.getByRole('link', { name: /GitHub profile/i })).toBeInTheDocument()
  })

  it('LinkedIn link has rel="noopener noreferrer" and target="_blank"', () => {
    wrap()
    const link = screen.getByRole('link', { name: /LinkedIn profile/i })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('LinkedIn link has a descriptive aria-label', () => {
    wrap()
    expect(screen.getByRole('link', { name: /LinkedIn profile/i })).toBeInTheDocument()
  })

  it('work history org link has rel="noopener noreferrer" and target="_blank"', () => {
    wrap()
    const link = screen.getByRole('link', { name: /Ai-Whisperers/i })
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('all external links open in a new tab', () => {
    wrap()
    const externalLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('target') === '_blank')
    expect(externalLinks.length).toBeGreaterThanOrEqual(3)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    })
  })
})
