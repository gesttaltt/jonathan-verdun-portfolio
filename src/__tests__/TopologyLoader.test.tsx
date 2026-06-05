import React from 'react'
import { render } from '@testing-library/react'

// next/dynamic is mocked to return the loading component synchronously.
// This tests the skeleton that renders while WebGL initialises.
// The factory's timer logic (500ms defer, 3s WebGL fallback) requires
// exporting the factory separately from TopologyLoader.tsx, or e2e coverage.
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (_importFn: unknown, options: { loading?: () => React.JSX.Element }) => {
    return options?.loading ?? (() => null)
  },
}))

jest.mock('@/components/InteractiveTopology', () => ({
  InteractiveTopology: () => React.createElement('div', { 'data-testid': 'topology' }),
}))

import { TopologyLoader } from '@/components/TopologyLoader'

describe('TopologyLoader — loading skeleton', () => {
  it('loading skeleton covers the full viewport', () => {
    const { container } = render(<TopologyLoader />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('fixed')
    expect(el).toHaveClass('inset-0')
    expect(el).toHaveClass('z-0')
  })

  it('loading skeleton uses the deep background token', () => {
    const { container } = render(<TopologyLoader />)
    expect(container.firstChild).toHaveClass('bg-bg-deep')
  })

  it('loading skeleton contains the scan-line indicator', () => {
    const { container } = render(<TopologyLoader />)
    expect(container.querySelector('.scanline')).toBeInTheDocument()
  })
})
