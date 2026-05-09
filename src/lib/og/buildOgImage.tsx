import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import OgImageShared, { OG_IMAGE_SIZE } from './OgImageShared'
import { en } from '@/lib/i18n/en'
import { es } from '@/lib/i18n/es'

export interface OgImageOptions {
  locale: 'en' | 'es'
}

export async function buildOgImage({ locale }: OgImageOptions): Promise<ImageResponse> {
  const isEs = locale === 'es'
  const translations = isEs ? es : en
  const tagline = translations.tagline
  const description = translations.description

  let fontData: Buffer | undefined
  try {
    fontData = await readFile(join(process.cwd(), 'public/fonts/JetBrainsMono-Bold.ttf'))
  } catch (err) {
    console.error(
      '[buildOgImage] failed to load JetBrainsMono font — rendering without custom font',
      err
    )
  }

  return new ImageResponse(<OgImageShared tagline={tagline} description={description} />, {
    ...OG_IMAGE_SIZE,
    fonts: fontData
      ? [{ name: 'JetBrains Mono', data: fontData, weight: 700, style: 'normal' }]
      : [],
  })
}
