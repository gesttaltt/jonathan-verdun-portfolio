import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from '@/app/error'
import { I18nProvider } from '@/lib/i18n/context'

import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}))

const mockPathname = usePathname as jest.Mock

describe('Error Page - ES Locale', () => {
  const mockReset = jest.fn()
  const mockError = new Error('Test Error')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    mockPathname.mockReturnValue('/es/some-page')
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it('renders Spanish error message and reset button', () => {
    render(
      <I18nProvider>
        <ErrorBoundary error={mockError} reset={mockReset} />
      </I18nProvider>
    )

    expect(screen.getAllByText(/Error de ejecución/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Algo salió mal/i)).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /Reintentar/i })
    fireEvent.click(resetButton)
    expect(mockReset).toHaveBeenCalled()
  })
})
