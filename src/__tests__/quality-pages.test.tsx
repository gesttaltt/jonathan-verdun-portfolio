import { render, screen } from '@testing-library/react'
import QualityPage, { metadata as enQualityMetadata } from '@/app/(en)/quality/page'
import QualityPageES, { metadata as esQualityMetadata } from '@/app/(es)/es/quality/page'
import AuditSlugPage, {
  generateMetadata as generateEnAuditMetadata,
} from '@/app/(en)/quality/[...slug]/page'
import AuditSlugPageES, {
  generateMetadata as generateEsAuditMetadata,
} from '@/app/(es)/es/quality/[...slug]/page'
import { AuditRepository } from '@/lib/services/AuditRepository'
import { I18nProvider } from '@/lib/i18n/context'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/siteConfig'
import { setMockPathname } from '../../jest.setup'

jest.mock('@/lib/services/AuditRepository')
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    notFound: jest.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
    usePathname: jest.fn(() => '/'),
    useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() })),
  }
})

const mockAudits = [
  {
    id: 'test-audit',
    slug: 'test-audit',
    title: 'Test Audit',
    date: '2026-05-11',
    content: '<p>HTML content</p>',
    excerpt: 'Excerpt',
    category: 'audit',
  },
]

describe('Quality Pages', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setMockPathname('/')
    ;(AuditRepository.getAudits as jest.Mock).mockResolvedValue(mockAudits)
    ;(AuditRepository.getAuditBySlug as jest.Mock).mockResolvedValue(mockAudits[0])
  })

  it('renders English Quality page', async () => {
    const Result = await QualityPage()
    render(<I18nProvider>{Result}</I18nProvider>)
    expect(screen.getByText('Test Audit')).toBeInTheDocument()
  })

  it('renders Spanish Quality page', async () => {
    setMockPathname('/es/quality')
    const Result = await QualityPageES()
    render(<I18nProvider>{Result}</I18nProvider>)
    expect(screen.getByText('Test Audit')).toBeInTheDocument()
  })

  it('renders English Audit slug page', async () => {
    const Result = await AuditSlugPage({ params: Promise.resolve({ slug: ['test-audit'] }) })
    render(<I18nProvider>{Result}</I18nProvider>)
    expect(screen.getByText('Test Audit')).toBeInTheDocument()
    expect(screen.getByText('2026-05-11')).toBeInTheDocument()
  })

  it('renders Spanish Audit slug page', async () => {
    setMockPathname('/es/quality')
    const Result = await AuditSlugPageES({ params: Promise.resolve({ slug: ['test-audit'] }) })
    render(<I18nProvider>{Result}</I18nProvider>)
    expect(screen.getByText('Test Audit')).toBeInTheDocument()
  })

  it('calls notFound for non-existent audit slug', async () => {
    ;(AuditRepository.getAuditBySlug as jest.Mock).mockResolvedValue(null)
    await expect(AuditSlugPage({ params: Promise.resolve({ slug: ['invalid'] }) })).rejects.toThrow(
      'NEXT_NOT_FOUND'
    )
    expect(notFound).toHaveBeenCalled()
  })

  it('calls notFound for non-existent audit slug (ES)', async () => {
    ;(AuditRepository.getAuditBySlug as jest.Mock).mockResolvedValue(null)
    await expect(
      AuditSlugPageES({ params: Promise.resolve({ slug: ['invalid'] }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
    expect(notFound).toHaveBeenCalled()
  })

  it('generates static params from audits', async () => {
    const { generateStaticParams } = await import('@/app/(en)/quality/[...slug]/page')
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: ['test-audit'] }])
  })

  it('generates static params from audits (ES)', async () => {
    const { generateStaticParams } = await import('@/app/(es)/es/quality/[...slug]/page')
    const params = await generateStaticParams()
    expect(params).toEqual([{ slug: ['test-audit'] }])
  })

  it('EN quality listing metadata references the site name', () => {
    expect(enQualityMetadata.title).toContain(siteConfig.name)
    expect(String(enQualityMetadata.description)).toContain('QA audits')
  })

  it('ES quality listing metadata references the site name', () => {
    expect(esQualityMetadata.title).toContain(siteConfig.name)
    expect(String(esQualityMetadata.description)).toContain('Auditorías')
  })

  it('generates metadata for EN audit slug route when audit exists', async () => {
    const metadata = await generateEnAuditMetadata({
      params: Promise.resolve({ slug: ['test-audit'] }),
    })
    expect(metadata).toMatchObject({
      title: `Test Audit — ${siteConfig.name}`,
      description: 'Excerpt',
    })
  })

  it('returns empty metadata for EN audit slug route when audit is missing', async () => {
    ;(AuditRepository.getAuditBySlug as jest.Mock).mockResolvedValue(null)
    const metadata = await generateEnAuditMetadata({
      params: Promise.resolve({ slug: ['missing'] }),
    })
    expect(metadata).toEqual({})
  })

  it('generates metadata for ES audit slug route when audit exists', async () => {
    const metadata = await generateEsAuditMetadata({
      params: Promise.resolve({ slug: ['test-audit'] }),
    })
    expect(metadata).toMatchObject({
      title: `Test Audit — ${siteConfig.name}`,
      description: 'Excerpt',
    })
  })

  it('returns empty metadata for ES audit slug route when audit is missing', async () => {
    ;(AuditRepository.getAuditBySlug as jest.Mock).mockResolvedValue(null)
    const metadata = await generateEsAuditMetadata({
      params: Promise.resolve({ slug: ['missing'] }),
    })
    expect(metadata).toEqual({})
  })
})
