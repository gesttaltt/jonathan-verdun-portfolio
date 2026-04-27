/**
 * @file siteConfig.ts
 * Centralized site metadata and navigation configuration.
 * Single source of truth for SEO, social links, and contact info.
 */

export const siteConfig = {
  name: 'Jonathan Verdun',
  title: 'Jonathan Verdun | QA Automation & Bioinformatics',
  description:
    'Portfolio of Jonathan Verdun — QA Automation Engineer and Bioinformatics Researcher, focused on test-driven development and computational biology.',
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
      role: 'Co-Founder',
      period: 'Sep 2025 – Apr 2026',
    },
  ],

  contact: {
    email: 'jonathan.verdun@gmail.com',
    ctaLabel: 'Get in Touch',
  },

  tagline: 'QA Engineer · Bioinformatics Researcher',

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
      contactDescription: 'Open to QA and Research opportunities.',
    },
    sidebar: {
      constraintsTitle: 'Engineering Constraints',
    },
  },
} as const
