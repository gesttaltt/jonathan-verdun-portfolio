'use client'

import { motion } from 'framer-motion'
import React from 'react'

export const BioinformaticsGraphic: React.FC = () => {
  const codons = ['ATG', 'GCT', 'TTA', 'CCG', 'GAT', 'TTC', 'AGC', 'GTA']
  
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded-xl bg-emerald-500/5 border border-emerald-500/10">
      <div className="absolute inset-0 opacity-10">
        {/* DNA-like double helix background animation */}
        <svg width="100%" height="100%" viewBox="0 0 800 200">
          <motion.path
            d="M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="#22c55e"
            strokeWidth="2"
            animate={{ d: ["M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100", "M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="#22c55e"
            strokeWidth="2"
            animate={{ d: ["M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100", "M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 justify-center relative z-10 px-4">
        {codons.map((codon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.1, color: '#22c55e' }}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-xs cursor-default text-zinc-400"
          >
            {codon}
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-6 text-[10px] uppercase tracking-widest text-emerald-500/40 font-bold">
        Data Analysis: [Epitope Discovery Pipeline]
      </div>
    </div>
  )
}
