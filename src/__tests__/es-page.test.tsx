import { render, screen } from '@testing-library/react'
import SpanishPage from '@/app/(es)/es/page'
import { ProjectProvider } from '@/components/hooks/useProjects'
import { es } from '@/lib/i18n/es'
import { ThemeProvider } from '@/lib/theme/context'
import { I18nProvider } from '@/lib/i18n/context'
import { setMockPathname } from '../../jest.setup'

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

const renderSpanishPage = () =>
  render(
    <ThemeProvider>
      <I18nProvider>
        <ProjectProvider>
          <SpanishPage />
        </ProjectProvider>
      </I18nProvider>
    </ThemeProvider>
  )

describe('SpanishPage', () => {
  beforeEach(() => {
    setMockPathname('/es')
  })

  it('renders the name Jonathan Verdun in a heading', () => {
    renderSpanishPage()
    expect(screen.getByRole('heading', { name: /Jonathan Verdun/i })).toBeInTheDocument()
  })

  it('has the skip-nav target id on the main landmark', () => {
    renderSpanishPage()
    expect(document.getElementById('main-content')).not.toBeNull()
  })

  it('renders primary section headings in Spanish', () => {
    renderSpanishPage()
    expect(screen.getByRole('heading', { name: es.sections.qa })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: es.sections.projects })).toBeInTheDocument()
  })
})
