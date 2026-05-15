'use client'

import { m } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { staggerItemVariants, containerVariants, SCROLL_VIEWPORT } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'

export const QAPhilosophyGrid: React.FC = () => {
  const t = useTranslation()

  return (
    <div className="light:border-zinc-200 light:bg-white space-y-8 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm sm:p-8">
      {t.qa.manifesto && (
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SCROLL_VIEWPORT}
          className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-6"
        >
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
          <p className="text-text-secondary relative text-sm leading-relaxed font-medium italic sm:text-base">
            &ldquo;{t.qa.manifesto}&rdquo;
          </p>
        </m.div>
      )}

      <m.div
        role="list"
        variants={containerVariants(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={SCROLL_VIEWPORT}
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        {t.qa.specifications.map((spec) => (
          <m.div
            key={spec.layer}
            role="listitem"
            variants={staggerItemVariants()}
            className="group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="light:bg-green-100 light:text-green-800 flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-text-primary text-sm font-bold uppercase">{spec.layer}</h3>
              </div>
              <span className="light:bg-zinc-100 light:text-zinc-600 light:group-hover:text-zinc-900 text-text-tertiary rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium transition-colors hover:text-white sm:text-xs">
                {spec.status}
              </span>
            </div>
            <p className="text-text-tertiary pl-9 text-xs leading-relaxed">{spec.objective}</p>
          </m.div>
        ))}
      </m.div>
    </div>
  )
}
