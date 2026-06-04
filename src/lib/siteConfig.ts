import pkg from '../../package.json'

export const siteConfig = {
  name: 'Jonathan Verdun',
  title: 'Jonathan Verdun | Architecting Resilient Quality Gates',
  description:
    'Architecting resilient quality gates and engineering deterministic automation. Portfolio of Jonathan Verdun — QA Automation Engineer specializing in Test Architecture, Playwright, and Reliability.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH
      ? `https://gesttaltt.github.io${process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH}`
      : 'https://jonathanverdun.com'),
  locale: 'en',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '',

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

  tagline: 'Architecting Resilient Quality Gates · Engineering Deterministic Automation',
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
    unitCoverage: '100%',
    automationRate: '95%',
    securityStatus: 'Passed',
  },

  versions: {
    portfolio: pkg.version,
    nextjs: (pkg.dependencies as Record<string, string>).next?.replace(/^\^/, '') ?? '?',
  },

  certification: {
    name: 'ISTQB Foundation Level (CTFL)',
    status: 'In Progress',
    expectedDate: 'Q3 2026',
    provider: 'ISTQB®',
    details: 'Actively applying CTFL principles to current automation suites.',
  },
} as const
