import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { I18nProvider, useTranslation } from '@/lib/i18n/context'
import { en } from '@/lib/i18n/en'
import { es } from '@/lib/i18n/es'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}))

const mockPathname = usePathname as jest.Mock

function TranslationProbe() {
  const t = useTranslation()
  return <div data-testid="lang">{t.lang}</div>
}

describe('I18nProvider', () => {
  it('provides English translations on the root route', () => {
    mockPathname.mockReturnValue('/')
    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('provides Spanish translations on /es/ route', () => {
    mockPathname.mockReturnValue('/es/')
    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('es')
  })

  it('provides Spanish translations on any /es/* sub-path', () => {
    mockPathname.mockReturnValue('/es/something')
    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('es')
  })
})

describe('useTranslation (fallback)', () => {
  const originalNodeEnv = process.env.NODE_ENV

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      configurable: true,
    })
  })

  it('returns English translations when used outside I18nProvider', () => {
    function Bare() {
      const t = useTranslation()
      return <div data-testid="lang">{t.lang}</div>
    }
    render(<Bare />)
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('warns in console when used outside provider in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    })
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    function Bare() {
      useTranslation()
      return null
    }
    render(<Bare />)

    expect(warnSpy).toHaveBeenCalledWith(
      '[useTranslation] called outside I18nProvider — falling back to English'
    )

    warnSpy.mockRestore()
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      configurable: true,
    })
  })

  it('en translations match expected tagline', () => {
    expect(en.tagline).toBe(
      'Architecting Resilient Quality Gates · Engineering Deterministic Automation'
    )
  })

  it('es translations match expected tagline', () => {
    expect(es.tagline).toBe(
      'Arquitecto de Gates de Calidad Resilientes · Ingeniería de Automatización Determinista'
    )
  })

  it('en and es have the same keys at every nesting level', () => {
    function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      return Object.keys(obj).flatMap((k) => {
        const key = prefix ? `${prefix}.${k}` : k
        const val = obj[k]
        // terminal.interactive keys are locale-specific command vocabulary (e.g. 'about'
        // vs 'sobre') — their names intentionally differ between locales, so we treat
        // terminal.interactive as a leaf and only verify both locales define it.
        if (key === 'terminal.interactive') return [key]
        return val !== null && typeof val === 'object' && !Array.isArray(val)
          ? collectKeys(val as Record<string, unknown>, key)
          : [key]
      })
    }
    const enKeys = collectKeys(en as unknown as Record<string, unknown>).sort()
    const esKeys = collectKeys(es as unknown as Record<string, unknown>).sort()
    expect(enKeys).toEqual(esKeys)
  })
})

describe('I18nProvider — null pathname fallback', () => {
  it('falls back to English when usePathname returns null', () => {
    mockPathname.mockReturnValue(null)
    render(
      <I18nProvider>
        <TranslationProbe />
      </I18nProvider>
    )
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })
})
