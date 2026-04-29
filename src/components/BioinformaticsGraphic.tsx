'use client'

import { m } from 'framer-motion'
import React from 'react'
import { Activity, Dna } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

const NT_COLOR: Record<string, string> = {
  A: 'text-emerald-400',
  T: 'text-orange-400',
  G: 'text-amber-400',
  C: 'text-sky-400',
}

function CodonBadge({ codon, index }: { codon: string; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: 'easeOut' }}
      className="flex items-center justify-center gap-px rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono text-sm backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-black/60"
    >
      {/* sr-only preserves the codon as a queryable text node for a11y + tests */}
      <span className="sr-only">{codon}</span>
      <span aria-hidden="true" className="flex">
        {codon.split('').map((nt, i) => (
          <span key={i} className={`font-bold ${NT_COLOR[nt] ?? 'text-zinc-400'}`}>
            {nt}
          </span>
        ))}
      </span>
    </m.div>
  )
}

export const BioinformaticsGraphic: React.FC = () => {
  const t = useTranslation()
  const codons = ['ATG', 'GCT', 'TTA', 'CCG', 'GAT', 'TTC', 'AGC', 'GTA']

  return (
    <div className="group relative flex h-56 w-full flex-col overflow-hidden rounded-xl border border-blue-500/15 bg-gradient-to-b from-blue-950/30 via-black/50 to-black/60 sm:h-72">
      {/* DNA helix — background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
          {/* Strand A */}
          <m.path
            d="M 0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="6 3"
            animate={{ strokeDashoffset: [0, 18] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
          {/* Strand B */}
          <m.path
            d="M 0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100"
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeOpacity={0.5}
            strokeDasharray="6 3"
            animate={{ strokeDashoffset: [0, -18] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
          {/* Base-pair ticks at the strand crossing points */}
          {[200, 400, 600].map((x) => (
            <line
              key={x}
              x1={x}
              y1={84}
              x2={x}
              y2={116}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeOpacity={0.5}
            />
          ))}
          {/* Pulse nodes */}
          {[100, 300, 500, 700].map((cx, i) => (
            <m.circle
              key={cx}
              cx={cx}
              cy={100}
              r={3}
              fill="#22d3ee"
              animate={{ r: [3, 5, 3], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.45 }}
            />
          ))}
        </svg>
      </div>

      {/* ── Status bar ── */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-black/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <Dna className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
            Sequence Analysis
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
            Active
          </span>
        </div>
      </div>

      {/* ── Codon grid ── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 sm:px-8">
        {/* scanning beam */}
        <m.div
          className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent"
          animate={{ left: ['-8%', '108%'] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'linear', repeatDelay: 1.5 }}
        />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {codons.map((codon, i) => (
            <CodonBadge key={codon} codon={codon} index={i} />
          ))}
        </div>
      </div>

      {/* ── Nucleotide legend ── */}
      <div className="relative z-10 flex items-center justify-center gap-4 border-t border-white/5 bg-black/20 px-4 py-1.5">
        {[
          { nt: 'A', label: 'Adenine', cls: 'text-emerald-400' },
          { nt: 'T', label: 'Thymine', cls: 'text-orange-400' },
          { nt: 'G', label: 'Guanine', cls: 'text-amber-400' },
          { nt: 'C', label: 'Cytosine', cls: 'text-sky-400' },
        ].map(({ nt, label, cls }) => (
          <div key={nt} className="flex items-center gap-1">
            <span className={`font-mono text-[10px] font-bold ${cls}`}>{nt}</span>
            <span className="hidden text-[9px] text-zinc-600 sm:inline">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Footer label ── */}
      <div className="relative z-10 flex items-center gap-2 border-t border-white/5 bg-black/30 px-4 py-2">
        <Activity className="h-3 w-3 shrink-0 text-blue-500/60" />
        <span className="min-w-0 flex-1 truncate text-[10px] font-bold tracking-widest text-blue-500/60 uppercase">
          {t.bioinformatics.graphicLabel}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-zinc-600">
          8 seq · {codons.length * 3} nt
        </span>
      </div>
    </div>
  )
}
