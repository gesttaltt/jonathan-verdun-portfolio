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
  it('returns English translations when used outside I18nProvider', () => {
    function Bare() {
      const t = useTranslation()
      return <div data-testid="lang">{t.lang}</div>
    }
    render(<Bare />)
    expect(screen.getByTestId('lang')).toHaveTextContent('en')
  })

  it('en translations match expected tagline', () => {
    expect(en.tagline).toBe('Test Architecture · Automation Engineering')
  })

  it('es translations match expected tagline', () => {
    expect(es.tagline).toBe('Arquitectura de Pruebas · Ingeniería de Automatización')
  })

  it('en and es have the same top-level keys', () => {
    expect(Object.keys(en)).toEqual(Object.keys(es))
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
