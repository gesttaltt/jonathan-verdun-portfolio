'use client'

import React, { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { TopologyWrapper } from './TopologyWrapper'

const TopologyMesh = dynamic(() => import('./TopologyMesh').then((m) => m.TopologyMesh), {
  ssr: false,
})

const TopologyPostProcessing = dynamic(
  () => import('./TopologyPostProcessing').then((m) => m.TopologyPostProcessing),
  {
    ssr: false,
  }
)

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

  useEffect(() => {
    if (typeof window === 'undefined') return
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

    // No explicit removeEventListener on unmount: remounting <Canvas key={canvasKey}>
    // (below) replaces this canvas element entirely on restoration, so the old
    // element — and its listeners with it — becomes garbage once nothing else
    // references it. (A previous version routed cleanup through a ref shared
    // across canvas instances; since R3F's onCreated fires in a layout effect
    // that runs before this component's own passive-effect cleanup, the shared
    // ref got overwritten by the new canvas before the old canvas's cleanup ran,
    // silently stripping the listeners off the *new* canvas instead — so a second
    // context loss had nothing to handle it and never recovered.)
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
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
        {!isMobile && <TopologyPostProcessing isLight={isLight} />}

        {/* Half the icosahedron subdivision detail on mobile (8 vs 16 segments). */}
        <TopologyMesh quality={isMobile ? quality * 0.5 : quality} mode={mode} />
      </Canvas>
    </TopologyWrapper>
  )
}
