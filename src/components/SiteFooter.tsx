'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { m } from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'
import { useTranslation } from '@/lib/i18n/context'

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
  const year = CURRENT_YEAR

  return (
    <m.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      aria-label="Site footer"
      className="mt-14 sm:mt-24"
    >
      <div className="glass relative overflow-hidden rounded-2xl border border-white/10">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="pointer-events-none absolute right-0 -bottom-16 h-32 w-64 rounded-full bg-purple-500/6 blur-3xl" />

        {/* Main content */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
          {/* Top row: identity + socials */}
          <div className="flex flex-col gap-6 border-b border-white/5 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </p>
              <p className="text-xs font-medium text-zinc-500">{t.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-zinc-400 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom row: copyright + stack */}
          <div className="flex flex-col items-start gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-zinc-600">
              {year} {siteConfig.name}{' '}
              <a
                href={siteConfig.socialLinks.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                @gesttaltt
              </a>{' '}
              on GitHub.
            </p>
            <p className="text-[11px] text-zinc-700">
              Next.js &middot; TypeScript &middot; Tailwind CSS &middot; Three.js
            </p>
          </div>
        </div>
      </div>
    </m.footer>
  )
}
