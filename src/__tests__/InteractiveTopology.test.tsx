import React from 'react'
import { render } from '@testing-library/react'

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
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

jest.mock('@/components/TopologyMesh', () => ({
  TopologyMesh: () => <div data-testid="topology-mesh" />,
}))

import { InteractiveTopology } from '@/components/InteractiveTopology'

describe('InteractiveTopology', () => {
  it('renders the canvas wrapper with a descriptive aria-label for accessibility', () => {
    const { getByTestId } = render(<InteractiveTopology />)
    const canvas = getByTestId('r3f-canvas')
    expect(canvas).toHaveAttribute('aria-hidden', 'false')
    expect(canvas).toHaveAttribute('aria-label')
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
