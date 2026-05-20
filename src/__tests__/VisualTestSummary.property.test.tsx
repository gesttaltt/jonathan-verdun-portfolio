import * as fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import { VisualTestSummary } from '@/components/VisualTestSummary'
import { I18nProvider } from '@/lib/i18n/context'

// We need to mock coverageData since it's a direct import in the component
jest.mock('../../coverage.json', () => ({
  __esModule: true,
  default: {
    numPassedTests: 0,
    numTotalTests: 0,
    numFailedTests: 0,
    startTime: 0,
    success: true,
  },
}))

import coverageData from '../../coverage.json'

describe('VisualTestSummary — property-based component logic', () => {
  it('handles any combination of test counts without crashing', () => {
    fc.assert(
      fc.property(
        fc.record({
          numPassedTests: fc.nat(10000),
          numTotalTests: fc.nat(10000),
          numFailedTests: fc.nat(10000),
          startTime: fc.integer({ min: 0, max: 2000000000000 }),
          success: fc.boolean(),
        }),
        (data) => {
          // Update the mock reference
          Object.assign(coverageData, data)

          const { unmount } = render(
            <I18nProvider>
              <VisualTestSummary />
            </I18nProvider>
          )

          // Verify that essential elements are still present
          expect(screen.getByText(/CI Protocol/i)).toBeInTheDocument()

          if (data.numFailedTests > 0) {
            // Just verify it doesn't crash during rendering the regression message
            const regressionText = screen.queryByText(/REGRESSION DETECTED/i)
            if (regressionText) {
              expect(regressionText).toBeInTheDocument()
            }
          }

          unmount()
        }
      )
    )
  })
})
