import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

export class BlogService {
  static getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(CONTENT_DIR)) return []

    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))

    return files
      .map((file) => {
        const slug = file.replace(/\.mdx$/, '')
        try {
          const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
          const { data } = matter(raw)
          return this.extractMeta(slug, data)
        } catch {
          return null
        }
      })
      .filter((p): p is BlogPostMeta => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  static getPost(slug: string): { meta: BlogPostMeta; content: string } | null {
    // Reject traversal sequences and path separators — slugs are plain filenames only.
    // Static export makes this safe today (slugs enumerated at build time), but this
    // guard protects against future SSR migration without code change.
    if (!slug || slug.includes('..') || slug.includes('/')) return null

    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const meta = this.extractMeta(slug, data)
      if (!meta) return null
      return { meta, content }
    } catch {
      return null
    }
  }

  private static extractMeta(slug: string, data: Record<string, unknown>): BlogPostMeta | null {
    const title = typeof data.title === 'string' ? data.title : null
    const rawDate = data.date
    const date =
      rawDate instanceof Date
        ? rawDate.toISOString().slice(0, 10)
        : typeof rawDate === 'string'
          ? rawDate
          : null
    if (!title || !date) return null
    return {
      slug,
      title,
      date,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: typeof data.description === 'string' ? data.description : '',
    }
  }
}
