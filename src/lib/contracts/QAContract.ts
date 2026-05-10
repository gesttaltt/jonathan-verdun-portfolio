/**
 * @file QAContract.ts
 * Formalizes the QA-oriented engineering mindset.
 */

import { QAPhilosophy } from './QAContract.types'

export const QA_PHILOSOPHY: QAPhilosophy = {
  constraints: [
    'Risk-based test planning prioritized by business impact and technical complexity',
    'Property-based fuzzing applied to core domain invariants via fast-check',
    'Strict input validation enforced at all system boundaries',
    'Shift-left engagement: QA involvement from requirements gathering to final deployment',
  ],
  specifications: [
    {
      layer: 'strategy',
      objective: 'Define comprehensive test plans, risk matrices, and quality objectives',
      status: 'stable',
    },
    {
      layer: 'api/contract',
      objective: 'Validate interface integrity and data consistency across service boundaries',
      status: 'stable',
    },
    {
      layer: 'automation',
      objective: 'Scalable browser and mobile suites via Playwright, Appium, and pytest',
      status: 'stable',
    },
    {
      layer: 'exploratory',
      objective: 'Unstructured testing to surface edge cases and usability friction',
      status: 'maturing',
    },
    {
      layer: 'regression',
      objective: 'Automated verification of existing functionality after each build',
      status: 'stable',
    },
    {
      layer: 'accessibility',
      objective: 'Enforce WCAG 2.1 AA compliance via automated and manual audits',
      status: 'stable',
    },
  ],
}
