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

jest.mock('@/components/FadeInSection', () => ({
  FadeInSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const renderSidebar = (props = {}) =>
    render(
      <I18nProvider>
        <Sidebar {...props} />
      </I18nProvider>
    )

  it('renders all quality gates with correct values', async () => {
    renderSidebar()
    expect(await screen.findByText('100%')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('A+')).toBeInTheDocument()
  })

  it('handles missing repo config without crashing', () => {
    renderSidebar({ repo: null })
    expect(screen.queryByText('PASSING')).not.toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('copies email to clipboard and resets after timeout', async () => {
    mockWriteText.mockResolvedValue(undefined)
    renderSidebar()

    const copyButton = await screen.findByRole('button', { name: 'Copy Email' })

    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(mockWriteText).toHaveBeenCalledWith('test@example.com')
    expect(await screen.findByText(/Copied!/i)).toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(2000)
    })

    expect(await screen.findByText(/Copy Email/i)).toBeInTheDocument()
  })

  it('handles clipboard write failure without crashing', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard denied'))
    renderSidebar()

    const copyButton = await screen.findByRole('button', { name: 'Copy Email' })

    await act(async () => {
      fireEvent.click(copyButton)
    })

    expect(mockWriteText).toHaveBeenCalledWith('test@example.com')

    await screen.findByText(/Copy Email/i)
    expect(screen.queryByText(/Copied!/i)).not.toBeInTheDocument()
  })

  describe('CI Status Fetching Logic', () => {
    const mockRepo = { url: 'https://github.com/o/r', ciWorkflowUrl: 'u', ciBadgeUrl: 'b' }

    it('updates status to success when API returns valid runs', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            workflow_runs: [{ status: 'completed', conclusion: 'success' }],
          }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('PASSING')).toBeInTheDocument()
    })

    it('updates status to failure when API returns failing runs', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            workflow_runs: [{ status: 'completed', conclusion: 'failure' }],
          }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('FAILING')).toBeInTheDocument()
    })

    it('updates status to success when API returns successful runs', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            workflow_runs: [{ status: 'completed', conclusion: 'success' }],
          }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('PASSING')).toBeInTheDocument()
    })

    it('displays loading status when CI is in progress', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            workflow_runs: [{ status: 'in_progress', conclusion: null }],
          }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText(/checking/i)).toBeInTheDocument()
    })

    it('updates status to error when API fails', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('Status unavailable')).toBeInTheDocument()
    })

    it('updates status to error when workflow runs are empty', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ workflow_runs: [] }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('Status unavailable')).toBeInTheDocument()
    })

    it('immediately sets success status in mock mode', async () => {
      const originalMockCi = process.env.MOCK_CI
      process.env.MOCK_CI = 'true'

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('PASSING')).toBeInTheDocument()
      expect(global.fetch).not.toHaveBeenCalled()

      process.env.MOCK_CI = originalMockCi
    })

    it('logs fetch errors and sets error outside test environment', async () => {
      const env = process.env as Record<string, string | undefined>
      const originalNodeEnv = env['NODE_ENV']
      env['NODE_ENV'] = 'development'
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      ;(global.fetch as jest.Mock).mockRejectedValue(new Error('conn refused'))

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('Status unavailable')).toBeInTheDocument()
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch CI status:', expect.any(Error))

      consoleSpy.mockRestore()
      env['NODE_ENV'] = originalNodeEnv
    })

    it('polls CI status at interval outside test environment', async () => {
      const env = process.env as Record<string, string | undefined>
      const originalNodeEnv = env['NODE_ENV']
      env['NODE_ENV'] = 'development'
      jest.useFakeTimers()
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            workflow_runs: [{ status: 'completed', conclusion: 'success' }],
          }),
      })

      renderSidebar({ repo: mockRepo })
      expect(await screen.findByText('PASSING')).toBeInTheDocument()
      expect(global.fetch).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(60000)
      expect(global.fetch).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
      env['NODE_ENV'] = originalNodeEnv
    })
  })
})
