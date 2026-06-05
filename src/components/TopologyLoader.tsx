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

    // Defer loading to prioritize LCP
    setTimeout(() => {
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
    }, 500)
  })
}

export const TopologyLoader = dynamic(() => loadTopology(), {
  ssr: false,
  loading: () => <TopologyWrapper />,
})
