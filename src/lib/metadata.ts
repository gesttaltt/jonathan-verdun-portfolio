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
  const title = translations.title
  const description = translations.description
  const canonical = isEs ? `${siteConfig.url}/es/` : siteConfig.url
  const locale = isEs ? 'es_ES' : siteConfig.locale
  const ogImageUrl = `${canonical.replace(/\/$/, '')}/opengraph-image`
  const withBase = (path: string) => `${siteConfig.basePath}${path}`

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    manifest: withBase('/manifest.webmanifest'),
    icons: {
      icon: [
        { url: withBase('/favicon.svg'), type: 'image/svg+xml' },
        { url: withBase('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { url: withBase('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: withBase('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }],
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

/**
 * Per-route metadata for every non-homepage page (blog listing/post, resume,
 * quality listing/detail, project detail).
 *
 * Next.js metadata resolution REPLACES whole top-level keys rather than deep-
 * merging them, so a page that only sets `title`/`description` silently
 * inherits `alternates`/`openGraph`/`twitter` verbatim from the locale
 * layout's buildMetadata() — which describes the homepage, not the current
 * route. This fully re-derives every one of those keys per-route so canonical
 * URLs, hreflang alternates, and social-share previews are always correct for
 * the actual page being served, not the locale root.
 *
 * `routePath` is the locale-agnostic path (e.g. '/blog/', '/projects/foo/')
 * — both locales share the same route structure, only the '/es' prefix
 * differs, so callers never need to special-case it.
 */
export function buildPageMetadata(
  lang: 'en' | 'es',
  routePath: string,
  page: { title: string; description: string }
): Metadata {
  const isEs = lang === 'es'
  const canonical = `${siteConfig.url}${isEs ? '/es' : ''}${routePath}`
  const locale = isEs ? 'es_ES' : siteConfig.locale
  const ogImageUrl = `${siteConfig.url}${isEs ? '/es' : ''}/opengraph-image`

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical,
      languages: {
        en: `${siteConfig.url}${routePath}`,
        es: `${siteConfig.url}/es${routePath}`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
      locale,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: page.description }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      creator: siteConfig.socialLinks.twitter.handle,
      images: [{ url: ogImageUrl, alt: page.description }],
    },
  }
}
