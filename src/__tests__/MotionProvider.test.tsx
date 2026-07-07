import { render, screen } from '@testing-library/react'

jest.mock('framer-motion', () => ({
  LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  MotionConfig: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

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
