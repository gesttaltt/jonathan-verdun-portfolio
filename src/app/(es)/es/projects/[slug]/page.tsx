import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { ProjectDetail } from '@/components/ProjectDetail'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'
import { es } from '@/lib/i18n/es'
import { buildPageMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { slugify, slugToId } from '@/lib/projectSlugify'

export function generateStaticParams() {
  return PROJECT_DATA.map((p) => ({ slug: slugify(p.title) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projectId = slugToId.get(slug)
  const project = es.projects.find((p) => p.id === projectId)
  if (!project) return {}
  return buildPageMetadata('es', `/projects/${slug}/`, {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description,
  })
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectId = slugToId.get(slug)

  if (!projectId) notFound()

  return <ProjectDetail projectId={projectId} />
}
