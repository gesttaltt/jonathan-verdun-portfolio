'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { TopologyMesh } from './TopologyMesh'
import { TopologyWrapper } from './TopologyWrapper'

export const InteractiveTopology: React.FC<{
  mode?: 'p-adic' | 'hyperbolic'
  quality?: number
}> = ({ mode = 'p-adic', quality = 1 }) => {
  // Lazy initializer reads window directly — safe because this component is
  // only ever loaded client-side (ssr: false in TopologyLoader).
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )
  const [isLight, setIsLight] = useState(false)
  const [ctxLost, setCtxLost] = useState(false)
  // Incrementing this key forces a full Canvas remount after context restoration,
  // which re-initialises the R3F renderer against the fresh GL context.
  const [canvasKey, setCanvasKey] = useState(0)
  // Holds the explicit cleanup for whichever canvas is currently mounted.
  const cleanupRef = useRef<(() => void) | null>(null)

  // Remove listeners from the previous canvas before R3F mounts the new one.
  useEffect(() => {
    return () => {
      cleanupRef.current?.()
      cleanupRef.current = null
    }
  }, [canvasKey])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)

    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'))
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      mq.removeEventListener('change', handler)
      observer.disconnect()
    }
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
    cleanupRef.current = () => {
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
    }
  }, [])

  return (
    <TopologyWrapper showScanline={ctxLost}>
      <Canvas
        key={canvasKey}
        role="img"
        aria-hidden="false"
        aria-label={`Interactive ${mode} bio-simulation background`}
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
        {/* Disable expensive post-processing on mobile to maximize performance score */}
        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={isLight ? 0.8 : 0.2}
              luminanceSmoothing={0.9}
              height={300}
              intensity={isLight ? 0.4 : 1.0}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.1} darkness={isLight ? 0.3 : 1.1} />
          </EffectComposer>
        )}

        {/* Half the icosahedron subdivision detail on mobile (8 vs 16 segments). */}
        <TopologyMesh quality={isMobile ? quality * 0.5 : quality} mode={mode} />
      </Canvas>
    </TopologyWrapper>
  )
}
