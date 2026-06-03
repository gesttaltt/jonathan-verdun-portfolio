import { AuditRepository } from '@/lib/services/AuditRepository'
import fs from 'fs'

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  readdirSync: jest.fn(),
  readFileSync: jest.fn(),
}))

const mockedFs = fs as jest.Mocked<typeof fs>

describe('AuditRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getAudits', () => {
    it('returns both audits and specs, sorted by date', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync
        .mockReturnValueOnce([
          'audit-2026-05-10.md',
          'older-audit-2025-01-01.md',
        ] as unknown as fs.Dirent[])
        .mockReturnValueOnce(['SPEC-A.md'] as unknown as fs.Dirent[])
      mockedFs.readFileSync
        .mockReturnValueOnce('---\ntitle: New Audit\ndate: "2026-05-10"\n---\n# New')
        .mockReturnValueOnce('---\ntitle: Old Audit\ndate: "2025-01-01"\n---\n# Old')
        .mockReturnValueOnce('---\ntitle: Spec A\n---\n# Spec')

      const audits = await AuditRepository.getAudits()

      expect(audits).toHaveLength(3)
      expect(audits[0].title).toBe('New Audit')
      expect(audits[1].title).toBe('Spec A') // Specs get default date '2026-05-01'
      expect(audits[2].title).toBe('Old Audit')
      expect(audits.find((a) => a.category === 'spec')).toBeDefined()
    })

    it('returns an empty array if directories do not exist', async () => {
      mockedFs.existsSync.mockReturnValue(false)
      const audits = await AuditRepository.getAudits()
      expect(audits).toEqual([])
    })

    it('handles missing metadata gracefully', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readdirSync
        .mockReturnValueOnce(['no-meta.md'] as unknown as fs.Dirent[])
        .mockReturnValueOnce([] as unknown as fs.Dirent[])
      mockedFs.readFileSync.mockReturnValue('')
      const audits = await AuditRepository.getAudits()
      expect(audits).toHaveLength(1)
      expect(audits[0].title).toBe('no-meta.md')
      expect(audits[0].date).toBe('2026-05-01')
    })
  })

  describe('getAuditBySlug', () => {
    it('retrieves a specific audit', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue(
        '---\ntitle: My Audit\ndate: "2026-05-15"\n---\n# Content'
      )
      const audit = await AuditRepository.getAuditBySlug('my-audit')
      expect(audit).not.toBeNull()
      expect(audit?.title).toBe('My Audit')
      expect(audit?.date).toBe('2026-05-15')
    })

    it('retrieves a specific audit and extracts date from slug', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue('# Content')
      const audit = await AuditRepository.getAuditBySlug('audit-2026-05-20')
      expect(audit).not.toBeNull()
      expect(audit?.date).toBe('2026-05-20')
    })

    it('uses slug as fallback title in getAuditBySlug', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue('')
      const audit = await AuditRepository.getAuditBySlug('simple-slug')
      expect(audit?.title).toBe('simple-slug')
    })

    it('extracts date from filename if missing in metadata', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      // First call for audits, second for specs
      mockedFs.readdirSync
        .mockReturnValueOnce(['audit-2024-12-25.md'] as unknown as fs.Dirent[])
        .mockReturnValueOnce([] as unknown as fs.Dirent[])
      mockedFs.readFileSync.mockReturnValue('# No metadata here')

      const audits = await AuditRepository.getAudits()
      expect(audits).toHaveLength(1)
      expect(audits[0].date).toBe('2024-12-25')
    })

    it('retrieves a specific spec', async () => {
      mockedFs.existsSync.mockReturnValue(true)
      mockedFs.readFileSync.mockReturnValue('---\ntitle: My Spec\n---\n# Spec Content')
      const audit = await AuditRepository.getAuditBySlug('specs/my-spec')
      expect(audit).not.toBeNull()
      expect(audit?.title).toBe('My Spec')
      expect(audit?.category).toBe('spec')
    })

    it('returns null if file does not exist', async () => {
      mockedFs.existsSync.mockReturnValue(false)
      const audit = await AuditRepository.getAuditBySlug('non-existent')
      expect(audit).toBeNull()
    })
  })
})
