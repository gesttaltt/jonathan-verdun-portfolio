import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import { AuditRepository } from '@/lib/services/AuditRepository'
import { BlogService } from '@/lib/services/BlogService'
import { PROJECT_DATA } from '@/lib/contracts/ProjectContract'
import { slugify } from '@/lib/projectSlugify'

export const dynamic = 'force-static'

type RouteOpts = Pick<
  MetadataRoute.Sitemap[number],
  'lastModified' | 'changeFrequency' | 'priority'
>

// Every localized route gets an EN entry at `path` and an ES entry at `/es${path}`.
function localizedPair(path: string, opts: RouteOpts): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}${path}`, ...opts },
    { url: `${siteConfig.url}/es${path}`, ...opts },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawDate = process.env.SITE_LAST_MODIFIED
  const lastModified = rawDate
    ? ((d) => (Number.isNaN(d.getTime()) ? new Date() : d))(new Date(rawDate))
    : new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/es/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...localizedPair('/quality/', { lastModified, changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedPair('/blog/', { lastModified, changeFrequency: 'weekly', priority: 0.7 }),
    ...localizedPair('/resume/', { lastModified, changeFrequency: 'monthly', priority: 0.7 }),
  ]

  const audits = await AuditRepository.getAudits()
  const auditRoutes = audits.flatMap((audit) =>
    localizedPair(`/quality/${audit.slug}/`, {
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  )

  const posts = BlogService.getAllPosts()
  const blogRoutes = posts.flatMap((post) =>
    localizedPair(`/blog/${post.slug}/`, {
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  const projectRoutes = PROJECT_DATA.flatMap((project) =>
    localizedPair(`/projects/${slugify(project.title)}/`, {
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  )

  return [...staticRoutes, ...auditRoutes, ...blogRoutes, ...projectRoutes]
}
