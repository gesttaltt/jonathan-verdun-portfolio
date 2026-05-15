'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, ShieldCheck } from 'lucide-react'
import { m } from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'
import { fadeUpVariants, SCROLL_VIEWPORT } from '@/lib/animations'

const CURRENT_YEAR = new Date().getFullYear()

const SOCIAL = [
  {
    href: siteConfig.socialLinks.github.url,
    label: 'GitHub',
    icon: Github,
  },
  {
    href: siteConfig.socialLinks.linkedin.url,
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: `mailto:${siteConfig.contact.email}`,
    label: 'Email',
    icon: Mail,
  },
] as const

export const SiteFooter: React.FC = () => {
  const t = useTranslation()

  return (
    <m.footer
      variants={fadeUpVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      aria-label="Site footer"
      className="mt-14 sm:mt-24"
    >
      <div className="light:border-zinc-200 light:bg-white/50 relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-md">
        {/* Ambient glow */}
        <div className="light:bg-blue-100/50 pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="light:bg-purple-100/30 pointer-events-none absolute right-0 -bottom-16 h-32 w-64 rounded-full bg-purple-500/6 blur-3xl" />

        {/* Main content */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
          {/* Top row: identity + socials */}
          <div className="light:border-zinc-100 flex flex-col gap-6 border-b border-white/5 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="light:text-zinc-900 text-base font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </p>
              <p className="light:text-zinc-500 text-xs font-medium text-zinc-300">{t.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="light:border-zinc-200 light:bg-zinc-100 light:text-zinc-500 light:hover:border-blue-300 light:hover:text-blue-600 flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-300 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle row: quick links */}
          <div className="light:border-zinc-100 flex items-center gap-4 border-b border-white/5 py-5">
            <a
              href="/docs/api/"
              className="light:text-zinc-500 light:hover:text-zinc-900 rounded text-xs text-zinc-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              API Docs
            </a>
            <span className="light:text-zinc-300 text-white/20">·</span>
            <Link
              href={t.lang === 'es' ? '/es/quality/' : '/quality/'}
              className="light:text-zinc-500 light:hover:text-zinc-900 rounded text-xs text-zinc-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t.sections.quality}
            </Link>
            <span className="light:text-zinc-300 text-white/20">·</span>
            <a
              href={siteConfig.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="light:text-zinc-500 light:hover:text-zinc-900 rounded text-xs text-zinc-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Source
            </a>
            <span className="light:text-zinc-300 text-white/20">·</span>
            <a
              href="/sitemap.xml"
              className="light:text-zinc-500 light:hover:text-zinc-900 rounded text-xs text-zinc-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Sitemap
            </a>
          </div>

          {/* Bottom row: copyright + stack */}
          <div className="flex flex-col items-start gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="light:text-zinc-500 text-xs text-zinc-300">
              &copy; {CURRENT_YEAR} {siteConfig.name}{' '}
              <a
                href={siteConfig.socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="light:text-zinc-600 light:hover:text-zinc-900 rounded text-zinc-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                @gesttaltt
              </a>{' '}
              on GitHub.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="light:border-green-200 light:bg-green-100 light:text-green-700 flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold tracking-tighter text-green-400 uppercase"
                title="PWA Hardened: Available Offline"
              >
                <ShieldCheck className="h-3 w-3" />
                Offline Ready
              </div>
              <p className="light:text-zinc-500 text-xs text-zinc-300">
                {siteConfig.techStack.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </m.footer>
  )
}
