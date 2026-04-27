import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(process.env.SITE_LAST_MODIFIED ?? '2026-04-27'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
