import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const withBase = (path: string) => `${siteConfig.basePath}${path}`

  return {
    name: 'Jonathan Verdun | QA Automation Engineer',
    short_name: 'JV Portfolio',
    description:
      'Portfolio of Jonathan Verdun — QA Automation Engineer specializing in pytest, Playwright, Appium, and property-based testing.',
    start_url: withBase('/'),
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: withBase('/icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: withBase('/icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
