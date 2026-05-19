'use client'

import React from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

interface TopologyPostProcessingProps {
  isLight: boolean
}

export const TopologyPostProcessing: React.FC<TopologyPostProcessingProps> = ({ isLight }) => {
  return (
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
  )
}
