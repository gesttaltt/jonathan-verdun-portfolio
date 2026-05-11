import { render, screen, fireEvent, act } from '@testing-library/react'
import { Sidebar } from '@/components/Sidebar'
import { I18nProvider } from '@/lib/i18n/context'

// Mock siteConfig
jest.mock('@/lib/siteConfig', () => ({
  siteConfig: {
    performanceMetrics: {
      unitCoverage: '100%',
      automationRate: '95%',
      securityStatus: 'A+',
    },
    repo: {
      ciWorkflowUrl: 'https://github.com/test/ci',
      ciBadgeUrl: 'https://github.com/test/ci/badge.svg',
    },
    certification: {
      name: 'ISTQB Foundation',
      provider: 'ISTQB',
      status: 'In Progress',
      expectedDate: 'Q3 2026',
    },
    contact: {
      email: 'test@example.com',
    },
    versions: {
      portfolio: '0.1.0',
      nextjs: '15.0.0',
    },
  },
}))

// Mock navigator.clipboard
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const renderSidebar = () =>
    render(
      <I18nProvider>
        <Sidebar />
      </I18nProvider>
    )

  it('renders all quality gates with correct values', () => {
    renderSidebar()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('A+')).toBeInTheDocument()
  })

  it('renders certification info', () => {
    renderSidebar()
    expect(screen.getByText('ISTQB Foundation')).toBeInTheDocument()
    expect(screen.getByText('ISTQB')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('copies email to clipboard when clicking copy button', async () => {
    mockWriteText.mockResolvedValueOnce(undefined)
    renderSidebar()

    const copyButton = screen.getByRole('button', { name: /copy email address/i })
    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(mockWriteText).toHaveBeenCalledWith('test@example.com')
    expect(screen.getByText(/copied!/i)).toBeInTheDocument()

    // Test timeout to revert state
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.getByText(/copy email/i)).toBeInTheDocument()
  })
})
