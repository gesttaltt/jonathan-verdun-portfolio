import { render, screen, fireEvent } from '@testing-library/react'
import GlobalError from '@/app/global-error'

describe('Global Error Page', () => {
  const mockReset = jest.fn()
  const mockError = new Error('Global Crash')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it('renders a critical error page with reset button', () => {
    render(<GlobalError error={mockError} reset={mockReset} />)

    expect(screen.getAllByText(/Critical Error/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /Try again/i })
    fireEvent.click(resetButton)
    expect(mockReset).toHaveBeenCalled()
  })
})
