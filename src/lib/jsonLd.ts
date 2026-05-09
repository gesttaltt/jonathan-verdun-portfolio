import { siteConfig } from './siteConfig'
import { en } from './i18n/en'
import { es } from './i18n/es'

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
  knowsAbout: [...siteConfig.expertise],
  hasOccupation: {
    '@type': 'Occupation',
    name: siteConfig.jobTitle,
    educationRequirements: 'ISTQB Foundation (in progress)',
    skills: [...siteConfig.techStack, ...siteConfig.expertise],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional',
    email: siteConfig.contact.email,
    url: siteConfig.url,
  },
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

export const buildWebPageJsonLd = (locale: 'en' | 'es' = 'en') => {
  const isEs = locale === 'es'
  const translations = isEs ? es : en
  const canonical = isEs ? `${siteConfig.url}/es/` : `${siteConfig.url}/`

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: translations.title,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': siteConfig.url },
    description: translations.description,
    inLanguage: locale,
  }
}

export const buildBreadcrumbJsonLd = (locale: 'en' | 'es' = 'en') => {
  const isEs = locale === 'es'
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: isEs ? 'Inicio' : 'Home',
      item: siteConfig.url as string,
    },
  ]

  if (isEs) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Español',
      item: `${siteConfig.url}/es/` as string,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}
