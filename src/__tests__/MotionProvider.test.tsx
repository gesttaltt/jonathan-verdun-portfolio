import React from 'react'
import { render, screen } from '@testing-library/react'
import { MotionProvider } from '@/components/MotionProvider'

describe('MotionProvider', () => {
  it('renders its children', () => {
    render(
      <MotionProvider>
        <div>child content</div>
      </MotionProvider>
    )
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <MotionProvider>
        <span>first</span>
        <span>second</span>
      </MotionProvider>
    )
    expect(screen.getByText('first')).toBeInTheDocument()
    expect(screen.getByText('second')).toBeInTheDocument()
  })
})
