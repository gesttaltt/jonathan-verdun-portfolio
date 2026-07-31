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

  // Shared by getAudits() (both loops) and getAuditBySlug(): title/date fall
  // back through frontmatter -> content/filename heuristics -> a fixed default.
  // titleFallback differs by caller: the directory-listing loops fall back to
  // the raw filename (with .md), getAuditBySlug falls back to the slug (without).
  // The date regex only ever matches audit slugs (e.g. "audit-2026-05-10");
  // spec slugs have no digits, so they always fall through to the default.
  private static parseEntry(
    filePath: string,
    slug: string,
    category: 'audit' | 'spec',
    titleFallback: string = slug
  ): AuditEntry {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // A leading "# Heading" line doubles as the title (frontmatter fallback)
    // and, if left in, as a second <h1> once DetailArticleLayout renders its
    // own header title above the body — strip it from the body either way.
    /* istanbul ignore next -- String.split('\n') always returns at least one element */
    const firstLine = content.split('\n')[0] ?? ''
    const leadingHeading = firstLine.match(/^#\s+(.*)/)
    const body = leadingHeading ? content.slice(firstLine.length).replace(/^\n+/, '') : content

    const title = data.title || leadingHeading?.[1] || titleFallback
    const date = data.date || slug.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '2026-05-01'

    const isTruncated = body.length > 150

    return {
      id: slug,
      slug,
      title,
      date,
      content: sanitizeHtml(marked.parse(body) as string, SANITIZE_OPTIONS),
      excerpt: body.slice(0, 150).replace(/[#*`]/g, '') + (isTruncated ? '...' : ''),
      category,
    }
  }

  static async getAudits(): Promise<AuditEntry[]> {
    const audits: AuditEntry[] = []

    if (fs.existsSync(this.AUDITS_PATH)) {
      const auditFiles = fs.readdirSync(this.AUDITS_PATH)
      auditFiles
        .filter((file) => file.endsWith('.md') && !file.includes('README'))
        .forEach((file) => {
          const slug = file.replace('.md', '')
          audits.push(this.parseEntry(path.join(this.AUDITS_PATH, file), slug, 'audit', file))
        })
    }

    if (fs.existsSync(this.SPECS_PATH)) {
      const specFiles = fs.readdirSync(this.SPECS_PATH)
      specFiles
        .filter((file) => file.endsWith('.md'))
        .forEach((file) => {
          const slug = `specs/${file.replace('.md', '')}`
          audits.push(this.parseEntry(path.join(this.SPECS_PATH, file), slug, 'spec', file))
        })
    }

    return audits.sort((a, b) => b.date.localeCompare(a.date))
  }

  static async getAuditBySlug(slug: string): Promise<AuditEntry | null> {
    // Reject traversal sequences. baseSlug must also be a single path component.
    if (!slug || slug.includes('..')) return null
    const isSpec = slug.startsWith('specs/')
    const baseSlug = isSpec ? slug.replace('specs/', '') : slug
    if (baseSlug.includes('/')) return null
    const basePath = isSpec ? this.SPECS_PATH : this.AUDITS_PATH

    const filePath = path.join(basePath, `${baseSlug}.md`)
    if (!fs.existsSync(filePath)) return null

    return this.parseEntry(filePath, slug, isSpec ? 'spec' : 'audit')
  }
}
