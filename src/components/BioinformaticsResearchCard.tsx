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
      className="group bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong light:hover:shadow-xl light:hover:shadow-purple-500/5 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_0_24px_var(--glow-purple)] sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <h3 className="light:text-purple-800 flex items-center gap-2 text-base font-bold tracking-wide text-purple-400 uppercase">
          <Dna className="h-5 w-5" /> {label}
        </h3>
      </div>
      <p className="text-text-tertiary mb-6 text-sm leading-relaxed">{description}</p>
      <div className="text-text-secondary space-y-4 text-sm">
        <p>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {t.bioinformatics.methodologyLabel}:
          </span>{' '}
          <span className="text-text-primary font-bold">{spec.methodology}</span>
        </p>
        <div>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {t.bioinformatics.invariantsLabel}:
          </span>
          <p className="text-text-tertiary mt-1.5 text-xs leading-relaxed font-medium">
            {spec.invariants.join(' · ')}
          </p>
        </div>
        {spec.link && (
          <div className="pt-2">
            <Link
              href={spec.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${spec.link.replace('https://github.com/', '')} on GitHub (opens in new tab)`}
              className="focus-visible:ring-offset-background text-text-tertiary light:hover:text-purple-800 inline-flex items-center gap-1.5 rounded text-[11px] font-bold transition-colors hover:text-purple-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs"
            >
              <ExternalLink className="h-4 w-4" />
              {spec.link.replace('https://github.com/', '')}
            </Link>
          </div>
        )}
      </div>
    </m.div>
  )
}
