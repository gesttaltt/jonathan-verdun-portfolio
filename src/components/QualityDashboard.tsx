'use client'

import React, { useState, useMemo } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Search as SearchIcon, X } from 'lucide-react'
import { AuditCard } from './AuditCard'
import { SectionHeader } from './SectionHeader'
import { FadeInSection } from './FadeInSection'
import { VisualTestSummary } from './VisualTestSummary'
import { TestDetailedList } from './TestDetailedList'
import { containerVariants, staggerItemVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'
import type { AuditEntry } from '@/lib/services/AuditRepository'

interface QualityDashboardProps {
  audits: AuditEntry[]
}

export const QualityDashboard: React.FC<QualityDashboardProps> = ({ audits }) => {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  // Formal specifications and architectural contracts (The QA Handbook)
  const handbookSpecs = audits.filter((a) => a.category === 'spec')
  // Chronological audits and reports
  const chronologicalAudits = audits.filter((a) => a.category === 'audit')

  const filteredAudits = useMemo(() => {
    if (!searchQuery.trim()) return chronologicalAudits
    const query = searchQuery.toLowerCase()
    return chronologicalAudits.filter(
      (a) => a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query)
    )
  }, [chronologicalAudits, searchQuery])

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

          <TestDetailedList />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="light:border-zinc-200 light:bg-zinc-100/50 rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <SearchIcon className="light:text-amber-600 mx-auto mb-2 h-5 w-5 text-amber-500" />
              <p className="text-text-primary text-xl font-bold">{chronologicalAudits.length}</p>
              <p className="text-text-tertiary text-[11px] font-black uppercase sm:text-xs">
                Audits Published
              </p>
            </div>
            <div className="light:border-zinc-200 light:bg-zinc-100/50 rounded-xl border border-white/5 bg-white/5 p-4 text-center">
              <ShieldCheck className="light:text-blue-600 mx-auto mb-2 h-5 w-5 text-blue-500" />
              <p className="text-text-primary text-xl font-bold">{handbookSpecs.length}</p>
              <p className="text-text-tertiary text-[11px] font-black uppercase sm:text-xs">
                Architecture Specs
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* The QA Handbook (Architectural Specifications) */}
      {!searchQuery.trim() && (
        <section className="space-y-6">
          <h3 className="text-text-tertiary text-[11px] font-black tracking-widest uppercase sm:text-xs">
            The QA Handbook — Architectural Specifications
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {handbookSpecs.map((spec) => (
              <AuditCard key={spec.id} audit={spec} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-8">
        <div className="light:border-zinc-200 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <h3 className="text-text-tertiary text-[11px] font-black tracking-widest uppercase sm:text-xs">
            Chronological Audit History
          </h3>

          <div className="relative w-full max-w-sm">
            <SearchIcon className="text-text-tertiary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.sections.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="light:border-zinc-200 light:bg-white text-text-primary light:focus:border-amber-400 w-full rounded-lg border border-white/10 bg-white/5 py-2 pr-10 pl-10 text-sm transition-colors focus:border-amber-500/50 focus:bg-white/10 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-text-tertiary absolute top-1/2 right-3 -translate-y-1/2 hover:text-white"
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
            <div className="text-text-tertiary mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <SearchIcon className="h-8 w-8" />
            </div>
            <p className="text-text-tertiary">{t.sections.noResults}</p>
          </m.div>
        )}
      </section>
    </div>
  )
}
