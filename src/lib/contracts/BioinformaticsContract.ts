/**
 * @file BioinformaticsContract.ts
 * Formalizes the system behavior for Bioinformatics research modules.
 * Grounded in TDD and correctness.
 */

import { ResearchSpec, BioinformaticsResearch } from './BioinformaticsContract.types'

export class BioinformaticsService {
  static getResearch(): BioinformaticsResearch {
    return {
      bridge: '',
      specs: [],
    }
  }

  static getResearchSpecs(): ResearchSpec[] {
    return this.getResearch().specs
  }
}
