'use client'

import React from 'react'
import { Beaker } from 'lucide-react'
import { m } from 'framer-motion'
import { BioinformaticsResearchCard } from '@/components/BioinformaticsResearchCard'
import { SystemSpecCard } from '@/components/SystemSpecCard'
import { SectionHeader } from '@/components/SectionHeader'
import { FadeInSection } from '@/components/FadeInSection'
import { useTranslation } from '@/lib/i18n/context'
import { containerVariants, SCROLL_VIEWPORT } from '@/lib/animations'

export const ResearchSection: React.FC = () => {
  const t = useTranslation()

  return (
    <FadeInSection>
      <section
        aria-labelledby="research-section-title"
        aria-describedby="research-content"
        className="space-y-8 border-t border-white/10 pt-12 opacity-80 transition-opacity hover:opacity-100"
      >
        <SectionHeader
          id="research-section-title"
          icon={<Beaker className="h-5 w-5" />}
          title={t.sections.bioinformatics}
          color="purple"
        />

        {t.bioinformatics.bridge && (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={SCROLL_VIEWPORT}
            className="rounded-lg border-l-2 border-purple-500/30 bg-purple-500/5 p-4"
          >
            <p className="text-sm leading-relaxed text-zinc-300 italic">
              {t.bioinformatics.bridge}
            </p>
          </m.div>
        )}

        <m.div
          id="research-content"
          variants={containerVariants(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={SCROLL_VIEWPORT}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {t.architecture.specs.map((spec) => (
            <SystemSpecCard key={spec.id} spec={spec} />
          ))}
          {t.bioinformatics.specs.map((spec) => (
            <BioinformaticsResearchCard key={spec.id} spec={spec} />
          ))}
        </m.div>
      </section>
    </FadeInSection>
  )
}
