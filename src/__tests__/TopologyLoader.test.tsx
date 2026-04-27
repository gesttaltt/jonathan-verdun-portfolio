import React from 'react'
import { render } from '@testing-library/react'

// Intercept next/dynamic before TopologyLoader is evaluated.
// Returns the loading component synchronously so we can assert the skeleton.
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (_importFn: unknown, options: { loading?: () => React.JSX.Element }) => {
    return options?.loading ?? (() => null)
  },
}))

// Import after the mock is registered
import { TopologyLoader } from '@/components/TopologyLoader'

describe('TopologyLoader', () => {
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
