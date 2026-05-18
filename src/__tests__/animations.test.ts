import {
  fadeUpVariants,
  fadeInVariants,
  containerVariants,
  slideDownVariants,
  staggerItemVariants,
  DEFAULT_STAGGER,
  SCROLL_VIEWPORT,
} from '@/lib/animations'

describe('animations', () => {
  describe('fadeUpVariants', () => {
    it('returns correct hidden state', () => {
      const v = fadeUpVariants()
      expect(v.hidden).toEqual({ opacity: 0, y: 15 })
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

  describe('fadeInVariants (alias of fadeUpVariants)', () => {
    it('is the same function reference as fadeUpVariants', () => {
      expect(fadeInVariants).toBe(fadeUpVariants)
    })

    it('returns correct hidden state', () => {
      const v = fadeInVariants()
      expect(v.hidden).toEqual({ opacity: 0, y: 15 })
    })

    it('uses the provided delay', () => {
      const v = fadeInVariants(0.2)
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0.2)
    })
  })

  describe('containerVariants', () => {
    it('returns correct hidden state', () => {
      const v = containerVariants()
      expect(v.hidden).toEqual({ opacity: 0 })
    })

    it('uses DEFAULT_STAGGER by default', () => {
      const v = containerVariants()
      expect(
        (v.visible as { transition: { staggerChildren: number } }).transition.staggerChildren
      ).toBe(DEFAULT_STAGGER)
    })

    it('uses the provided stagger value', () => {
      const v = containerVariants(0.25)
      expect(
        (v.visible as { transition: { staggerChildren: number } }).transition.staggerChildren
      ).toBe(0.25)
    })
  })

  describe('staggerItemVariants', () => {
    it('returns correct hidden state', () => {
      const v = staggerItemVariants()
      expect(v.hidden).toEqual({ opacity: 0, y: 12 })
    })

    it('uses delay=0 by default', () => {
      const v = staggerItemVariants()
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0)
    })

    it('uses the provided delay', () => {
      const v = staggerItemVariants(0.5)
      expect((v.visible as { transition: { delay: number } }).transition.delay).toBe(0.5)
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

  describe('SCROLL_VIEWPORT', () => {
    it('fires once', () => {
      expect(SCROLL_VIEWPORT.once).toBe(true)
    })

    it('uses -20px margin', () => {
      expect(SCROLL_VIEWPORT.margin).toBe('-20px')
    })
  })
})
