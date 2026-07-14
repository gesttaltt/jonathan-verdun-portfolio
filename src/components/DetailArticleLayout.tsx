import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import type { ReactNode } from 'react'

const PROSE_CLASSES =
  'prose prose-invert prose-zinc prose-headings:tracking-tighter prose-headings:font-bold prose-headings:text-white prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-amber-400 prose-code:text-cyan-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-th:p-4 prose-td:p-4 max-w-none'

interface DetailArticleLayoutProps {
  backHref: string
  backLabel: string
  date: string
  title: string
  /** Extra header content below the title (e.g. blog tags). */
  meta?: ReactNode
  /** Pre-rendered content (e.g. MDX output). Mutually exclusive with `html`. */
  children?: ReactNode
  /** Raw HTML content, injected via dangerouslySetInnerHTML. Mutually exclusive with `children`. */
  html?: string
}

/** Shared shell for long-form detail pages (audits, blog posts) — back link,
 * dated header, and a typographically-styled article body. */
export function DetailArticleLayout({
  backHref,
  backLabel,
  date,
  title,
  meta,
  children,
  html,
}: DetailArticleLayoutProps) {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <Link
        href={backHref}
        className="text-text-muted hover:text-text-primary group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>

      <article className="space-y-8">
        <header className="border-border-subtle space-y-4 border-b border-white/10 pb-8">
          <div className="text-text-muted flex items-center gap-2 text-[10px] font-bold tracking-tighter uppercase sm:text-xs">
            <Calendar className="h-3 w-3" />
            {date}
          </div>

          <h1 className="text-text-primary text-3xl font-extrabold tracking-tighter sm:text-5xl">
            {title}
          </h1>

          {meta}
        </header>

        {html !== undefined ? (
          <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <div className={PROSE_CLASSES}>{children}</div>
        )}
      </article>
    </main>
  )
}
