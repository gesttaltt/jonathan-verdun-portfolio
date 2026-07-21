# Architecture & Performance Hardening — April 2026

Consolidated from 4 dated audits (2026-04-22 → 2026-04-28) tracking the codebase from its
first full review through a security/architecture pass and a CI-recovery + bundle-size
investigation. All findings below are resolved.

---

## Baseline audit (2026-04-22) — Score 7.2 / 10

First full-codebase review. The contracts/services/hooks separation was already in place,
but several gaps stood out:

- Root `page.tsx` was marked `'use client'`, blocking RSC streaming for the whole tree.
- No `prefers-reduced-motion` support anywhere; no ARIA label on the WebGL canvas; no
  keyboard control on the 3D mesh.
- No JSON-LD, `robots.txt`, `sitemap.xml`, or OG image.
- ~19 tests at ~25–30% coverage; the `useTerminal` hook was fully untested.
- No CSP or security headers.

Produced an 18-item priority backlog (P0–P3) that fed the following passes.

## Stabilization pass (2026-04-23 → 2026-04-27) — Score 9.1 → 9.5 / 10

- Removed `sticky` positioning from the sidebar; added `FadeInSection` / `QAPhilosophyGrid`
  scroll-reveal components.
- Security batch: `rel="noopener noreferrer"` and `aria-label` on social links, an absolute
  canonical URL, and 3 dead animation variants removed.
- **RSC serialization bug** — passing `icon={Code2}` (a component reference) from a Server
  Component down to a Client Component fails serialization at the RSC boundary. Fixed by
  pre-rendering the JSX instead (`icon={<Code2 ... />}`).
- Deleted `PAdicBackground.tsx` — 219 lines, 0% coverage, never imported.
- **Bundle breakdown:** 198 KB critical path, 374 KB deferred. The Three.js chunk (318 KB
  gzip) was already correctly lazy-loaded via `next/dynamic`; switching to Framer Motion's
  `LazyMotion` shaved 46 KB off the critical path.
- Removed enterprise-sounding marketing language from the `qa-arxiv-mobile` project
  description.

## Credibility gap caught (2026-04-27) — Score 8.4 / 10

- 3 unused production dependencies (`clsx`, `tailwind-merge`, `@react-three/drei`).
- The QA Philosophy section claimed "property-based fuzzing via fast-check" — at the time,
  zero `fast-check` tests existed anywhere in the codebase. A real credibility risk on a QA
  portfolio, and the direct seed of the later content-credibility audits.
- Coverage threshold was set to 30% while actual coverage was already 76–77% — the gate
  wasn't protecting against any real regression.
- `autoFocus` on the terminal input caused an unwanted page-scroll and a WCAG 2.4.3
  focus-order violation.
- Missing `<footer>` landmark; `key={index}` used in 4 static arrays.

## Coverage & SEO polish (2026-04-28)

- `layout.tsx`, `InteractiveTopology.tsx`, and `TopologyMesh.tsx` sat at 0% coverage —
  architecturally untestable in jsdom. Addressed with explicit
  `coveragePathIgnorePatterns` instead of chasing unreachable branches.
- The OG image was rendering with Satori's fallback font instead of JetBrains Mono — fixed
  by fetching the font buffer explicitly for `ImageResponse`.
- `docs/api/` (TypeDoc output) had been committed to git — gitignored.
- All 16 findings from the 2026-04-27 audit confirmed resolved, including 11 new
  property-based tests closing the `fast-check` gap flagged above.
