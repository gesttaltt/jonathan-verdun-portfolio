import { buildOgImage, size, contentType } from '@/lib/og/buildOgImage'
import { es } from '@/lib/i18n/es'

export const dynamic = 'force-static'
export const alt = 'Jonathan Verdun | Automatización QA e Bioinformática'
export { size, contentType }

export default function OGImageEs() {
  return buildOgImage({
    tagline: es.tagline,
    description: es.description,
  })
}
