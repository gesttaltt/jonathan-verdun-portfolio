'use client'

import { m } from 'framer-motion'
import React from 'react'
import { fadeInVariants } from '@/lib/animations'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, className }) => (
  <m.div
    variants={fadeInVariants(delay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    className={className}
  >
    {children}
  </m.div>
)
