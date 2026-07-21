# Internal Audit History (Archive)

Consolidated 2026-07-21 from 8 individually dated audit files that had accumulated in
`docs/internal/` between 2026-04-26 and 2026-05-17. Everything below is closed —
for what's currently open see [REMAINING_ITEMS.md](./REMAINING_ITEMS.md) and [FUTURE_ROADMAP.md](./FUTURE_ROADMAP.md).

These are internal notes only; they were never published (unlike the audits under
`docs/` and `docs/specs/`, which `AuditRepository` renders live at `/quality/*`).

## Timeline

| Date       | Audit                               | Key finding                                                                                                                                                                                                                         | Resolution                                                                                                                                                                                           |
| ---------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-26 | `TEXT_AUDIT.md`                     | 10 factual/marketing-language issues: unqualified "120×" stat, "10M+ genes" factual error, "Production-ready" contradicting a "Research" status badge, inflated tagline, empty work-history fields, unbacked "deep learning" claims | All 10 fixed at the time; site copy overhauled again in the later credibility pass (`4a3a85c`, `10bc991`, `23cf13f`)                                                                                 |
| 2026-05-03 | `COMPREHENSIVE_AUDIT_2026_05_03.md` | Rebrand from research-focused to QA-first narrative; flagged an inconsistent Spanish terminal `investigacion` command and an i18n/Contract data-divergence risk                                                                     | Terminal command fixed; framing later superseded entirely by the credibility pass                                                                                                                    |
| 2026-05-09 | `refinement-audit-2026-05-09.md`    | 3 gaps: audits redirected offsite to GitHub, WebGL blocking LCP, no visible test evidence                                                                                                                                           | All 3 implemented: `AuditRepository` internal reader, static-first hero, `VisualTestSummary` component                                                                                               |
| 2026-05-12 | `COMPREHENSIVE_AUDIT_2026_05_12.md` | Verified the 05-09 gaps were closed; noted optional future ideas (SW asset caching, dynamic OG images, audit search)                                                                                                                | Optional ideas never picked up — not currently planned                                                                                                                                               |
| 2026-05-13 | `COMPREHENSIVE_AUDIT_2026_05_13.md` | Flagged a `three.js` peer-dep warning as non-blocking                                                                                                                                                                               | `three.js` has since been bumped multiple times without issue                                                                                                                                        |
| 2026-05-13 | `CONTENT_AUDIT_2026_05_13.md`       | Proposed more "impact-driven" marketing copy, a QA "manifesto," and narrative bridges between research and QA work                                                                                                                  | **Reversed** — the manifesto/bridge sections this audit proposed were later removed from the homepage (`4c99c49`) as part of the credibility pass; the promotional direction here was the wrong call |
| 2026-05-16 | `audit-2026-05-16.md`               | `coverage.json` had drifted from the actual test count (275 vs. 396)                                                                                                                                                                | Fixed; build script updated to regenerate `coverage.json` on every run                                                                                                                               |
| 2026-05-17 | `audit-2026-05-17.md`               | Final pre-"peak" verification pass (theme, visual regression, CI)                                                                                                                                                                   | Point-in-time snapshot only, nothing left unresolved                                                                                                                                                 |

## Note on tone

Several of these (05-12, 05-13, 05-16, 05-17 in particular) were generated by an
autonomous audit tool using self-congratulatory "elite / battle-hardened" language.
That framing was itself later flagged as a credibility problem and stripped from
public-facing content (`b51fc98`, `d8a0fbb`). It's kept here only as a historical
record — not a style worth repeating in future audits.
