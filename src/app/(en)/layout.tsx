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
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
      es: `${siteConfig.url}/es/`,
    },
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.socialLinks.twitter.handle,
  },
}

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  )
}
