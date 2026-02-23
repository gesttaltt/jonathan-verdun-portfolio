'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { TopologyMesh } from './TopologyMesh'

export const InteractiveTopology: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050510]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          alpha: true, // Fix: Enable alpha for background transparency
          antialias: false,
          stencil: false,
          depth: false,
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

        <TopologyMesh quality={1} />
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
