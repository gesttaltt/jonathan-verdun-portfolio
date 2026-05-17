'use client'

import Link from 'next/link'
import React from 'react'
import { m } from 'framer-motion'
import { FlaskConical, Cpu, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import type { I18nSystemSpec } from '@/lib/i18n/types'
import { staggerItemVariants } from '@/lib/animations'

interface SystemSpecCardProps {
  spec: I18nSystemSpec
}

export const SystemSpecCard: React.FC<SystemSpecCardProps> = ({ spec }) => {
  const t = useTranslation()

  return (
    <m.div
      variants={staggerItemVariants()}
      className="group bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong light:hover:shadow-xl light:hover:shadow-cyan-500/5 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_0_24px_var(--glow-cyan)] sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="light:text-cyan-800 flex items-center gap-2 text-base font-bold tracking-wide text-cyan-400 uppercase">
          <FlaskConical className="h-5 w-5" /> {spec.focus}
        </h3>
        <Cpu className="text-text-tertiary h-5 w-5 transition-colors group-hover:text-cyan-400" />
      </div>
      <div className="text-text-secondary space-y-4 text-sm leading-relaxed">
        <p>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {t.architecture.methodologyLabel}:
          </span>{' '}
          <span className="text-text-primary font-bold">{spec.methodology}</span>
        </p>
        <div>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {t.architecture.invariantsLabel}:
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
              className="focus-visible:ring-offset-background text-text-tertiary light:hover:text-cyan-800 inline-flex items-center gap-1.5 rounded text-[11px] font-bold transition-colors hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs"
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
