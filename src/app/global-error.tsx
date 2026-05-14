'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [lang] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/es') ? 'es' : 'en'
    }
    return 'en'
  })

  useEffect(() => {
    console.error(error)
  }, [error])

  const isEs = lang === 'es'

  return (
    <html lang={lang}>
      <body className="font-mono antialiased">
        <div className="bg-background flex min-h-screen flex-col items-center justify-center px-6 font-mono text-zinc-300">
          <div className="w-full max-w-lg">
            <div className="mb-8 space-y-1 text-xs text-zinc-300">
              <p>
                <span className="text-blue-500">$</span> process.runtime
              </p>
              <p>
                <span className="text-amber-500/80">⚠</span>{' '}
                {isEs ? 'Error de diseño no capturado' : 'Uncaught layout error'}
              </p>
              {error.digest && (
                <p>
                  <span className="text-amber-500/80">⚠</span> digest:{' '}
                  <code className="text-zinc-300">{error.digest}</code>
                </p>
              )}
            </div>

            <p className="mb-2 text-[10px] font-bold tracking-widest text-zinc-300 uppercase sm:text-xs">
              {isEs ? 'Error Crítico' : 'Critical Error'}
            </p>
            <h1 className="mb-4 text-8xl font-bold tracking-tight text-white">500</h1>
            <p className="mb-10 text-sm text-zinc-300">
              {isEs ? 'Algo salió mal.' : 'Something went wrong.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={reset}
                className="focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-300 transition-all hover:border-amber-500/50 hover:bg-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                ↺ {isEs ? 'Reintentar' : 'Try again'}
              </button>
              <Link
                href={isEs ? '/es/' : '/'}
                className="focus-visible:ring-offset-background inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_var(--glow-blue)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
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
