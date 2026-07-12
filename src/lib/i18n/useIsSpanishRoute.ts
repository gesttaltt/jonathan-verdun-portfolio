import { useState } from 'react'

/**
 * Detects whether the current route is under /es/ via window.location.
 * For components rendered outside I18nProvider (global-error, not-found),
 * which replace the entire root layout and have no access to the
 * pathname-based I18nProvider context.
 */
export function useIsSpanishRoute() {
  const [isEs] = useState(
    () => typeof window !== 'undefined' && window.location?.pathname.startsWith('/es')
  )
  return isEs
}
