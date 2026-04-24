'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { Activity } from 'lucide-react'

interface BioinformaticsGraphicProps {
  label?: string
}

export const BioinformaticsGraphic: React.FC<BioinformaticsGraphicProps> = ({
  label = 'Data Analysis: [Epitope Discovery Pipeline]',
}) => {
  const codons = ['ATG', 'GCT', 'TTA', 'CCG', 'GAT', 'TTC', 'AGC', 'GTA']

  return (
    <div className="group relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-blue-500/10 bg-blue-500/5">
      <div className="absolute inset-0 opacity-20">
        {/* Synthetic DNA: Interleaving Data Streams */}
        <svg width="100%" height="100%" viewBox="0 0 800 200">
          {/* Strand A: Positive Phase */}
          <motion.path
            d="M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="4 4" // Dashed line for "data stream" look
            animate={{
              d: [
                'M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100',
                'M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100',
              ],
              strokeDashoffset: [0, 20],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          {/* Strand B: Negative Phase (Intertwined) */}
          <motion.path
            d="M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity={0.5}
            animate={{
              d: [
                'M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100',
                'M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100',
              ],
              strokeDashoffset: [0, -20],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />

          {/* Data Points on the Helix */}
          {[100, 300, 500, 700].map((cx, i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={100}
              r={4}
              fill="var(--particle)"
              animate={{
                r: [4, 6, 4],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-4 rounded-full border border-white/5 bg-black/20 p-4 px-4 backdrop-blur-sm">
        {codons.map((codon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.1, color: 'var(--accent)' }}
            className="relative cursor-default overflow-hidden rounded border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400"
          >
            <span className="relative z-10">{codon}</span>
            {/* Scanning effect behind text on hover */}
            <motion.div
              className="absolute inset-0 bg-blue-500/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[10px] font-bold tracking-widest text-blue-500/60 uppercase">
        <Activity className="h-3 w-3" />
        {label}
      </div>
    </div>
  )
}
