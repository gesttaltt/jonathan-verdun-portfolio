'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/lib/siteConfig'

/**
 * @file ServiceWorkerRegister.tsx
 * Client-side component to register the Service Worker for offline autonomy.
 */
export const ServiceWorkerRegister: React.FC = () => {
  useEffect(() => {
    const isE2E =
      typeof window !== 'undefined' &&
      window.location.hostname === 'localhost' &&
      document.cookie.includes('e2e=true')
    if ('serviceWorker' in navigator && (process.env.NODE_ENV === 'production' || isE2E)) {
      const swPath = `${siteConfig.basePath}/sw.js`
      const register = () => {
        navigator.serviceWorker
          .register(swPath)
          .then((reg) => console.log('[PWA] Service Worker registered:', reg.scope))
          .catch((err) => console.error('[PWA] Service Worker registration failed:', err))
      }

      if (document.readyState === 'complete') {
        register()
      } else {
        window.addEventListener('load', register)
        return () => window.removeEventListener('load', register)
      }
    }
  }, [])

  return null
}
