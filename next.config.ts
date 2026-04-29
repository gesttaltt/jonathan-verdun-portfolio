import type { NextConfig } from 'next'

// BASE_PATH is set by the GitHub Actions configure-pages step.
// Empty string = custom domain (jonathanverdun.com) or local dev.
// /repo-name = GitHub project page (e.g. gesttaltt.github.io/jonathan-verdun-portfolio).
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  reactCompiler: true,
  images: {
    // Image Optimization requires a Node.js server; disable for static export.
    unoptimized: true,
  },
  // Security headers (CSP, X-Frame-Options, etc.) are a server-only feature and
  // are not emitted in static export mode. Configure them at the CDN / reverse-proxy
  // layer instead (e.g. Cloudflare Transform Rules, nginx add_header, etc.).
  // CSP reference (for manual CDN config):
  //   default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';
  //   style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:;
  //   worker-src blob:; connect-src 'self'; frame-ancestors 'none';
  //   base-uri 'self'; form-action 'self'
}

export default nextConfig
