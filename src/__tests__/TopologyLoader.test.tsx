import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

// TopologyLoader renders its loading skeleton (TopologyWrapper) synchronously
// on first render, before the load-topology effect resolves — so the
// skeleton tests below need no special mocking. The factory logic is tested
// separately via the exported loadTopology function.
jest.mock('@/components/InteractiveTopology', () => ({
  InteractiveTopology: () => React.createElement('div', { 'data-testid': 'topology' }),
}))

import { TopologyLoader, loadTopology } from '@/components/TopologyLoader'

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

describe('TopologyLoader — mount independence', () => {
  // Regression test: TopologyLoader used to wrap loadTopology() in next/dynamic,
  // which resolves and caches the loaded component once for the module's
  // lifetime. If an earlier mount lost the race to the 3s WebGL fallback, every
  // later mount (e.g. navigating away and back) was stuck rendering the null
  // fallback forever. It must instead attempt a fresh load on every mount.
  it('loads the real component again on a second mount', async () => {
    const { unmount } = render(<TopologyLoader />)
    await waitFor(() => expect(screen.getByTestId('topology')).toBeInTheDocument())
    unmount()

    render(<TopologyLoader />)
    await waitFor(() => expect(screen.getByTestId('topology')).toBeInTheDocument())
  })
})

describe('loadTopology — factory behavior', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('does not trigger the import before the 500ms defer', () => {
    const importFn = jest.fn().mockResolvedValue({ InteractiveTopology: () => null })
    loadTopology(importFn)
    jest.advanceTimersByTime(499)
    expect(importFn).not.toHaveBeenCalled()
  })

  it('resolves to InteractiveTopology after the 500ms defer', async () => {
    const MockTopology: React.ComponentType = () => null
    const importFn = jest.fn().mockResolvedValue({ InteractiveTopology: MockTopology })

    const promise = loadTopology(importFn)
    jest.advanceTimersByTime(500)

    expect(await promise).toBe(MockTopology)
    expect(importFn).toHaveBeenCalledTimes(1)
  })

  it('resolves to a null component and warns when the 3s WebGL fallback fires', async () => {
    const importFn = jest.fn().mockReturnValue(new Promise(() => {})) // never resolves
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const promise = loadTopology(importFn)
    // Advancing 3000ms fires both the 500ms load timer (importFn called, pending)
    // and the 3s fallback timer (resolves because import never settled).
    jest.advanceTimersByTime(3000)

    const Component = await promise
    expect((Component as () => null)()).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith(
      '[TopologyLoader] WebGL initialization timed out — using CSS fallback'
    )
    warnSpy.mockRestore()
  })

  it('resolves to a null component and logs an error when the import rejects', async () => {
    const importFn = jest.fn().mockRejectedValue(new Error('WebGL unavailable'))
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const promise = loadTopology(importFn)
    jest.advanceTimersByTime(500)

    // await here yields to the microtask queue, letting the .catch() handler run
    // and resolve the outer promise before we inspect the result.
    const Component = await promise
    expect((Component as () => null)()).toBeNull()
    expect(errSpy).toHaveBeenCalledWith(
      '[TopologyLoader] Failed to load WebGL module:',
      expect.any(Error)
    )
    errSpy.mockRestore()
  })
})
