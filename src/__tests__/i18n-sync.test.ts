import { ProjectService } from '@/lib/contracts/ProjectContract'
import { DataEngineeringService } from '@/lib/contracts/DataEngineeringContract'
import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { siteConfig } from '@/lib/siteConfig'
import { en } from '@/lib/i18n/en'
import { es } from '@/lib/i18n/es'

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
