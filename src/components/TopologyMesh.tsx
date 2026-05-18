'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '@/lib/shaders/TopologyShaders'
import { generatePAdicPoints } from '@/lib/shaders/PAdicGenerator'
import { generateHyperbolicPoints } from '@/lib/shaders/HyperbolicGenerator'

export const TopologyMesh: React.FC<{ quality: number; mode: 'p-adic' | 'hyperbolic' }> = ({
  quality,
  mode,
}) => {
  const meshRef = useRef<THREE.Points>(null)
  const prefersReducedMotionRef = useRef(false)

  // Stable object passed to JSX — never reassigned, so useMemo immutability rules are satisfied.
  // All per-frame mutations go through meshRef.current.material to stay outside render.
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      uReducedMotion: { value: false },
      uNodeColor: { value: new THREE.Color('#3b82f6') },
      hoverColor: { value: new THREE.Color('#8b5cf6') },
      uLightMode: { value: 0.0 },
    }),
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const mat = meshRef.current?.material
    if (!(mat instanceof THREE.ShaderMaterial)) return

    const updateTheme = () => {
      const style = getComputedStyle(document.documentElement)
      const nColor = style.getPropertyValue('--node-color').trim()
      const hColor = style.getPropertyValue('--interaction-glow').trim()
      const isLight = document.documentElement.classList.contains('light')

      const colorUni = mat.uniforms['uNodeColor']
      const hoverColorUni = mat.uniforms['hoverColor']
      const lightModeUni = mat.uniforms['uLightMode']

      if (nColor && colorUni) colorUni.value.set(nColor)
      if (hColor && hoverColorUni) hoverColorUni.value.set(hColor)
      if (lightModeUni) lightModeUni.value = isLight ? 1.0 : 0.0

      mat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      mat.needsUpdate = true
    }

    updateTheme()

    // Observe changes to the 'light' class on the html element
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material
    if (!(mat instanceof THREE.ShaderMaterial)) return

    const elapsed = state.clock.getElapsedTime()

    const time = mat.uniforms['time']
    const mouse = mat.uniforms['mouse']
    const reducedMotion = mat.uniforms['uReducedMotion']

    if (time) time.value = elapsed
    if (mouse) mouse.value.lerp(state.mouse, 0.2) // Sharper response
    if (reducedMotion) reducedMotion.value = prefersReducedMotionRef.current

    if (!prefersReducedMotionRef.current) {
      meshRef.current.rotation.y = elapsed * 0.08 // Faster rotation
      meshRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.15
      meshRef.current.position.z = Math.cos(elapsed * 0.2) * 0.5 // Subtle breathing depth
    }
  })

  const geometry = useMemo(() => {
    let result: { points: Float32Array; colors: Float32Array }

    if (mode === 'p-adic') {
      const p = 3
      const levels = quality > 0.8 ? 6 : 4
      result = generatePAdicPoints(p, levels, 3)
    } else {
      const count = quality > 0.8 ? 3000 : 1500
      result = generateHyperbolicPoints(count, 4)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(result.points, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(result.colors, 3))
    return geo
  }, [quality, mode])

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  return (
    <points ref={meshRef}>
      <primitive object={geometry} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
