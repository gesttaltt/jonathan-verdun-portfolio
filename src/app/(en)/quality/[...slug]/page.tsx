import { AuditRepository } from '@/lib/services/AuditRepository'
import { AuditDetailContent } from '@/components/AuditDetailContent'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const audits = await AuditRepository.getAudits()
  return audits.map((a) => ({ slug: a.slug.split('/') }))
}

export default async function AuditDetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const joinedSlug = slug.join('/')
  const audit = await AuditRepository.getAuditBySlug(joinedSlug)
  if (!audit) notFound()
  return (
    <AuditDetailContent
      title={audit.title}
      date={audit.date}
      content={audit.content}
      backHref="/quality/"
      backLabel="Back to Dashboard"
    />
  )
}
