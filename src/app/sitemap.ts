import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import { AuditRepository } from '@/lib/services/AuditRepository'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = process.env.SITE_LAST_MODIFIED
    ? new Date(process.env.SITE_LAST_MODIFIED)
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
    {
      url: `${siteConfig.url}/quality/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/es/quality/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const audits = await AuditRepository.getAudits()
  const auditRoutes: MetadataRoute.Sitemap = []

  audits.forEach((audit) => {
    // EN routes
    auditRoutes.push({
      url: `${siteConfig.url}/quality/${audit.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    // ES routes
    auditRoutes.push({
      url: `${siteConfig.url}/es/quality/${audit.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return [...staticRoutes, ...auditRoutes]
}
