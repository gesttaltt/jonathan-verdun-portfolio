import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '@/app/error'
import { I18nProvider } from '@/lib/i18n/context'

describe('Error Page', () => {
  const mockReset = jest.fn()
  const mockError = new Error('Test Error')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it('renders error message and reset button', () => {
    render(
      <I18nProvider>
        <ErrorBoundary error={mockError} reset={mockReset} />
      </I18nProvider>
    )

    expect(screen.getAllByText(/Runtime Error/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(resetButton)
    expect(mockReset).toHaveBeenCalled()
  })

  it('renders a digest if present', () => {
    const digestError = { name: 'Error', message: 'Crashed', digest: 'DIGEST_123' } as Error
    render(
      <I18nProvider>
        <ErrorBoundary error={digestError} reset={mockReset} />
      </I18nProvider>
    )
    expect(screen.getByText(/DIGEST_123/i)).toBeInTheDocument()
  })
})
