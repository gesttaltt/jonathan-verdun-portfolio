import React from 'react'
import { render, type RenderResult } from '@testing-library/react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'

/** Wrap any element in the standard LazyMotion + MotionConfig shell used in animation tests. */
export function renderWithMotion(ui: React.ReactElement): RenderResult {
  return render(
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="always">{ui}</MotionConfig>
    </LazyMotion>
  )
}
