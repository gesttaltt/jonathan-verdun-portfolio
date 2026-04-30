import { PortfolioPage } from '@/components/PortfolioPage'
import { siteConfig } from '@/lib/siteConfig'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jonathan Verdun | Automatización QA e Bioinformática',
  description:
    'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.',
  alternates: {
    canonical: `${siteConfig.url}/es/`,
    languages: {
      en: siteConfig.url,
      es: `${siteConfig.url}/es/`,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Jonathan Verdun | Automatización QA e Bioinformática',
    description:
      'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática.',
    siteName: siteConfig.name,
    locale: 'es',
  },
}

export default function SpanishPage() {
  return <PortfolioPage />
}
