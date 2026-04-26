'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { TopologyMesh } from './TopologyMesh'

export const InteractiveTopology: React.FC = () => {
  return (
    <div className="bg-bg-deep fixed inset-0 z-0">
      {/*
        touch-action: none prevents the browser from intercepting touch events
        for scrolling before r3f can normalize them into NDC pointer coordinates.
        Without it, state.mouse never updates on mobile touch devices.
      */}
      <Canvas
        aria-hidden="true"
        tabIndex={-1}
        style={{ touchAction: 'none' }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
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
