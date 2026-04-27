'use client'

import { m } from 'framer-motion'
import React from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, className }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.45, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </m.div>
)
