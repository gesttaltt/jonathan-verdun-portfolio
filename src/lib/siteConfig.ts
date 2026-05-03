/**
 * @file siteConfig.ts
 * Centralized site metadata and navigation configuration.
 * Single source of truth for SEO, social links, and contact info.
 */

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

  workHistory: [
    {
      organization: 'Ai-Whisperers',
      url: 'https://github.com/Ai-Whisperers',
      role: 'Co-Founder & QA Lead',
      period: 'Sep 2025 – Apr 2026',
    },
  ],

  contact: {
    email: 'jonathan.verdun707@gmail.com',
    ctaLabel: 'Get in Touch',
  },

  tagline: 'Test Architecture · Automation Engineering',
  jobTitle: 'QA Automation Engineer',

  sections: {
    projects: {
      title: 'Projects',
    },
    architecture: {
      title: 'Architecture',
    },
    qa: {
      title: 'QA Philosophy',
      contactTitle: 'Open to work',
      contactDescription: 'Available for QA engineering and automation architecture roles.',
    },
    sidebar: {
      constraintsTitle: 'Engineering Constraints',
    },
    bioinformatics: {
      title: 'Prior Research & Engineering',
    },
  },
} as const
