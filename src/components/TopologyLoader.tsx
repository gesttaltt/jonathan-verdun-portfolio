'use client'

import dynamic from 'next/dynamic'

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
    loading: () => (
      <div className="bg-bg-deep fixed inset-0 z-0">
        {/* The scanline and gradient here serve as both the loading state 
            and the permanent fallback if the WebGL module fails to load. */}
        <div className="scanline" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 opacity-50" />
      </div>
    ),
  }
)
