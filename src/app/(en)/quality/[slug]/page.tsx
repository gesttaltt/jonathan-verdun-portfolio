import { AuditRepository } from '@/lib/services/AuditRepository'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

export async function generateStaticParams() {
  const audits = await AuditRepository.getAudits()
  return audits.map((a) => ({ slug: a.slug }))
}

export default async function AuditDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const audit = await AuditRepository.getAuditBySlug(slug)

  if (!audit) notFound()

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
      <Link
        href="/quality/"
        className="group mb-8 flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 uppercase transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard
      </Link>

      <article className="space-y-8">
        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-amber-500 uppercase sm:text-xs">
            <Calendar className="h-3 w-3" />
            {audit.date}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-white sm:text-5xl">
            {audit.title}
          </h1>
        </header>

        <div
          className="prose prose-invert prose-zinc prose-headings:tracking-tighter prose-headings:font-bold prose-headings:text-white prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-amber-400 prose-code:text-cyan-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-th:p-4 prose-td:p-4 max-w-none"
          dangerouslySetInnerHTML={{ __html: audit.content }}
        />
      </article>
    </main>
  )
}
