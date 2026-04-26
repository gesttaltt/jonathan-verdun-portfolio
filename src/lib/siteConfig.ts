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
  },

  workHistory: [
    {
      organization: 'Ai-Whisperers',
      url: 'https://github.com/Ai-Whisperers',
      role: '',
      period: '',
    },
  ],

  contact: {
    email: 'jonathan.verdun@gmail.com',
    ctaLabel: 'Get in Touch',
  },

  tagline: 'High-Assurance Architect',

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
