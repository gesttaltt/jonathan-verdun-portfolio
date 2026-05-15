'use client'

import React from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import { m } from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'

export const QAContact: React.FC = () => {
  const t = useTranslation()

  return (
    <m.section
      variants={fadeUpVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      aria-labelledby="qa-contact-title"
      className="border-border-subtle bg-bg-badge relative mt-8 overflow-hidden rounded-2xl border p-6 sm:p-8"
    >
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h3 id="qa-contact-title" className="text-text-primary text-xl font-bold">
            {t.sections.qaContact.title}
          </h3>
          <p className="text-text-tertiary max-w-xl text-sm leading-relaxed font-medium">
            {t.sections.qaContact.description}
          </p>
        </div>

        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="light:bg-zinc-950 light:hover:bg-black light:text-white focus-visible:ring-offset-background group flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <Mail className="h-4 w-4" />
          {t.sections.qaContact.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </m.section>
  )
}
