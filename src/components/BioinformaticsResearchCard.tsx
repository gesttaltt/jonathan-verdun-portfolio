import Link from 'next/link'
import React from 'react'
import { Dna, ExternalLink } from 'lucide-react'
import type { ResearchSpec } from '@/lib/contracts/BioinformaticsContract.types'

const FOCUS_LABELS: Record<ResearchSpec['focus'], string> = {
  HIV: 'HIV Antigen AI',
  'Codon Encoding': 'Codon Encoder API',
}

const FOCUS_DESCRIPTIONS: Record<ResearchSpec['focus'], string> = {
  HIV: 'Antigen candidate screening using p-adic metric spaces for numerical stability in viral sequence analysis.',
  'Codon Encoding':
    'DNA codon embedding in hyperbolic space via Variational Autoencoder for deterministic amino acid representation.',
}

interface BioinformaticsResearchCardProps {
  spec: ResearchSpec
}

export const BioinformaticsResearchCard: React.FC<BioinformaticsResearchCardProps> = ({ spec }) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-[0_0_24px_var(--glow-purple)]">
    <div className="mb-4 flex items-center gap-2">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-purple-400 uppercase">
        <Dna className="h-4 w-4" /> {FOCUS_LABELS[spec.focus]}
      </h3>
    </div>
    <p className="mb-4 text-xs leading-relaxed text-zinc-400">{FOCUS_DESCRIPTIONS[spec.focus]}</p>
    <div className="space-y-3 text-sm text-zinc-400">
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
          className="inline-flex items-center gap-1 rounded text-[10px] text-zinc-500 transition-colors hover:text-purple-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
        >
          <ExternalLink className="h-3 w-3" />
          {spec.link.replace('https://github.com/', '')}
        </Link>
      )}
    </div>
  </div>
)
