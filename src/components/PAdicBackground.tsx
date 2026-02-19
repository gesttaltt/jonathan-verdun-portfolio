'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const PAdicBackground: React.FC = () => {
  return (
    <div className="bg-bg-deep pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute right-[-10%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-cyan-600 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[40%] left-[40%] h-[30%] w-[30%] rounded-full bg-violet-600 blur-[100px]"
        />
      </div>

      {/* Topograph Layer (Flowing Lattice) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <TopographFlow />
      </div>

      {/* Shapeshifting Embeddings Layer */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ShapeshiftingEmbeddings count={60} />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      ></div>
    </div>
  )
}

const TopographFlow: React.FC = () => {
  // Determine the number of lines to draw for the grid
  const gridSize = 100
  const lines = []

  // Create a static grid of lines covering the 150vw x 150vw area
  // We use a simple loop to generate path data for a grid
  for (let i = 0; i <= 2000; i += gridSize) {
    // Horizontal lines
    lines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={i}
        x2="2000"
        y2={i}
        stroke="var(--grid-line)"
        strokeWidth="2"
      />
    )
    // Vertical lines
    lines.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1="0"
        x2={i}
        y2="2000"
        stroke="var(--grid-line)"
        strokeWidth="2"
      />
    )

    // Add some "nodes" at intersections for the "topograph" feel
    for (let j = 0; j <= 2000; j += gridSize) {
      if ((i + j) % (gridSize * 2) === 0) {
        lines.push(
          <circle key={`c-${i}-${j}`} cx={i} cy={j} r="3" fill="rgba(59, 130, 246, 0.5)" />
        )
      }
    }
  }

  return (
    <motion.div
      className="absolute flex h-[150vw] w-[150vw] items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 400, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="2000" height="2000" viewBox="0 0 2000 2000" className="opacity-50">
        {lines}
      </svg>
    </motion.div>
  )
}

const ShapeshiftingEmbeddings: React.FC<{ count: number }> = ({ count }) => {
  const [shape, setShape] = React.useState<'random' | 'circle' | 'line' | 'clusters'>('random')

  React.useEffect(() => {
    const shapes: ('random' | 'circle' | 'line' | 'clusters')[] = [
      'random',
      'circle',
      'line',
      'clusters',
    ]
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % shapes.length
      setShape(shapes[i])
    }, 8000) // Change shape every 8 seconds
    return () => clearInterval(interval)
  }, [])

  const points = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({ id: i }))
  }, [count])

  const getPosition = (index: number, currentShape: string) => {
    // Deterministic pseudo-random based on index for stable "random" positions
    const seed = index * 123.45
    const rand = (n: number) => {
      const x = Math.sin(seed + n) * 10000
      return x - Math.floor(x)
    }

    const angle = (index / count) * Math.PI * 2

    switch (currentShape) {
      case 'circle':
        const r = 350
        // Add slight noise
        const rNoise = (rand(1) - 0.5) * 50
        return { x: Math.cos(angle) * (r + rNoise), y: Math.sin(angle) * (r + rNoise) }
      case 'line':
        const width = 1000
        const xLine = (index / count) * width - width / 2
        // Sine wave with noise
        return { x: xLine, y: Math.sin(xLine / 100) * 100 + (rand(2) - 0.5) * 50 }
      case 'clusters':
        // 3 clusters representing 3-adic expansion
        const clusterIdx = index % 3
        const cx = (clusterIdx - 1) * 350
        const cy = clusterIdx % 2 === 0 ? -150 : 150
        const cr = 100
        const cAngle = rand(3) * Math.PI * 2
        const cDist = rand(4) * cr
        return { x: cx + Math.cos(cAngle) * cDist, y: cy + Math.sin(cAngle) * cDist }
      case 'random':
      default:
        // Random cloud covering screen
        const rx = (rand(5) - 0.5) * 1400
        const ry = (rand(6) - 0.5) * 800
        return { x: rx, y: ry }
    }
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {points.map((p) => {
        const pos = getPosition(p.id, shape)
        return (
          <motion.div
            key={p.id}
            className="bg-particle absolute h-1 w-1 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: pos.x,
              y: pos.y,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              x: { duration: 4, ease: 'easeInOut' },
              y: { duration: 4, ease: 'easeInOut' },
              opacity: { duration: 2 + (p.id % 3), repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        )
      })}
    </div>
  )
}
