'use client'

import dynamic from 'next/dynamic'
import { TopologyWrapper } from './TopologyWrapper'

type TopologyComponent = React.ComponentType<{ mode?: 'p-adic' | 'hyperbolic'; quality?: number }>

type InteractiveTopologyModule = { InteractiveTopology: TopologyComponent }

// Exported for unit testing. The optional importFn parameter lets tests inject a
// controlled loader without fighting Jest's module system hoist ordering.
export function loadTopology(
  importFn: () => Promise<InteractiveTopologyModule> = () =>
    import('@/components/InteractiveTopology')
): Promise<TopologyComponent> {
  return new Promise<TopologyComponent>((resolve) => {
    let resolved = false

    // Fallback: if WebGL isn't ready in 3s, resolve to a null component
    // so the CSS fallback in the loading/wrapper layer takes over.
    const fallbackTimeout = setTimeout(() => {
      if (!resolved) {
        console.warn('[TopologyLoader] WebGL initialization timed out — using CSS fallback')
        resolve(() => null)
      }
    }, 3000)

    const startImport = () => {
      importFn()
        .then((m) => {
          resolved = true
          clearTimeout(fallbackTimeout)
          resolve(m.InteractiveTopology)
        })
        .catch((err) => {
          console.error('[TopologyLoader] Failed to load WebGL module:', err)
          resolve(() => null)
        })
    }

    // Defer loading until the main thread is actually idle rather than an
    // optimistic fixed delay — on a slow/constrained CPU a flat 500ms timer
    // can still land mid-hydration and compete with LCP paint. Fall back to
    // the original 500ms timer where requestIdleCallback isn't available
    // (Safari, and jsdom in tests).
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(startImport, { timeout: 2000 })
    } else {
      setTimeout(startImport, 500)
    }
  })
}

export const TopologyLoader = dynamic(() => loadTopology(), {
  ssr: false,
  loading: () => <TopologyWrapper />,
})
