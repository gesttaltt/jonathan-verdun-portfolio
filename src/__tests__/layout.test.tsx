import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('next/font/google', () => ({
  JetBrains_Mono: () => ({ variable: '--font-jetbrains-mono' }),
}))

jest.mock('@/components/MotionProvider', () => ({
  MotionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/hooks/useProjects', () => ({
  ProjectProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import RootLayout, { metadata, viewport } from '@/app/layout'
import { siteConfig } from '@/lib/siteConfig'

describe('RootLayout — metadata exports', () => {
  it('title matches siteConfig', () => {
    expect(metadata.title).toBe(siteConfig.title)
  })

  it('description matches siteConfig', () => {
    expect(metadata.description).toBe(siteConfig.description)
  })

  it('canonical URL matches siteConfig', () => {
    expect((metadata.alternates as { canonical: string }).canonical).toBe(siteConfig.url)
  })

  it('OpenGraph type is website', () => {
    expect((metadata.openGraph as { type: string }).type).toBe('website')
  })

  it('Twitter card is summary_large_image', () => {
    expect((metadata.twitter as { card: string }).card).toBe('summary_large_image')
  })

  it('viewport themeColor is dark background', () => {
    expect(viewport.themeColor).toBe('#0a0a0a')
  })
})

describe('RootLayout — rendered output', () => {
  it('renders children', () => {
    render(<RootLayout>child content</RootLayout>)
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders the skip-nav link pointing to #main-content', () => {
    render(<RootLayout>child</RootLayout>)
    const skip = screen.getByText('Skip to content')
    expect(skip).toBeInTheDocument()
    expect(skip).toHaveAttribute('href', '#main-content')
  })

  it('injects a JSON-LD script with Person schema', () => {
    render(<RootLayout>child</RootLayout>)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent ?? '{}')
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe(siteConfig.name)
    expect(data.jobTitle).toBe(siteConfig.jobTitle)
    expect(data.email).toBe(siteConfig.contact.email)
    expect(data.sameAs).toContain(siteConfig.socialLinks.github.url)
  })
})
