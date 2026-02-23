/**
 * @file animations.ts
 * Centralized Framer Motion animation variants registry.
 * Import from here rather than defining inline to ensure visual consistency.
 */
import type { Variants } from 'framer-motion'

/** Fade up with configurable delay — used for staggered list items */
export const fadeUpVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: 'easeOut' },
  },
})

/** Section-level slide-in from the top */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** Stagger container — children animate one after another */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/** Generic stagger child — pair with staggerContainerVariants */
export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

/** Ambient float — for background decorative elements */
export const floatVariants = (duration = 20): object => ({
  animate: {
    x: [0, 100, 0],
    y: [0, -50, 0],
    scale: [1, 1.2, 1],
  },
  transition: { duration, repeat: Infinity, ease: 'linear' },
})
