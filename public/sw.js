/**
 * @file sw.js
 * Enhanced Service Worker for offline asset caching.
 * Implements a Cache-First strategy with dynamic caching for all static assets.
 */

const CACHE_NAME = 'portfolio-v1-hardened'
const STATIC_ASSETS = [
  './',
  './manifest.webmanifest',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
  './fonts/JetBrainsMono-Bold.ttf',
]

// Patterns to exclude from dynamic caching (e.g., telemetry, external scripts).
// Kept in sync with RootShell.tsx's analytics script (currently Plausible).
const EXCLUDE_PATTERNS = [/plausible\.io/]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and excluded patterns
  if (request.method !== 'GET' || EXCLUDE_PATTERNS.some((p) => p.test(url.href))) {
    return
  }

  // Page navigations: network-first (so users get fresh content when online),
  // caching each visited document dynamically and falling back to that cache
  // — or the cached app shell — when the network is unavailable. Without this,
  // a failed fetch() rejects the respondWith() promise and the browser shows
  // its own offline interstitial instead of the cached page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache))
          }
          return networkResponse
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./')))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((networkResponse) => {
        // Cache static files dynamically (JS chunks, CSS, images, etc.)
        if (
          networkResponse.status === 200 &&
          (url.pathname.includes('/_next/static/') ||
            url.pathname.endsWith('.png') ||
            url.pathname.endsWith('.jpg') ||
            url.pathname.endsWith('.svg') ||
            url.pathname.endsWith('.css') ||
            url.pathname.endsWith('.js'))
        ) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
        }
        return networkResponse
      })
    })
  )
})
