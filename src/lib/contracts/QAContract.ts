/**
 * @file QAContract.ts
 * Formalizes the QA-oriented engineering mindset.
 */

import { QAPhilosophy } from './QAContract.types'

export const QA_PHILOSOPHY: QAPhilosophy = {
  constraints: [
    '100% unit coverage enforced in CI via GitHub Actions — merge blocked below threshold',
    'Property-based fuzzing via fast-check applied to core domain contracts and boundary conditions',
    'Strict input validation enforced at all system boundaries; invalid inputs rejected at ingestion',
    'Tests written before feature code — test-first discipline enforced at every layer',
  ],
  specifications: [
    {
      layer: 'unit',
      objective: 'Enforce isolated domain logic correctness to prevent regression',
      status: 'stable',
    },
    {
      layer: 'property-based',
      objective: 'Fuzz domain contracts with fast-check to surface unknown failure modes',
      status: 'stable',
    },
    {
      layer: 'component',
      objective: 'Verify rendered behaviour and user interactions via React Testing Library',
      status: 'maturing',
    },
    {
      layer: 'integration',
      objective: 'Verify service boundaries, data flow, and cross-module contracts in CI',
      status: 'stable',
    },
    {
      layer: 'E2E',
      objective: 'Cover critical user paths end-to-end via automated browser and mobile automation',
      status: 'maturing',
    },
    {
      layer: 'accessibility',
      objective: 'Enforce WCAG 2.1 AA compliance via automated axe-core scans in CI',
      status: 'stable',
    },
  ],
}
