import { QualityDashboard } from '@/components/QualityDashboard'
import { AuditRepository } from '@/lib/services/AuditRepository'
import { siteConfig } from '@/lib/siteConfig'
import { buildPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata('es', '/quality/', {
  title: `Transparencia de Calidad — ${siteConfig.name}`,
  description: `Auditorías QA públicas y especificaciones de arquitectura del portafolio de ${siteConfig.name} — números de cobertura reales, gates de CI y decisiones de ingeniería.`,
})

export default async function SpanishQualityPage() {
  const audits = await AuditRepository.getAudits()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <QualityDashboard audits={audits} />
    </div>
  )
}
