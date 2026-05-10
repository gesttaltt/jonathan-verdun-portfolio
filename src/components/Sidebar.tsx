'use client'

import { Server, ShieldCheck, Zap, Lock, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FadeInSection } from '@/components/FadeInSection'
import { useTranslation } from '@/lib/i18n/context'
import { siteConfig } from '@/lib/siteConfig'
import { containerVariants, staggerItemVariants, SCROLL_VIEWPORT } from '@/lib/animations'

const GATES = [
  {
    key: 'unitCoverageLabel',
    value: siteConfig.performanceMetrics.unitCoverage,
    color: 'blue',
    icon: ShieldCheck,
  },
  {
    key: 'automationRateLabel',
    value: siteConfig.performanceMetrics.automationRate,
    color: 'cyan',
    icon: Zap,
  },
  {
    key: 'securityScanLabel',
    value: siteConfig.performanceMetrics.securityStatus,
    color: 'green',
    icon: Lock,
  },
] as const

export const Sidebar: React.FC = () => {
  const t = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      /* istanbul ignore next */
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <aside className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pl-8">
      <div className="space-y-8">
        <m.div
          variants={containerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={SCROLL_VIEWPORT}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-blue-500/20 sm:p-8"
        >
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

          <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
            <Server className="h-5 w-5 text-blue-400" />
            {t.sections.sidebar.qualityGatesTitle}
          </h3>

          <div className="space-y-6">
            {GATES.map((gate) => {
              const label = t.sections.sidebar[gate.key]
              const colors = {
                blue: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]',
                cyan: 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
                green: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]',
              }[gate.color]

              const textColors = {
                blue: 'text-blue-400',
                cyan: 'text-cyan-400',
                green: 'text-green-400',
              }[gate.color]

              return (
                <m.div key={gate.key} variants={staggerItemVariants()} className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase sm:text-xs">
                    <span className="flex items-center gap-2">
                      <gate.icon className={`h-3 w-3 ${textColors}`} />
                      {label}
                    </span>
                    <span className={textColors}>{gate.value}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <m.div
                      initial={{ width: 0 }}
                      whileInView={{ width: gate.value.includes('%') ? gate.value : '100%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      viewport={SCROLL_VIEWPORT}
                      className={`h-full ${colors}`}
                    ></m.div>
                  </div>
                </m.div>
              )
            })}
          </div>

          <div className="mt-8 border-t border-white/5 pt-5">
            <p className="mb-3 text-[10px] font-bold tracking-widest text-zinc-500 uppercase sm:text-xs">
              {t.sections.sidebar.livePipelineLabel}
            </p>
            <a
              href={siteConfig.repo.ciWorkflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-transform hover:scale-105"
              aria-label="CI pipeline status (opens in new tab)"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={siteConfig.repo.ciBadgeUrl} alt="CI passing" className="h-5 w-auto" />
            </a>
          </div>
        </m.div>

        <FadeInSection delay={0.2}>
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-amber-500/20 sm:p-8">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl transition-opacity group-hover:opacity-75"></div>

            <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-white">
              <Zap className="h-5 w-5 text-amber-400" />
              {t.sections.sidebar.certificationTitle}
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-white/5 p-3">
                <p className="text-xs font-bold text-white">{siteConfig.certification.name}</p>
                <p className="mt-1 text-[10px] text-zinc-400">
                  {siteConfig.certification.provider}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-tighter text-zinc-500 uppercase">
                    {t.sections.sidebar.certificationStatusLabel}
                  </p>
                  <p className="text-xs font-medium text-amber-400">
                    {siteConfig.certification.status}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold tracking-tighter text-zinc-500 uppercase">
                    {t.sections.sidebar.certificationExpectedLabel}
                  </p>
                  <p className="text-xs font-medium text-white">
                    {siteConfig.certification.expectedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-sm font-bold tracking-wider text-white uppercase">
              {t.sections.qaContact.title}
            </h3>
            <p className="mb-4 text-xs text-zinc-300">{t.sections.qaContact.description}</p>
            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-visible:ring-offset-background flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t.sections.qaContact.ctaLabel}
              </Link>
              <button
                onClick={handleCopyEmail}
                className="focus-visible:ring-offset-background flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 py-2 text-xs font-bold text-zinc-300 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label="Copy email address"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <m.span
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {t.sections.sidebar.copiedLabel}
                    </m.span>
                  ) : (
                    <m.span
                      key="copy"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {t.sections.sidebar.copyEmailLabel}
                    </m.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </aside>
  )
}
