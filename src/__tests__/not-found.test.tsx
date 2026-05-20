import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

let consoleErrorSpy: jest.SpyInstance
beforeAll(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...args) => {
    if (typeof msg === 'string' && msg.includes('cannot be a child')) return
    console.warn(msg, ...args)
  })
})
afterAll(() => consoleErrorSpy.mockRestore())

describe('NotFound page', () => {
  it('renders the 404 heading', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('renders a "Return to root" link pointing to /', () => {
    render(<NotFound />)
    const link = screen.getByRole('link', { name: /Return to root/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders the "Not Found" label', () => {
    render(<NotFound />)
    expect(screen.getByText('Not Found')).toBeInTheDocument()
  })

  it('renders the route-not-found message', () => {
    render(<NotFound />)
    expect(screen.getByText(/This route does not exist/i)).toBeInTheDocument()
  })

  it('renders Spanish content when pathname starts with /es', () => {
    window.history.pushState({}, '', '/es/some-path')

    render(<NotFound />)

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByText('No Encontrado')).toBeInTheDocument()
    expect(screen.getByText(/Esta ruta no existe/i)).toBeInTheDocument()
    expect(screen.getByText(/Volver al inicio/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Volver al inicio/i })).toHaveAttribute('href', '/es')
    expect(document.documentElement.lang).toBe('es')
  })
})
