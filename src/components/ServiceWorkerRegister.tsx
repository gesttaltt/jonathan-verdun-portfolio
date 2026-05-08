'use client'

import { useEffect } from 'react'

/**
 * @file ServiceWorkerRegister.tsx
 * Client-side component to register the Service Worker for offline autonomy.
 */
export const ServiceWorkerRegister: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('[PWA] Service Worker registered:', reg.scope))
          .catch((err) => console.error('[PWA] Service Worker registration failed:', err))
      })
    }
  }, [])

  return null
}
