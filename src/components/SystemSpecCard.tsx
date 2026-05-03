'use client'

import Link from 'next/link'
import React from 'react'
import { FlaskConical, Cpu, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import type { I18nSystemSpec } from '@/lib/i18n/types'

interface SystemSpecCardProps {
  spec: I18nSystemSpec
}

export const SystemSpecCard: React.FC<SystemSpecCardProps> = ({ spec }) => {
  const t = useTranslation()

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_24px_var(--glow-cyan)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold tracking-wide text-cyan-400 uppercase">
          <FlaskConical className="h-4 w-4" /> {spec.focus}
        </h3>
        <Cpu className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-cyan-500" />
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
        <p>
          {t.architecture.methodologyLabel}:{' '}
          <span className="font-semibold text-white">{spec.methodology}</span>
        </p>
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase sm:text-xs">
            {t.architecture.invariantsLabel}:
          </span>
          <p className="mt-1 text-xs text-zinc-300">{spec.invariants.join(' · ')}</p>
        </div>
        {spec.link && (
          <div className="flex min-h-[44px] items-center">
            <Link
              href={spec.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${spec.link.replace('https://github.com/', '')} on GitHub (opens in new tab)`}
              className="focus-visible:ring-offset-background inline-flex items-center gap-1 rounded text-[10px] text-zinc-500 transition-colors hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              {spec.link.replace('https://github.com/', '')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
