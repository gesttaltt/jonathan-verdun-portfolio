import { BioinformaticsService } from '@/lib/contracts/BioinformaticsContract'

describe('BioinformaticsService Contract', () => {
  it('should validate epitopes correctly', () => {
    expect(BioinformaticsService.validateEpitope('ATG-SEQUENCE')).toBe(true)
    expect(BioinformaticsService.validateEpitope('CG-NO-START')).toBe(false)
  })

  it('should return defined research specifications', () => {
    const specs = BioinformaticsService.getResearchSpecs()
    expect(specs.length).toBeGreaterThan(0)
    expect(specs[0]).toHaveProperty('focus')
    expect(specs[0]).toHaveProperty('invariants')
  })
})
