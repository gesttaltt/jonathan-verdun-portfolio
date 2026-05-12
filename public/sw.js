/**
 * @file sw.js
 * Enhanced Service Worker for offline asset caching.
 * Implements a Cache-First strategy with dynamic caching for all static assets.
 */

const CACHE_NAME = 'portfolio-v1-hardened'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/fonts/JetBrainsMono-Bold.ttf',
]

// Patterns to exclude from dynamic caching (e.g., telemetry, external scripts)
const EXCLUDE_PATTERNS = [/google-analytics\.com/, /clarity\.ms/]

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

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((networkResponse) => {
        // Cache static files dynamically (JS chunks, CSS, images, etc.)
        if (
          networkResponse.status === 200 &&
          (url.pathname.startsWith('/_next/static/') ||
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
