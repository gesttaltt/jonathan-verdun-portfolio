import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import * as fc from 'fast-check'

describe('BioinformaticsService - High-Dimensional Modeling', () => {
  it('should maintain deterministic output for research specs', () => {
    const specs1 = BioinformaticsService.getResearchSpecs()
    const specs2 = BioinformaticsService.getResearchSpecs()
    expect(specs1).toEqual(specs2)
  })

  it('should have PTM-aware invariants for Arthritis research', () => {
    const arthritisSpec = BioinformaticsService.getResearchSpecs().find(
      (s) => s.focus === 'Arthritis'
    )
    expect(arthritisSpec?.invariants).toContain('PTM-Awareness')
  })

  it('should verify invariants for all research specs', () => {
    const specs = BioinformaticsService.getResearchSpecs()
    specs.forEach((spec) => {
      expect(spec.invariants.length).toBeGreaterThan(0)
      spec.invariants.forEach((invariant) => {
        expect(typeof invariant).toBe('string')
        expect(invariant.length).toBeGreaterThan(0)
      })
    })
  })
})
