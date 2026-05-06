import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = process.env.SITE_LAST_MODIFIED
    ? new Date(process.env.SITE_LAST_MODIFIED)
    : new Date('2026-05-06')
  return [
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
  ]
}
