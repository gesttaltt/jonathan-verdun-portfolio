import pkg from '../../package.json'
import { COVERAGE_STATS } from './generated/coverageStats'
import { MUTATION_STATS } from './generated/mutationStats'

// Matches the basePath Next.js itself resolves in next.config.ts (empty for
// local dev, /jonathan-verdun-portfolio when configure-pages sets BASE_PATH
// during the GitHub Pages deploy). Derived once so url and basePath can
// never disagree about which path segment is actually being served.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || ''

export const siteConfig = {
  name: 'Jonathan Verdun',
  title: 'Jonathan Verdun | QA Automation Engineer',
  description:
    'Portfolio of Jonathan Verdun — QA Automation Engineer specializing in Test Architecture, Playwright, and Reliability.',
  url: process.env.NEXT_PUBLIC_SITE_URL || `https://gesttaltt.github.io${basePath}`,
  locale: 'en',
  basePath,

  socialLinks: {
    github: {
      url: 'https://github.com/gesttaltt',
      label: 'github.com/gesttaltt',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/jonathan-verdun/',
      label: 'linkedin.com/in/jonathan-verdun',
    },
    twitter: {
      handle: '@gesttaltt',
    },
  },

  repo: {
    url: 'https://github.com/gesttaltt/jonathan-verdun-portfolio',
    get ciWorkflowUrl() {
      return `${this.url}/actions/workflows/ci.yml`
    },
    get ciBadgeUrl() {
      return `${this.url}/actions/workflows/ci.yml/badge.svg`
    },
  },

  workHistory: [
    {
      organization: 'Ai-Whisperers',
      url: 'https://github.com/Ai-Whisperers',
      role: 'Co-Founder & QA Lead',
      period: 'Sep 2025 – April 2026',
    },
  ],

  contact: {
    email: 'jonathan.verdun707@gmail.com',
    ctaLabel: 'Get in Touch',
  },

  tagline: 'QA Automation Engineer · Test Architecture & Reliability',
  jobTitle: 'QA Automation Engineer',
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  expertise: [
    'Test Strategy & Planning',
    'Risk-Based Testing',
    'Defect Lifecycle Management (Azure DevOps)',
    'Shift-Left Testing & CI/CD Gates',
    'Root Cause Analysis (RCA)',
    'API & Integration Testing (FastAPI, httpx)',
    'Performance & Load Testing',
    'Web & Mobile Automation (Playwright, Appium)',
    'Property-Based Testing (fast-check)',
    'CI/CD Pipeline Hardening (GitHub Actions)',
    'ISTQB Standards Compliance',
    'Playwright',
    'pytest',
    'Appium',
    'FastAPI',
    'TypeScript',
  ],

  performanceMetrics: {
    // Real minimum across lines/statements/functions/branches — see
    // scripts/generate-badge-data.mjs, regenerated from the Jest coverage report
    // on every build. Not hand-maintained: if coverage ever dips, this does too.
    unitCoverage: COVERAGE_STATS.unitCoverage,
    // 57 automated / 11 manual test cases on QA Arxiv Mobile (proj-01) — the
    // one case study with an explicit automated/manual split. See ProjectContract.ts.
    automationRate: '84%',
    securityStatus: 'Passed',
    // % of Stryker-injected mutants the test suite actually kills — see
    // scripts/generate-mutation-badge.mjs and docs/specs/TESTING.md. Unlike
    // unitCoverage, this is refreshed manually/periodically (`npm run
    // mutation && npm run mutation:badge`), not on every build — mutation
    // testing reruns the suite once per mutant and is too slow for that.
    mutationScore: MUTATION_STATS.mutationScore,
  },

  versions: {
    portfolio: pkg.version,
    nextjs:
      /* istanbul ignore next */ (pkg.dependencies as Record<string, string>).next?.replace(
        /^\^/,
        ''
      ) ?? '?',
  },

  certification: {
    name: 'ISTQB Foundation Level (CTFL)',
    status: 'In Progress',
    expectedDate: 'Q3 2026',
    provider: 'ISTQB®',
    details: 'Actively applying CTFL principles to current automation suites.',
  },
} as const
