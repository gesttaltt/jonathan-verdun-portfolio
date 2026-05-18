import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { ProjectDetail } from '@/components/ProjectDetail'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const slugToId = new Map(PROJECT_DATA.map((p) => [slugify(p.title), p.id]))

export function generateStaticParams() {
  return PROJECT_DATA.map((p) => ({ slug: slugify(p.title) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = PROJECT_DATA.find((p) => p.id === slugToId.get(slug))
  if (!project) return {}
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description,
  }
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
