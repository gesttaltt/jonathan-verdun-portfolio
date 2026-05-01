import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GlobalError from '@/app/global-error'

let consoleErrorSpy: jest.SpyInstance
beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((msg) => {
    if (typeof msg === 'string' && msg.includes('cannot be a child')) return
    // suppress error logged by the component's useEffect
  })
})
afterAll(() => consoleErrorSpy.mockRestore())

describe('GlobalError', () => {
  const error = new Error('test error')
  const reset = jest.fn()

  beforeEach(() => reset.mockClear())

  it('renders the 500 heading', () => {
    render(<GlobalError error={error} reset={reset} />)
    expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument()
  })

  it('renders the "Try again" button', () => {
    render(<GlobalError error={error} reset={reset} />)
    expect(screen.getByRole('button', { name: /Try again/i })).toBeInTheDocument()
  })

  it('calls reset when "Try again" is clicked', () => {
    render(<GlobalError error={error} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: /Try again/i }))
    expect(reset).toHaveBeenCalledTimes(1)
  })

  it('renders the "Return home" link pointing to /', () => {
    render(<GlobalError error={error} reset={reset} />)
    const link = screen.getByRole('link', { name: /Return home/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders the digest value when digest is present', () => {
    const errorWithDigest = Object.assign(new Error('test'), { digest: 'abc123' })
    render(<GlobalError error={errorWithDigest} reset={reset} />)
    expect(screen.getByText('abc123')).toBeInTheDocument()
  })

  it('does not render a digest section when digest is absent', () => {
    render(<GlobalError error={error} reset={reset} />)
    expect(screen.queryByText(/digest:/i)).not.toBeInTheDocument()
  })
})
