# Architecture Specification

Reference for the overall project structure and layering.

---

## 1. Technical Stack

| Layer        | Technology                                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |
| Framework    | Next.js (App Router, static export)                                                                                        |
| Language     | TypeScript, strict mode                                                                                                    |
| Styling      | Tailwind CSS v4 — CSS-first config, no `tailwind.config.ts`                                                                |
| Animations   | Framer Motion, centralized variants in `lib/animations.ts`                                                                 |
| Graphics     | Three.js / React Three Fiber, custom GLSL shaders                                                                          |
| Testing      | Jest + React Testing Library + fast-check (unit/integration/property-based), Playwright (E2E), Lighthouse CI (performance) |
| Architecture | SOLID-style layering: contracts / services / components                                                                    |

The site is built with `output: 'export'` (static export) — see `next.config.ts`'s "STATIC-EXPORT SECURITY CONTRACT" comment block for the implications this has for CSP delivery, path-traversal guards in `BlogService`/`AuditRepository`, and the contact form's client-side submission.

---

## 2. Project Structure

```
src/
├── app/
│   ├── (en)/                    # English routes: /, /blog, /projects/[slug], /quality, /resume
│   ├── (es)/es/                 # Spanish routes, same shape under /es
│   ├── layout.tsx (×2)          # One per locale group — CSP meta, ThemeScript, providers
│   ├── error.tsx, global-error.tsx, not-found.tsx
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── globals.css
├── components/                  # Presentation layer — see COMPONENTS.md
│   └── hooks/                   # useProjects, useTerminal
├── content/blog/                # MDX blog posts
└── lib/
    ├── contracts/                # Pure data & type definitions — see CONTRACTS.md
    ├── services/                  # Adapters, business logic, DI boundaries
    ├── i18n/                       # en.ts / es.ts translations + context
    ├── shaders/                     # GLSL + point-cloud generators — see SHADERS.md
    ├── theme/                        # Theme context
    ├── og/                             # OG image builder
    ├── animations.ts, siteConfig.ts, metadata.ts, jsonLd.ts, fonts.ts, projectSlugify.ts
```

Both locale layouts (`(en)/layout.tsx`, `(es)/layout.tsx`) render the same structure: `<html lang suppressHydrationWarning>` → `<head>` with `<ThemeScript/>` and the CSP `<meta>` tag → `<body>` wrapping children in `<ThemeProvider><I18nProvider><RootShell>{children}</RootShell></I18nProvider></ThemeProvider>`.

---

## 3. Layering (contracts / services / components)

- **Contracts** own data shapes and static content, no React, no side effects. E.g. `ProjectContract.ts` exports `PROJECT_DATA` and a `ProjectService.getProjects()` static method; `QAContract.ts` exports a plain `QA_PHILOSOPHY` const.
- **Services** own logic and adapt data sources for the component tree. E.g. `ProjectRepository.ts` defines `IProjectRepository`/`StaticProjectAdapter`, decoupling "how project data is fetched" from "how it's rendered." `CommandProcessor.ts` does the same for terminal commands. `AuditRepository.ts` reads and sanitizes markdown from `docs/` at request time.
- **Components** own presentation and consume services through hooks/context, never importing contracts directly where a service exists. E.g. `ProjectGallery.tsx` calls `useProjects()`; `Terminal.tsx` accepts an injectable `processor` prop rather than importing `DefaultCommandProcessor` implicitly.

This split means swapping a data source (e.g. moving projects to a CMS) only requires a new `IProjectRepository` implementation — no component changes.

---

## 4. Internationalization

Full EN/ES parity via `lib/i18n/en.ts` / `es.ts`, both implementing the same `Translations` type (`lib/i18n/types.ts`). A property-based test (`fast-check`) asserts both locale files expose identical key structures, so a key added to one without the other fails CI rather than shipping a missing translation silently.

---

## 5. Resilience

- WebGL: `TopologyLoader` idle-defers the heavy Three.js import and falls back to a CSS gradient after a 3s timeout if the module never resolves; `InteractiveTopology` also recovers from a lost WebGL context by remounting the canvas.
- Offline: a Service Worker (`public/sw.js`, registered by `ServiceWorkerRegister.tsx`) caches assets for offline viewing in production.
- Errors: `ErrorBoundary` wraps the WebGL tree; `app/error.tsx` and `app/global-error.tsx` provide branded fallbacks for the rest of the app.
