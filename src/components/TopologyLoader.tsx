'use client'

import dynamic from 'next/dynamic'
import { TopologyWrapper } from './TopologyWrapper'

export const TopologyLoader = dynamic(
  () =>
    new Promise<React.ComponentType<{ mode?: 'p-adic' | 'hyperbolic'; quality?: number }>>(
      (resolve) => {
        let resolved = false

        // Fallback timer: if WebGL isn't ready in 3s, resolve to a null component
        // so the CSS fallback in the loading/wrapper layer takes over.
        const fallbackTimeout = setTimeout(() => {
          if (!resolved) {
            console.warn('[TopologyLoader] WebGL initialization timed out — using CSS fallback')
            resolve(() => null)
          }
        }, 3000)

        // Defer loading to prioritize LCP
        const loadTimeout = setTimeout(() => {
          import('@/components/InteractiveTopology')
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

        return () => {
          clearTimeout(loadTimeout)
          clearTimeout(fallbackTimeout)
        }
      }
    ),
  {
    ssr: false,
    loading: () => <TopologyWrapper />,
  }
)
