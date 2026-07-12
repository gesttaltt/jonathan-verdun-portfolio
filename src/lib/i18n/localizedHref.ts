import type { Lang } from './types'

/**
 * Prefixes an EN-locale path (must start with "/") with "/es" for the Spanish
 * route tree. Centralizes the `lang === 'es' ? '/es' + path : path` pattern
 * repeated across components that build locale-aware links.
 */
export function localizedHref(lang: Lang, path: string): string {
  return lang === 'es' ? `/es${path}` : path
}
