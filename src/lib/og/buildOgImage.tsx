import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import OgImageShared, { OG_IMAGE_SIZE } from './OgImageShared'

export interface OgImageOptions {
  locale: 'en' | 'es'
}

export async function buildOgImage({ locale }: OgImageOptions): Promise<ImageResponse> {
  let fontData: Buffer | undefined
  try {
    fontData = await readFile(join(process.cwd(), 'public/fonts/JetBrainsMono-Bold.ttf'))
  } catch (err) {
    console.error(
      '[buildOgImage] failed to load JetBrainsMono font — rendering without custom font',
      err
    )
  }

  return new ImageResponse(<OgImageShared locale={locale} />, {
    ...OG_IMAGE_SIZE,
    fonts: fontData
      ? [{ name: 'JetBrains Mono', data: fontData, weight: 700, style: 'normal' }]
      : [],
  })
}
