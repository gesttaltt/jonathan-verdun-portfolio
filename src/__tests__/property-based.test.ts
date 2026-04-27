import * as fc from 'fast-check'
import { DefaultCommandProcessor } from '@/lib/services/CommandProcessor'
import { ProjectService } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'

// ─── CommandProcessor ──────────────────────────────────────────────────────────

describe('CommandProcessor — property-based', () => {
  const processor = new DefaultCommandProcessor()

  it('always returns a string for any input', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = processor.process(input)
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
      })
    )
  })

  it('unknown commands always echo the original input back in the error message', () => {
    const knownCommands = new Set(['help', 'about', 'projects', 'contact', 'ls projects', 'sudo'])
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => !knownCommands.has(s.toLowerCase().trim())),
        (input) => {
          const result = processor.process(input)
          expect(result).toContain(input.trim())
        }
      )
    )
  })

  it('process is case-insensitive for known commands', () => {
    const cases = ['help', 'about', 'projects', 'contact', 'sudo']
    fc.assert(
      fc.property(fc.constantFrom(...cases), (cmd) => {
        const lower = processor.process(cmd.toLowerCase())
        const upper = processor.process(cmd.toUpperCase())
        expect(lower).toBe(upper)
      })
    )
  })

  it('empty-ish inputs (whitespace only) do not throw', () => {
    fc.assert(
      fc.property(fc.stringMatching(/^\s*$/), (input) => {
        expect(() => processor.process(input)).not.toThrow()
      })
    )
  })
})

// ─── ProjectService ────────────────────────────────────────────────────────────

describe('ProjectService — property-based', () => {
  const projects = ProjectService.getProjects()

  it('getProjects is deterministic across repeated calls', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), () => {
        expect(ProjectService.getProjects()).toEqual(projects)
      })
    )
  })

  it('every project satisfies the required shape invariants', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        expect(typeof project.id).toBe('string')
        expect(project.id.length).toBeGreaterThan(0)
        expect(typeof project.title).toBe('string')
        expect(project.title.length).toBeGreaterThan(0)
        expect(typeof project.description).toBe('string')
        expect(project.description.length).toBeGreaterThan(0)
        expect(Array.isArray(project.techStack)).toBe(true)
        expect(project.techStack.length).toBeGreaterThan(0)
        project.techStack.forEach((tech) => {
          expect(typeof tech).toBe('string')
          expect(tech.length).toBeGreaterThan(0)
        })
        expect(['Deployed', 'Prototype', 'Research', 'Archived']).toContain(project.status)
      })
    )
  })

  it('all project IDs are globally unique across the dataset', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), () => {
        const ids = ProjectService.getProjects().map((p) => p.id)
        expect(new Set(ids).size).toBe(ids.length)
      })
    )
  })

  it('stats entries always have non-empty label and value when present', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        if (project.stats) {
          project.stats.forEach((stat) => {
            expect(typeof stat.label).toBe('string')
            expect(stat.label.length).toBeGreaterThan(0)
            expect(typeof stat.value).toBe('string')
            expect(stat.value.length).toBeGreaterThan(0)
          })
        }
      })
    )
  })
})

// ─── DataEngineeringService ────────────────────────────────────────────────────

describe('DataEngineeringService — property-based', () => {
  it('getSystemSpecs is deterministic across repeated calls', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), () => {
        expect(DataEngineeringService.getSystemSpecs()).toEqual(
          DataEngineeringService.getSystemSpecs()
        )
      })
    )
  })

  it('every spec satisfies invariant constraints — each invariant is a non-empty string', () => {
    const specs = DataEngineeringService.getSystemSpecs()
    fc.assert(
      fc.property(fc.constantFrom(...specs), (spec) => {
        expect(spec.invariants.length).toBeGreaterThan(0)
        spec.invariants.forEach((inv) => {
          expect(typeof inv).toBe('string')
          expect(inv.length).toBeGreaterThan(0)
        })
      })
    )
  })

  it('all spec IDs are unique', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), () => {
        const ids = DataEngineeringService.getSystemSpecs().map((s) => s.id)
        expect(new Set(ids).size).toBe(ids.length)
      })
    )
  })
})
