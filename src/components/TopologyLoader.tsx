'use client'

import dynamic from 'next/dynamic'

export const TopologyLoader = dynamic(
  () => import('@/components/InteractiveTopology').then((m) => m.InteractiveTopology),
  { ssr: false, loading: () => <div className="bg-bg-deep fixed inset-0 z-0" /> }
)
