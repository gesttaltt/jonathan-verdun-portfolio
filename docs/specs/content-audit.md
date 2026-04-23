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
