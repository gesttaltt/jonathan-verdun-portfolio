import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

/**
 * @file AuditRepository.ts
 * Server-side repository for reading and parsing quality audits.
 */

export interface AuditEntry {
  id: string
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
}

export class AuditRepository {
  private static readonly AUDITS_PATH = path.join(process.cwd(), 'docs')

  static async getAudits(): Promise<AuditEntry[]> {
    if (!fs.existsSync(this.AUDITS_PATH)) return []

    const files = fs.readdirSync(this.AUDITS_PATH)
    const audits = files
      .filter((file) => file.endsWith('.md') && !file.includes('README'))
      .map((file) => {
        const filePath = path.join(this.AUDITS_PATH, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)

        // Extract title from first H1 if not in frontmatter
        const title = data.title || content.split('\n')[0]?.replace('# ', '') || file
        const date = data.date || file.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '2026-05-01'
        const slug = file.replace('.md', '')

        return {
          id: slug,
          slug,
          title,
          date,
          content: marked.parse(content) as string,
          excerpt: content.slice(0, 150).replace(/[#*`]/g, '') + '...',
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))

    return audits
  }

  static async getAuditBySlug(slug: string): Promise<AuditEntry | null> {
    const filePath = path.join(this.AUDITS_PATH, `${slug}.md`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    const title = data.title || content.split('\n')[0]?.replace('# ', '') || slug
    const date = data.date || slug.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '2026-05-01'

    return {
      id: slug,
      slug,
      title,
      date,
      content: marked.parse(content) as string,
      excerpt: content.slice(0, 150).replace(/[#*`]/g, '') + '...',
    }
  }
}
