import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = process.env.SITE_LAST_MODIFIED
    ? new Date(process.env.SITE_LAST_MODIFIED)
    : new Date()
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/es/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
