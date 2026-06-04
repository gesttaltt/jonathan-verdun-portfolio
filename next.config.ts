import type { NextConfig } from 'next'

// ⚠️  STATIC-EXPORT SECURITY CONTRACT — read before changing `output`
//
// This site uses `output: 'export'` (GitHub Pages static files). Several
// security properties depend on that mode:
//
// 1. HEADERS — CSP is delivered via a <meta> tag injected in the layouts.
//    Browsers ignore `frame-ancestors` in meta-tag CSP; clickjacking protection
//    requires X-Frame-Options / CSP via HTTP headers at the CDN layer.
//    See public/_headers (Netlify/CF Pages) and next.config.ts comments below.
//
// 2. PATH TRAVERSAL — BlogService.getPost and AuditRepository.getAuditBySlug
//    receive slug params pre-enumerated at build time by generateStaticParams,
//    so no user-supplied path ever reaches path.join at runtime. Switching to
//    `output: 'server'` or 'standalone' promotes the slug guards in those
//    services from belt-and-suspenders to primary defence — verify them first.
//
// 3. CONTACT FORM RATE LIMITING — the form posts directly to Formspree from
//    the browser. A server-rendered deployment would need server-side rate
//    limiting on the form action endpoint.
//
// Migration checklist before changing output mode:
//   [ ] Add X-Frame-Options: DENY and full CSP via HTTP response headers
//   [ ] Audit path.join calls in BlogService and AuditRepository
//   [ ] Add server-side rate limiting on form submissions

// BASE_PATH is set by the GitHub Actions configure-pages step.
// Empty string = custom domain (jonathanverdun.com) or local dev.
// /repo-name = GitHub project page (e.g. gesttaltt.github.io/jonathan-verdun-portfolio).
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'three', '@react-three/fiber'],
  },
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
