import { render, screen } from '@testing-library/react'
import Home from '@/app/(en)/page'
import { ProjectProvider } from '@/components/hooks/useProjects'
import { en } from '@/lib/i18n/en'
import { ThemeProvider } from '@/lib/theme/context'
import { I18nProvider } from '@/lib/i18n/context'

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

const renderHome = () =>
  render(
    <ThemeProvider>
      <I18nProvider>
        <ProjectProvider>
          <Home />
        </ProjectProvider>
      </I18nProvider>
    </ThemeProvider>
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
    expect(screen.getByRole('heading', { name: en.sections.qa })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: en.sections.projects })).toBeInTheDocument()
  })

  it('renders the contact section with heading and disabled form notice', () => {
    renderHome()
    expect(screen.getByRole('heading', { name: en.sections.qaContact.title })).toBeInTheDocument()
    expect(screen.getByText(en.sections.qaContact.description)).toBeInTheDocument()
    // ContactForm renders a disabled notice when NEXT_PUBLIC_FORMSPREE_ID is not set
    expect(screen.getByText(en.sections.contactForm.formDisabled)).toBeInTheDocument()
  })
})
