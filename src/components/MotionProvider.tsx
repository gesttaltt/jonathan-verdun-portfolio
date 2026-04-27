'use client'

import React from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'

const loadFeatures = () => import('framer-motion').then((m) => m.domAnimation)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
