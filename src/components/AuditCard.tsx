'use client'

import React from 'react'
import { m } from 'framer-motion'
import { FileText, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerItemVariants } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'

interface AuditCardProps {
  audit: AuditEntry
}

export const AuditCard: React.FC<AuditCardProps> = ({ audit }) => {
  const t = useTranslation()
  const detailHref = t.lang === 'es' ? `/es/quality/${audit.slug}` : `/quality/${audit.slug}`

  return (
    <m.div
      variants={staggerItemVariants()}
      className="group bg-bg-card hover:bg-bg-card-hover light:border-zinc-200 light:hover:border-amber-300 relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-amber-500/30"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="light:bg-amber-100 light:text-amber-700 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <FileText className="h-5 w-5" />
        </div>
        <div className="text-text-muted flex items-center gap-2 text-[11px] font-black tracking-tighter uppercase sm:text-xs">
          <Calendar className="h-3 w-3" />
          {audit.date}
        </div>
      </div>

      <h3 className="light:group-hover:text-amber-700 text-text-primary mb-2 text-lg font-bold transition-colors group-hover:text-amber-400">
        {audit.title}
      </h3>

      <p className="text-text-tertiary mb-6 line-clamp-2 text-sm leading-relaxed">
        {audit.excerpt}
      </p>

      <Link
        href={detailHref}
        className="light:text-amber-700 light:hover:text-amber-800 flex items-center gap-2 text-xs font-bold tracking-widest text-amber-500 uppercase transition-colors hover:text-amber-400"
      >
        Read Full Audit{' '}
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </m.div>
  )
}
