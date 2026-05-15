'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/context'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const t = useTranslation()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-background text-text-secondary flex min-h-screen flex-col items-center justify-center px-6 font-mono">
      <div className="w-full max-w-lg">
        <div className="text-text-tertiary mb-8 space-y-1 text-xs">
          <p>
            <span className="text-blue-500">$</span> process.runtime
          </p>
          <p>
            <span className="text-amber-500/80">⚠</span>{' '}
            {t.lang === 'es' ? 'Error de ejecución no capturado' : 'Uncaught runtime error'}
          </p>
          {error.digest && (
            <p>
              <span className="text-amber-500/80">⚠</span> digest:{' '}
              <code className="text-text-primary">{error.digest}</code>
            </p>
          )}
        </div>

        <p className="text-text-muted mb-2 text-[11px] font-black tracking-widest uppercase sm:text-xs">
          {t.lang === 'es' ? 'Error de ejecución' : 'Runtime Error'}
        </p>
        <h1 className="text-text-primary mb-4 text-8xl font-bold tracking-tight">500</h1>
        <p className="text-text-secondary mb-10 text-sm">
          {t.lang === 'es' ? 'Algo salió mal.' : 'Something went wrong.'}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="focus-visible:ring-offset-background border-border-subtle bg-bg-card hover:bg-bg-card-hover inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-amber-300 transition-all hover:border-amber-500/50 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            ↺ {t.lang === 'es' ? 'Reintentar' : 'Try again'}
          </button>
          <Link
            href={t.lang === 'es' ? '/es/' : '/'}
            className="focus-visible:ring-offset-background border-border-subtle bg-bg-card hover:bg-bg-card-hover text-text-primary inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all hover:border-blue-500/40 hover:shadow-[0_0_20px_var(--glow-blue)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="text-blue-500">~/</span>{' '}
            {t.lang === 'es' ? 'Volver al inicio' : 'Return home'}
          </Link>
        </div>
      </div>
    </div>
  )
}
