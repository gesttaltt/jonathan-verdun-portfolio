import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { LanguageSelector } from '@/components/LanguageSelector'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}))

const mockPathname = usePathname as jest.Mock

describe('LanguageSelector', () => {
  it('renders a nav landmark with the correct aria-label', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('navigation', { name: /language selector/i })).toBeInTheDocument()
  })

  it('renders EN and ES links', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('link', { name: /switch to english/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cambiar a español/i })).toBeInTheDocument()
  })

  describe('on the English route (/)', () => {
    beforeEach(() => mockPathname.mockReturnValue('/'))

    it('EN link has aria-current="page"', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute(
        'aria-current',
        'page'
      )
    })

    it('ES link does not have aria-current', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /cambiar a español/i })).not.toHaveAttribute(
        'aria-current'
      )
    })
  })

  describe('on the Spanish route (/es/)', () => {
    beforeEach(() => mockPathname.mockReturnValue('/es/'))

    it('ES link has aria-current="page"', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /cambiar a español/i })).toHaveAttribute(
        'aria-current',
        'page'
      )
    })

    it('EN link does not have aria-current', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).not.toHaveAttribute(
        'aria-current'
      )
    })
  })

  it('EN link points to /', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute('href', '/')
  })

  it('ES link href targets the /es/ route', () => {
    render(<LanguageSelector />)
    const href = screen.getByRole('link', { name: /cambiar a español/i }).getAttribute('href')
    // Next.js Link may normalise /es/ → /es in jsdom; accept either form
    expect(href).toMatch(/^\/es\/?$/)
  })

  it('treats null pathname as root — EN link gets aria-current="page"', () => {
    mockPathname.mockReturnValue(null)
    render(<LanguageSelector />)
    expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  // Sub-route tests document the current contract: the selector always navigates
  // to the locale root, not the equivalent path in the other locale. If path
  // preservation is ever added, these tests will need updating — which is the point.

  describe('on an English sub-route (/blog/my-post)', () => {
    beforeEach(() => mockPathname.mockReturnValue('/blog/my-post'))

    it('EN link has aria-current="page"', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute(
        'aria-current',
        'page'
      )
    })

    it('ES link does not have aria-current', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /cambiar a español/i })).not.toHaveAttribute(
        'aria-current'
      )
    })

    it('EN link points to / (no path preservation — navigates to EN root)', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute('href', '/')
    })

    it('ES link points to /es/ root (not the ES equivalent of the current path)', () => {
      render(<LanguageSelector />)
      const href = screen.getByRole('link', { name: /cambiar a español/i }).getAttribute('href')
      expect(href).toMatch(/^\/es\/?$/)
    })
  })

  describe('on a Spanish sub-route (/es/blog/mi-post)', () => {
    beforeEach(() => mockPathname.mockReturnValue('/es/blog/mi-post'))

    it('ES link has aria-current="page"', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /cambiar a español/i })).toHaveAttribute(
        'aria-current',
        'page'
      )
    })

    it('EN link does not have aria-current', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).not.toHaveAttribute(
        'aria-current'
      )
    })

    it('EN link points to / root (not the EN equivalent of the current path)', () => {
      render(<LanguageSelector />)
      expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute('href', '/')
    })

    it('ES link still points to /es/ (no path preservation)', () => {
      render(<LanguageSelector />)
      const href = screen.getByRole('link', { name: /cambiar a español/i }).getAttribute('href')
      expect(href).toMatch(/^\/es\/?$/)
    })
  })
})
