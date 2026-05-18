'use client'

import React from 'react'
import { m } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/context'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { ContactForm } from './ContactForm'

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

      <div className="relative space-y-6">
        <div className="space-y-2">
          <h3 id="qa-contact-title" className="text-text-primary text-xl font-bold">
            {t.sections.qaContact.title}
          </h3>
          <p className="text-text-tertiary max-w-xl text-sm leading-relaxed font-medium">
            {t.sections.qaContact.description}
          </p>
        </div>

        <ContactForm />
      </div>
    </m.section>
  )
}
