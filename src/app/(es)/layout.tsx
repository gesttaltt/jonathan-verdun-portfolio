import type { Viewport } from 'next'
import '../globals.css'
import { jetbrainsMono } from '@/lib/fonts'
import { buildMetadata, SHARED_VIEWPORT } from '@/lib/metadata'
import { RootShell } from '@/components/RootShell'
import { I18nProvider } from '@/lib/i18n/context'
import { ThemeProvider } from '@/lib/theme/context'
import { ThemeScript } from '@/components/ThemeScript'

export const viewport: Viewport = SHARED_VIEWPORT

export const metadata = buildMetadata('es')

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; worker-src blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider>
          <I18nProvider>
            <RootShell>{children}</RootShell>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
