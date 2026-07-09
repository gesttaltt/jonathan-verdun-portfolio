'use client'

import React from 'react'
import { FlaskConical, Cpu } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'
import type { I18nSystemSpec } from '@/lib/i18n/types'
import { SpecCard } from '@/components/SpecCard'

interface SystemSpecCardProps {
  spec: I18nSystemSpec
}

export const SystemSpecCard: React.FC<SystemSpecCardProps> = ({ spec }) => {
  const t = useTranslation()

  return (
    <SpecCard
      color="cyan"
      icon={<FlaskConical className="h-5 w-5" />}
      secondaryIcon={
        <Cpu className="text-text-tertiary h-5 w-5 transition-colors group-hover:text-cyan-400" />
      }
      title={spec.focus}
      methodologyLabel={t.architecture.methodologyLabel}
      methodology={spec.methodology}
      invariantsLabel={t.architecture.invariantsLabel}
      invariants={spec.invariants}
      link={spec.link}
    />
  )
}
