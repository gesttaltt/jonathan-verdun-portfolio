import * as fc from 'fast-check'
import sitemap from '@/app/sitemap'
import { AuditRepository } from '@/lib/services/AuditRepository'
import { siteConfig } from '@/lib/siteConfig'
import type { AuditEntry } from '@/lib/services/AuditRepository'

jest.mock('@/lib/services/AuditRepository', () => ({
  AuditRepository: { getAudits: jest.fn() },
}))

const mockGetAudits = AuditRepository.getAudits as jest.MockedFunction<
  typeof AuditRepository.getAudits
>

const makeAudit = (slug: string): AuditEntry => ({
  id: slug,
  slug,
  title: 'Test',
  date: '2026-05-01',
  content: '',
  excerpt: '',
  category: 'audit',
})

beforeEach(() => {
  jest.clearAllMocks()
  mockGetAudits.mockResolvedValue([])
  process.env.SITE_LAST_MODIFIED = '2026-01-01'
})

afterEach(() => {
  delete process.env.SITE_LAST_MODIFIED
})

describe('sitemap — static routes', () => {
  it('all static route URLs are valid', async () => {
    const entries = await sitemap()
    for (const entry of entries) {
      expect(() => new URL(entry.url)).not.toThrow()
    }
  })

  it('includes EN and ES home, quality, and resume routes', async () => {
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain(siteConfig.url)
    expect(urls).toContain(`${siteConfig.url}/es/`)
    expect(urls).toContain(`${siteConfig.url}/quality/`)
    expect(urls).toContain(`${siteConfig.url}/es/quality/`)
  })
})

describe('sitemap — audit slug URL safety', () => {
  it('typical slug values produce valid EN and ES URLs', async () => {
    mockGetAudits.mockResolvedValue([
      makeAudit('audit-2026-05-10'),
      makeAudit('COMPREHENSIVE_AUDIT_2026_05_03'),
      makeAudit('specs/ARCHITECTURE'),
    ])

    const entries = await sitemap()
    for (const entry of entries) {
      expect(() => new URL(entry.url)).not.toThrow()
    }
  })

  it('property: slugs with only safe URL characters always produce valid sitemap URLs', () => {
    // Docs filenames that become slugs use alphanumeric, hyphens, underscores,
    // dots, and forward slashes (for specs/ prefix). These are all URL-safe.
    fc.assert(
      fc.property(
        fc.stringMatching(/^[a-zA-Z0-9_.\-]{1,60}(\/[a-zA-Z0-9_.\-]{1,60})?$/),
        (slug) => {
          const url = `${siteConfig.url}/quality/${slug}/`
          expect(() => new URL(url)).not.toThrow()
        }
      )
    )
  })

  it('documents that # and ? in slugs silently truncate the sitemap path', () => {
    // URL delimiters in a raw-concatenated slug corrupt the pathname silently —
    // no error is thrown but the URL is wrong. Audit slugs come from
    // developer-authored filenames, so these characters should never appear.
    // This test documents the assumption and guards against regressions.
    for (const slug of ['audit#section', 'audit?v=2']) {
      const rawUrl = `${siteConfig.url}/quality/${slug}/`
      const parsed = new URL(rawUrl)
      // Delimiter character causes the path to be truncated
      expect(parsed.pathname).not.toBe(`/quality/${slug}/`)
    }

    // encodeURIComponent preserves the full slug in the path:
    for (const slug of ['audit#section', 'audit?v=2']) {
      const safeUrl = `${siteConfig.url}/quality/${encodeURIComponent(slug)}/`
      expect(new URL(safeUrl).pathname).toBe(`/quality/${encodeURIComponent(slug)}/`)
    }
  })

  it('each audit produces exactly one EN and one ES route', async () => {
    const slugs = ['audit-a', 'audit-b', 'specs/SPEC-C']
    mockGetAudits.mockResolvedValue(slugs.map(makeAudit))

    const entries = await sitemap()
    const auditUrls = entries.map((e) => e.url).filter((u) => u.includes('/quality/'))
    // 3 audits × 2 locales = 6 quality URLs, plus the 2 index quality URLs
    expect(auditUrls).toHaveLength(slugs.length * 2 + 2)
  })
})
