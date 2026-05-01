import type { Metadata, Viewport } from 'next'
import { siteConfig } from './siteConfig'

const EN_TITLE = siteConfig.title
const EN_DESCRIPTION = siteConfig.description
const ES_TITLE = 'Jonathan Verdun | Ingeniero de Automatización QA'
const ES_DESCRIPTION =
  'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA enfocado en desarrollo guiado por pruebas, pipelines de automatización y calidad de ingeniería.'

export const SHARED_VIEWPORT: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export function buildMetadata(lang: 'en' | 'es'): Metadata {
  const isEs = lang === 'es'
  const title = isEs ? ES_TITLE : EN_TITLE
  const description = isEs ? ES_DESCRIPTION : EN_DESCRIPTION
  const canonical = isEs ? `${siteConfig.url}/es/` : siteConfig.url
  const locale = isEs ? 'es_ES' : siteConfig.locale

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical,
      languages: {
        en: siteConfig.url,
        es: `${siteConfig.url}/es/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.socialLinks.twitter.handle,
    },
  }
}
