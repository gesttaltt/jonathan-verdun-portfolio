'use client'

import React from 'react'
import { Dna } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import type { I18nResearchSpec } from '@/lib/i18n/types'
import { SpecCard } from '@/components/SpecCard'

interface BioinformaticsResearchCardProps {
  spec: I18nResearchSpec
}

export const BioinformaticsResearchCard: React.FC<BioinformaticsResearchCardProps> = ({ spec }) => {
  const t = useTranslation()
  const label = t.bioinformatics.focusLabels[spec.focus] ?? spec.focus
  const description = t.bioinformatics.focusDescriptions[spec.focus] ?? ''

  return (
    <SpecCard
      color="purple"
      icon={<Dna className="h-5 w-5" />}
      title={label}
      description={description}
      methodologyLabel={t.bioinformatics.methodologyLabel}
      methodology={spec.methodology}
      invariantsLabel={t.bioinformatics.invariantsLabel}
      invariants={spec.invariants}
      link={spec.link}
      githubAriaLabel={
        spec.link
          ? t.sections.specCard.viewGithubAriaLabel.replace(
              '{repo}',
              spec.link.replace('https://github.com/', '')
            )
          : undefined
      }
    />
  )
}
