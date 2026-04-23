import React from 'react'
import { render, screen, renderHook } from '@testing-library/react'
import { ProjectProvider, useProjects } from '@/components/hooks/useProjects'
import type { IProjectRepository } from '@/lib/services/ProjectRepository'
import type { ProjectSpec } from '@/lib/contracts/ProjectContract.types'

const mockProject: ProjectSpec = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project',
  status: 'Deployed',
  techStack: ['TypeScript'],
}

const mockAdapter: IProjectRepository = {
  getProjects: jest.fn(() => [mockProject]),
}

describe('useProjects', () => {
  it('returns projects from the injected adapter', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProjectProvider adapter={mockAdapter}>{children}</ProjectProvider>
    )
    const { result } = renderHook(() => useProjects(), { wrapper })
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('test-project')
  })

  it('throws when consumed outside a ProjectProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useProjects())).toThrow(
      'useProjects must be used within a ProjectProvider'
    )
    consoleSpy.mockRestore()
  })

  it('uses StaticProjectAdapter by default when no adapter is injected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ProjectProvider>{children}</ProjectProvider>
    )
    const { result } = renderHook(() => useProjects(), { wrapper })
    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current.length).toBeGreaterThan(0)
  })

  it('renders children and makes projects accessible via context', () => {
    function Consumer() {
      const projects = useProjects()
      return (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )
    }
    render(
      <ProjectProvider adapter={mockAdapter}>
        <Consumer />
      </ProjectProvider>
    )
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })
})
