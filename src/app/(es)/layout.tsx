import type { Viewport } from 'next'
import '../globals.css'
import { jetbrainsMono } from '@/lib/fonts'
import { buildMetadata, SHARED_VIEWPORT } from '@/lib/metadata'
import { RootShell } from '@/components/RootShell'

export const viewport: Viewport = SHARED_VIEWPORT

export const metadata = buildMetadata('es')

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
