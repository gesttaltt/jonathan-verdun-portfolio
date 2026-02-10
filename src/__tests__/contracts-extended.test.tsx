import { BioinformaticsService, ResearchSpec } from '@/lib/contracts/BioinformaticsContract'
import * as fc from 'fast-check'

describe('BioinformaticsService - High-Dimensional Modeling', () => {
  it('should maintain deterministic output for research specs', () => {
    const specs1 = BioinformaticsService.getResearchSpecs()
    const specs2 = BioinformaticsService.getResearchSpecs()
    expect(specs1).toEqual(specs2)
  })

  it('should have PTM-aware invariants for Arthritis research', () => {
    const arthritisSpec = BioinformaticsService.getResearchSpecs().find(s => s.focus === 'Arthritis')
    expect(arthritisSpec?.invariants).toContain('PTM-Awareness')
  })

  it('should validate epitopes for a variety of valid start sequences', () => {
    const validStarts = ['ATG', 'ATG-CODON', 'ATGCGA', 'ATG-REPRESENTATION']
    validStarts.forEach(seq => {
      expect(BioinformaticsService.validateEpitope(seq)).toBe(true)
    })
  })

  it('should fail validation for empty or null-like sequences', () => {
    expect(BioinformaticsService.validateEpitope('')).toBe(false)
    expect(BioinformaticsService.validateEpitope('A')).toBe(false)
    expect(BioinformaticsService.validateEpitope('AT')).toBe(false)
  })
})
