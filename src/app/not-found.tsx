'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NotFound() {
  const [isEs] = useState(
    () => typeof window !== 'undefined' && window.location?.pathname.startsWith('/es')
  )

  return (
    <html lang={isEs ? 'es' : 'en'}>
      <body className="font-mono antialiased">
        <div className="bg-background text-text-secondary flex min-h-screen flex-col items-center justify-center px-6 font-mono">
          <div className="w-full max-w-lg">
            <div className="text-text-tertiary mb-8 space-y-1 text-xs">
              <p>
                <span className="text-blue-500">$</span> GET /route
              </p>
              <p>
                <span className="text-red-500/80">✗</span> Error: route not found
              </p>
              <p>
                <span className="text-red-500/80">✗</span>{' '}
                {isEs ? 'código de salida:' : 'exit code:'} 404
              </p>
            </div>

            <p className="text-text-muted mb-2 text-[11px] font-black tracking-widest uppercase sm:text-xs">
              {isEs ? 'No Encontrado' : 'Not Found'}
            </p>
            <h1 className="text-text-primary mb-4 text-8xl font-bold tracking-tight">404</h1>
            <p className="text-text-secondary mb-10 text-sm">
              {isEs ? 'Esta ruta no existe.' : 'This route does not exist.'}
            </p>

            <Link
              href={isEs ? '/es/' : '/'}
              className="focus-visible:ring-offset-background border-border-subtle bg-bg-card hover:bg-bg-card-hover text-text-primary inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all hover:border-blue-500/40 hover:shadow-[0_0_20px_var(--glow-blue)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <span className="text-blue-500">~/</span>{' '}
              {isEs ? 'Volver al inicio' : 'Return to root'}
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
