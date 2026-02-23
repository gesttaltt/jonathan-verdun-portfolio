'use client'

import React from 'react'
import { FlaskConical, Cpu } from 'lucide-react'

interface SystemSpec {
  id: string
  focus: string
  methodology: string
  invariants: string[]
}

interface SystemSpecCardProps {
  spec: SystemSpec
}

export const SystemSpecCard: React.FC<SystemSpecCardProps> = ({ spec }) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-cyan-400 uppercase">
        <FlaskConical className="h-4 w-4" /> {spec.focus}
      </h3>
      <Cpu className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
    </div>
    <p className="text-sm leading-relaxed text-zinc-400">
      Processing chaotic datasets with{' '}
      <span className="font-semibold text-white">{spec.methodology}</span> architectures.
      <br />
      <span className="mt-3 block text-[10px] font-bold text-zinc-500 uppercase">
        Invariant Target:
      </span>
      <span className="text-xs text-zinc-300">{spec.invariants.join(' + ')}</span>
    </p>
  </div>
)
