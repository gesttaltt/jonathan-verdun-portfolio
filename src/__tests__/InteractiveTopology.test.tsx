import React from 'react'
import { render } from '@testing-library/react'

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => null,
}))

jest.mock('@react-three/fiber', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured only to omit it from ...props below
  Canvas: ({ children, onCreated, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="r3f-canvas" {...props}>
      {children}
    </div>
  ),
}))

jest.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }: React.PropsWithChildren) => <>{children}</>,
  Bloom: () => null,
  Vignette: () => null,
}))

import { InteractiveTopology } from '@/components/InteractiveTopology'

describe('InteractiveTopology', () => {
  it('renders the canvas wrapper with a descriptive aria-label for accessibility', () => {
    const { getByTestId } = render(<InteractiveTopology />)
    const canvas = getByTestId('r3f-canvas')
    expect(canvas).toHaveAttribute('aria-hidden', 'false')
    expect(canvas).toHaveAttribute('aria-label', 'Interactive p-adic bio-simulation background')
    expect(canvas).toHaveAttribute('tabIndex', '-1')
  })

  it('renders the grid overlay div', () => {
    const { container } = render(<InteractiveTopology />)
    const grid = container.querySelector('.pointer-events-none.absolute.inset-0')
    expect(grid).not.toBeNull()
  })

  it('renders inside a fixed full-viewport wrapper', () => {
    const { container } = render(<InteractiveTopology />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('fixed')
    expect(wrapper.className).toContain('inset-0')
  })
})
