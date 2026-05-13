import { render, screen } from '@testing-library/react'
import { VisualTestSummary } from '@/components/VisualTestSummary'
import { I18nProvider } from '@/lib/i18n/context'
import { setMockPathname } from '../../jest.setup'

// Use a mutable mock that we can update between tests
const mockCoverageData = {
  numPassedTests: 275,
  numTotalTests: 275,
  numFailedTests: 0,
  startTime: 1715354700000,
  success: true,
}

jest.mock(
  '../../coverage.json',
  () => ({
    __esModule: true,
    get default() {
      return mockCoverageData
    },
  }),
  { virtual: true }
)

describe('VisualTestSummary', () => {
  beforeEach(() => {
    setMockPathname('/')
    // Reset mock data
    mockCoverageData.numPassedTests = 275
    mockCoverageData.numTotalTests = 275
    mockCoverageData.numFailedTests = 0
    mockCoverageData.success = true
  })

  it('renders visual regression test status in English', () => {
    render(
      <I18nProvider>
        <VisualTestSummary />
      </I18nProvider>
    )
    expect(screen.getByText(/Live Verification Evidence/i)).toBeInTheDocument()
    expect(screen.getByText('275')).toBeInTheDocument()
    expect(screen.getByText('PASSED')).toBeInTheDocument()
  })

  it('renders visual regression test status in Spanish', () => {
    setMockPathname('/es/quality')
    render(
      <I18nProvider>
        <VisualTestSummary />
      </I18nProvider>
    )
    expect(screen.getByText(/Evidencia de Verificación/i)).toBeInTheDocument()
  })

  it('renders failure status when tests fail', () => {
    mockCoverageData.numPassedTests = 270
    mockCoverageData.numFailedTests = 5
    mockCoverageData.success = false

    render(
      <I18nProvider>
        <VisualTestSummary />
      </I18nProvider>
    )
    expect(screen.getByText('FAILED')).toBeInTheDocument()
    expect(screen.getByText(/REGRESSION DETECTED: 5/i)).toBeInTheDocument()
  })

  it('renders singular regression message if count is 1 (hypothetical)', () => {
    // Current translation doesn't distinguish between singular/plural but we should check interpolation
    mockCoverageData.numPassedTests = 274
    mockCoverageData.numFailedTests = 1
    mockCoverageData.success = false

    render(
      <I18nProvider>
        <VisualTestSummary />
      </I18nProvider>
    )
    expect(screen.getByText(/REGRESSION DETECTED: 1/i)).toBeInTheDocument()
  })
})
