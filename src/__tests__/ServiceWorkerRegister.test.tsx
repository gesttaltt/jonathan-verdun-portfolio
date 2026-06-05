import { render, waitFor } from '@testing-library/react'
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister'

function mockCookie(value: string) {
  Object.defineProperty(document, 'cookie', { get: () => value, configurable: true })
}

function mockReadyState(value: DocumentReadyState) {
  Object.defineProperty(document, 'readyState', { get: () => value, configurable: true })
}

describe('ServiceWorkerRegister', () => {
  const mockRegister = jest.fn()

  beforeEach(() => {
    mockRegister.mockReset().mockResolvedValue({ scope: '/' })
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { register: mockRegister },
      configurable: true,
      writable: true,
    })
    mockReadyState('complete')
    mockCookie('')
  })

  it('renders nothing', () => {
    const { container } = render(<ServiceWorkerRegister />)
    expect(container).toBeEmptyDOMElement()
  })

  it('does not register when NODE_ENV is test and e2e cookie is absent', () => {
    render(<ServiceWorkerRegister />)
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('registers via isE2E path when hostname is localhost and e2e cookie is set', () => {
    mockCookie('e2e=true')
    render(<ServiceWorkerRegister />)
    expect(mockRegister).toHaveBeenCalledWith('/sw.js')
  })

  it('adds a load event listener when readyState is not complete', () => {
    mockCookie('e2e=true')
    mockReadyState('loading')
    const addSpy = jest.spyOn(window, 'addEventListener')

    render(<ServiceWorkerRegister />)

    expect(addSpy).toHaveBeenCalledWith('load', expect.any(Function))
    addSpy.mockRestore()
  })

  it('removes load event listener on unmount', () => {
    mockCookie('e2e=true')
    mockReadyState('loading')
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = render(<ServiceWorkerRegister />)
    unmount()

    expect(removeSpy).toHaveBeenCalledWith('load', expect.any(Function))
    removeSpy.mockRestore()
  })

  it('does not register when serviceWorker is absent from navigator', () => {
    mockCookie('e2e=true')
    // Delete the own property so 'serviceWorker' in navigator is false
    Reflect.deleteProperty(navigator, 'serviceWorker')
    render(<ServiceWorkerRegister />)
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('logs an error and does not throw when registration rejects', async () => {
    mockCookie('e2e=true')
    mockRegister.mockRejectedValue(new Error('SW unavailable'))
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<ServiceWorkerRegister />)
    // waitFor is robust to any number of promise hops in the production chain
    await waitFor(() =>
      expect(errSpy).toHaveBeenCalledWith(
        '[PWA] Service Worker registration failed:',
        expect.any(Error)
      )
    )
    errSpy.mockRestore()
  })
})
