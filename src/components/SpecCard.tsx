'use client'

import Link from 'next/link'
import React from 'react'
import { m } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { staggerItemVariants } from '@/lib/animations'

export type SpecCardColor = 'cyan' | 'purple'

// Full literal class strings per color — Tailwind's JIT scanner needs static
// strings in source, so these can't be built by interpolating a color token.
const CARD_CLASSES: Record<SpecCardColor, string> = {
  cyan: 'group bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong light:border-zinc-200 light:hover:shadow-2xl light:hover:shadow-cyan-500/15 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_0_24px_var(--glow-cyan)] sm:p-8',
  purple:
    'group bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong light:border-zinc-200 light:hover:shadow-2xl light:hover:shadow-purple-500/10 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_0_24px_var(--glow-purple)] sm:p-8',
}

const TITLE_CLASSES: Record<SpecCardColor, string> = {
  cyan: 'light:text-cyan-900 flex items-center gap-2 text-base font-bold tracking-wide text-cyan-400 uppercase',
  purple:
    'light:text-purple-900 flex items-center gap-2 text-base font-bold tracking-wide text-purple-400 uppercase',
}

// Cyan (SystemSpecCard) originally used leading-relaxed here; purple
// (BioinformaticsResearchCard) didn't — preserved verbatim to avoid a
// visual diff, not a meaningful design distinction.
const BODY_CLASSES: Record<SpecCardColor, string> = {
  cyan: 'text-text-secondary space-y-4 text-sm leading-relaxed',
  purple: 'text-text-secondary space-y-4 text-sm',
}

const LINK_CLASSES: Record<SpecCardColor, string> = {
  cyan: 'focus-visible:ring-offset-background text-text-tertiary light:hover:text-cyan-800 inline-flex items-center gap-1.5 rounded text-[11px] font-bold transition-colors hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs',
  purple:
    'focus-visible:ring-offset-background text-text-tertiary light:hover:text-purple-800 inline-flex items-center gap-1.5 rounded text-[11px] font-bold transition-colors hover:text-purple-400 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-xs',
}

interface SpecCardProps {
  color: SpecCardColor
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: React.ReactNode
  description?: string
  methodologyLabel: string
  methodology: string
  invariantsLabel: string
  invariants: string[]
  link?: string
  // Pre-resolved (caller replaces the '{repo}' placeholder in
  // t.sections.specCard.viewGithubAriaLabel) — SpecCard is presentational and
  // has no useTranslation() access of its own, matching methodologyLabel/
  // invariantsLabel's existing convention.
  githubAriaLabel?: string
}

// Shared presentational card for a "spec" entry (methodology + invariants +
// optional repo link), used by the architecture and bioinformatics research
// sections — identical structure, differing only in color and content.
export const SpecCard: React.FC<SpecCardProps> = ({
  color,
  icon,
  secondaryIcon,
  title,
  description,
  methodologyLabel,
  methodology,
  invariantsLabel,
  invariants,
  link,
  githubAriaLabel,
}) => {
  return (
    <m.div variants={staggerItemVariants()} className={CARD_CLASSES[color]}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className={TITLE_CLASSES[color]}>
          {icon} {title}
        </h3>
        {secondaryIcon}
      </div>
      {description !== undefined && (
        <p className="text-text-tertiary mb-6 text-sm leading-relaxed">{description}</p>
      )}
      <div className={BODY_CLASSES[color]}>
        <p>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {methodologyLabel}:
          </span>{' '}
          <span className="text-text-primary font-bold">{methodology}</span>
        </p>
        <div>
          <span className="text-text-muted text-[11px] font-black uppercase sm:text-xs">
            {invariantsLabel}:
          </span>
          <p className="text-text-tertiary mt-1.5 text-xs leading-relaxed font-medium">
            {invariants.join(' · ')}
          </p>
        </div>
        {link && (
          <div className="pt-2">
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                githubAriaLabel ??
                `View ${link.replace('https://github.com/', '')} on GitHub (opens in new tab)`
              }
              className={LINK_CLASSES[color]}
            >
              <ExternalLink className="h-4 w-4" />
              {link.replace('https://github.com/', '')}
            </Link>
          </div>
        )}
      </div>
    </m.div>
  )
}
