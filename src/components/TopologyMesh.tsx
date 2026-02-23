'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '@/lib/shaders/TopologyShaders'

export const TopologyMesh: React.FC<{ quality: number }> = ({ quality }) => {
  const meshRef = useRef<THREE.Points>(null)

  const [nodeColor] = useState(() => {
    if (typeof window === 'undefined') return new THREE.Color('#3b82f6')
    const style = getComputedStyle(document.documentElement)
    const color = style.getPropertyValue('--node-color').trim()
    return new THREE.Color(color || '#3b82f6')
  })

  const [hoverColor] = useState(() => {
    if (typeof window === 'undefined') return new THREE.Color('#8b5cf6')
    const style = getComputedStyle(document.documentElement)
    const color = style.getPropertyValue('--interaction-glow').trim()
    return new THREE.Color(color || '#8b5cf6')
  })

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      color: { value: nodeColor },
      hoverColor: { value: hoverColor },
    }),
    [nodeColor, hoverColor]
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.time.value = state.clock.getElapsedTime()

      const uvMouse = new THREE.Vector2((state.mouse.x + 1) / 2, (state.mouse.y + 1) / 2)
      material.uniforms.mouse.value.lerp(uvMouse, 0.1)

      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  const geometry = useMemo(() => {
    const detail = quality > 0.8 ? 16 : 8
    const geom = new THREE.IcosahedronGeometry(4, detail)
    return geom
  }, [quality])

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
