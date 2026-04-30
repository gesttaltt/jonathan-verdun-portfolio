import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { jetbrainsMono } from '@/lib/fonts'
import { siteConfig } from '@/lib/siteConfig'
import { RootShell } from '@/components/RootShell'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

const ES_TITLE = 'Jonathan Verdun | Automatización QA e Bioinformática'
const ES_DESCRIPTION =
  'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: ES_TITLE,
  description: ES_DESCRIPTION,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: `${siteConfig.url}/es/`,
    languages: {
      en: siteConfig.url,
      es: `${siteConfig.url}/es/`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/es/`,
    title: ES_TITLE,
    description: ES_DESCRIPTION,
    siteName: siteConfig.name,
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: ES_TITLE,
    description: ES_DESCRIPTION,
    creator: siteConfig.socialLinks.twitter.handle,
  },
}

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  )
}
