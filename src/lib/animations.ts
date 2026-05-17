import type { Variants } from 'framer-motion'

// Timing scale: micro (0.2s) · enter (0.5s) · hero (0.7s)
const TIMING = {
  micro: 0.25,
  enter: 0.6,
  hero: 0.8,
} as const

// Mechanical 'Quint' Easing — sharp entry, smooth settlement
const EASING = [0.16, 1, 0.3, 1] as const

export const SCROLL_VIEWPORT = { once: true, margin: '-20px' } as const

export const fadeUpVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: TIMING.enter, ease: EASING },
  },
})

// Alias — identical behaviour, semantic distinction preserved for call-site clarity.
export const fadeInVariants = fadeUpVariants

export const containerVariants = (stagger = 0.1): Variants => ({
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
    transition: { delay, duration: TIMING.micro, ease: EASING },
  },
})
