import { ProjectService } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { siteConfig } from '@/lib/siteConfig'
import { en } from '@/lib/i18n/en'
import { es } from '@/lib/i18n/es'

// Recursively collect every string-valued leaf in an object as [dotted.key, value] pairs.
function collectStringLeaves(
  obj: Record<string, unknown>,
  prefix = ''
): Array<[string, string]> {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') return [[key, v]] as Array<[string, string]>
    if (v !== null && typeof v === 'object' && !Array.isArray(v))
      return collectStringLeaves(v as Record<string, unknown>, key)
    return []
  })
}

describe('i18n translation value completeness', () => {
  it('every en.terminal.interactive value is a non-empty string', () => {
    for (const [key, value] of Object.entries(en.terminal.interactive)) {
      expect(typeof value).toBe('string')
      expect(value.trim().length).toBeGreaterThan(0)
      ;(void key) // suppress unused-var lint
    }
  })

  it('every es.terminal.interactive value is a non-empty string', () => {
    for (const [key, value] of Object.entries(es.terminal.interactive)) {
      expect(typeof value).toBe('string')
      expect(value.trim().length).toBeGreaterThan(0)
      ;(void key)
    }
  })

  it('en and es sections.projects labels are not identical (i.e., they are actually translated)', () => {
    expect(en.sections.projects).not.toBe(es.sections.projects)
  })
})

describe('i18n sections string completeness', () => {
  it('no EN sections leaf string is empty', () => {
    const empty = collectStringLeaves(en.sections as unknown as Record<string, unknown>)
      .filter(([, v]) => v.trim() === '')
      .map(([k]) => `en.sections.${k}`)
    expect(empty).toEqual([])
  })

  it('no ES sections leaf string is empty', () => {
    const empty = collectStringLeaves(es.sections as unknown as Record<string, unknown>)
      .filter(([, v]) => v.trim() === '')
      .map(([k]) => `es.sections.${k}`)
    expect(empty).toEqual([])
  })

  it('key UI labels are translated and differ between EN and ES', () => {
    const pairs: Array<[string, string, string]> = [
      ['sidebar.qualityGatesTitle', en.sections.sidebar.qualityGatesTitle, es.sections.sidebar.qualityGatesTitle],
      ['sidebar.ciStatusSuccess', en.sections.sidebar.ciStatusSuccess, es.sections.sidebar.ciStatusSuccess],
      ['qaContact.title', en.sections.qaContact.title, es.sections.qaContact.title],
      ['resume.title', en.sections.resume.title, es.sections.resume.title],
      ['blog.backToBlog', en.sections.blog.backToBlog, es.sections.blog.backToBlog],
      ['contactForm.submitLabel', en.sections.contactForm.submitLabel, es.sections.contactForm.submitLabel],
      ['contactForm.successTitle', en.sections.contactForm.successTitle, es.sections.contactForm.successTitle],
      ['contactForm.validationRequired', en.sections.contactForm.validationRequired, es.sections.contactForm.validationRequired],
    ]
    const untranslated = pairs
      .filter(([, enVal, esVal]) => enVal === esVal)
      .map(([key]) => key)
    expect(untranslated).toEqual([])
  })
})

describe('i18n visualTestSummary completeness', () => {
  it('no EN visualTestSummary leaf string is empty', () => {
    const empty = collectStringLeaves(en.visualTestSummary as unknown as Record<string, unknown>)
      .filter(([, v]) => v.trim() === '')
      .map(([k]) => `en.visualTestSummary.${k}`)
    expect(empty).toEqual([])
  })

  it('no ES visualTestSummary leaf string is empty', () => {
    const empty = collectStringLeaves(es.visualTestSummary as unknown as Record<string, unknown>)
      .filter(([, v]) => v.trim() === '')
      .map(([k]) => `es.visualTestSummary.${k}`)
    expect(empty).toEqual([])
  })

  it('regressionDetected contains {count} placeholder in both locales', () => {
    expect(en.visualTestSummary.regressionDetected).toContain('{count}')
    expect(es.visualTestSummary.regressionDetected).toContain('{count}')
  })

  it('key visualTestSummary strings are translated and differ between EN and ES', () => {
    expect(en.visualTestSummary.title).not.toBe(es.visualTestSummary.title)
    expect(en.visualTestSummary.regressionDetected).not.toBe(es.visualTestSummary.regressionDetected)
  })
})

describe('i18n metadata consistency', () => {
  it('has a non-empty description in both locales', () => {
    expect(en.description.length).toBeGreaterThan(0)
    expect(es.description.length).toBeGreaterThan(0)
  })

  it('descriptions are distinct (translated)', () => {
    expect(en.description).not.toBe(es.description)
  })
})

describe('i18n ↔ contract sync — projects', () => {
  const contractIds = ProjectService.getProjects()
    .map((p) => p.id)
    .sort()

  it('ES locale has the same number of projects as the contract', () => {
    expect(es.projects.length).toBe(contractIds.length)
  })

  it('ES locale project IDs exactly match contract IDs', () => {
    const esIds = es.projects.map((p) => p.id).sort()
    expect(esIds).toEqual(contractIds)
  })

  it('every ES project has a non-empty translated title and description', () => {
    es.projects.forEach((p) => {
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
    })
  })
})

describe('i18n ↔ contract sync — architecture specs', () => {
  const contractIds = DataEngineeringService.getSystemSpecs()
    .map((s) => s.id)
    .sort()

  it('ES locale has the same number of architecture specs as the contract', () => {
    expect(es.architecture.specs.length).toBe(contractIds.length)
  })

  it('ES locale architecture spec IDs exactly match contract IDs', () => {
    const esIds = es.architecture.specs.map((s) => s.id).sort()
    expect(esIds).toEqual(contractIds)
  })
})

describe('i18n ↔ contract sync — bioinformatics specs', () => {
  const contractIds = BioinformaticsService.getResearchSpecs()
    .map((s) => s.id)
    .sort()

  it('ES locale has the same number of bioinformatics specs as the contract', () => {
    expect(es.bioinformatics.specs.length).toBe(contractIds.length)
  })

  it('ES locale bioinformatics spec IDs exactly match contract IDs', () => {
    const esIds = es.bioinformatics.specs.map((s) => s.id).sort()
    expect(esIds).toEqual(contractIds)
  })
})

describe('i18n ↔ siteConfig sync — workHistoryDescriptions', () => {
  const orgs = siteConfig.workHistory.map((e) => e.organization)

  it('en.workHistoryDescriptions has an entry for every work history org', () => {
    orgs.forEach((org) => {
      expect(en.workHistoryDescriptions).toHaveProperty(org)
      expect(en.workHistoryDescriptions[org]!.length).toBeGreaterThan(0)
    })
  })

  it('es.workHistoryDescriptions has an entry for every work history org', () => {
    orgs.forEach((org) => {
      expect(es.workHistoryDescriptions).toHaveProperty(org)
      expect(es.workHistoryDescriptions[org]!.length).toBeGreaterThan(0)
    })
  })
})
