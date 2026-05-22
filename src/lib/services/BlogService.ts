import fs from 'fs'
import path from 'path'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

interface ParsedFrontmatter {
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
        const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
        const meta = this.parseFrontmatter(content)
        return meta ? { slug, ...meta } : null
      })
      .filter((p): p is NonNullable<{ slug: string } & ParsedFrontmatter> => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  static getPost(slug: string): { meta: BlogPostMeta; content: string } | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const meta = this.parseFrontmatter(raw)
    if (!meta) return null

    const content = raw.replace(/^---[\s\S]*?---\s*/, '')
    return { meta: { slug, ...meta }, content }
  }

  private static parseFrontmatter(raw: string): ParsedFrontmatter | null {
    const match = raw.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return null

    const rawFrontmatter = match[1]
    /* istanbul ignore next — capturing group always present when match succeeds */
    if (rawFrontmatter === undefined) return null

    const frontmatter: Record<string, string | string[]> = {}
    const lines = rawFrontmatter.split('\n')
    for (const line of lines) {
      const sepIndex = line.indexOf(':')
      if (sepIndex === -1) continue
      const key = line.slice(0, sepIndex).trim()
      const rawValue = line.slice(sepIndex + 1).trim()

      let value: string | string[] = rawValue.replace(/['"]/g, '')
      if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        value = rawValue
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/['"]/g, ''))
      }
      frontmatter[key] = value
    }

    const title = frontmatter.title
    const date = frontmatter.date
    if (!title || !date) return null

    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const description = typeof frontmatter.description === 'string' ? frontmatter.description : ''

    return {
      title: title as string,
      date: date as string,
      tags,
      description,
    }
  }
}
