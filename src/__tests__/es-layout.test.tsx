import React from 'react'
import { render, screen } from '@testing-library/react'

jest.mock('next/font/google', () => ({
  JetBrains_Mono: () => ({ variable: '--font-jetbrains-mono' }),
}))

jest.mock('@/components/MotionProvider', () => ({
  MotionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import EsLayout, { metadata, viewport } from '@/app/(es)/layout'
import { siteConfig } from '@/lib/siteConfig'

let consoleErrorSpy: jest.SpyInstance
beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...args) => {
    if (typeof msg === 'string' && msg.includes('cannot be a child')) return
    console.warn(msg, ...args)
  })
})
afterAll(() => consoleErrorSpy.mockRestore())

describe('EsLayout — metadata exports', () => {
  it('title is Spanish', () => {
    expect(String(metadata.title)).toContain('Automatización')
  })

  it('description is Spanish', () => {
    expect(String(metadata.description)).toContain('Portafolio')
  })

  it('canonical URL points to /es/', () => {
    expect((metadata.alternates as { canonical: string }).canonical).toBe(`${siteConfig.url}/es/`)
  })

  it('viewport themeColor is dark background', () => {
    expect(viewport.themeColor).toBe('#0a0a0a')
  })
})

describe('EsLayout — rendered output', () => {
  it('renders children', () => {
    render(<EsLayout>child content</EsLayout>)
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders the skip-nav link pointing to #main-content', () => {
    render(<EsLayout>child</EsLayout>)
    const skip = screen.getByText('Skip to content')
    expect(skip).toBeInTheDocument()
    expect(skip).toHaveAttribute('href', '#main-content')
  })

  it('injects a JSON-LD script with Person schema', () => {
    render(<EsLayout>child</EsLayout>)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent ?? '{}')
    expect(data['@type']).toBe('Person')
    expect(data.name).toBe(siteConfig.name)
  })
})
