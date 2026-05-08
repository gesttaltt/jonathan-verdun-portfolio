import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import {
  generateLsOutput,
  BOOT_COMMANDS,
  INTERACTIVE_COMMANDS,
  TERMINAL_PROMPT,
} from '@/lib/contracts/TerminalContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { ProjectSpec } from '@/lib/contracts/ProjectContract.types'
import { ProjectService } from '@/lib/contracts/ProjectContract'

describe('DataEngineeringService', () => {
  it('returns valid system specs', () => {
    const specs = DataEngineeringService.getSystemSpecs()
    expect(specs.length).toBeGreaterThan(0)
    expect(specs[0].id).toBeDefined()
  })
})

describe('BioinformaticsService', () => {
  it('returns valid research specs', () => {
    const specs = BioinformaticsService.getResearchSpecs()
    expect(specs.length).toBeGreaterThan(0)
    expect(specs[0].id).toBeDefined()
  })
})

describe('ProjectService', () => {
  it('returns valid projects', () => {
    const projects = ProjectService.getProjects()
    expect(projects.length).toBeGreaterThan(0)
    expect(projects[0].id).toBeDefined()
  })
})

describe('TerminalContract — generateLsOutput', () => {
  it('assigns directory perms to QA projects and file perms to others', () => {
    const mockProjects: ProjectSpec[] = [
      { id: '1', title: 'QA Proj', status: 'QA', techStack: [], description: '' },
      { id: '2', title: 'Other Proj', status: 'Research', techStack: [], description: '' },
    ]
    const output = generateLsOutput(mockProjects)
    expect(output).toContain('drwxr-xr-x 1 gestalt staff  QA-Proj')
    expect(output).toContain('-rw-r--r-- 1 gestalt staff  Other-Proj')
  })

  it('handles empty projects array', () => {
    expect(generateLsOutput([])).toBe('')
  })

  it('exports valid boot and interactive commands', () => {
    expect(BOOT_COMMANDS.length).toBeGreaterThan(0)
    expect(Object.keys(INTERACTIVE_COMMANDS).length).toBeGreaterThan(0)
    expect(typeof TERMINAL_PROMPT).toBe('string')
  })
})

describe('QA Contract Invariants', () => {
  it('should maintain stable status for unit test layer', () => {
    const unitLayer = QA_PHILOSOPHY.specifications.find((s) => s.layer === 'unit')
    expect(unitLayer?.status).toBe('stable')
  })

  it('should have non-empty constraints for system integrity', () => {
    expect(QA_PHILOSOPHY.constraints.length).toBeGreaterThan(0)
    QA_PHILOSOPHY.constraints.forEach((c) => {
      expect(typeof c).toBe('string')
      expect(c.length).toBeGreaterThan(5)
    })
  })

  it('every specification has a non-empty objective', () => {
    expect(QA_PHILOSOPHY.specifications.length).toBeGreaterThan(0)
    QA_PHILOSOPHY.specifications.forEach((spec) => {
      expect(typeof spec.objective).toBe('string')
      expect(spec.objective.length).toBeGreaterThan(0)
    })
  })
})
