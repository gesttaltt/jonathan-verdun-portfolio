import type { Metadata, Viewport } from 'next'
import { siteConfig } from './siteConfig'

const EN_TITLE = siteConfig.title
const EN_DESCRIPTION = siteConfig.description
const ES_TITLE = 'Jonathan Verdun | Ingeniero de Automatización QA'
const ES_DESCRIPTION =
  'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA especializado en pytest, Playwright, Appium y pruebas basadas en propiedades con GitHub Actions CI.'

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
  const ogImageUrl = `${canonical.replace(/\/$/, '')}/opengraph-image`

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    robots: { index: true, follow: true },
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: description }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.socialLinks.twitter.handle,
      images: [{ url: ogImageUrl, alt: description }],
    },
  }
}
