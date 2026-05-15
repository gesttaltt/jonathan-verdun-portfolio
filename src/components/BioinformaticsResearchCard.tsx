'use client'

import Link from 'next/link'
import React from 'react'
import { m } from 'framer-motion'
import { Dna, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import type { I18nResearchSpec } from '@/lib/i18n/types'
import { staggerItemVariants } from '@/lib/animations'

interface BioinformaticsResearchCardProps {
  spec: I18nResearchSpec
}

export const BioinformaticsResearchCard: React.FC<BioinformaticsResearchCardProps> = ({ spec }) => {
  const t = useTranslation()
  const label = t.bioinformatics.focusLabels[spec.focus] ?? spec.focus
  const description = t.bioinformatics.focusDescriptions[spec.focus] ?? ''

  return (
    <m.div
      variants={staggerItemVariants()}
      className="group light:border-zinc-200 light:bg-white light:hover:border-purple-400/50 light:hover:shadow-xl light:hover:shadow-purple-500/5 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-[0_0_24px_var(--glow-purple)]"
    >
      <div className="mb-4 flex items-center gap-2">
        <h3 className="light:text-purple-700 flex items-center gap-2 text-base font-bold tracking-wide text-purple-200 uppercase">
          <Dna className="h-4 w-4" /> {label}
        </h3>
      </div>
      <p className="light:text-zinc-700 mb-4 text-xs leading-relaxed text-zinc-300">
        {description}
      </p>
      <div className="light:text-zinc-700 space-y-3 text-sm text-zinc-300">
        <p>
          {t.bioinformatics.methodologyLabel}:{' '}
          <span className="light:text-zinc-950 font-semibold text-white">{spec.methodology}</span>
        </p>
        <div>
          <span className="light:text-zinc-500 text-[10px] font-bold text-zinc-300 uppercase sm:text-xs">
            {t.bioinformatics.invariantsLabel}:
          </span>
          <p className="light:text-zinc-700 mt-1 text-xs text-zinc-300">
            {spec.invariants.join(' · ')}
          </p>
        </div>
        {spec.link && (
          <Link
            href={spec.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${spec.link.replace('https://github.com/', '')} on GitHub (opens in new tab)`}
            className="focus-visible:ring-offset-background light:text-zinc-600 light:hover:text-purple-700 inline-flex items-center gap-1 rounded text-[10px] text-zinc-300 transition-colors hover:text-purple-300 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs"
          >
            <ExternalLink className="h-3 w-3" />
            {spec.link.replace('https://github.com/', '')}
          </Link>
        )}
      </div>
    </m.div>
  )
}
