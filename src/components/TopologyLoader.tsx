'use client'

import { useEffect, useState } from 'react'
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

interface TopologyLoaderProps {
  mode?: 'p-adic' | 'hyperbolic'
  quality?: number
}

// Deliberately not built on next/dynamic(): that API caches the resolved
// component for the lifetime of the module, so if the 3s WebGL fallback in
// loadTopology() ever won the race once (a transient CPU/network hiccup),
// every future mount — e.g. navigating away and back in this SPA — would be
// stuck rendering the null fallback forever. Loading fresh on every mount
// lets a later mount recover from an earlier timeout.
export function TopologyLoader(props: TopologyLoaderProps) {
  const [Component, setComponent] = useState<TopologyComponent | null>(null)

  useEffect(() => {
    let cancelled = false
    loadTopology().then((C) => {
      /* istanbul ignore else -- unmount-before-resolve is exercised via the cancelled flag, not a distinct branch to cover */
      if (!cancelled) setComponent(() => C)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!Component) return <TopologyWrapper />

  return <Component {...props} />
}
