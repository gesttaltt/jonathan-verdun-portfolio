import type { NextConfig } from 'next'

// next/font/google self-hosts fonts at build time — no external font domains needed
const csp = [
  "default-src 'self'",
  // 'unsafe-inline': required by Next.js hydration and the JSON-LD inline script.
  // 'unsafe-eval': required by Three.js GLSL shader compilation in Firefox.
  //   To remove: pre-compile shaders or migrate to WebGPU/WGSL.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  'worker-src blob:',
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  reactCompiler: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
