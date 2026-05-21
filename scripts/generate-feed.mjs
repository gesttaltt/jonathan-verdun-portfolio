// Generates public/feed.xml (RSS 2.0) from MDX blog posts at build time.
// Uses gray-matter (already a dependency) to parse frontmatter.

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'https://jonathanverdun.com'
const BLOG_DIR = join(process.cwd(), 'src/content/blog')
const OUT_FILE = join(process.cwd(), 'public/feed.xml')

function generate() {
  if (!existsSync(BLOG_DIR)) {
    console.warn('[generate-feed] Blog directory not found at', BLOG_DIR)
    writeFileSync(OUT_FILE, '')
    return
  }

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = readFileSync(join(BLOG_DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      if (!data.title || !data.date) return null

      const description = data.description || ''
      // Strip JSX/imports for a clean RSS description
      const snippet = content
        .replace(/^import\s+.*$/gm, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
        .slice(0, 500)

      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        description: String(description),
        snippet,
        tags: Array.isArray(data.tags) ? data.tags : [],
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const link = (slug) => `${SITE_URL}/blog/${slug}`
  const escape = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${escape(link(post.slug))}</link>
      <guid isPermaLink="true">${escape(link(post.slug))}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.description || post.snippet)}</description>
      ${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join('\n')}
    </item>`
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jonathan Verdun — Blog</title>
    <link>${escape(SITE_URL)}/blog</link>
    <description>QA Automation Engineering, test architecture, and CI/CD hardening — by Jonathan Verdun</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escape(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  writeFileSync(OUT_FILE, feed)
  console.log(`[generate-feed] Generated feed.xml with ${posts.length} posts → public/feed.xml`)
}

generate()
