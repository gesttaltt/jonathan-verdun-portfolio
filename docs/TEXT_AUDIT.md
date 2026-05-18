# Text Content Audit — Jonathan Verdun Portfolio

**Date:** 2026-04-26  
**Scope:** All user-visible strings, labels, descriptions, stats, and metadata across the codebase.  
**Purpose:** Identify and flag text that is factually unverified, exaggerated, contradictory, or uses placeholder/mock data, so it can be revised to be honest and professional.

---

## Summary of Findings

| #   | File                  | Field / Location                   | Issue Category                  | Severity |
| --- | --------------------- | ---------------------------------- | ------------------------------- | -------- |
| 1   | `siteConfig.ts`       | `tagline`                          | Inflated title                  | Medium   |
| 2   | `siteConfig.ts`       | `workHistory[0].role / .period`    | Empty placeholder               | Medium   |
| 3   | `siteConfig.ts`       | `description`                      | Unverified specialization claim | Low      |
| 4   | `ProjectContract.ts`  | `proj-02` stat `VCF Speed: 120×`   | Unqualified performance claim   | High     |
| 5   | `ProjectContract.ts`  | `proj-02` description              | Marketing language              | Low      |
| 6   | `ProjectContract.ts`  | `proj-03` description              | Contradicts own status field    | High     |
| 7   | `ProjectContract.ts`  | `proj-03` stat `Scale: 10M+ genes` | Likely factual error            | High     |
| 8   | `TerminalContract.ts` | `about` command                    | Unverified specialization claim | Low      |
| 9   | `QAContract.ts`       | `constraints[1]`                   | Absolute / unverifiable claim   | Low      |
| 10  | `QAContract.ts`       | `constraints[2]`                   | Buzzword misuse                 | Low      |

---

## Detailed Findings

---

### Finding 1 — Tagline: "High-Assurance Architect"

**File:** `src/lib/siteConfig.ts:40`  
**Current value:**

```ts
tagline: 'High-Assurance Architect'
```

**Issue:**  
"Architect" implies a senior system-design role typically associated with years of organizational design responsibility. The rest of the portfolio positions Jonathan as a QA Automation Engineer and Bioinformatics Researcher. The tagline is inconsistent with the actual role descriptions used everywhere else on the site.  
**Recommendation:**  
Replace with a title that matches the verified roles, e.g.:

```ts
tagline: 'QA Engineer · Bioinformatics Researcher'
```

or keep it short and accurate:

```ts
tagline: 'QA Automation & Bioinformatics'
```

---

### Finding 2 — Work History: empty `role` and `period`

**File:** `src/lib/siteConfig.ts:26–33`  
**Current value:**

```ts
workHistory: [
  {
    organization: 'Ai-Whisperers',
    url: 'https://github.com/Ai-Whisperers',
    role: '',
    period: '',
  },
],
```

**Issue:**  
`role` and `period` are empty strings. This means the "Work History" widget in `HeroHeader.tsx` renders a GitHub organization name under a "Work History" label with no context. Ai-Whisperers appears to be a GitHub organization, not a formal employer. Presenting it as work history without role or period is ambiguous and could mislead visitors.  
**Recommendation options:**

- Fill in the actual `role` and `period` if this is real employment (e.g., `role: 'Contributor'`, `period: '2024 – present'`).
- If it is a collaborative open-source organization, rename the section to `'Open Source'` or `'Organizations'` in the UI.
- If there is no formal work history yet to display, remove the widget entirely rather than show incomplete data.

---

### Finding 3 — Site description: "focused on Deep Learning"

**File:** `src/lib/siteConfig.ts:11`  
**Current value:**

```ts
description: 'Portfolio of Jonathan Verdun (Gestalt) - QA Automation Engineer and Bioinformatics Researcher focused on Deep Learning and TDD.'
```

**Issue:**  
No project in the portfolio is described as a deep learning project. The bioinformatics projects use p-adic mathematics and Hyperbolic VAEs (which touch ML), and the QA project is test automation. "Focused on Deep Learning" is not clearly supported by the showcased work.  
**Recommendation:**  
Remove or replace with accurate focus areas:

```ts
description: 'Portfolio of Jonathan Verdun — QA Automation Engineer and Bioinformatics Researcher, focused on test-driven development and computational biology.'
```

---

### Finding 4 — Functionome Atlas stat: `VCF Speed: 120×`

**File:** `src/lib/contracts/ProjectContract.ts:26–27`  
**Current value:**

```ts
{ label: 'VCF Speed', value: '120×' }
```

**Issue:**  
A 120× speedup is a very specific, high-impact claim. It is not qualified by a baseline (120× vs what? naive Python? a reference tool like bcftools?), conditions, or dataset size. Without this context the number is unverifiable and reads as marketing. If the benchmark was not formally measured, this should not appear as a headline stat.  
**Recommendation:**  
Either:

- Remove the stat if it cannot be verified with a reproducible benchmark.
- Add a qualifying label: `{ label: 'vs naive Python', value: '~120×' }` (note the approximation tilde).
- Replace with a measurable stat that can be verified, e.g., wall-clock time on a specific file size.

---

### Finding 5 — Functionome Atlas description: "High-performance pipeline"

**File:** `src/lib/contracts/ProjectContract.ts:22`  
**Current value:**

```ts
description: 'High-performance pipeline computing Functionome Perturbation Scores...'
```

**Issue:**  
"High-performance" is self-applied marketing language. Performance is relative and context-dependent. The project description should describe what it does, not make superlative claims about itself.  
**Recommendation:**  
Drop the qualifier:

```ts
description: 'Pipeline computing Functionome Perturbation Scores to map functional fragility across the human genome...'
```

---

### Finding 6 — Gene Functional Pipeline: "Production-ready" contradicts status "Research"

**File:** `src/lib/contracts/ProjectContract.ts:34–35`  
**Current value:**

```ts
description: 'Production-ready GO annotation pipeline for human genome functional analysis...',
status: 'Research',
```

**Issue:**  
The `status` field is explicitly set to `'Research'`, yet the description opens with "Production-ready." These two statements directly contradict each other. A research-status project is, by definition, not production-ready.  
**Recommendation:**  
Remove "Production-ready" from the description. The status badge already communicates the maturity level:

```ts
description: 'GO annotation pipeline for human genome functional analysis. Three implementations: C++ DAG engine for local throughput, Apache Spark for cloud scale, and Python for development workflows.',
```

---

### Finding 7 — Gene Functional Pipeline stat: `Scale: 10M+ genes`

**File:** `src/lib/contracts/ProjectContract.ts:39`  
**Current value:**

```ts
{ label: 'Scale', value: '10M+ genes' }
```

**Issue:**  
The human genome contains approximately 20,000–25,000 protein-coding genes. The label says "10M+ genes," which is roughly 400× greater than the actual human gene count. If this number refers to something else (e.g., genetic variants, base pairs, GO annotation records, or input rows), the label is misleading. If it literally refers to genes, it is factually incorrect.  
**Recommendation:**  
Clarify what "10M+" refers to:

- If it refers to variants or records: `{ label: 'Variants processed', value: '10M+' }`
- If it refers to GO annotation entries: `{ label: 'GO records', value: '10M+' }`
- If the number itself is wrong: correct it to the verified figure (e.g., `~20K genes` for the human genome).

---

### Finding 8 — Terminal `about` command: "deep learning"

**File:** `src/lib/contracts/TerminalContract.ts:4`  
**Current value:**

```ts
about: 'Jonathan Verdun. QA Automation Engineer and Bioinformatics Researcher. Specializing in TDD, resilient systems, and deep learning.',
```

**Issue:**  
Same as Finding 3 — "deep learning" is not substantiated by the projects on the site. "Resilient systems" is also vague and unqualified in this context.  
**Recommendation:**

```ts
about: 'Jonathan Verdun. QA Automation Engineer and Bioinformatics Researcher. Specializing in TDD, test automation, and computational biology.',
```

---

### Finding 9 — QA constraints: "Property-based fuzzing on **all** domain invariants"

**File:** `src/lib/contracts/QAContract.ts:12`  
**Current value:**

```ts
'Property-based fuzzing on all domain invariants'
```

**Issue:**  
"All domain invariants" is an absolute claim. In practice no codebase has exhaustive property-based coverage of every invariant. This overstates the actual testing posture.  
**Recommendation:**

```ts
'Property-based fuzzing applied to core domain invariants via fast-check'
```

---

### Finding 10 — QA constraints: "Zero-trust validation at all system boundaries"

**File:** `src/lib/contracts/QAContract.ts:13`  
**Current value:**

```ts
'Zero-trust validation at all system boundaries'
```

**Issue:**  
"Zero-trust" is a network security architecture model (NIST SP 800-207), not a validation principle. Using it here as a buzzword to describe input validation misrepresents the term and may confuse technically literate visitors who know the model well.  
**Recommendation:**

```ts
'Strict input validation enforced at all system boundaries'
```

---

## Items That Are Accurate — No Change Needed

| Location                                                   | Text                                                                | Notes                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------- |
| `siteConfig.ts`                                            | Name, GitHub/LinkedIn URLs, email                                   | Verified                      |
| `ProjectContract.ts` `proj-01`                             | "Personal test exercise to demonstrate QA skills…"                  | Honest framing                |
| `ProjectContract.ts` `proj-02` stat `Functionomes: 1,622`  | Specific, plausible                                                 | OK if verified                |
| `ProjectContract.ts` `proj-03` stat `C++ vs Python: 5-25×` | Range qualifier reduces risk                                        | OK if benchmarked             |
| `QAContract.ts` `constraints[0]`                           | "Test suites gate every merge — coverage thresholds enforced in CI" | Verifiable, visible in repo   |
| `QAContract.ts` `specifications`                           | Unit/property/component layer descriptions                          | Accurate methodology          |
| `BioinformaticsContract.ts`                                | p-adic HIV, Hyperbolic VAE codon encoder                            | Matches linked repos          |
| `DataEngineeringContract.ts`                               | ETL / Additive Modeling specs                                       | Reasonable methodology labels |
| `TerminalContract.ts`                                      | `whoami`, `ls projects`, `help`                                     | Functional, no claims         |
| `layout.tsx` JSON-LD                                       | `jobTitle: 'QA Automation Engineer & Bioinformatics Researcher'`    | Consistent and accurate       |
| `not-found.tsx`, `error.tsx`                               | 404/500 UI strings                                                  | Generic, no claims            |

---

## Recommended Edit Order (by impact)

1. **Finding 7** — `10M+ genes` stat: potential factual error, fix first.
2. **Finding 6** — "Production-ready" vs status "Research": internal contradiction, fix immediately.
3. **Finding 4** — `VCF Speed: 120×`: high-impact unqualified claim, resolve or remove.
4. **Finding 2** — Empty `role`/`period` in work history: incomplete data visible to all visitors.
5. **Finding 1** — Tagline "High-Assurance Architect": title mismatch.
6. **Findings 3, 8** — "Deep Learning" claims: replace with accurate focus areas.
7. **Findings 5, 9, 10** — Language cleanup: lower priority but improves credibility.
