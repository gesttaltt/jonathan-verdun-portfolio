'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  // Class component — can't call useTranslation() directly, so the caller
  // (a function component with hook access) passes locale-aware strings for
  // the default fallback UI. Defaults keep this generically usable/testable
  // without a locale, matching the component's own English-only test suite.
  title?: string
  description?: string
  retryLabel?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary for gracefully handling runtime errors.
 * Particularly useful for WebGL/Three.js components that may fail
 * on unsupported hardware or browsers.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
  }

  reset(): void {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          role="alert"
          className="flex min-h-[200px] items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8"
        >
          <div className="text-center">
            <p className="light:text-red-600 mb-2 text-sm font-bold text-red-400">
              {this.props.title ?? 'Component Error'}
            </p>
            <p className="text-text-secondary mb-4 text-xs">
              {this.props.description ?? 'A rendering error occurred.'}
            </p>
            <button
              onClick={() => this.reset()}
              className="light:text-blue-700 light:hover:text-blue-800 rounded px-3 py-1 text-xs text-blue-400 transition-colors hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              {this.props.retryLabel ?? 'Retry'}
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
