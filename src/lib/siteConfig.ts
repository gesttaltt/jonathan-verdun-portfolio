/**
 * @file siteConfig.ts
 * Centralized site metadata and navigation configuration.
 * Single source of truth for SEO, social links, and contact info.
 */

export const siteConfig = {
  name: 'Jonathan Verdun',
  title: 'Jonathan Verdun | QA Automation & Bioinformatics',
  description:
    'Portfolio of Jonathan Verdun (Gestalt) - QA Automation Engineer and Bioinformatics Researcher focused on Deep Learning and TDD.',
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
    organization: {
      url: 'https://github.com/Ai-Whisperers',
      label: 'Ai-Whisperers',
    },
  },

  contact: {
    email: 'contact@jonathanverdun.com',
    ctaLabel: 'Initiate Handshake',
  },

  tagline: 'High-Assurance Architect',
} as const
