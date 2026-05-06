import { siteConfig } from './siteConfig'

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': siteConfig.url,
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  sameAs: [siteConfig.socialLinks.github.url, siteConfig.socialLinks.linkedin.url],
  knowsAbout: [
    'QA Automation',
    'Test-Driven Development',
    'Automation Engineering',
    'Property-Based Testing',
    'Playwright',
    'pytest',
    'Appium',
    'GitHub Actions CI',
    'TypeScript',
    'FastAPI',
    'Docker',
    'NumPy',
    'Apache Spark',
    'C++',
    'Bioinformatics',
  ],
} as const

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { '@id': siteConfig.url },
  inLanguage: ['en', 'es'],
} as const

export const buildWebPageJsonLd = (locale: 'en' | 'es' = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.url}/${locale === 'es' ? 'es/' : ''}#webpage`,
  url: `${siteConfig.url}/${locale === 'es' ? 'es/' : ''}`,
  name: locale === 'es' ? 'Jonathan Verdun | Portafolio' : 'Jonathan Verdun | Portfolio',
  isPartOf: { '@id': `${siteConfig.url}/#website` },
  about: { '@id': siteConfig.url },
  description: siteConfig.description,
  inLanguage: locale,
})
