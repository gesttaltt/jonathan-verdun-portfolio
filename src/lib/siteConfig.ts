export const siteConfig = {
  name: 'Jonathan Verdun',
  title: 'Jonathan Verdun | QA Automation Engineer',
  description:
    'Portfolio of Jonathan Verdun — QA Automation Engineer specializing in pytest, Playwright, Appium, and property-based testing with GitHub Actions CI.',
  url: 'https://jonathanverdun.com',
  locale: 'en',

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
      period: 'Sep 2025 – Present',
    },
  ],

  contact: {
    email: 'jonathan.verdun707@gmail.com',
    ctaLabel: 'Get in Touch',
  },

  tagline: 'Test Architecture · Automation Engineering',
  jobTitle: 'QA Automation Engineer',
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  expertise: [
    'Test Strategy & Planning',
    'Risk-Based Testing',
    'Defect Lifecycle Management',
    'Shift-Left Testing',
    'Root Cause Analysis',
    'API & Integration Testing',
    'Performance & Load Testing',
    'Web & Mobile Automation',
    'Property-Based Testing',
    'CI/CD Pipeline Hardening',
    'ISTQB Standards',
    'Playwright',
    'pytest',
    'Appium',
    'FastAPI',
    'TypeScript',
  ],

  performanceMetrics: {
    unitCoverage: '100%',
    automationRate: '92%',
    securityStatus: 'Passed',
  },

  versions: {
    portfolio: '0.1.0',
    nextjs: '16.2.4',
  },
} as const
