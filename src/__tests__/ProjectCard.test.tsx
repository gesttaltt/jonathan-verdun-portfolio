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

const wrap = (project: ProjectSpec, index = 0) =>
  render(
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="always">
        <ProjectCard project={project} index={index} />
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
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/test/repo')
  })

  it('does not render a link when project.link is absent', () => {
    wrap(baseProject)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
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
})
