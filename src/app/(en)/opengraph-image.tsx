import { buildOgImage } from '@/lib/og/buildOgImage'
import { OG_IMAGE_SIZE as size, OG_IMAGE_CONTENT_TYPE as contentType } from '@/lib/og/OgImageShared'
import { siteConfig } from '@/lib/siteConfig'

export const dynamic = 'force-static'
export const alt = siteConfig.title
export { size, contentType }

export default function OGImage() {
  return buildOgImage({ locale: 'en' })
}
