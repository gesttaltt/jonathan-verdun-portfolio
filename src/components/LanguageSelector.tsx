'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const LanguageSelector: React.FC = () => {
  const pathname = usePathname() ?? '/'
  const isEs = pathname.startsWith('/es')

  return (
    <nav
      className="light:border-zinc-200 light:bg-white flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-bold"
      aria-label="Language selector"
    >
      <Link
        href="/"
        aria-label="Switch to English"
        aria-current={!isEs ? 'page' : undefined}
        className={`rounded-full px-3 py-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
          !isEs
            ? 'bg-blue-700 text-white'
            : 'light:text-zinc-500 light:hover:text-zinc-900 text-zinc-300 hover:text-white'
        }`}
      >
        EN
      </Link>
      <Link
        href="/es/"
        aria-label="Cambiar a Español"
        aria-current={isEs ? 'page' : undefined}
        className={`rounded-full px-3 py-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
          isEs
            ? 'bg-blue-700 text-white'
            : 'light:text-zinc-500 light:hover:text-zinc-900 text-zinc-300 hover:text-white'
        }`}
      >
        ES
      </Link>
    </nav>
  )
}
