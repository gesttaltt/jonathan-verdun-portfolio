'use client'

import React, { useState, useMemo } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Search as SearchIcon, X } from 'lucide-react'
import { AuditCard } from './AuditCard'
import { SectionHeader } from './SectionHeader'
import { FadeInSection } from './FadeInSection'
import { VisualTestSummary } from './VisualTestSummary'
import { containerVariants, staggerItemVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'

interface QualityDashboardProps {
  audits: AuditEntry[]
}

export const QualityDashboard: React.FC<QualityDashboardProps> = ({ audits }) => {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter out the formal artifacts from the chronological audit list
  const coreArtifacts = audits.filter((a) => ['TEST_PLAN', 'TRACEABILITY_MATRIX'].includes(a.slug))
  const generalAudits = audits.filter(
    (a) => !['TEST_PLAN', 'TRACEABILITY_MATRIX', 'GITHUB_PROFILE_README_TEMPLATE'].includes(a.slug)
  )

  const filteredAudits = useMemo(() => {
    if (!searchQuery.trim()) return generalAudits
    const query = searchQuery.toLowerCase()
    return generalAudits.filter(
      (a) => a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query)
    )
  }, [generalAudits, searchQuery])

  return (
    <div className="space-y-16">
      <FadeInSection>
        <div className="space-y-12">
          <SectionHeader
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t.sections.quality}
            color="green"
          />

          <VisualTestSummary />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <SearchIcon className="mx-auto mb-2 h-5 w-5 text-amber-500" />
              <p className="text-xl font-bold text-white">{generalAudits.length}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Audits Published</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-blue-500" />
              <p className="text-xl font-bold text-white">LOCKED</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">System Integrity</p>
            </div>
          </div>
        </div>
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

      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">
            Chronological Audit History
          </h3>

          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder={t.sections.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pr-10 pl-9 text-sm text-white transition-colors focus:border-amber-500/50 focus:bg-white/10 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <m.div
          layout
          variants={containerVariants(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={SCROLL_VIEWPORT}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredAudits.map((audit) => (
              <m.div key={audit.id} layout variants={staggerItemVariants()}>
                <AuditCard audit={audit} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {filteredAudits.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-zinc-600">
              <SearchIcon className="h-8 w-8" />
            </div>
            <p className="text-zinc-400">{t.sections.noResults}</p>
          </m.div>
        )}
      </section>
    </div>
  )
}
