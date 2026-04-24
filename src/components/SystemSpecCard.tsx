import Link from 'next/link'
import React from 'react'
import { FlaskConical, Cpu, ExternalLink } from 'lucide-react'

interface SystemSpec {
  id: string
  focus: string
  methodology: string
  invariants: string[]
  link?: string
}

interface SystemSpecCardProps {
  spec: SystemSpec
}

export const SystemSpecCard: React.FC<SystemSpecCardProps> = ({ spec }) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_24px_var(--glow-cyan)]">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-cyan-400 uppercase">
        <FlaskConical className="h-4 w-4" /> {spec.focus}
      </h3>
      <Cpu className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
    </div>
    <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
      <p>
        Methodology: <span className="font-semibold text-white">{spec.methodology}</span>
      </p>
      <div>
        <span className="text-[10px] font-bold text-zinc-500 uppercase">Invariants:</span>
        <p className="mt-1 text-xs text-zinc-300">{spec.invariants.join(' · ')}</p>
      </div>
      {spec.link && (
        <Link
          href={spec.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] text-zinc-500 transition-colors hover:text-cyan-400"
        >
          <ExternalLink className="h-3 w-3" />
          {spec.link.replace('https://github.com/', '')}
        </Link>
      )}
    </div>
  </div>
)
