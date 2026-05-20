import { render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n/context'
import { en } from '@/lib/i18n/en'
import { ProjectDetail } from '@/components/ProjectDetail'
import { setMockPathname } from '../../jest.setup'

describe('ProjectDetail', () => {
  const existingProjectId = (() => {
    const id = en.projects[0]?.id
    if (!id) {
      throw new Error('Expected at least one English project for ProjectDetail tests')
    }
    return id
  })()

  beforeEach(() => {
    setMockPathname('/')
  })

  it('renders project detail for a valid project id (EN)', () => {
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(en.projects[0]?.title ?? '')).toBeInTheDocument()
    expect(screen.getByText('Back to Projects')).toBeInTheDocument()
  })

  it('renders Spanish labels when locale is /es', () => {
    setMockPathname('/es/projects/test')
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    expect(screen.getByText('Volver a Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Resumen del Proyecto')).toBeInTheDocument()
    expect(screen.getByText('Tecnologías')).toBeInTheDocument()
  })

  it('renders metrics section when project has stats', () => {
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    expect(screen.getByText(/metrics/i)).toBeInTheDocument()
  })

  it('renders highlights section when project has highlights', () => {
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    const project = en.projects.find((p) => p.id === existingProjectId)
    if (project?.highlights) {
      expect(screen.getByText('Key Results')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1)
    }
  })

  it('renders architecture section when project has architecture', () => {
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    const project = en.projects.find((p) => p.id === existingProjectId)
    if (project?.architecture) {
      expect(screen.getByText('Architecture')).toBeInTheDocument()
    }
  })

  it('renders related links section when project has extra links', () => {
    render(
      <I18nProvider>
        <ProjectDetail projectId={existingProjectId} />
      </I18nProvider>
    )

    const project = en.projects.find((p) => p.id === existingProjectId)
    if (project?.links && project.links.length > 0) {
      expect(screen.getByText('Related Links')).toBeInTheDocument()
    }
  })

  it('returns null and warns when project id is not found', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { container } = render(
      <I18nProvider>
        <ProjectDetail projectId="missing-id" />
      </I18nProvider>
    )

    expect(container.firstChild).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith('[ProjectDetail] Project not found for id: missing-id')
    warnSpy.mockRestore()
  })
})
