import { render, screen, act, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { I18nProvider } from '@/lib/i18n/context'
import { ThemeProvider } from '@/lib/theme/context'
import { PortfolioPage } from '@/components/PortfolioPage'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}))

jest.mock('@/components/TopologyLoader', () => ({
  TopologyLoader: () => <div data-testid="topology-loader-mock" />,
}))

jest.mock('@/lib/services/vfsData', () => ({
  VFS_DATA: {
    name: '/',
    type: 'dir',
    children: {
      docs: { name: 'docs', type: 'dir', children: {} },
      projects: { name: 'projects', type: 'dir', children: {} },
      'README.md': { name: 'README.md', type: 'file', content: 'Mock README' },
    },
  },
}))

const mockPathname = usePathname as jest.Mock

const wrap = (path = '/') => {
  mockPathname.mockReturnValue(path)
  return render(
    <ThemeProvider>
      <I18nProvider>
        <PortfolioPage />
      </I18nProvider>
    </ThemeProvider>
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
      const log = screen.getByRole('log')
      expect(within(log).getByText(/Property-based testing/i)).toBeInTheDocument()
    })

    it('unknown command suggests "help"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'xyz{Enter}')
      expect(
        within(screen.getByRole('log')).getByText(/type 'help' for available commands/i)
      ).toBeInTheDocument()
    })

    it('handles the "sim" command for different modes', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })

      await user.type(input, 'sim p-adic{Enter}')
      expect(screen.getByText(/simulation mode set to: p-adic/i)).toBeInTheDocument()

      await user.type(input, 'sim hyperbolic{Enter}')
      expect(screen.getByText(/simulation mode set to: hyperbolic/i)).toBeInTheDocument()

      await user.type(input, 'sim invalid{Enter}')
      expect(screen.getByText(/Usage: sim --mode/i)).toBeInTheDocument()
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
      expect(screen.getByText(/pruebas basadas en propiedades/i)).toBeInTheDocument()
    })

    it('unknown command suggests "ayuda"', async () => {
      const user = userEvent.setup({ delay: null, advanceTimers: jest.advanceTimersByTime })
      wrap('/es/')
      await flushBoot()
      const input = screen.getByRole('textbox', { name: /terminal command input/i })
      await user.type(input, 'xyz{Enter}')
      expect(
        within(screen.getByRole('log')).getByText(/type 'ayuda' for available commands/i)
      ).toBeInTheDocument()
    })
  })
})
