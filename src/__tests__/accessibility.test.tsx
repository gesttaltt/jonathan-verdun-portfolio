import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(en)/page'
import { ProjectProvider } from '@/components/hooks/useProjects'

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

const renderHome = () =>
  render(
    <ProjectProvider>
      <Home />
    </ProjectProvider>
  )

describe('Accessibility — landmarks', () => {
  it('has exactly one main landmark', () => {
    renderHome()
    expect(screen.getAllByRole('main')).toHaveLength(1)
  })

  it('main landmark has the skip-nav target id', () => {
    renderHome()
    expect(document.getElementById('main-content')).not.toBeNull()
  })
})

describe('Accessibility — heading hierarchy', () => {
  it('has exactly one h1', () => {
    renderHome()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('h1 contains the owner name', () => {
    renderHome()
    const [h1] = screen.getAllByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/Jonathan Verdun/i)
  })
})

describe('Accessibility — external links', () => {
  it('all links with target="_blank" have rel containing noopener', () => {
    const { container } = renderHome()
    const externalLinks = Array.from(container.querySelectorAll('a[target="_blank"]'))
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toContain('noopener')
    })
  })

  it('all images have a non-empty alt attribute', () => {
    const { container } = renderHome()
    const images = Array.from(container.querySelectorAll('img'))
    images.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy()
    })
  })
})
