import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(en)/page'
import { ProjectProvider } from '@/components/hooks/useProjects'
import { siteConfig } from '@/lib/siteConfig'

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

const renderHome = () =>
  render(
    <ProjectProvider>
      <Home />
    </ProjectProvider>
  )

describe('Home', () => {
  it('renders the name Jonathan Verdun in a heading', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: /Jonathan Verdun/i })).toBeInTheDocument()
  })

  it('has the skip-nav target id on the main landmark', () => {
    renderHome()
    expect(document.getElementById('main-content')).not.toBeNull()
  })

  it('renders primary section headings', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: siteConfig.sections.qa.title })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: siteConfig.sections.projects.title })
    ).toBeInTheDocument()
  })

  it('renders the contact CTA link with the correct mailto href', () => {
    renderHome()
    const link = screen.getByRole('link', { name: siteConfig.contact.ctaLabel })
    expect(link).toHaveAttribute('href', `mailto:${siteConfig.contact.email}`)
  })
})
