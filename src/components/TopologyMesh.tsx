'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '@/lib/shaders/TopologyShaders'

export const TopologyMesh: React.FC<{ quality: number }> = ({ quality }) => {
  const meshRef = useRef<THREE.Points>(null)
  const prefersReducedMotionRef = useRef(false)

  // Stable object passed to JSX — never reassigned, so useMemo immutability rules are satisfied.
  // All per-frame mutations go through meshRef.current.material to stay outside render.
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      uReducedMotion: { value: false },
      color: { value: new THREE.Color('#3b82f6') },
      hoverColor: { value: new THREE.Color('#8b5cf6') },
    }),
    []
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Pull CSS custom properties into the uniform Color objects after first paint.
  useEffect(() => {
    const mat = meshRef.current?.material
    if (!(mat instanceof THREE.ShaderMaterial)) return
    const style = getComputedStyle(document.documentElement)
    const nColor = style.getPropertyValue('--node-color').trim()
    const hColor = style.getPropertyValue('--interaction-glow').trim()

    const colorUni = mat.uniforms['color']
    const hoverColorUni = mat.uniforms['hoverColor']

    if (nColor && colorUni) colorUni.value.set(nColor)
    if (hColor && hoverColorUni) hoverColorUni.value.set(hColor)
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
    if (mouse) mouse.value.lerp(state.mouse, 0.15)
    if (reducedMotion) reducedMotion.value = prefersReducedMotionRef.current

    if (!prefersReducedMotionRef.current) {
      meshRef.current.rotation.y = elapsed * 0.05
      meshRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.1
    }
  })

  const geometry = useMemo(() => {
    const detail = quality > 0.8 ? 16 : 8
    return new THREE.IcosahedronGeometry(4, detail)
  }, [quality])

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
