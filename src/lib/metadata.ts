import type { Metadata, Viewport } from 'next'
import { siteConfig } from './siteConfig'
import { en } from './i18n/en'
import { es } from './i18n/es'

export const SHARED_VIEWPORT: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export function buildMetadata(lang: 'en' | 'es'): Metadata {
  const isEs = lang === 'es'
  const translations = isEs ? es : en
  const title = isEs ? `Jonathan Verdun | Ingeniero de Automatización QA` : siteConfig.title
  const description = translations.description
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
