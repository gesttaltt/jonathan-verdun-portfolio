import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from '@/lib/theme/context'
import { ThemeToggle } from '@/components/ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('shows the moon icon when the theme is dark', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    await screen.findByTestId('theme-toggle-moon')
    expect(screen.getByTestId('theme-toggle-moon')).toBeInTheDocument()
  })

  it('shows the sun icon when the theme is light', async () => {
    localStorage.setItem('theme', 'light')
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    await screen.findByTestId('theme-toggle-sun')
    expect(screen.getByTestId('theme-toggle-sun')).toBeInTheDocument()
  })

  it('toggles the theme when clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    const button = await screen.findByRole('button')
    await screen.findByTestId('theme-toggle-moon')

    act(() => {
      button.click()
    })

    await screen.findByTestId('theme-toggle-sun')
    expect(screen.getByTestId('theme-toggle-sun')).toBeInTheDocument()

    act(() => {
      button.click()
    })
    await screen.findByTestId('theme-toggle-moon')
    expect(screen.getByTestId('theme-toggle-moon')).toBeInTheDocument()
  })
})
