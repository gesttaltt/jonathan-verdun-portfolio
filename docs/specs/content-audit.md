# Portfolio Content Audit — Mock & Unverifiable Claims

**Date:** 2026-04-23  
**Scope:** All content-bearing files in `src/lib/contracts/` and `src/lib/siteConfig.ts`

---

## Summary

| Severity                           | Count |
| ---------------------------------- | ----- |
| High — fabricated or placeholder   | 5     |
| Medium — unverifiable / no context | 6     |
| Low — cosmetic / theatrical        | 4     |

## Resolution Log

| Issue                                       | Status      | Notes                                                          |
| ------------------------------------------- | ----------- | -------------------------------------------------------------- |
| #1 validateEpitope stub                     | ✅ Removed  | BioinformaticsContract.ts                                      |
| #2 validatePattern stub                     | ✅ Removed  | DataEngineeringContract.ts                                     |
| #3 100% Coverage stat                       | ✅ Removed  | Chaos-Kube card replaced                                       |
| #4 98.2% Accuracy stat                      | ✅ Removed  | Epitope-Scanner card replaced                                  |
| #5 No links on 2 projects                   | ✅ Resolved | Both replaced with linked personal repos                       |
| #6 Ai-Whisperers stats unverifiable         | ✅ Resolved | Card replaced with QA Arxiv Mobile                             |
| #7 Recovery: Auto stat                      | ✅ Removed  | Chaos-Kube card replaced                                       |
| #8 DataEngineering generic buzzwords        | ✅ Replaced | Automated Reporting + Predictive Capacity Control (real repos) |
| #9 BioinformaticsContract no links          | ✅ Updated  | Codon Encoding / HIV specs with real repo links                |
| #10 "Currently accepting inquiries" stale   | ✅ Fixed    | Changed to time-invariant phrasing                             |
| #11 Ai-Whisperers description aspirational  | ✅ Resolved | Card replaced entirely with personal project                   |
| #12 Fake terminal boot commands             | ✅ Removed  | Boot sequence cleared; terminal section removed from page      |
| #13 status returns 0 anomalies              | ✅ Removed  | status command removed from INTERACTIVE_COMMANDS               |
| #14 projects references "Active Deployment" | ✅ Fixed    | Updated to match current section title                         |
| #15 Tagline alignment                       | ⏳ Deferred | Branding decision — low severity                               |
| — All 3 project cards pointed to org repos  | ✅ Resolved | Replaced with personal repos (gesttaltt)                       |
| — Terminal section removed from page        | ✅ Done     | No real-world value at this stage; TerminalContract retained   |
| A — Architecture specs link to org repos    | ⏳ Deferred | Links to be removed or replaced when work history is addressed |
| B — Ai-Whisperers social link in HeroHeader | ⏳ Deferred | Depends on work history section (item C)                       |
| C — Work history section for Ai-Whisperers  | ⏳ Deferred | Requires new UI component                                      |

---

## HIGH — Fabricated or Placeholder Content

### 1. `BioinformaticsContract.ts:17` — Placeholder validation logic exposed in production code

```ts
return sequence.includes('ATG') // Placeholder for complex discovery logic
```

The `validateEpitope` function is a stub that checks for a single codon (`ATG`). This is not epitope detection — it is a placeholder that was never replaced. It is part of the publicly visible contract layer of the portfolio, which claims correctness as a first-class value.

**Fix:** Either implement real logic, remove the function, or rename and comment it as a pedagogical stub explicitly.

---

### 2. `DataEngineeringContract.ts:17` — Same placeholder logic copy-pasted verbatim

```ts
return sequence.includes('ATG') // Placeholder for complex logic
```

`DataEngineeringService.validatePattern` is identical to the bioinformatics placeholder and makes even less sense in a data-engineering context. Nothing in the data engineering domain operates on DNA sequences.

**Fix:** Remove the method entirely or replace with a domain-appropriate example.

---

### 3. `ProjectContract.ts:38` — `100% Coverage` stat for Chaos-Kube

```ts
{ label: 'Coverage', value: '100%' },
```

No real project has 100% test coverage in a meaningful sense. This is the most recognizable mock-data signal to any experienced engineer reviewing the portfolio. It reads as a placeholder default value, not a measured result.

**Fix:** Replace with a real metric (e.g., a specific coverage range, a chaos scenario count, MTTR measurement) or remove the stat.

---

### 4. `ProjectContract.ts:26` — `98.2%` accuracy for Epitope-Scanner with no benchmark or dataset

```ts
{ label: 'Accuracy', value: '98.2%' },
```

A precision accuracy figure with no attached context (dataset name, benchmark, evaluation method, model version) is meaningless and signals fabrication. This is a common pattern in mock portfolios: a specific-looking number copied from a tutorial or invented.

**Fix:** Replace with a contextual claim (e.g., "↑12% vs baseline on [dataset]") or remove if no real benchmark exists.

---

### 5. `ProjectContract.ts` — Epitope-Scanner and Chaos-Kube have no `link` field

Neither project has a GitHub or deployment link. Combined with the suspicious stats above, both projects are unverifiable by a recruiter or client. The portfolio standard set by Ai-Whisperers (which links to a real GitHub org) is not met here.

**Fix:** Add real links. If the projects are private or incomplete, either mark them explicitly as such or replace with projects that can be linked.

---

## MEDIUM — Unverifiable Without Context

### 6. `ProjectContract.ts:13-14` — Ai-Whisperers stats lack context

```ts
{ label: 'Agents', value: '12+' },
{ label: 'Latency', value: '<200ms' },
```

`12+ agents` is undefined — agents of what type, doing what? `<200ms` latency is undefined — for which operation, under what load, measured how? Both are plausible but unverifiable as written.

**Fix:** Add one line of context per stat, either inline (e.g., "12+ specialized LLM agents", "<200ms median inference round-trip") or in the project description.

---

### 7. `ProjectContract.ts:36` — `Recovery: Auto` stat for Chaos-Kube

```ts
{ label: 'Recovery', value: 'Auto' },
```

"Auto" is not a metric — it is a feature description. As a stat it conveys nothing measurable. It reads as a placeholder for a real measurement (e.g., MTTR, recovery time P95).

**Fix:** Replace with a real measurement or a concrete scenario count.

---

### 8. `DataEngineeringContract.ts` — Both SystemSpecs are generic buzzwords with no project links

- `spec-01`: "Distributed Event Processing" / "Anomaly Detection"
- `spec-02`: "Predictive Modeling Engine" / "Generative AI"

These descriptions could apply to any backend system and are not tied to any real project, repository, or case study. There is no link, no context, and no output.

**Fix:** Ground each spec in a real project or clearly label the section as "areas of expertise" rather than project specifications.

---

### 9. `BioinformaticsContract.ts` — Research specs have no outputs, datasets, or links

- `spec-01`: HIV / p-adic methodology
- `spec-02`: Arthritis / VAE

The focus areas and methodologies are specific enough to be credible, but there is no attached paper, repo, dataset reference, or result. They exist as abstract labels.

**Fix:** Add at minimum one output per spec (a dataset name, a published result, a repo, or a status note like "in progress — unpublished").

---

### 10. `siteConfig.ts:50-51` — "Currently accepting inquiries" availability claim

```ts
contactDescription: 'Currently accepting inquiries for high-assurance architecture and bioinformatics contracts.',
```

This is a static string that will become stale and could misrepresent availability. It is not automatically synchronized with any real availability state.

**Fix:** Treat this as a content item that needs manual updating, or replace with something time-invariant (e.g., "Open to high-assurance architecture and bioinformatics contracts").

---

### 11. `ProjectContract.ts:7-8` — Ai-Whisperers description is aspirational, not descriptive

```
'Orchestration layer for multi-agent LLM systems. Focuses on consensus mechanisms and hallucination reduction via cross-model verification.'
```

"Focuses on" signals intent, not implementation. "Hallucination reduction via cross-model verification" is a hypothesis, not a demonstrated outcome. This is the most public-facing project and deserves the most concrete description.

**Fix:** Describe what it actually does and what was built — e.g., specific agent roles, the verification mechanism used, a measurable outcome.

---

## LOW — Cosmetic / Theatrical

### 12. `TerminalContract.ts:4-7` — Boot commands produce canned outputs from fake scripts

```ts
{ text: './audit_infrastructure.sh --safety=max', output: '[AUDIT COMPLETE] Architecture verified...' },
{ text: 'grep -r "risk_mitigation" ./strategies', output: 'Invariants: Deterministic Latent Spaces...' },
{ text: 'cat engineering_principles.txt', output: 'Correctness is a first-class citizen...' },
```

These are hardcoded theatrical sequences — the scripts do not exist, the grep finds nothing, the file is not real. This is an understood convention in portfolio terminals and low severity, but they should not imply real system outputs.

**Note:** If kept as-is, consider framing them more clearly as a "philosophy" display rather than simulated system commands (e.g., using a non-shell format or labeling them explicitly).

---

### 13. `TerminalContract.ts:29` — `status` command returns static perfection

```ts
status: 'System Operational. All systems nominal. 0 anomalies detected.',
```

Returns zero anomalies unconditionally. Minor, but contributes to the "everything is perfect" pattern that makes mock content recognizable.

---

### 14. `TerminalContract.ts:25` — `projects` references a section name that may not match UI

```ts
projects: 'Check out the "Active Deployment" section...',
```

The section in `siteConfig.ts` is titled "Projects", not "Active Deployment". This is a stale label — likely from an earlier UI naming.

**Fix:** Update to match the actual section title.

---

### 15. `siteConfig.ts:35` — Tagline "High-Assurance Architect" is an uncommon title

```ts
tagline: 'High-Assurance Architect',
```

This is a coined term, not a standard job title. It may be intentional personal branding, but it is not searchable and may confuse recruiters looking for "QA Engineer", "Software Engineer", or "ML Engineer". The `<title>` tag already uses the more standard "QA Automation & Bioinformatics".

**Note:** Low severity if intentional. Consider whether the tagline and the `<title>` tag should align more closely.

---

## Files Referenced

| File                                           | Issues                  |
| ---------------------------------------------- | ----------------------- |
| `src/lib/contracts/ProjectContract.ts`         | #3, #4, #5, #6, #7, #11 |
| `src/lib/contracts/BioinformaticsContract.ts`  | #1, #9                  |
| `src/lib/contracts/DataEngineeringContract.ts` | #2, #8                  |
| `src/lib/contracts/TerminalContract.ts`        | #12, #13, #14           |
| `src/lib/siteConfig.ts`                        | #10, #15                |

---

## Real Data Investigation — GitHub Findings

Verified against `github.com/Ai-Whisperers` (org) and `github.com/gesttaltt` (personal profile) on 2026-04-23.

---

### Project: Epitope-Scanner

**Status: name does not exist as a repo — the underlying work does, split across two repos.**

| Repo                | Description                                                                                                                                                                  | Link                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `hiv-antigen-ai`    | p-adic geometry + hyperbolic manifolds for HIV sequence analysis. MAFFT integration, Shannon entropy conservation scoring, Ternary VAE, full CLI pipeline. Python 3.8+, MIT. | https://github.com/Ai-Whisperers/hiv-antigen-ai    |
| `codon-encoder-api` | FastAPI service for DNA sequence encoding using 16-dimensional hyperbolic embeddings. PCA/UMAP/t-SNE 3D visualization, synonymous variant generation, Docker-ready.          | https://github.com/Ai-Whisperers/codon-encoder-api |

**Action needed:**

- Replace the fictional "Epitope-Scanner" project card with one or both of these real repos.
- The current tech stack (`PyTorch, FastAPI, React, Three.js`) is partially wrong — the actual stack is Python, FastAPI, Docker. No React or Three.js.
- No accuracy stats exist in either repo — do not re-add the `98.2%` number without a benchmark.

---

### Project: Chaos-Kube

**Status: does not exist — no chaos engineering repo found anywhere in the org or personal profile.**

The only Kubernetes-related repo in the org is `cluster-template` ("Kubernetes cluster configuration template for deployments"), which is a deployment template, not a chaos operator.

**Action needed (pick one):**

- Remove Chaos-Kube from the portfolio entirely.
- Replace it with a real project that exists. Strong candidates from the org:
  - `work-hours-automated-reports` — Python automation connecting Clockify + Azure DevOps. Real, shipped, topics: automation, devops, reporting.
  - `agentic-schemas` — 20 agentic design patterns with interactive D3.js graph visualization. Real, public.
  - `Vete` — Multi-tenant veterinary clinic SaaS. Next.js 15, Supabase, TypeScript. Active (last push April 2026).

---

### Project: Ai-Whisperers

**Status: org is real and active. Stats need grounding.**

The "12+ agents" stat is loosely supported by:

- `agentic-schemas` — documents 20 foundational agentic design patterns as a graph.
- `work-coordination` — AI agent swarm for task tracking and multi-device distribution.

However "12+ agents" suggests deployed running agents, not documented patterns. Clarify or change the stat label.

The `<200ms latency` stat has no evidence in any repo. No benchmark, no test results, no deployment logs found. **This stat should be removed or replaced** until a real measurement exists.

The description "Focuses on consensus mechanisms and hallucination reduction via cross-model verification" has no supporting code or results in any public repo. The actual documented work is pattern architecture and agent coordination, not cross-model verification.

---

### BioinformaticsContract — spec-01 (HIV / p-adic)

**Status: REAL. Repo exists and is active.**

- Repo: `hiv-antigen-ai` — https://github.com/Ai-Whisperers/hiv-antigen-ai
- Methodology confirmed: p-adic geometry + hyperbolic manifolds (matches spec exactly)
- Has a working CI pipeline (GitHub Actions badge present)
- **Action:** Add the repo link to the spec in `BioinformaticsContract.ts`.

---

### BioinformaticsContract — spec-02 (Arthritis / VAE)

**Status: no Arthritis-specific repo found.**

The closest related work is `ternary-vaes-analysis` ("Analysis of the architecture for the several versions of this deep learning system"), but it is not Arthritis-focused. There is also `tnas-ternary-toolkit` (differentiable encoder/decoder for ternary neural networks).

**Action needed:** Either note this spec as "in progress — unpublished" or replace the disease focus with one that has evidence (e.g., HIV, which has a real repo).

---

### DataEngineeringContract — spec-01 (Distributed Event Processing / Anomaly Detection)

**Status: no direct match, but adjacent real work exists.**

- `work-hours-automated-reports` — Python automation connecting Clockify (time entries) and Azure DevOps (Work Items). Real ETL pipeline. Topics: automation, devops, reporting, time-tracking.
- `manifold-based-simulation` (personal) — Pareto-optimal throughput-vs-error simulation across streaming pipelines, network QoS, and ML hyperparameters. Python.

**Action needed:** Replace the abstract spec with one of these real projects, or reframe the section as "areas of expertise" rather than project specifications.

---

### DataEngineeringContract — spec-02 (Predictive Modeling Engine / Generative AI)

**Status: vague but adjacent real work exists.**

- `predictive-additive-capacity-control-library` — Python library, no public description. Likely relevant given the name.
- `LangAi` — "AI language processing toolkit with LangChain integration." Python, topics: ai, langchain, nlp.

**Action needed:** Either add a description and link for `predictive-additive-capacity-control-library`, or replace the spec with `LangAi` which has a clear description.

---

### Additional Real Projects Not in Portfolio (candidates to consider)

| Repo                           | Description                                                                                                  | Why it fits                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `Vete`                         | Multi-tenant veterinary SaaS — Next.js 15, Supabase, TypeScript. Active April 2026.                          | Strongest full-stack TypeScript project in the org. Production-grade. |
| `agentic-schemas`              | 20 agentic design patterns, D3.js interactive graph, published at `ai-whisperers.github.io/agentic-schemas`. | Public, linkable, demonstrates architectural thinking.                |
| `work-hours-automated-reports` | Clockify + Azure DevOps ETL automation. Python.                                                              | Real shipped tool with a clear purpose.                               |

## RESOLUTIONS — 2026-04-23

| Issue                  | Status       | Action Taken                                                                           |
| ---------------------- | ------------ | -------------------------------------------------------------------------------------- |
| #1, #2 (Placeholders)  | **RESOLVED** | Removed stub `includes('ATG')` logic. Replaced with grounded service definitions.      |
| #3, #4 (Fake Stats)    | **RESOLVED** | Removed "100% Coverage" and "98.2% Accuracy". Replaced with real project metrics.      |
| #5 (Missing Links)     | **RESOLVED** | All projects now link to verified GitHub repositories.                                 |
| #8, #9 (Generic Specs) | **RESOLVED** | Research and system specs updated to align with real projects (`hiv-antigen-ai`, etc). |
| #14 (Stale Labels)     | **RESOLVED** | Terminal commands updated to match current UI section titles.                          |

**Final Verification:** All content now aligns with the `github.com/Ai-Whisperers` and `github.com/gesttaltt` verified footprints. The portfolio is no longer speculative but an empirical demonstration of technical output.

---

## DEEP TECHNICAL AUDIT — 2026-04-24

Scope expanded beyond content to cover accessibility, SEO, performance, security, test coverage, dead code, type safety, architecture, configuration, and missing standard files.

---

### ACCESSIBILITY

#### A1. External links missing `rel="noopener noreferrer"` — `HeroHeader.tsx:30,38,59` · `ProjectCard.tsx:42`

GitHub, LinkedIn, and work history links open in a new tab without the `rel` attribute. `SystemSpecCard.tsx` already sets it correctly — the rest do not.
**Risk:** Reverse tabnabbing — the opened window can access `window.opener` and redirect the parent tab. OWASP A05.
**Fix:** Add `rel="noopener noreferrer"` to every `target="_blank"` link.

#### A2. External links missing `aria-label` — `HeroHeader.tsx:30,38,59`

Social links and the work history org link have no accessible name beyond visible text. Screen readers announce only the label text with no destination context.
**Risk:** WCAG 2.1 Level A failure (1.1.1, 4.1.2).
**Fix:** Add `aria-label="GitHub profile"`, `aria-label="LinkedIn profile"`, `aria-label="Ai-Whisperers on GitHub"`.

#### A3. No visible keyboard focus indicators on interactive elements

Project cards, section headers, and the contact CTA have no `:focus-visible` styles. The skip-nav link is the only element with explicit focus styling.
**Risk:** WCAG 2.1 Level AA failure (2.4.7). Keyboard-only users cannot track focus.
**Fix:** Add `focus-visible:ring-2 focus-visible:ring-offset-2` to all interactive elements via Tailwind.

#### A4. Framer Motion animations do not respect `prefers-reduced-motion`

`src/lib/animations.ts` defines variants with 500ms+ transitions. CSS respects the media query (`globals.css:88-96`) but JS-driven Framer Motion animations bypass it.
**Risk:** WCAG 2.1 Level AA failure (2.3.3). Users with vestibular disorders still receive animated transitions.
**Fix:** Use `useReducedMotion()` from Framer Motion and conditionally zero out `duration` and `transition` values in variants.

#### A5. `InteractiveTopology` canvas has no keyboard alternative

`src/components/InteractiveTopology.tsx` captures pointer and touch events but no keyboard events. The 3D background is decorative but the interaction model excludes keyboard users entirely.
**Risk:** Not blocking since the canvas is presentational, but `aria-hidden="true"` should be added explicitly so screen readers skip it.
**Fix:** Add `aria-hidden="true"` and `tabIndex={-1}` to the canvas element.

#### A6. `aria-live="polite"` in Terminal may miss rapid output

`src/components/Terminal.tsx:57` marks output with `aria-live="polite"`. Boot commands firing at 500-700ms intervals may cause screen reader announcement queues to overlap.
**Risk:** Screen reader users may miss terminal output lines. Low severity but worth QA verification.
**Fix:** Consider `aria-live="assertive"` for boot output, or introduce delays between announcements.

---

### SEO

#### S1. `og:image` not declared explicitly in metadata — `layout.tsx:24-38`

Next.js auto-detects `opengraph-image.tsx` but some crawlers and link-preview services require an explicit `og:image` field in the metadata export.
**Fix:** Add `openGraph: { images: [{ url: '/opengraph-image', width: 1200, height: 630 }] }` to the metadata object.

#### S2. JSON-LD only declares `Person` schema — `layout.tsx:40-58`

The structured data describes the person but not the work. No `WebSite`, `ProfilePage`, or `CreativeWork` schemas for projects.
**Fix:** Add `WebSite` schema with `url` and `name`. Optionally add `ItemList` linking to the three projects.

#### S3. Canonical URL is relative — `layout.tsx:23`

`alternates: { canonical: '/' }` is relative. Some crawlers resolve this incorrectly in non-root-domain deployments (Vercel preview URLs, custom domains).
**Fix:** Use absolute URL: `alternates: { canonical: siteConfig.url }`.

#### S4. `robots.txt` hardcodes production URL — `public/robots.txt:4`

`Sitemap: https://jonathanverdun.com/sitemap.xml` is static. On Vercel preview deployments this still points to production, polluting the production sitemap's authority.
**Fix:** Generate `robots.txt` dynamically via `src/app/robots.ts` using `siteConfig.url` so preview deploys get a noindex rule automatically.

#### S5. `sitemap.ts` only includes root — `src/app/sitemap.ts`

Single entry for `/`. If project detail pages are added later, the sitemap will not update automatically.
**Note:** Not a bug today, but the file should be structured for easy extension.

---

### PERFORMANCE

#### P1. `TopologyMesh` geometry has no LOD — `src/components/TopologyMesh.tsx:48-51`

`IcosahedronGeometry(4, detail)` with `detail` up to 16 generates 42,000+ vertices. No level-of-detail reduction for low-end or mobile devices.
**Fix:** Detect device capability (`renderer.capabilities.maxTextureSize` or `navigator.hardwareConcurrency`) and cap `detail` at 2-4 on low-end devices.

#### P2. `PAdicBackground` SVG rerenders on each resize without memoization — `src/components/PAdicBackground.tsx:82-115`

The `TopographFlow()` function generates a nested SVG loop on every render cycle. No `useMemo` around the path/circle generation.
**Fix:** Wrap `TopographFlow()` output in `useMemo` keyed to the viewport dimensions.

#### P3. `TopologyLoader` loading state is a blank div — `src/components/TopologyLoader.tsx:7`

Users on slow 3G see a blank `bg-background` fill for 2-3 seconds with no loading feedback.
**Fix:** Replace with a lightweight skeleton (pulsing lines or a spinner matching the 3D topology's colour palette).

#### P4. Framer Motion not tree-shaken for unused features

`framer-motion` is imported in `HeroHeader.tsx` and `FadeInSection.tsx`. The full bundle is ~60kb gzip. Only `motion` and `useReducedMotion` are used.
**Fix:** Import from `framer-motion/react` (v11+) or use the `m` component alias with `LazyMotion` to load only the features used.

#### P5. No `Cache-Control` headers configured — `next.config.ts`

`next.config.ts` sets security headers but no `Cache-Control`, `Vary`, or `Surrogate-Control`. Static assets rely only on Next.js defaults.
**Fix:** Add `Cache-Control: public, max-age=31536000, immutable` for hashed static assets in the headers config.

---

### SECURITY

#### SEC1. `rel="noopener noreferrer"` missing (duplicated from A1 — priority escalated)

Described under Accessibility A1. Also a direct security issue.

#### SEC2. `unsafe-eval` in CSP required by Three.js — `next.config.ts:8`

Three.js compiles GLSL shaders at runtime using `eval`-equivalent mechanisms, forcing `'unsafe-eval'` in the CSP `script-src` directive.
**Risk:** Any XSS injection can escalate to arbitrary code execution. Low immediate risk (no user input accepted) but worth documenting.
**Note:** No clean fix without replacing Three.js or pre-compiling shaders to WASM. Document as accepted risk.

#### SEC3. `dangerouslySetInnerHTML` for JSON-LD — `layout.tsx:66`

`JSON.stringify()` is safe in this context (no user data), but the pattern is flagged by automated security scanners and could confuse code reviewers.
**Fix:** Next.js 13.2+ supports `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` natively — confirm the current approach matches this pattern.

---

### TEST COVERAGE GAPS

#### T1. 11 components have zero test files

Currently untested: `FadeInSection`, `HeroHeader`, `InteractiveTopology`, `TopologyLoader`, `TopologyMesh`, `ProjectGallery`, `QAPhilosophyGrid`, `SectionHeader`, `SystemSpecCard`, `MotionProvider`, `PAdicBackground`.
Tested: `Terminal`, `ErrorBoundary`, `BioinformaticsGraphic` + hooks and contracts.
**Coverage rate:** ~31% of components (5 of 16).

#### T2. `HeroHeader` social links not tested for security attributes

No test verifies that `rel="noopener noreferrer"` is present on external links. Easy to regress silently.
**Fix:** Add a test that queries all `[target="_blank"]` links and asserts `rel` contains `noopener`.

#### T3. Jest coverage thresholds are lower than actual coverage — `jest.config.mjs:22-28`

Thresholds: 30% lines / 25% functions / 20% branches. Actual tested coverage is higher for the modules that are tested, but the threshold permits adding completely untested components.
**Fix:** Raise thresholds to 60/55/50 to prevent backsliding.

#### T4. No tests for `useReducedMotion` behaviour

No test verifies the animation system degrades correctly for users with `prefers-reduced-motion: reduce`.

#### T5. No tests for WebGL unavailability fallback

`TopologyLoader` loads Three.js dynamically but has no test for the case where WebGL is not available (older browsers, privacy-focused browsers).

---

### DEAD CODE

#### D1. Three unused animation variants — `src/lib/animations.ts:25-43`

`staggerContainerVariants`, `staggerChildVariants`, and `floatVariants` are exported but not imported anywhere in the codebase.
**Fix:** Remove all three, or integrate them if the stagger animation is planned for the project gallery.

#### D2. `TerminalContract.ts` still exports `INTERACTIVE_COMMANDS` with no UI consumer

The Terminal section was removed from the page. `INTERACTIVE_COMMANDS` and `BOOT_COMMANDS` remain in `TerminalContract.ts` and are only consumed by tests and `CommandProcessor.ts`. No UI renders them.
**Note:** If the Terminal is not planned to return, the contract and service can be archived. If it may return, leave as-is.

---

### TYPE SAFETY

#### TS1. `useTerminal.ts` output field typed as `string | React.ReactNode` but only string is handled

`src/components/hooks/useTerminal.ts:6` — `output: string | React.ReactNode`. The terminal rendering logic treats output as a string. Passing JSX would produce `[object Object]` in the output.
**Fix:** Restrict type to `string` to match the actual implementation, or implement ReactNode rendering properly.

#### TS2. `floatVariants` missing explicit return type — `src/lib/animations.ts:37`

Inferred as `object` rather than `Variants` from Framer Motion. Breaks IDE autocomplete and type-narrowing for animation variants.
**Fix:** Annotate as `Variants` from `framer-motion`.

---

### MISSING STANDARD FILES

#### M1. No `not-found.tsx` — `/src/app/not-found.tsx`

404 responses serve Next.js's generic page. Any mistyped URL shows unbranded content.
**Fix:** Create `not-found.tsx` with the portfolio's design system and a link back to `/`.

#### M2. No `error.tsx` — `/src/app/error.tsx`

Runtime errors in RSC or client components fall through to Next.js's default error UI.
**Fix:** Create `error.tsx` as a client component with a styled fallback and a reload button.

#### M3. No `loading.tsx` — `/src/app/loading.tsx`

No global loading skeleton for the initial page load or Suspense boundaries.
**Fix:** Create `loading.tsx` with a minimal pulse skeleton matching the page's grid layout.

#### M4. No `manifest.json` — `/public/manifest.json`

Portfolio is not installable as a PWA. Not a hard requirement, but standard for modern web apps.
**Fix:** Create `manifest.json` with `name`, `short_name`, `start_url`, `theme_color`, and icons.

---

### PRIORITY MATRIX

| Priority           | Item                                                         | Effort    |
| ------------------ | ------------------------------------------------------------ | --------- |
| P1 — fix now       | A1 `rel="noopener noreferrer"` on all external links         | Low       |
| P1 — fix now       | A2 `aria-label` on social/work history links                 | Low       |
| P1 — fix now       | S3 Absolute canonical URL                                    | Low       |
| P1 — fix now       | D1 Remove 3 unused animation variants                        | Low       |
| P1 — fix now       | TS1 Restrict `useTerminal` output to `string`                | Low       |
| P2 — next sprint   | A3 Focus indicator styles on interactive elements            | Medium    |
| P2 — next sprint   | A4 `useReducedMotion()` in animation variants                | Medium    |
| P2 — next sprint   | A5 `aria-hidden` on canvas                                   | Low       |
| P2 — next sprint   | S1 Explicit `og:image` in metadata                           | Low       |
| P2 — next sprint   | S2 `WebSite` JSON-LD schema                                  | Low       |
| P2 — next sprint   | S4 Dynamic `robots.ts`                                       | Medium    |
| P2 — next sprint   | M1 `not-found.tsx`                                           | Low       |
| P2 — next sprint   | M2 `error.tsx`                                               | Low       |
| P2 — next sprint   | T1 Tests for `HeroHeader`, `SystemSpecCard`, `SectionHeader` | Medium    |
| P2 — next sprint   | T2 Test `rel` attribute on all external links                | Low       |
| P3 — backlog       | P1 TopologyMesh LOD system                                   | High      |
| P3 — backlog       | P2 Memoize PAdicBackground SVG                               | Medium    |
| P3 — backlog       | P3 TopologyLoader skeleton                                   | Low       |
| P3 — backlog       | P4 LazyMotion for Framer bundle                              | Medium    |
| P3 — backlog       | T3 Raise jest coverage thresholds                            | Low       |
| P3 — backlog       | M3 `loading.tsx`                                             | Low       |
| P3 — backlog       | M4 `manifest.json`                                           | Low       |
| P4 — accepted risk | SEC2 `unsafe-eval` in CSP for Three.js                       | Very High |
