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

  // Filter out the formal artifacts from the chronological audit list
  const coreArtifacts = audits.filter((a) => ['TEST_PLAN', 'TRACEABILITY_MATRIX'].includes(a.slug))
  const generalAudits = audits.filter(
    (a) => !['TEST_PLAN', 'TRACEABILITY_MATRIX', 'GITHUB_PROFILE_README_TEMPLATE'].includes(a.slug)
  )

  return (
    <div className="space-y-16">
      <FadeInSection>
        <section className="space-y-8">
          <SectionHeader
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t.sections.quality}
            color="green"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <Search className="mx-auto mb-2 h-5 w-5 text-amber-500" />
              <p className="text-xl font-bold text-white">{generalAudits.length}</p>
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

      {/* Core Quality Artifacts (ISTQB Documents) */}
      <section className="space-y-6">
        <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
          Formal Quality Artifacts
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {coreArtifacts.map((artifact) => (
            <AuditCard key={artifact.id} audit={artifact} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
          Chronological Audit History
        </h3>
        <m.div
          variants={containerVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={SCROLL_VIEWPORT}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {generalAudits.map((audit) => (
            <AuditCard key={audit.id} audit={audit} />
          ))}
        </m.div>
      </section>
    </div>
  )
}
