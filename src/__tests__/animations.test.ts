import {
  fadeUpVariants,
  fadeInVariants,
  slideDownVariants,
  staggerItemVariants,
  containerVariants,
  SCROLL_VIEWPORT,
} from '@/lib/animations'

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

  describe('containerVariants', () => {
    it('has empty hidden state', () => {
      expect(containerVariants.hidden).toEqual({})
    })

    it('staggers children by 0.1s', () => {
      const t = (containerVariants.visible as { transition: { staggerChildren: number } })
        .transition
      expect(t.staggerChildren).toBe(0.1)
    })

    it('delays children by 0.05s', () => {
      const t = (containerVariants.visible as { transition: { delayChildren: number } }).transition
      expect(t.delayChildren).toBe(0.05)
    })
  })

  describe('SCROLL_VIEWPORT', () => {
    it('fires once', () => {
      expect(SCROLL_VIEWPORT.once).toBe(true)
    })

    it('uses -40px margin', () => {
      expect(SCROLL_VIEWPORT.margin).toBe('-40px')
    })
  })
})
