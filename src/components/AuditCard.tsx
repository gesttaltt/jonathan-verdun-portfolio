'use client'

import React from 'react'
import { m } from 'framer-motion'
import { FileText, Calendar, ArrowRight } from 'lucide-react'
import { staggerItemVariants } from '@/lib/animations'
import type { AuditEntry } from '@/lib/services/AuditRepository'

interface AuditCardProps {
  audit: AuditEntry
}

export const AuditCard: React.FC<AuditCardProps> = ({ audit }) => {
  return (
    <m.div
      variants={staggerItemVariants()}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/10"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-zinc-500 uppercase sm:text-xs">
          <Calendar className="h-3 w-3" />
          {audit.date}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-amber-400">
        {audit.title}
      </h3>

      <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-zinc-400">{audit.excerpt}</p>

      <button
        onClick={() => {
          // In a real app we'd navigate to a detail page,
          // for now we'll just show the commitment to transparency.
          window.open(
            `https://github.com/gesttaltt/jonathan-verdun-portfolio/blob/main/docs/${audit.slug}.md`,
            '_blank'
          )
        }}
        className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-500 uppercase transition-colors hover:text-amber-400"
      >
        Read Full Audit{' '}
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </button>
    </m.div>
  )
}
