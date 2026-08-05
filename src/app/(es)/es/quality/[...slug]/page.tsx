import { AuditRepository } from '@/lib/services/AuditRepository'
import { AuditDetailContent } from '@/components/AuditDetailContent'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'
import { buildPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const audits = await AuditRepository.getAudits()
  return audits.map((a) => ({ slug: a.slug.split('/') }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const joinedSlug = slug.join('/')
  const audit = await AuditRepository.getAuditBySlug(joinedSlug)
  if (!audit) return {}
  return buildPageMetadata('es', `/quality/${joinedSlug}/`, {
    title: `${audit.title} — ${siteConfig.name}`,
    description: audit.excerpt,
  })
}

export default async function AuditDetailPageEs({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const joinedSlug = slug.join('/')
  const audit = await AuditRepository.getAuditBySlug(joinedSlug)
  if (!audit) notFound()
  return (
    <AuditDetailContent
      title={audit.title}
      date={audit.date}
      content={audit.content}
      backHref="/es/quality/"
      backLabel="Volver al Panel de Calidad"
    />
  )
}
