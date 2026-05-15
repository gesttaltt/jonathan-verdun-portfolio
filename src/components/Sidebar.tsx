'use client'

import { Server, ShieldCheck, Zap, Lock, Copy, Check, Activity, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FadeInSection } from '@/components/FadeInSection'
import { useTranslation } from '@/lib/i18n/context'
import { siteConfig } from '@/lib/siteConfig'
import { staggerItemVariants } from '@/lib/animations'

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

interface SidebarProps {
  repo?: typeof siteConfig.repo | null
}

export const Sidebar: React.FC<SidebarProps> = ({ repo = siteConfig.repo }) => {
  const t = useTranslation()
  const [copied, setCopied] = useState(false)
  const [ciStatus, setCiStatus] = useState<CIStatus>('loading')

  useEffect(() => {
    let mounted = true
    const fetchCIStatus = async () => {
      try {
        // Mock CI status if a mock flag is present to avoid API rate limits
        const isMockMode =
          process.env.MOCK_CI === 'true' ||
          (typeof document !== 'undefined' && document.cookie.includes('mock-ci=true'))

        if (isMockMode) {
          if (mounted) setCiStatus('success')
          return
        }

        const repoUrl = repo?.url
        if (!repoUrl) {
          if (mounted) setCiStatus('error')
          return
        }

        const apiUrl = repoUrl.replace('github.com', 'api.github.com/repos')
        const response = await fetch(`${apiUrl}/actions/workflows/ci.yml/runs?per_page=1`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        })

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
      interval = setInterval(fetchCIStatus, 60000)
    }

    return () => {
      mounted = false
      if (interval) clearInterval(interval)
    }
  }, [repo])

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
      bg: 'bg-zinc-500/10 light:bg-zinc-100',
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
    <aside className="light:from-zinc-50 light:to-white light:border-zinc-200 sticky top-24 h-fit rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 p-6 backdrop-blur-xl transition-all hover:border-blue-500/20">
      <div className="space-y-8">
        <FadeInSection delay={0.1}>
          <div className="space-y-4">
            <h3 className="light:text-zinc-500 flex items-center gap-3 text-lg font-bold text-white">
              <Server className="light:text-blue-600 h-5 w-5 text-blue-400" />
              {t.sections.sidebar.constraintsTitle}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {GATES.map((gate) => {
                const textColors = {
                  blue: 'text-blue-400 light:text-blue-800',
                  cyan: 'text-cyan-400 light:text-cyan-800',
                  green: 'text-green-400 light:text-green-800',
                }[gate.color]

                const bgColors = {
                  blue: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] light:bg-blue-600',
                  cyan: 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)] light:bg-cyan-600',
                  green: 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] light:bg-green-600',
                }[gate.color]

                return (
                  <m.div key={gate.key} variants={staggerItemVariants()} className="space-y-2">
                    <Link
                      href={gate.link}
                      className="group/item flex items-center justify-between transition-opacity hover:opacity-80"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-1.5 w-1.5 rounded-full ${bgColors}`} />
                        <span className="light:text-zinc-600 text-xs font-medium text-zinc-400">
                          {t.sections.sidebar[gate.key]}
                        </span>
                      </div>
                      <span className={`text-sm font-black tracking-tight ${textColors}`}>
                        {gate.value}
                      </span>
                    </Link>
                  </m.div>
                )
              })}
            </div>

            {repo && (
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
                  href={repo.ciWorkflowUrl}
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
            )}
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="group light:border-zinc-200 light:bg-white/50 light:hover:border-amber-300 relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-md transition-all hover:border-amber-500/20 sm:p-8">
            <div className="light:bg-amber-100 absolute -top-10 -right-10 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl transition-opacity group-hover:opacity-75"></div>

            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <div className="light:bg-amber-50 rounded-lg bg-amber-500/10 p-2">
                  <Zap className="light:text-amber-600 h-5 w-5 text-amber-400" />
                </div>
                <h3 className="light:text-zinc-900 text-lg font-bold text-white">
                  {t.sections.sidebar.certificationTitle}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="light:text-zinc-900 text-sm font-bold text-white">
                    {siteConfig.certification.name}
                  </p>
                  <p className="light:text-zinc-500 text-xs font-medium text-zinc-400">
                    {siteConfig.certification.provider}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="light:bg-amber-100 light:text-amber-800 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 uppercase">
                    {siteConfig.certification.status}
                  </div>
                  <span className="light:text-zinc-400 text-[10px] text-zinc-500">
                    {siteConfig.certification.expectedDate}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                aria-label={t.sections.sidebar.copyEmailLabel}
                className="light:bg-zinc-900 light:hover:bg-zinc-800 focus-visible:ring-offset-background group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-all hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <m.div
                      key="check"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>{t.sections.sidebar.copiedLabel}</span>
                    </m.div>
                  ) : (
                    <m.div
                      key="copy"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>{t.sections.sidebar.copyEmailLabel}</span>
                    </m.div>
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
