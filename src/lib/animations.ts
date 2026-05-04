import type { Variants } from 'framer-motion'

// Timing scale: micro (0.3s) · enter (0.45s) · hero (0.55s)

export const SCROLL_VIEWPORT = { once: true, margin: '-40px' } as const

export const fadeUpVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.45, ease: 'easeOut' },
  },
})

export const fadeInVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.45, ease: 'easeOut' },
  },
})

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// Stagger container — wrap a list; children declare variants={staggerItemVariants()}
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerItemVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.3, ease: 'easeOut' },
  },
})
