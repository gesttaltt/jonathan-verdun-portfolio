import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { I18nProvider } from '@/lib/i18n/context'
import { PortfolioPage } from '@/components/PortfolioPage'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}))

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

const mockPathname = usePathname as jest.Mock

const wrap = (path = '/') => {
  mockPathname.mockReturnValue(path)
  return render(
    <I18nProvider>
      <PortfolioPage />
    </I18nProvider>
  )
}

// Advance all boot-sequence timers and wait for React to flush updates.
const flushBoot = () =>
  act(() => {
    jest.runAllTimers()
  })

describe('PortfolioPage', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('mounts without crashing', () => {
    expect(() => wrap()).not.toThrow()
  })

  it('renders a skip-nav target', () => {
    wrap()
    expect(document.getElementById('main-content')).not.toBeNull()
  })

  describe('English locale (/)', () => {
    it('renders the terminal with the English title', () => {
      wrap('/')
      expect(screen.getByText('bash — interactive')).toBeInTheDocument()
    })

    it('terminal input appears after boot and responds to "about"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'about{Enter}')
      // "about" output is unique — not part of the boot sequence
      expect(screen.getByText(/QA Automation Engineer/i)).toBeInTheDocument()
    })

    it('unknown command suggests "help"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'xyz{Enter}')
      expect(screen.getByText(/type 'help' for available commands/i)).toBeInTheDocument()
    })
  })

  describe('Spanish locale (/es/)', () => {
    it('renders the terminal with the Spanish title', () => {
      wrap('/es/')
      expect(screen.getByText('bash — interactivo')).toBeInTheDocument()
    })

    it('terminal input appears after boot and responds to "sobre"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/es/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'sobre{Enter}')
      // "sobre" output is unique — not part of the boot sequence
      expect(screen.getByText(/Ingeniero de Automatización QA/i)).toBeInTheDocument()
    })

    it('unknown command suggests "ayuda"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/es/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'xyz{Enter}')
      expect(screen.getByText(/type 'ayuda' for available commands/i)).toBeInTheDocument()
    })
  })
})
