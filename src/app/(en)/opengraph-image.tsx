import { buildOgImage, size, contentType } from '@/lib/og/buildOgImage'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-static'
export const alt = siteConfig.title
export { size, contentType }

export default function OGImage() {
  return buildOgImage({ tagline: siteConfig.tagline, description: siteConfig.description })
}
