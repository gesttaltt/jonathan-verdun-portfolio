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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Jonathan Verdun | Automatización QA e Bioinformática',
  description:
    'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.',
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'es',
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
