'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { TopologyMesh } from './TopologyMesh'

export const InteractiveTopology: React.FC = () => {
  // Lazy initializer reads window directly — safe because this component is
  // only ever loaded client-side (ssr: false in TopologyLoader).
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )
  const [ctxLost, setCtxLost] = useState(false)
  // Incrementing this key forces a full Canvas remount after context restoration,
  // which re-initialises the R3F renderer against the fresh GL context.
  const [canvasKey, setCanvasKey] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement

    const onLost = (e: Event) => {
      // preventDefault signals the browser that we intend to restore the context;
      // without it webglcontextrestored never fires.
      e.preventDefault()
      setCtxLost(true)
    }

    const onRestored = () => {
      // Force a full remount so R3F reinitialises its renderer against the new
      // GL context rather than continuing with the now-stale internal state.
      setCanvasKey((k) => k + 1)
      setCtxLost(false)
    }

    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
    // Listeners are tied to the canvas DOM element and are released when
    // the element is GC'd on unmount — no explicit removeEventListener needed.
  }, [])

  return (
    <div className="bg-bg-deep fixed inset-0 z-0">
      <Canvas
        key={canvasKey}
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
        onCreated={handleCreated}
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

      {/* Shown only while the GL context is lost — covers the blank canvas. */}
      {ctxLost && <div className="scanline absolute inset-0" aria-hidden="true" />}

      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}
