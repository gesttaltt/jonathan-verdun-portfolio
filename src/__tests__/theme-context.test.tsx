import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/lib/theme/context'

describe('ThemeProvider', () => {
  let localStorageMock: Record<string, string> = {}

  beforeEach(() => {
    localStorageMock = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => localStorageMock[key] ?? null),
        setItem: jest.fn((key, value) => {
          localStorageMock[key] = value.toString()
        }),
        clear: jest.fn(() => {
          localStorageMock = {}
        }),
      },
      writable: true,
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  const TestComponent = () => {
    const { theme, toggleTheme } = useTheme()
    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    )
  }

  it('defaults to dark theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(await screen.findByText('dark')).toBeInTheDocument()
  })

  it('initializes from localStorage if theme is set to light', async () => {
    localStorageMock.theme = 'light'
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(await screen.findByText('light')).toBeInTheDocument()
  })

  it('initializes to dark theme even if prefers-color-scheme is light and localStorage is empty', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(await screen.findByText('dark')).toBeInTheDocument()
  })

  it('toggles theme and updates localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    await screen.findByText('dark')

    const button = screen.getByText('Toggle')
    act(() => {
      button.click()
    })

    expect(await screen.findByText('light')).toBeInTheDocument()
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'light')

    act(() => {
      button.click()
    })
    expect(await screen.findByText('dark')).toBeInTheDocument()
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('provides useTheme hook and throws if used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')

    consoleSpy.mockRestore()
  })
})
