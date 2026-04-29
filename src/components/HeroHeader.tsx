'use client'

import { Github, Linkedin, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { slideDownVariants } from '@/lib/animations'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'
import { LanguageSelector } from '@/components/LanguageSelector'

export function HeroHeader() {
  const t = useTranslation()

  return (
    <m.header
      variants={slideDownVariants}
      initial="hidden"
      animate="visible"
      className="mb-16 flex flex-col items-start gap-8 md:mb-24 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="mb-4 flex items-center gap-3 text-blue-500">
          <span className="h-px w-12 bg-blue-500"></span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase md:text-xs md:tracking-[0.4em]">
            {t.tagline}
          </span>
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-8xl 2xl:text-9xl">
          Jonathan Verdun
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium sm:gap-6">
          <Link
            href={siteConfig.socialLinks.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in new tab)"
            className="group flex min-h-[44px] items-center gap-2 rounded text-zinc-400 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
          >
            <Github className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="truncate">{siteConfig.socialLinks.github.label}</span>
          </Link>
          <Link
            href={siteConfig.socialLinks.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="group flex min-h-[44px] items-center gap-2 rounded text-zinc-400 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
          >
            <Linkedin className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="truncate">{siteConfig.socialLinks.linkedin.label}</span>
          </Link>
          <LanguageSelector />
        </div>
      </div>

      {siteConfig.workHistory.length > 0 && (
        <div className="glass flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
            </span>
            <span className="font-bold tracking-widest text-zinc-500 uppercase">
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
                className="flex items-center gap-2 rounded text-lg font-bold text-white transition-colors hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
              >
                {entry.organization} <ExternalLinkIcon className="h-4 w-4" />
              </Link>
              {(entry.role || entry.period) && (
                <p className="text-xs text-zinc-500">
                  {[entry.role, entry.period].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </m.header>
  )
}
