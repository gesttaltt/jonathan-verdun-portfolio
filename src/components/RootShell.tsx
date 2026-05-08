import type { ReactNode } from 'react'
import { personJsonLd, websiteJsonLd } from '@/lib/jsonLd'
import { MotionProvider } from '@/components/MotionProvider'
import { useTranslation } from '@/lib/i18n/context'

export function RootShell({ children }: { children: ReactNode }) {
  const t = useTranslation()
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black focus:shadow-xl"
      >
        {t.skipToContent}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <MotionProvider>{children}</MotionProvider>
    </>
  )
}
