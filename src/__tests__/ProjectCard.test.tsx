import { render, screen } from '@testing-library/react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'
import type { ProjectSpec } from '@/lib/contracts/ProjectContract.types'

const baseProject: ProjectSpec = {
  id: 'proj-test',
  title: 'Test Project',
  description: 'A test project description.',
  techStack: ['TypeScript', 'React'],
  status: 'Research',
}

const wrap = (project: ProjectSpec) =>
  render(
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="always">
        <ProjectCard project={project} />
      </MotionConfig>
    </LazyMotion>
  )

describe('ProjectCard', () => {
  it('renders the project title', () => {
    wrap(baseProject)
    expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument()
  })

  it('renders the project description', () => {
    wrap(baseProject)
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('renders tech stack items', () => {
    wrap(baseProject)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('renders an external link when project.link is provided', () => {
    wrap({ ...baseProject, link: 'https://github.com/test/repo' })
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/test/repo'
    )
  })

  it('renders a case-study link by default', () => {
    wrap(baseProject)
    expect(screen.getByRole('link', { name: /case study/i })).toBeInTheDocument()
  })

  it('renders stats when present', () => {
    wrap({ ...baseProject, stats: [{ label: 'Coverage', value: '95%' }] })
    expect(screen.getByText('Coverage')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
  })

  it('applies fallback zinc style for an unknown status', () => {
    wrap({ ...baseProject, status: 'Unknown' as ProjectSpec['status'] })
    expect(screen.getByText('Unknown')).toHaveClass('bg-zinc-500/20')
  })

  it('does not render spec link button when specLink is missing', () => {
    wrap(baseProject)
    expect(screen.queryByLabelText(/View .* specification/i)).not.toBeInTheDocument()
  })

  it('does not render external link when link is missing', () => {
    wrap(baseProject)
    expect(screen.queryByLabelText(/opens in new tab/i)).not.toBeInTheDocument()
  })

  it('renders accessory buttons when both specLink and link are provided', () => {
    wrap({
      ...baseProject,
      specLink: 'https://example.com/spec',
      link: 'https://github.com/test/repo',
    })
    expect(screen.getByLabelText(/View .* specification/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/opens in new tab/i)).toBeInTheDocument()
  })

  it('does not render stats section when stats is undefined', () => {
    wrap(baseProject)
    expect(screen.queryByText('Coverage')).not.toBeInTheDocument()
  })

  it('renders multiple stats', () => {
    wrap({
      ...baseProject,
      stats: [
        { label: 'Stars', value: '100' },
        { label: 'Forks', value: '25' },
      ],
    })
    expect(screen.getByText('Stars')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Forks')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('slugifies title for case-study link', () => {
    wrap({ ...baseProject, title: 'My Cool Project!' })
    const link = screen.getByRole('link', { name: /case study/i })
    expect(link).toHaveAttribute('href', '/projects/my-cool-project')
  })

  it('renders tech stack as multiple tags', () => {
    wrap({ ...baseProject, techStack: ['Go', 'Rust', 'Python', 'Docker'] })
    for (const tech of ['Go', 'Rust', 'Python', 'Docker']) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it('renders correct testid', () => {
    wrap({ ...baseProject, id: 'my-project' })
    expect(screen.getByTestId('project-card-my-project')).toBeInTheDocument()
  })
})
