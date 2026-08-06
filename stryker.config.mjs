/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const strykerConfig = {
  packageManager: 'npm',
  testRunner: 'jest',
  jest: {
    projectType: 'custom',
    configFile: 'jest.config.mjs',
    // Only rerun tests that actually cover the mutated file (per Jest's own
    // dependency graph) instead of the full suite per mutant — this is the
    // difference between a mutation run finishing in minutes vs. hours.
    enableFindRelatedTests: true,
  },
  // A first full run (907 mutants, no ignoreStatic) reported 215 static
  // mutants — mutants in module-level/static-initialization code, which
  // force Jest to reload the whole related-test module tree per mutant
  // instead of a narrow subset — as 24% of all mutants but an estimated 75%
  // of total run time. Skipping them (marked "Ignored", excluded from the
  // score denominator per Stryker's own scoring rules) keeps a from-scratch
  // run practically completable; documented as a disclosed trade-off in
  // docs/specs/TESTING.md, not hidden.
  ignoreStatic: true,
  reporters: ['html', 'json', 'progress', 'clear-text'],
  htmlReporter: { fileName: 'reports/mutation/mutation.html' },
  jsonReporter: { fileName: 'reports/mutation/mutation.json' },
  tempDirName: '.stryker-tmp',
  // Scoped to genuine branching/decision logic that already has strong,
  // targeted Jest coverage — mirrors jest.config.mjs's own
  // collectCoverageFrom exclusion philosophy (see that file for the parallel
  // list). Deliberately excludes .tsx UI/JSX (noisy, low-signal, slower
  // mutants), WebGL, OG-image generation, sitemap/robots, i18n data files,
  // and contracts (mostly literal data, not decision logic).
  mutate: [
    'src/lib/services/**/*.ts',
    'src/lib/i18n/localizedHref.ts',
    'src/lib/i18n/useIsSpanishRoute.ts',
    'src/lib/theme/context.tsx',
    'src/lib/metadata.ts',
    'src/lib/jsonLd.ts',
    'src/lib/projectSlugify.ts',
    'src/components/hooks/*.ts',
  ],
  // Informational only — this is a manually-run, periodically-refreshed
  // pass (see docs/specs/TESTING.md), never wired into CI, so nothing
  // should fail a build based on the score.
  thresholds: { high: 80, low: 60, break: null },
  // Kept low deliberately: this machine's available RAM is shared with a
  // full desktop session, and concurrency:4 (each Jest/SWC worker using
  // 600MB-1.4GB RSS) reliably OOM-killed the whole process tree across
  // multiple attempts. concurrency:1 trades run time for actually finishing.
  concurrency: 1,
  timeoutMS: 15000,
}

export default strykerConfig
