'use client'

import { Server, ShieldCheck, Zap, Lock, Copy, Check, Activity, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
    link: '/quality/specs/TESTING',
  },
  {
    key: 'automationRateLabel',
    value: siteConfig.performanceMetrics.automationRate,
    color: 'cyan',
    icon: Zap,
    link: '/quality/specs/ARCHITECTURE',
  },
  {
    key: 'securityScanLabel',
    value: siteConfig.performanceMetrics.securityStatus,
    color: 'green',
    icon: Lock,
    link: '/quality/specs/DEVOPS',
  },
] as const

type CIStatus = 'loading' | 'success' | 'failure' | 'error'

export const Sidebar: React.FC = () => {
  const t = useTranslation()
  const [copied, setCopied] = useState(false)
  const [ciStatus, setCiStatus] = useState<CIStatus>('loading')

  useEffect(() => {
    let mounted = true
    const fetchCIStatus = async () => {
      try {
        // Mock CI status in test environments or if a mock flag is present to avoid API rate limits
        const isMockMode =
          process.env.NODE_ENV === 'test' ||
          process.env.MOCK_CI === 'true' ||
          (typeof document !== 'undefined' && document.cookie.includes('mock-ci=true'))

        if (isMockMode) {
          if (mounted) setCiStatus('success')
          return
        }

        const repoUrl = siteConfig.repo?.url
        if (!repoUrl) {
          if (mounted) setCiStatus('error')
          return
        }
        const parts = repoUrl.split('/')
        const owner = parts[parts.length - 2]
        const repo = parts[parts.length - 1]

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/actions/workflows/ci.yml/runs?per_page=1`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        )

        if (!response.ok) throw new Error('API request failed')

        const data = await response.json()
        if (!data.workflow_runs || data.workflow_runs.length === 0) {
          if (mounted) setCiStatus('error')
          return
        }

        const latestRun = data.workflow_runs[0]
        if (latestRun.status === 'completed') {
          if (mounted) setCiStatus(latestRun.conclusion === 'success' ? 'success' : 'failure')
        } else {
          if (mounted) setCiStatus('loading')
        }
      } catch (err) {
        if (process.env.NODE_ENV !== 'test') {
          console.error('Failed to fetch CI status:', err)
        }
        if (mounted) setCiStatus('error')
      }
    }

    fetchCIStatus()

    let interval: NodeJS.Timeout | undefined
    if (process.env.NODE_ENV !== 'test') {
      interval = setInterval(fetchCIStatus, 5 * 60 * 1000)
    }

    return () => {
      mounted = false
      if (interval) clearInterval(interval)
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const ciTheme = {
    loading: {
      color: 'text-zinc-400 light:text-zinc-600',
      bg: 'bg-zinc-500/10 light:bg-zinc-200',
      label: t.sections.sidebar.ciStatusLoading,
    },
    success: {
      color: 'text-green-400 light:text-green-800',
      bg: 'bg-green-400/10 light:bg-green-100',
      label: t.sections.sidebar.ciStatusSuccess,
    },
    failure: {
      color: 'text-red-400 light:text-red-800',
      bg: 'bg-red-400/10 light:bg-red-100',
      label: t.sections.sidebar.ciStatusFailure,
    },
    error: {
      color: 'text-amber-400 light:text-amber-900',
      bg: 'bg-amber-400/10 light:bg-amber-100',
      label: t.sections.sidebar.ciStatusError,
    },
  }[ciStatus]

  return (
    <aside className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pl-8">
      <div className="space-y-8">
        <m.div
          variants={containerVariants(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={SCROLL_VIEWPORT}
          className="group light:border-zinc-200 light:bg-white/50 light:hover:border-blue-300 relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-blue-500/20 sm:p-8"
        >
          <div className="light:bg-blue-100 absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-75"></div>

          <h3 className="light:text-zinc-900 mb-6 flex items-center gap-3 text-lg font-bold text-white">
            <Server className="light:text-blue-600 h-5 w-5 text-blue-400" />
            {t.sections.sidebar.qualityGatesTitle}
          </h3>

          <div className="space-y-6">
            {GATES.map((gate) => {
              const label = t.sections.sidebar[gate.key]
              const colors = {
                blue: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] light:bg-blue-600 light:shadow-none',
                cyan: 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)] light:bg-cyan-600 light:shadow-none',
                green:
                  'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] light:bg-green-600 light:shadow-none',
              }[gate.color]

              const textColors = {
                blue: 'text-blue-400 light:text-blue-800',
                cyan: 'text-cyan-400 light:text-cyan-800',
                green: 'text-green-400 light:text-green-800',
              }[gate.color]

              return (
                <m.div key={gate.key} variants={staggerItemVariants()} className="space-y-2">
                  <Link
                    href={gate.link}
                    className="group/gate light:text-zinc-500 light:hover:text-zinc-900 flex items-center justify-between text-[10px] font-bold tracking-widest text-zinc-400 uppercase transition-colors hover:text-white sm:text-xs"
                  >
                    <span className="flex items-center gap-2">
                      <gate.icon
                        className={`h-3 w-3 ${textColors} transition-transform group-hover/gate:scale-110`}
                      />
                      {label}
                    </span>
                    <span
                      className={`${textColors} light:group-hover/gate:text-zinc-900 transition-colors group-hover/gate:text-white`}
                    >
                      {gate.value}
                    </span>
                  </Link>
                  <div className="light:bg-zinc-200 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
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

          <div className="light:border-zinc-100 mt-8 border-t border-white/5 pt-5">
            <div className="flex items-center justify-between">
              <p className="light:text-zinc-500 text-[10px] font-bold tracking-widest text-zinc-400 uppercase sm:text-xs">
                {t.sections.sidebar.livePipelineLabel}
              </p>
              <div
                className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-tighter ${ciTheme.bg} ${ciTheme.color} uppercase`}
              >
                <span
                  className={`relative flex h-1.5 w-1.5 ${ciStatus === 'loading' ? 'animate-pulse' : ''}`}
                >
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${ciTheme.bg.replace('/10', '').split(' ')[0]} ${ciStatus === 'loading' || ciStatus === 'success' ? 'animate-ping' : ''}`}
                  ></span>
                  <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full ${ciTheme.bg.replace('/10', '').split(' ')[0]}`}
                  ></span>
                </span>
                {ciTheme.label}
              </div>
            </div>

            <a
              href={siteConfig.repo.ciWorkflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/ci light:text-zinc-500 light:hover:text-zinc-900 mt-3 flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
              aria-label="CI pipeline status (opens in new tab)"
            >
              <Activity className="light:text-blue-600 h-4 w-4 text-blue-400" />
              <span>GitHub Actions</span>
              <ExternalLink className="h-3 w-3 opacity-0 transition-all group-hover/ci:translate-x-0.5 group-hover/ci:opacity-100" />
            </a>
          </div>
        </m.div>

        <FadeInSection delay={0.2}>
          <div className="group light:border-zinc-200 light:bg-white/50 light:hover:border-amber-300 relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-amber-500/20 sm:p-8">
            <div className="light:bg-amber-100 absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl transition-opacity group-hover:opacity-75"></div>

            <h3 className="light:text-zinc-900 mb-4 flex items-center gap-3 text-lg font-bold text-white">
              <Zap className="light:text-amber-600 h-5 w-5 text-amber-400" />
              {t.sections.sidebar.certificationTitle}
            </h3>

            <div className="space-y-4">
              <div className="light:border-zinc-200 light:bg-zinc-100/50 rounded-lg border border-white/5 bg-white/5 p-3">
                <p className="light:text-zinc-900 text-xs font-bold text-white">
                  {siteConfig.certification.name}
                </p>
                <p className="light:text-zinc-500 mt-1 text-[10px] text-zinc-400">
                  {siteConfig.certification.provider}
                </p>
                {'details' in siteConfig.certification && (
                  <p className="light:text-amber-700/80 mt-2 text-[10px] text-amber-400/80 italic">
                    {siteConfig.certification.details}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="light:text-zinc-500 text-[10px] font-bold tracking-tighter text-zinc-400 uppercase">
                    {t.sections.sidebar.certificationStatusLabel}
                  </p>
                  <p className="light:text-amber-600 text-xs font-medium text-amber-400">
                    {siteConfig.certification.status}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="light:text-zinc-500 text-[10px] font-bold tracking-tighter text-zinc-400 uppercase">
                    {t.sections.sidebar.certificationExpectedLabel}
                  </p>
                  <p className="light:text-zinc-900 text-xs font-medium text-white">
                    {siteConfig.certification.expectedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="light:border-zinc-200 light:from-blue-100 light:to-purple-50 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-6 backdrop-blur-sm">
            <h3 className="light:text-zinc-900 mb-2 text-sm font-bold tracking-wider text-white uppercase">
              {t.sections.qaContact.title}
            </h3>
            <p className="light:text-zinc-600 mb-4 text-xs text-zinc-300">
              {t.sections.qaContact.description}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-visible:ring-offset-background light:bg-blue-600 light:text-white light:hover:bg-blue-700 flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 py-3 text-sm font-bold text-white transition-all hover:bg-white/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t.sections.qaContact.ctaLabel}
              </Link>
              <button
                onClick={handleCopyEmail}
                className="focus-visible:ring-offset-background light:border-zinc-200 light:bg-zinc-100 light:text-zinc-600 light:hover:bg-zinc-200 light:hover:text-zinc-900 flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 py-2 text-xs font-bold text-zinc-300 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
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
