import { buildOgImage } from '@/lib/og/buildOgImage'
import { OG_IMAGE_SIZE as size, OG_IMAGE_CONTENT_TYPE as contentType } from '@/lib/og/OgImageShared'
import { en } from '@/lib/i18n/en'

export const dynamic = 'force-static'
// Matches metadata.ts's openGraph/twitter image alt (both use the locale
// description, not the title) — and the (es) route's equivalent export.
export const alt = en.description
export { size, contentType }

export default function OGImage() {
  return buildOgImage({ locale: 'en' })
}
