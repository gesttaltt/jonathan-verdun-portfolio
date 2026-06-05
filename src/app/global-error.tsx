'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [lang] = useState(() => {
    /* istanbul ignore else — window is always defined in jsdom; else branch is SSR-only */
    if (typeof window !== 'undefined' && window.location?.pathname) {
      return window.location.pathname.startsWith('/es') ? 'es' : 'en'
    }
    /* istanbul ignore next */
    return 'en'
  })

  useEffect(() => {
    console.error(error)
  }, [error])

  const isEs = lang === 'es'

  return (
    <html>
      <body className="bg-background min-h-screen font-mono antialiased">
        <div className="bg-background text-text-secondary flex min-h-screen flex-col items-center justify-center px-6 font-mono">
          <div className="w-full max-w-lg">
            <div className="text-text-tertiary mb-8 space-y-1 text-xs">
              <p>
                <span className="text-blue-500">$</span> process.critical
              </p>
              <p>
                <span className="text-red-500">✖</span>{' '}
                {isEs ? 'Fallo crítico del sistema' : 'Critical system failure'}
              </p>
              {error.digest && (
                <p>
                  <span className="text-red-500">✖</span> digest:{' '}
                  <code className="text-text-primary">{error.digest}</code>
                </p>
              )}
            </div>

            <p className="text-text-muted mb-2 text-[11px] font-black tracking-widest uppercase sm:text-xs">
              {isEs ? 'Error Crítico' : 'Critical Error'}
            </p>
            <h1 className="text-text-primary mb-4 text-8xl font-bold tracking-tight">500</h1>
            <p className="text-text-secondary mb-10 text-sm">
              {isEs ? 'Algo salió mal.' : 'Something went wrong.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="focus-visible:ring-offset-background border-border-subtle bg-bg-card hover:bg-bg-card-hover light:text-red-800 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-red-400 transition-all hover:border-red-500/50 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                ↺ {isEs ? 'Reintentar' : 'Try again'}
              </button>
              <Link
                href={isEs ? '/es/' : '/'}
                className="focus-visible:ring-offset-background border-border-subtle bg-bg-card hover:bg-bg-card-hover text-text-primary inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all hover:border-blue-500/40 hover:shadow-[0_0_20px_var(--glow-blue)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="text-blue-500">~/</span>{' '}
                {isEs ? 'Volver al inicio' : 'Return home'}
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
