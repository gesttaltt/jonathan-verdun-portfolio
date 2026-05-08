'use client'

import React from 'react'
import { Server } from 'lucide-react'
import Link from 'next/link'
import { FadeInSection } from '@/components/FadeInSection'
import { useTranslation } from '@/lib/i18n/context'
import { siteConfig } from '@/lib/siteConfig'

export const Sidebar: React.FC = () => {
  const t = useTranslation()

  return (
    <aside className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pl-8">
      <div className="space-y-8">
        <FadeInSection delay={0.1}>
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-blue-500/20 sm:p-8">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

            <h3 className="mb-6 flex items-center gap-3 text-lg font-bold text-white">
              <Server className="h-5 w-5 text-blue-400" />
              {t.sections.sidebar.qualityGatesTitle}
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase sm:text-xs">
                  <span>{t.sections.sidebar.unitCoverageLabel}</span>
                  <span className="text-blue-400">
                    {siteConfig.performanceMetrics.unitCoverage}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase sm:text-xs">
                  <span>{t.sections.sidebar.automationRateLabel}</span>
                  <span className="text-cyan-400">
                    {siteConfig.performanceMetrics.automationRate}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    style={{ width: siteConfig.performanceMetrics.automationRate }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase sm:text-xs">
                  <span>{t.sections.sidebar.securityScanLabel}</span>
                  <span className="text-green-400">
                    {siteConfig.performanceMetrics.securityStatus}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                </div>
              </div>
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
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-sm font-bold tracking-wider text-white uppercase">
              {t.sections.qaContact.title}
            </h3>
            <p className="mb-4 text-xs text-zinc-300">{t.sections.qaContact.description}</p>
            <Link
              href={`mailto:${siteConfig.contact.email}`}
              className="focus-visible:ring-offset-background flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t.sections.qaContact.ctaLabel}
            </Link>
          </div>
        </FadeInSection>
      </div>
    </aside>
  )
}
