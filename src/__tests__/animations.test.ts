import { fadeUpVariants, fadeInVariants, slideDownVariants } from '@/lib/animations'

describe('animations', () => {
  describe('fadeUpVariants', () => {
    it('returns correct hidden state', () => {
      const v = fadeUpVariants()
      expect(v.hidden).toEqual({ opacity: 0, y: 20 })
    })

    it('uses delay=0 by default', () => {
      const v = fadeUpVariants()
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0)
    })

    it('uses the provided delay', () => {
      const v = fadeUpVariants(0.3)
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0.3)
    })
  })

  describe('fadeInVariants', () => {
    it('returns correct hidden state', () => {
      const v = fadeInVariants()
      expect(v.hidden).toEqual({ opacity: 0, y: 20 })
    })

    it('uses delay=0 by default', () => {
      const v = fadeInVariants()
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0)
    })

    it('uses the provided delay', () => {
      const v = fadeInVariants(0.2)
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0.2)
    })
  })

  describe('slideDownVariants', () => {
    it('returns correct hidden state', () => {
      expect(slideDownVariants.hidden).toEqual({ opacity: 0, y: -20 })
    })

    it('returns correct visible state', () => {
      expect((slideDownVariants.visible as { opacity: number }).opacity).toBe(1)
    })
  })
})
