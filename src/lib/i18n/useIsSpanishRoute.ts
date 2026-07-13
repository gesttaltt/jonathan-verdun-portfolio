import { useSyncExternalStore } from 'react'

function subscribe() {
  // The pathname of a static error page never changes without a full
  // navigation (remount), so there's nothing to subscribe to.
  return () => {}
}

function getSnapshot() {
  return window.location.pathname.startsWith('/es')
}

function getServerSnapshot() {
  return false
}

/**
 * Detects whether the current route is under /es/ via window.location.
 * For components rendered outside I18nProvider (global-error, not-found),
 * which replace the entire root layout and have no access to the
 * pathname-based I18nProvider context.
 *
 * Uses useSyncExternalStore rather than reading `window` directly in a
 * useState initializer — this page is static-exported, so the server/build
 * render has no `window` and must produce `false`. useSyncExternalStore is
 * the React-sanctioned way to reconcile that server snapshot with the real
 * client value without triggering a hydration mismatch.
 */
export function useIsSpanishRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
