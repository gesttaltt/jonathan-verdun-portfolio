# Internationalization & Design System Audit — May 2026

Consolidated from 4 dated audits (2026-04-30 → 2026-05-01) covering the Spanish-locale
rollout and a full design-token/animation-timing inventory. All findings below are
resolved.

---

## i18n rollout (2026-04-30) — Score 9.1 / 10

The Spanish route (`/es/`) shipped in this pass, surfacing locale-specific gaps:

- `BioinformaticsGraphic` became dead code once `SiteFooter` replaced it — removed.
- `DefaultCommandProcessor` was being re-instantiated on every render — needed `useMemo`.
- The terminal's "command not found" message hardcoded English `help`, breaking for
  Spanish users who'd type `ayuda`.
- The Spanish route had no OG image and inherited the English text.
- **`<html lang="en">` was hardcoded for every route, including `/es/`** — a real
  architectural finding. Fixing it properly required splitting the app into Next.js route
  groups (`(en)/`, `(es)/`) rather than a per-page patch.
- `LS_PROJECTS_OUTPUT` was duplicated between `TerminalContract.ts` and `i18n/en.ts`.

## Post-refactor sweep (2026-04-30b) — Score 9.3 / 10

Follow-up after the route-group split landed:

- `(es)/layout.tsx` was still missing `alternates` (hreflang), a Twitter card, and full OG
  config after the split.
- The boot-sequence `help` output listed fewer commands than actually existed, in both
  English and Spanish.
- A long tail of coverage/CI hygiene items: `robots.ts` not excluded from coverage,
  `Terminal.tsx` branch gaps, the OG image's `readFile` call had no `try/catch`, no
  `global-error.tsx`, no `.env.example` for `BASE_PATH` / `SITE_LAST_MODIFIED`.
- Confirmed 16 items from the 2026-04-30 audit resolved.

## Design token inventory (styling-audit, 2026-05-01)

A standalone catalog rather than an issue list — the reference point for later styling
consistency work:

- Full font-size table per component; found 8+ places using an unscaled `text-[10px]`.
- Color palette table (zinc hierarchy, accent colors, background opacities).
- Inconsistencies: card border opacity varied (`/5` vs `/10`), card radius varied
  (`rounded-xl` vs `rounded-2xl`), `#0a0a0a` was hardcoded ~10 times instead of living in a
  CSS variable, and `zinc-500`/`600`/`700` carried WCAG contrast risk.

## Animation timing pass (2026-05-01)

- 4 different animation durations in use (0.35 / 0.45 / 0.50 / 0.60s) with no semantic
  naming — proposed a 3-value scale (`micro` / `enter` / `hero`).
- 5 different `whileInView` viewport margins (−40px to −80px) — standardized on −40px.
- An unused `.crt::before` CSS block was dead code — deleted.
- Kept: `reducedMotion="user"`, `LazyMotion`, and the glow-orb's subtlety were all judged
  correctly tuned as-is.

Note: the timing-scale consolidation proposed here was only partially completed at the
time — a later audit found `fadeUpVariants` and `fadeInVariants` had ended up byte-identical,
and `SCROLL_VIEWPORT` was exported but never imported. Both were cleaned up in the
subsequent hardening pass.
