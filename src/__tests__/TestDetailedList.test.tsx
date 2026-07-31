import { render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n/context'
import { TestDetailedList } from '@/components/TestDetailedList'
import { setMockPathname } from '../../jest.setup'

// Mock coverage.json
const mockCoverageData = {
  testResults: [
    {
      name: 'flat-filename.test.ts',
      status: 'passed',
      startTime: 1000,
      endTime: 2000,
      assertionResults: [{}, {}],
    },
    {
      name: '/path/to/nested.test.ts',
      status: 'failed',
      startTime: 1000,
      endTime: 3000,
      assertionResults: [{}],
    },
  ],
}

jest.mock('../../coverage.json', () => ({
  __esModule: true,
  get default() {
    return mockCoverageData
  },
}))

describe('TestDetailedList', () => {
  const originalTestResults = mockCoverageData.testResults

  afterEach(() => {
    mockCoverageData.testResults = originalTestResults
  })

  it('renders all test suites with correct names and stats', () => {
    render(<TestDetailedList />)

    // Check flat filename
    expect(screen.getByText('flat-filename')).toBeInTheDocument()

    // Check nested filename
    expect(screen.getByText('nested')).toBeInTheDocument()

    // Check stats (duration, assertions)
    expect(screen.getByText('1.00s')).toBeInTheDocument() // (2000-1000)/1000
    expect(screen.getByText('2.00s')).toBeInTheDocument() // (3000-1000)/1000
    expect(screen.getByText('2 assertions')).toBeInTheDocument()
    expect(screen.getByText('1 assertions')).toBeInTheDocument()
  })

  it('falls back to "unknown" when suite name is empty', () => {
    mockCoverageData.testResults = [
      {
        name: '',
        status: 'passed',
        startTime: 1000,
        endTime: 2000,
        assertionResults: [],
      },
    ]

    render(<TestDetailedList />)

    expect(screen.getByText('unknown')).toBeInTheDocument()
  })

  it('renders translated Spanish title and assertions label under /es', () => {
    setMockPathname('/es/quality')
    render(
      <I18nProvider>
        <TestDetailedList />
      </I18nProvider>
    )

    expect(screen.getByText('Módulos y Componentes Verificados')).toBeInTheDocument()
    expect(screen.getByText('2 aserciones')).toBeInTheDocument()
  })
})
