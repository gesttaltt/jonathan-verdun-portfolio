import { QualityDashboard } from '@/components/QualityDashboard'
import { AuditRepository } from '@/lib/services/AuditRepository'

export default async function QualityPage() {
  const audits = await AuditRepository.getAudits()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <QualityDashboard audits={audits} />
    </div>
  )
}
