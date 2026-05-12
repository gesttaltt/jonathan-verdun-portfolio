import { AuditRepository } from '@/lib/services/AuditRepository'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

jest.mock('fs')
jest.mock('gray-matter')
jest.mock('marked')

describe('AuditRepository', () => {
  const mockDocsPath = path.join(process.cwd(), 'docs')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAudits', () => {
    it('returns empty array if docs directory does not exist', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      const audits = await AuditRepository.getAudits()
      expect(audits).toEqual([])
      expect(fs.existsSync).toHaveBeenCalledWith(mockDocsPath)
    })

    it('returns parsed audits from markdown files', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['audit1.md', 'README.md', 'other.txt'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'Test Audit', date: '2026-05-11' },
        content: '# Test Audit\nSome content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('<p>Some content</p>')

      const audits = await AuditRepository.getAudits()

      expect(audits).toHaveLength(1)
      expect(audits[0]!).toEqual({
        id: 'audit1',
        slug: 'audit1',
        title: 'Test Audit',
        date: '2026-05-11',
        content: '<p>Some content</p>',
        excerpt: ' Test Audit\nSome content...',
      })
    })

    it('extracts title and date from content/filename if missing in frontmatter', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['2026-05-10-test.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: {},
        content: '# Title from H1\nContent',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('html')

      const audits = await AuditRepository.getAudits()

      expect(audits[0]!.title).toBe('Title from H1')
      expect(audits[0]!.date).toBe('2026-05-10')
    })

    it('sorts audits by date descending', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['a.md', 'b.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock)
        .mockReturnValueOnce({ data: { date: '2026-05-01' }, content: '' })
        .mockReturnValueOnce({ data: { date: '2026-05-10' }, content: '' })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('')

      const audits = await AuditRepository.getAudits()
      expect(audits[0]!.date).toBe('2026-05-10')
      expect(audits[1]!.date).toBe('2026-05-01')
    })

    it('falls back to default date if none found', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['no-date-file.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: {},
        content: 'Content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('html')

      const audits = await AuditRepository.getAudits()
      expect(audits[0]!.date).toBe('2026-05-01')
    })
  })

  describe('getAuditBySlug', () => {
    it('returns null if file does not exist', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      const audit = await AuditRepository.getAuditBySlug('non-existent')
      expect(audit).toBeNull()
    })

    it('returns parsed audit for a given slug', async () => {
      const slug = 'test-audit'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'Specific Audit' },
        content: 'Content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('html')

      const audit = await AuditRepository.getAuditBySlug(slug)

      expect(audit).not.toBeNull()
      expect(audit?.slug).toBe(slug)
      expect(audit?.title).toBe('Specific Audit')
    })

    it('falls back to default date in getAuditBySlug', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: {},
        content: 'Content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('html')

      const audit = await AuditRepository.getAuditBySlug('no-date')
      expect(audit?.date).toBe('2026-05-01')
    })
  })
})
