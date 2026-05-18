'use client'

import React from 'react'
import { m } from 'framer-motion'
import { Quote } from 'lucide-react'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { SectionHeader } from '@/components/SectionHeader'
import { useTranslation } from '@/lib/i18n/context'

interface Testimonial {
  quote: string
  author: string
  role: string
  organization: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Jonathan has an exceptional ability to design test architectures that catch issues before they reach production. His shift-left approach and CI/CD gate philosophy transformed our release confidence.',
    author: 'Alex Chen',
    role: 'Engineering Lead',
    organization: 'Ai-Whisperers',
  },
  {
    quote:
      'The automation infrastructure Jonathan built reduced our regression cycle from days to hours. His insistence on property-based testing uncovered edge cases we would never have found manually.',
    author: 'Sarah Mitchell',
    role: 'Senior Software Engineer',
    organization: 'Ai-Whisperers',
  },
]

export const Testimonials: React.FC = () => {
  const t = useTranslation()

  return (
    <section aria-labelledby="testimonials-section-title" className="space-y-8">
      <SectionHeader
        id="testimonials-section-title"
        icon={<Quote className="h-5 w-5" />}
        title={t.sections.testimonials.title}
        color="amber"
        showAccentLine
      />

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((item, i) => (
          <m.blockquote
            key={i}
            variants={fadeUpVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={SCROLL_VIEWPORT}
            className="bg-bg-card border-border-subtle relative flex flex-col justify-between rounded-2xl border border-white/10 p-6 backdrop-blur-md sm:p-8"
          >
            <div>
              <Quote className="text-text-muted mb-4 h-6 w-6 opacity-40" />
              <p className="text-text-secondary mb-6 text-sm leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
            <footer className="border-border-subtle border-t border-white/5 pt-4">
              <div className="text-text-primary text-sm font-bold">{item.author}</div>
              <div className="text-text-muted text-xs">
                {item.role}, {item.organization}
              </div>
            </footer>
          </m.blockquote>
        ))}
      </div>
    </section>
  )
}
