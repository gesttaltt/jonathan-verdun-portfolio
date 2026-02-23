'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '@/lib/shaders/TopologyShaders'

export const TopologyMesh: React.FC<{ quality: number }> = ({ quality }) => {
  const meshRef = useRef<THREE.Points>(null)

  const [nodeColor, setNodeColor] = useState(() => new THREE.Color('#3b82f6'))
  const [hoverColor, setHoverColor] = useState(() => new THREE.Color('#8b5cf6'))

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    const nColor = style.getPropertyValue('--node-color').trim()
    const hColor = style.getPropertyValue('--interaction-glow').trim()

    requestAnimationFrame(() => {
      if (nColor && nColor !== '') setNodeColor(new THREE.Color(nColor))
      if (hColor && hColor !== '') setHoverColor(new THREE.Color(hColor))
    })
  }, [])

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

      material.uniforms.mouse.value.lerp(state.mouse, 0.15)

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
