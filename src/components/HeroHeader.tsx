'use client'

import { Github, Linkedin, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'
import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemeToggle } from '@/components/ThemeToggle'

export function HeroHeader() {
  const t = useTranslation()

  return (
    <header className="animate-hero mb-16 flex flex-col items-start gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-4 flex items-center gap-3 text-blue-500">
          <span className="h-px w-12 bg-blue-500"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase sm:text-xs md:tracking-[0.4em]">
            {t.tagline}
          </span>
        </div>
        <h1 className="light:from-zinc-950 light:via-zinc-800 light:to-zinc-600 mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-8xl 2xl:text-9xl dark:from-white dark:via-zinc-200 dark:to-zinc-500">
          {siteConfig.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium sm:gap-6">
          <Link
            href={siteConfig.socialLinks.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="group focus-visible:ring-offset-background text-text-tertiary light:hover:text-text-primary flex min-h-[44px] items-center gap-2 rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:text-white"
          >
            <Github className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="truncate">{siteConfig.socialLinks.github.label}</span>
          </Link>
          <Link
            href={siteConfig.socialLinks.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="group focus-visible:ring-offset-background text-text-tertiary light:hover:text-text-primary flex min-h-[44px] items-center gap-2 rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:text-white"
          >
            <Linkedin className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="truncate">{siteConfig.socialLinks.linkedin.label}</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {siteConfig.workHistory.length > 0 && (
        <div className="light:border-border-subtle light:bg-bg-card flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/8 p-5 backdrop-blur-md dark:border-white/8 dark:bg-white/8">
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            <span className="text-text-secondary font-bold tracking-widest uppercase">
              {t.workHistoryLabel}
            </span>
          </div>
          {siteConfig.workHistory.map((entry) => (
            <div key={entry.organization} className="flex flex-col gap-0.5">
              <Link
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.organization} (opens in new tab)`}
                className="focus-visible:ring-offset-background text-text-primary light:hover:text-blue-800 flex items-center gap-2 rounded text-lg font-bold transition-colors hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:text-cyan-400"
              >
                {entry.organization} <ExternalLinkIcon className="h-4 w-4" />
              </Link>
              {(t.workHistoryRoles[entry.organization] ||
                entry.role ||
                t.workHistoryPeriods[entry.organization] ||
                entry.period) && (
                <p className="text-text-tertiary text-xs" data-testid="work-role-period">
                  {[
                    t.workHistoryRoles[entry.organization] || entry.role,
                    t.workHistoryPeriods[entry.organization] || entry.period,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              {t.workHistoryDescriptions[entry.organization] && (
                <p className="text-text-tertiary text-xs">
                  {t.workHistoryDescriptions[entry.organization]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
