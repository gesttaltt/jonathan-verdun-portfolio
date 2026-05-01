import { ProjectService, PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'

describe('ProjectService', () => {
  let projects: ProjectSpec[]

  beforeAll(() => {
    projects = ProjectService.getProjects()
  })

  it('should return an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('should have required fields on every project', () => {
    projects.forEach((project) => {
      expect(project.id).toBeDefined()
      expect(typeof project.id).toBe('string')
      expect(project.title).toBeDefined()
      expect(typeof project.title).toBe('string')
      expect(project.description).toBeDefined()
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.techStack)).toBe(true)
      expect(project.techStack.length).toBeGreaterThan(0)
      expect(['Deployed', 'QA', 'Prototype', 'Research', 'Archived']).toContain(project.status)
    })
  })

  it('should have unique IDs across all projects', () => {
    const ids = projects.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have non-empty tech stacks with string items', () => {
    projects.forEach((project) => {
      project.techStack.forEach((tech) => {
        expect(typeof tech).toBe('string')
        expect(tech.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have valid stats shape when stats are present', () => {
    projects.forEach((project) => {
      if (project.stats) {
        project.stats.forEach((stat) => {
          expect(typeof stat.label).toBe('string')
          expect(typeof stat.value).toBe('string')
        })
      }
    })
  })

  it('getProjects returns the same reference as PROJECT_DATA', () => {
    expect(ProjectService.getProjects()).toBe(PROJECT_DATA)
  })
})
