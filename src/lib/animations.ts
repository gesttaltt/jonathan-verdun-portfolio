import type { Variants } from 'framer-motion'

// Timing scale: fast (0.25s) · standard (0.6s) · hero (0.8s)
const TIMING = {
  fast: 0.25,
  standard: 0.6,
  hero: 0.8,
} as const

// Mechanical 'Quint' Easing — sharp entry, smooth settlement
const EASING = [0.16, 1, 0.3, 1] as const

// Default stagger delay between children in a container
export const DEFAULT_STAGGER = 0.1 as const

export const SCROLL_VIEWPORT = { once: true, margin: '-20px' } as const

export const fadeUpVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: TIMING.standard, ease: EASING },
  },
})

// Alias — identical behaviour, semantic distinction preserved for call-site clarity.
export const fadeInVariants = fadeUpVariants

export const containerVariants = (stagger: number = DEFAULT_STAGGER): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
    },
  },
})

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: TIMING.hero, ease: EASING } },
}

export const staggerItemVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: TIMING.fast, ease: EASING },
  },
})
