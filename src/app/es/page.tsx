import { PortfolioPage } from '@/components/PortfolioPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jonathan Verdun | Automatización QA e Bioinformática',
  description:
    'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática, enfocado en desarrollo guiado por pruebas y biología computacional.',
  alternates: { canonical: 'https://jonathanverdun.com/es/' },
  openGraph: {
    type: 'website',
    title: 'Jonathan Verdun | Automatización QA e Bioinformática',
    description:
      'Portafolio de Jonathan Verdun — Ingeniero de Automatización QA e Investigador en Bioinformática.',
    locale: 'es',
  },
}

export default function SpanishPage() {
  return <PortfolioPage />
}
