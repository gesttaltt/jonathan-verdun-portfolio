'use client'

import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { TopologyMesh } from './TopologyMesh'

export const InteractiveTopology: React.FC = () => {
  // Lazy initializer reads window directly — safe because this component is
  // only ever loaded client-side (ssr: false in TopologyLoader).
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="bg-bg-deep fixed inset-0 z-0">
      <Canvas
        aria-hidden="true"
        tabIndex={-1}
        // pan-y lets the browser handle vertical scroll while still firing pointer
        // events for horizontal movement — replaces the previous 'none' which blocked
        // scroll in sparse page regions on mobile.
        style={{ touchAction: 'pan-y' }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        // Cap DPR at 1.5× on mobile (vs 2× on desktop) to halve fill-rate cost.
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: isMobile ? 'default' : 'high-performance',
          alpha: true,
          antialias: false,
        }}
      >
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.0}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        {/* Half the icosahedron subdivision detail on mobile (8 vs 16 segments). */}
        <TopologyMesh quality={isMobile ? 0.5 : 1} />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      ></div>
    </div>
  )
}
