'use client'

import dynamic from 'next/dynamic'

export const TopologyLoader = dynamic(
  () =>
    new Promise<React.ComponentType>((resolve) => {
      // Delay WebGL loading to let the main thread focus on LCP and initial render
      const timeout = setTimeout(() => {
        import('@/components/InteractiveTopology').then((m) => resolve(m.InteractiveTopology))
      }, 1500)
      return () => clearTimeout(timeout)
    }),
  {
    ssr: false,
    loading: () => (
      <div className="bg-bg-deep fixed inset-0 z-0">
        <div className="scanline" />
      </div>
    ),
  }
)
