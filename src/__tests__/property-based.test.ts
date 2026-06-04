import * as fc from 'fast-check'
import { DefaultCommandProcessor } from '@/lib/services/CommandProcessor'
import { ProjectService } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { en } from '@/lib/i18n/en'
import { es } from '@/lib/i18n/es'
import { buildMetadata } from '@/lib/metadata'

// ─── CommandProcessor (EN) ─────────────────────────────────────────────────────

describe('CommandProcessor — property-based', () => {
  const processor = new DefaultCommandProcessor()

  it('always returns a structured response for any input', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = processor.process(input)
        expect(typeof result).toBe('object')
        expect(typeof result.output).toBe('string')
      })
    )
  })

  it('unknown commands always echo the original input back in the error message', () => {
    const knownCommands = new Set([
      'help',
      'about',
      'projects',
      'contact',
      'ls projects',
      'sudo',
      'clear',
      'limpiar',
      'ls',
      'cd',
      'pwd',
      'cat',
      'email',
      'contacto',
    ])
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => !knownCommands.has(s.toLowerCase().trim())),
        (input) => {
          const result = processor.process(input)
          expect(result.output).toContain(input.trim())
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
        expect(lower).toStrictEqual(upper)
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

// ─── CommandProcessor — prototype-pollution resistance ────────────────────────

describe('CommandProcessor — prototype-pollution resistance', () => {
  const processor = new DefaultCommandProcessor()

  const poisonKeys = [
    '__proto__',
    'constructor',
    'hasOwnProperty',
    'toString',
    'valueOf',
    'prototype',
    '__defineGetter__',
    '__lookupGetter__',
  ]

  it('prototype and built-in Object keys never produce a real command response', () => {
    fc.assert(
      fc.property(fc.constantFrom(...poisonKeys), (key) => {
        const result = processor.process(key)
        expect(result.output).toContain('command not found')
        expect(result.signal).toBeUndefined()
      })
    )
  })
})

// ─── CommandProcessor (ES) ─────────────────────────────────────────────────────

describe('ES CommandProcessor — property-based', () => {
  const esProcessor = new DefaultCommandProcessor(es.terminal.interactive, es.terminal.helpCmd)
  const esKnownCommands = new Set([
    ...Object.keys(es.terminal.interactive),
    'ls',
    'cd',
    'cat',
    'pwd',
    'ls proyectos',
    'limpiar',
  ])

  it('always returns a structured response for any ES input', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = esProcessor.process(input)
        expect(typeof result).toBe('object')
        expect(typeof result.output).toBe('string')
      })
    )
  })

  it('unknown ES commands echo the original input back in the error message', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => !esKnownCommands.has(s.toLowerCase().trim())),
        (input) => {
          const result = esProcessor.process(input)
          expect(result.output).toContain(input.trim())
        }
      )
    )
  })

  it('ES process is case-insensitive for known commands', () => {
    const cases = ['ayuda', 'sobre', 'proyectos', 'contacto', 'sudo']
    fc.assert(
      fc.property(fc.constantFrom(...cases), (cmd) => {
        const lower = esProcessor.process(cmd.toLowerCase())
        const upper = esProcessor.process(cmd.toUpperCase())
        expect(lower).toStrictEqual(upper)
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
        expect(['Deployed', 'QA', 'Prototype', 'Research', 'Archived']).toContain(project.status)
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
    const first = DataEngineeringService.getSystemSpecs()
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), () => {
        expect(DataEngineeringService.getSystemSpecs()).toEqual(first)
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

// ─── BioinformaticsService ───────────────────────────────────────────────────

describe('BioinformaticsService — property-based', () => {
  it('getResearch is deterministic across repeated calls', () => {
    const first = BioinformaticsService.getResearch()
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), () => {
        expect(BioinformaticsService.getResearch()).toEqual(first)
      })
    )
  })

  it('bridge is a non-empty string with appropriate length', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), () => {
        const research = BioinformaticsService.getResearch()
        expect(typeof research.bridge).toBe('string')
        expect(research.bridge.length).toBeGreaterThan(20)
      })
    )
  })

  it('every research spec satisfies invariant constraints', () => {
    const specs = BioinformaticsService.getResearchSpecs()
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
})

// ─── i18n completeness ────────────────────────────────────────────────────────

describe('i18n completeness — property-based', () => {
  it('every EN terminal command entry has a non-empty key and response', () => {
    const entries = Object.entries(en.terminal.interactive) as [string, string][]
    fc.assert(
      fc.property(fc.constantFrom(...entries), ([cmd, response]) => {
        expect(cmd.length).toBeGreaterThan(0)
        expect(response.length).toBeGreaterThan(0)
      })
    )
  })

  it('every ES terminal command entry has a non-empty key and response', () => {
    const entries = Object.entries(es.terminal.interactive) as [string, string][]
    fc.assert(
      fc.property(fc.constantFrom(...entries), ([cmd, response]) => {
        expect(cmd.length).toBeGreaterThan(0)
        expect(response.length).toBeGreaterThan(0)
      })
    )
  })

  it('manifesto is present and non-empty in both locales', () => {
    fc.assert(
      fc.property(fc.constantFrom(en, es), (loc) => {
        expect(typeof loc.qa.manifesto).toBe('string')
        expect(loc.qa.manifesto.length).toBeGreaterThan(50)
      })
    )
  })

  it('bridge is present and non-empty in both locales', () => {
    fc.assert(
      fc.property(fc.constantFrom(en, es), (loc) => {
        expect(typeof loc.bioinformatics.bridge).toBe('string')
        expect(loc.bioinformatics.bridge.length).toBeGreaterThan(20)
      })
    )
  })

  it('ES has at least as many terminal commands as EN', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), () => {
        expect(Object.keys(es.terminal.interactive).length).toBeGreaterThanOrEqual(
          Object.keys(en.terminal.interactive).length
        )
      })
    )
  })

  it('all EN section labels are non-empty strings', () => {
    const labels = [
      en.sections.projects,
      en.sections.architecture,
      en.sections.qa,
      en.sections.bioinformatics,
      en.sections.sidebar.constraintsTitle,
      en.sections.qaContact.title,
      en.sections.qaContact.description,
      en.sections.qaContact.ctaLabel,
    ]
    fc.assert(
      fc.property(fc.constantFrom(...labels), (label) => {
        expect(typeof label).toBe('string')
        expect(label.length).toBeGreaterThan(0)
      })
    )
  })

  it('all ES section labels are non-empty strings', () => {
    const labels = [
      es.sections.projects,
      es.sections.architecture,
      es.sections.qa,
      es.sections.bioinformatics,
      es.sections.sidebar.constraintsTitle,
      es.sections.qaContact.title,
      es.sections.qaContact.description,
      es.sections.qaContact.ctaLabel,
    ]
    fc.assert(
      fc.property(fc.constantFrom(...labels), (label) => {
        expect(typeof label).toBe('string')
        expect(label.length).toBeGreaterThan(0)
      })
    )
  })
})

// ─── buildMetadata URL invariants ─────────────────────────────────────────────

describe('buildMetadata — property-based URL invariants', () => {
  it('canonical URL never contains a double-slash for any locale', () => {
    fc.assert(
      fc.property(fc.constantFrom('en' as const, 'es' as const), (lang) => {
        const m = buildMetadata(lang)
        const canonical = (m.alternates as { canonical: string }).canonical
        expect(canonical.replace(/^https?:\/\//, '')).not.toContain('//')
      })
    )
  })

  it('OG image URL never contains a double-slash for any locale', () => {
    fc.assert(
      fc.property(fc.constantFrom('en' as const, 'es' as const), (lang) => {
        const m = buildMetadata(lang)
        const ogUrl = (m.openGraph as { images: Array<{ url: string }> }).images[0]!.url
        expect(ogUrl.replace(/^https?:\/\//, '')).not.toContain('//')
      })
    )
  })

  it('Twitter image URL never contains a double-slash for any locale', () => {
    fc.assert(
      fc.property(fc.constantFrom('en' as const, 'es' as const), (lang) => {
        const m = buildMetadata(lang)
        const twUrl = (m.twitter as { images: Array<{ url: string }> }).images[0]!.url
        expect(twUrl.replace(/^https?:\/\//, '')).not.toContain('//')
      })
    )
  })

  it('title and description are always non-empty for any locale', () => {
    fc.assert(
      fc.property(fc.constantFrom('en' as const, 'es' as const), (lang) => {
        const m = buildMetadata(lang)
        expect(typeof m.title).toBe('string')
        expect((m.title as string).length).toBeGreaterThan(0)
        expect(typeof m.description).toBe('string')
        expect((m.description as string).length).toBeGreaterThan(0)
      })
    )
  })
})
