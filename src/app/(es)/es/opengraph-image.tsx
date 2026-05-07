import { buildOgImage } from '@/lib/og/buildOgImage'
import { OG_IMAGE_SIZE as size, OG_IMAGE_CONTENT_TYPE as contentType } from '@/lib/og/OgImageShared'
import { es } from '@/lib/i18n/es'

export const dynamic = 'force-static'
export const alt = es.description
export { size, contentType }

export default function OGImageEs() {
  return buildOgImage({ locale: 'es' })
}
