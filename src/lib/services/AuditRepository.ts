import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title'],
    a: ['href', 'name', 'target', 'rel'],
  },
}

/**
 * Server-side repository for reading and parsing quality audits.
 */

export interface AuditEntry {
  id: string
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
  category?: 'audit' | 'spec'
}

export class AuditRepository {
  private static readonly AUDITS_PATH = path.join(process.cwd(), 'docs')
  private static readonly SPECS_PATH = path.join(process.cwd(), 'docs', 'specs')

  static async getAudits(): Promise<AuditEntry[]> {
    const audits: AuditEntry[] = []

    if (fs.existsSync(this.AUDITS_PATH)) {
      const auditFiles = fs.readdirSync(this.AUDITS_PATH)
      auditFiles
        .filter((file) => file.endsWith('.md') && !file.includes('README'))
        .forEach((file) => {
          const filePath = path.join(this.AUDITS_PATH, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContent)

          const title = data.title || content.split('\n')[0]?.replace('# ', '') || file
          const date = data.date || file.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '2026-05-01'
          const slug = file.replace('.md', '')

          audits.push({
            id: slug,
            slug,
            title,
            date,
            content: sanitizeHtml(marked.parse(content) as string, SANITIZE_OPTIONS),
            excerpt: content.slice(0, 150).replace(/[#*`]/g, '') + '...',
            category: 'audit',
          })
        })
    }

    if (fs.existsSync(this.SPECS_PATH)) {
      const specFiles = fs.readdirSync(this.SPECS_PATH)
      specFiles
        .filter((file) => file.endsWith('.md'))
        .forEach((file) => {
          const filePath = path.join(this.SPECS_PATH, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContent)

          const title = data.title || content.split('\n')[0]?.replace('# ', '') || file
          const slug = `specs/${file.replace('.md', '')}`

          audits.push({
            id: slug,
            slug,
            title,
            date: '2026-05-01', // Specs are structural, date is less relevant but needed for sorting
            content: sanitizeHtml(marked.parse(content) as string, SANITIZE_OPTIONS),
            excerpt: content.slice(0, 150).replace(/[#*`]/g, '') + '...',
            category: 'spec',
          })
        })
    }

    return audits.sort((a, b) => b.date.localeCompare(a.date))
  }

  static async getAuditBySlug(slug: string): Promise<AuditEntry | null> {
    const isSpec = slug.startsWith('specs/')
    const baseSlug = isSpec ? slug.replace('specs/', '') : slug
    const basePath = isSpec ? this.SPECS_PATH : this.AUDITS_PATH

    const filePath = path.join(basePath, `${baseSlug}.md`)
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
      content: sanitizeHtml(marked.parse(content) as string, SANITIZE_OPTIONS),
      excerpt: content.slice(0, 150).replace(/[#*`]/g, '') + '...',
      category: isSpec ? 'spec' : 'audit',
    }
  }
}
