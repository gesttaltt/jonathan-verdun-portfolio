# Future Roadmap — Jonathan Verdun Portfolio

> **Generated:** 2026-05-18
> **Context:** Post-unified theme redesign, full CI/CD green, root-level files organized into `docs/` and `scripts/`.

---

## Current State Summary

### What's already in place (strengths)

| Area                      | Status                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Theme system**          | Dark (default) + Bright themes, OKLCH color space, Tailwind v4 CSS variable tokens     |
| **Contrast / a11y**       | All WCAG AA verified programmatically                                                  |
| **i18n**                  | Full EN + ES support with `next-intl`-style context                                    |
| **PWA**                   | Custom service worker (`sw.js`), offline asset caching                                 |
| **SEO / Structured Data** | JSON-LD (Person, WebSite, WebPage, BreadcrumbList), dynamic `robots.ts` + `sitemap.ts` |
| **CI/CD**                 | CI (lint + types + security + tests) + Deploy to GitHub Pages — both green             |
| **Testing**               | 53 suites, 396 tests, Jest 30 + fast-check, Playwright E2E + axe WCAG scans            |
| **Performance gating**    | Lighthouse CI (a11y ≥95, best-practices ≥90, SEO ≥90)                                  |
| **Error handling**        | `error.tsx`, `global-error.tsx`, `not-found.tsx`, `ErrorBoundary` component            |
| **Animations**            | Framer Motion 12, centralized variants in `lib/animations.ts`                          |
| **WebGL**                 | Three.js / React Three Fiber topology with 3s timeout + CSS fallback                   |
| **Accessibility**         | Axe-core in E2E, ARIA labels, semantic HTML, keyboard navigation                       |
| **Docker**                | Multi-stage dev + prod (nginx) images                                                  |
| **Docs**                  | TypeDoc API docs auto-generated on deploy                                              |
| **Security**              | `npm audit --audit-level=high` in CI                                                   |

---

## Tier 1 — High Impact

### 1. Working contact form

**Problem:** Current contact is a `mailto:` link (opens external client) and a "Copy email" button. Both add friction — visitors must leave the site or manually paste.

**Recommendation:** Add a lightweight form via Formspree, EmailJS, or Web3Forms.

**Implementation sketch:**

```
src/components/ContactForm.tsx  (new)
  - Name, email, subject, message fields
  - POST to Formspree endpoint
  - Success toast via AnimatePresence (already in stack)
  - Reuse existing QAContact section layout
```

**Why this matters:** Direct conversion path. Recruiters/hiring managers can reach out in 2 clicks instead of switching to their mail client.

---

### 2. Project case study pages

**Problem:** Two project cards (Bioinformatics Research, System Spec) link to `/quality/specs/*` — those are internal test spec pages, not case studies. They don't sell the work.

**Recommendation:** Create dedicated `/projects/[slug]` routes with full case studies.

**Content per case study:**

- Challenge / Problem statement
- Approach & architecture (diagrams via Mermaid or static SVG)
- Key results with metrics
- Code snippets (syntax-highlighted)
- Lessons learned

**Why this matters:** This is what recruiters and hiring managers actually read. Cards alone don't convey depth.

---

### 3. Analytics

**Problem:** Zero analytics. No way to know what pages are viewed, where visitors drop off, or what converts.

**Recommendation:** Plausible or Umami (privacy-first, GDPR-compliant, single script tag).

**Implementation:**

```
src/lib/analytics.ts  (optional wrapper)
OR
Direct script in RootShell.tsx via NEXT_PUBLIC env var
```

**Why this matters:** Data-driven decisions for everything below. Without numbers you're guessing.

---

## Tier 2 — Content Authority

### 4. Blog / Technical writing (`/blog`)

**Problem:** No content marketing. For a QA Automation Engineer, writing demonstrates expertise directly.

**Recommendation:** MDX-based blog under `src/app/(en)/blog/[slug]/`.

**Suggested first posts:**

- "How I enforce 100% test coverage in CI with Jest + GitHub Actions"
- "Building a WCAG-compliant theme system with OKLCH and Tailwind v4"
- "Why my portfolio has a CI pipeline — treating your resume like production code"
- "Property-based testing with fast-check: finding bugs example-based tests miss"

**Why this matters:** SEO, thought leadership, demonstrates communication skills (key for senior roles).

---

### 5. Interactive resume / career timeline

**Problem:** No dedicated resume page. The sidebar has bio + certification, but career history is absent.

**Recommendation:** `/resume` page with interactive timeline (Framer Motion), showing:

- Roles (company, title, dates, key achievements)
- Certifications (ISTQB already in sidebar, expand with dates)
- Tool/tech stack evolution over time
- Quantified impact bullets

**Why this matters:** More engaging than a PDF. Demonstrates career progression visually.

---

### 6. Testimonials / references

**Problem:** No social proof.

**Recommendation:** 2–3 pull quotes from past managers or colleagues embedded in PortfolioPage or as a `/references` section. Include name, title, company, and a short quote about working with Jonathan.

**Why this matters:** Trust signal. Third-party validation is more persuasive than self-promotion.

---

## Tier 3 — Polish & Hardening

### 7. Image optimization readiness

**Problem:** No images used yet (fine now). If screenshots or headshot are added, they must use `next/image`.

**Checklist:**

- ✅ Static export (`output: 'export'`) — requires `unoptimized` or `images.unoptimized: true` in next.config
- Use WebP, proper dimensions, lazy loading
- Cloudinary or direct static imports

---

### 8. Bundle size budget

**Problem:** No bundle size tracking. Dependencies can bloat silently.

**Recommendation:** Add `next-bundle-analyzer` (dev-only) or `size-limit` to CI.

**Targets (illustrative):**

- JS total: < 200 KB gzipped
- Three.js chunk: allowed (separate async chunk)
- Framer Motion: allowed (separate async chunk)

---

### 9. Loading states & Suspense

**Problem:** Three.js topology has a timeout fallback, but no skeleton/shimmer loading for content sections.

**Recommendation:** Add `React.Suspense` boundaries + skeleton components for:

- Project gallery (stagger in already works — enough)
- Terminal boot sequence (already has typing animation)
- Quality dashboard (if async data loads added later)

---

## Summary Priority Matrix

| #   | Item               | Impact | Effort | Signal Boost         |
| --- | ------------------ | ------ | ------ | -------------------- |
| 1   | Contact form       | High   | Low    | Direct conversion    |
| 2   | Case study pages   | High   | Medium | Depth perception     |
| 3   | Analytics          | High   | Low    | Data foundation      |
| 4   | Blog               | Medium | Medium | SEO + authority      |
| 5   | Resume timeline    | Medium | Medium | Career storytelling  |
| 6   | Testimonials       | Medium | Low    | Trust / social proof |
| 7   | Image optimization | Low    | Low    | Future-proofing      |
| 8   | Bundle budget      | Low    | Low    | Performance guard    |
| 9   | Loading states     | Low    | Low    | UX polish            |

**Recommended sequence:** 3 → 1 → 2 → 6 → 5 → 4 → 7 → 8 → 9

---

## Files that would change

| Item           | New/Changed files                                                            |
| -------------- | ---------------------------------------------------------------------------- |
| Contact form   | `src/components/ContactForm.tsx`, `src/lib/i18n/en.ts`, `src/lib/i18n/es.ts` |
| Case studies   | `src/app/(en)/projects/[slug]/page.tsx`, `src/components/ProjectDetail.tsx`  |
| Analytics      | `src/components/RootShell.tsx` (add script), `.env.example`                  |
| Blog           | `src/app/(en)/blog/[slug]/page.tsx`, MDX content files                       |
| Resume         | `src/app/(en)/resume/page.tsx`, `src/components/Timeline.tsx`                |
| Testimonials   | `src/components/Testimonials.tsx`, siteConfig expansion                      |
| Bundle budget  | `package.json` (add size-limit), `.github/workflows/ci.yml`                  |
| Loading states | `src/components/Skeleton.tsx`, suspense boundaries                           |
