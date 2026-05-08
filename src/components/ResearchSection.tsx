'use client'

import React from 'react'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import { useTranslation } from '@/lib/i18n/context'

export const ResearchSection: React.FC = () => {
  const t = useTranslation()

  return (
    <section className="space-y-4 border-t border-white/10 pt-8 opacity-60">
      <p className="text-[10px] font-bold tracking-widest text-zinc-200 uppercase sm:text-xs">
        {t.sections.bioinformatics}
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {t.architecture.specs.map((spec) => (
          <SystemSpecCard key={spec.id} spec={spec} />
        ))}
        {t.bioinformatics.specs.map((spec) => (
          <BioinformaticsResearchCard key={spec.id} spec={spec} />
        ))}
      </div>
    </section>
  )
}
