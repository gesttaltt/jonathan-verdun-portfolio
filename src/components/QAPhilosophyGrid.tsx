'use client'

import { m } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { staggerItemVariants } from '@/lib/animations'
import { useTranslation } from '@/lib/i18n/context'

export const QAPhilosophyGrid: React.FC = () => {
  const t = useTranslation()

  return (
    <div className="rounded-2xl border border-white/5 bg-black/40 p-5 backdrop-blur-sm sm:p-8">
      <div role="list" className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {t.qa.specifications.map((spec, i) => (
          <m.div
            key={spec.layer}
            role="listitem"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerItemVariants(i * 0.12)}
            className="group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase">{spec.layer}</h3>
              </div>
              <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-500 transition-colors group-hover:text-zinc-300 sm:text-xs">
                {spec.status}
              </span>
            </div>
            <p className="pl-9 text-xs leading-relaxed text-zinc-400">{spec.objective}</p>
          </m.div>
        ))}
      </div>
    </div>
  )
}
