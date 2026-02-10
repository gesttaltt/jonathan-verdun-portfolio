import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'
import { QA_PHILOSOPHY } from '@/lib/contracts/QAContract'
import * as fc from 'fast-check'

describe('BioinformaticsService Contract (Property-Based)', () => {
  it('should always return a boolean for any string input in validateEpitope', () => {
    fc.assert(
      fc.property(fc.string(), (seq) => {
        const result = BioinformaticsService.validateEpitope(seq)
        return typeof result === 'boolean'
      })
    )
  })

  it('should identify sequences containing ATG as valid epitopes', () => {
    fc.assert(
      fc.property(fc.string(), (suffix) => {
        const seq = 'ATG' + suffix
        return BioinformaticsService.validateEpitope(seq) === true
      })
    )
  })
})

describe('QA Contract Invariants', () => {
  it('should maintain locked status for unit test layer', () => {
    const unitLayer = QA_PHILOSOPHY.specifications.find(s => s.layer === 'unit')
    expect(unitLayer?.status).toBe('locked')
  })

  it('should have non-empty constraints for system integrity', () => {
    expect(QA_PHILOSOPHY.constraints.length).toBeGreaterThan(0)
    QA_PHILOSOPHY.constraints.forEach(c => {
      expect(typeof c).toBe('string')
      expect(c.length).toBeGreaterThan(5)
    })
  })
})