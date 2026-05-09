'use client'

import React from 'react'
import { m } from 'framer-motion'
import { ShieldCheck, Search, Activity } from 'lucide-react'
import { AuditCard } from './AuditCard'
import { SectionHeader } from './SectionHeader'
import { FadeInSection } from './FadeInSection'
import { containerVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'

interface QualityDashboardProps {
  audits: AuditEntry[]
}

export const QualityDashboard: React.FC<QualityDashboardProps> = ({ audits }) => {
  const t = useTranslation()

  return (
    <div className="space-y-12">
      <FadeInSection>
        <section className="space-y-6">
          <SectionHeader
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t.sections.quality}
            color="green"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <Search className="mx-auto mb-2 h-5 w-5 text-amber-500" />
              <p className="text-xl font-bold text-white">{audits.length}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Audits Published</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <Activity className="mx-auto mb-2 h-5 w-5 text-green-500" />
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Verification Rate</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-blue-500" />
              <p className="text-xl font-bold text-white">LOCKED</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">System Integrity</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      <m.div
        variants={containerVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {audits.map((audit) => (
          <AuditCard key={audit.id} audit={audit} />
        ))}
      </m.div>
    </div>
  )
}
