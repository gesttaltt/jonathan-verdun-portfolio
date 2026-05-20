import { render, screen } from '@testing-library/react'
import { TestDetailedList } from '@/components/TestDetailedList'

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

describe('TestDetailedList', () => {
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
    const originalData = mockCoverageData.testResults
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

    mockCoverageData.testResults = originalData
  })
})
