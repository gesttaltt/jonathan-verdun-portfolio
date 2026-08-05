import { QualityDashboard } from '@/components/QualityDashboard'
import { AuditRepository } from '@/lib/services/AuditRepository'
import { siteConfig } from '@/lib/siteConfig'
import { buildPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata('en', '/quality/', {
  title: `Quality Transparency — ${siteConfig.name}`,
  description: `Public QA audits and architecture specs for ${siteConfig.name}'s portfolio — real coverage numbers, CI gates, and engineering decisions.`,
})

export default async function QualityPage() {
  const audits = await AuditRepository.getAudits()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <QualityDashboard audits={audits} />
    </div>
  )
}
