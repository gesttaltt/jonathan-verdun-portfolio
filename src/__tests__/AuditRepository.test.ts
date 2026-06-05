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
  const mockSpecsPath = path.join(process.cwd(), 'docs', 'specs')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAudits', () => {
    it('returns empty array if docs and specs directories do not exist', async () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)
      const audits = await AuditRepository.getAudits()
      expect(audits).toEqual([])
      expect(fs.existsSync).toHaveBeenCalledWith(mockDocsPath)
      expect(fs.existsSync).toHaveBeenCalledWith(mockSpecsPath)
    })

    it('returns parsed audits from markdown files', async () => {
      ;(fs.existsSync as jest.Mock).mockImplementation((path) => path === mockDocsPath)
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
        category: 'audit',
      })
    })

    it('returns specs from the specs directory', async () => {
      ;(fs.existsSync as jest.Mock).mockImplementation((path) => path === mockSpecsPath)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['spec1.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'Test Spec' },
        content: '# Test Spec\nSome content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('<p>Some content</p>')

      const audits = await AuditRepository.getAudits()

      expect(audits).toHaveLength(1)
      expect(audits[0]!).toEqual({
        id: 'specs/spec1',
        slug: 'specs/spec1',
        title: 'Test Spec',
        date: '2026-05-01',
        content: '<p>Some content</p>',
        excerpt: ' Test Spec\nSome content...',
        category: 'spec',
      })
    })

    it('extracts title and date from content/filename if missing in frontmatter', async () => {
      ;(fs.existsSync as jest.Mock).mockImplementation((path) => path === mockDocsPath)
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
      ;(fs.existsSync as jest.Mock).mockImplementation((path) => path === mockDocsPath)
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
  })

  describe('XSS sanitization', () => {
    it('strips script tags and event-handler attributes from mocked marked output', async () => {
      ;(fs.existsSync as jest.Mock).mockImplementation((p) => p === mockDocsPath)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['xss-test.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'XSS Test', date: '2026-05-11' },
        content: '## Title',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue(
        '<p>Safe</p><script>alert(1)</script><img src="x" onerror="alert(2)">'
      )

      const audits = await AuditRepository.getAudits()

      expect(audits[0]?.content).not.toContain('<script>')
      expect(audits[0]?.content).not.toContain('onerror')
      expect(audits[0]?.content).toContain('Safe')
    })

    it('strips raw HTML script tags passed through by real marked (integration)', async () => {
      // Simulate marked passing raw HTML through unchanged — which is what the real
      // marked does with raw HTML blocks. This tests the full sanitize-html pipeline
      // against realistic marked output without fighting Jest's ESM transform for marked.
      ;(marked.parse as unknown as jest.Mock).mockImplementation((input: string) => input)

      ;(fs.existsSync as jest.Mock).mockImplementation((p) => p === mockDocsPath)
      ;(fs.readdirSync as jest.Mock).mockReturnValue(['xss-test.md'])
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'XSS Test', date: '2026-05-11' },
        // Raw HTML blocks are passed through verbatim by marked
        content:
          'Safe content\n\n<script>alert(1)</script>\n\n<img src="x" onerror="alert(2)">',
      })

      const audits = await AuditRepository.getAudits()

      expect(audits[0]?.content).not.toContain('<script>')
      expect(audits[0]?.content).not.toContain('onerror')
      expect(audits[0]?.content).toContain('Safe content')
    })
  })

  describe('getAuditBySlug — path traversal rejection', () => {
    it('returns null for slug containing .. without touching the filesystem', async () => {
      const audit = await AuditRepository.getAuditBySlug('../etc/passwd')
      expect(audit).toBeNull()
      expect(fs.existsSync).not.toHaveBeenCalled()
    })

    it('returns null for specs/ slug containing ..', async () => {
      const audit = await AuditRepository.getAuditBySlug('specs/../../../etc/shadow')
      expect(audit).toBeNull()
      expect(fs.existsSync).not.toHaveBeenCalled()
    })

    it('returns null for slug with extra / in baseSlug', async () => {
      const audit = await AuditRepository.getAuditBySlug('specs/foo/bar')
      expect(audit).toBeNull()
      expect(fs.existsSync).not.toHaveBeenCalled()
    })

    it('returns null for empty slug', async () => {
      const audit = await AuditRepository.getAuditBySlug('')
      expect(audit).toBeNull()
      expect(fs.existsSync).not.toHaveBeenCalled()
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
      expect(audit?.category).toBe('audit')
    })

    it('returns parsed spec for a given specs/ slug', async () => {
      const slug = 'specs/test-spec'
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)
      ;(fs.readFileSync as jest.Mock).mockReturnValue('content')
      ;(matter as unknown as jest.Mock).mockReturnValue({
        data: { title: 'Specific Spec' },
        content: 'Content',
      })
      ;(marked.parse as unknown as jest.Mock).mockReturnValue('html')

      const audit = await AuditRepository.getAuditBySlug(slug)

      expect(audit).not.toBeNull()
      expect(audit?.slug).toBe(slug)
      expect(audit?.title).toBe('Specific Spec')
      expect(audit?.category).toBe('spec')
    })
  })
})
