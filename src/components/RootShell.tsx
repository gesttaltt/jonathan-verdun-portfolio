import type { ReactNode } from 'react'
import { siteConfig } from '@/lib/siteConfig'
import { MotionProvider } from '@/components/MotionProvider'
import { I18nProvider } from '@/lib/i18n/context'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  sameAs: [siteConfig.socialLinks.github.url, siteConfig.socialLinks.linkedin.url],
  knowsAbout: [
    'QA Automation',
    'Bioinformatics',
    'Computational Biology',
    'Test-Driven Development',
  ],
  worksFor: {
    '@type': 'Organization',
    name: siteConfig.workHistory[0].organization,
    url: siteConfig.workHistory[0].url,
  },
}

export function RootShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black focus:shadow-xl"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MotionProvider>
        <I18nProvider>{children}</I18nProvider>
      </MotionProvider>
    </>
  )
}
