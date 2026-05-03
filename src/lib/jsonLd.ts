import { siteConfig } from './siteConfig'

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
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
    'Bioinformatics',
  ],
} as const
