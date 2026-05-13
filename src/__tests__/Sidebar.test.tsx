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
      url: 'https://github.com/test/repo',
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
  const originalFetch = global.fetch

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.useRealTimers()
    global.fetch = originalFetch
  })

  const renderSidebar = () =>
    render(
      <I18nProvider>
        <Sidebar />
      </I18nProvider>
    )

  it('renders all quality gates with correct values', async () => {
    await act(async () => {
      renderSidebar()
    })
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('A+')).toBeInTheDocument()
  })

  it('displays PASSING when CI conclusion is success', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          workflow_runs: [{ status: 'completed', conclusion: 'success' }],
        }),
    })

    await act(async () => {
      renderSidebar()
    })

    expect(screen.getByText('PASSING')).toBeInTheDocument()
  })

  it('displays FAILING when CI conclusion is failure', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          workflow_runs: [{ status: 'completed', conclusion: 'failure' }],
        }),
    })

    await act(async () => {
      renderSidebar()
    })

    expect(screen.getByText('FAILING')).toBeInTheDocument()
  })

  it('displays loading when CI is in progress', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          workflow_runs: [{ status: 'in_progress', conclusion: null }],
        }),
    })

    await act(async () => {
      renderSidebar()
    })

    expect(screen.getByText(/checking/i)).toBeInTheDocument()
  })

  it('cleans up on unmount', async () => {
    const { unmount } = await act(async () => {
      return renderSidebar()
    })

    act(() => {
      unmount()
    })
  })

  it('copies email to clipboard when clicking copy button', async () => {
    mockWriteText.mockResolvedValueOnce(undefined)
    await act(async () => {
      renderSidebar()
    })

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
