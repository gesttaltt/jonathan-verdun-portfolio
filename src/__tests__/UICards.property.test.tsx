import * as fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import { AuditCard } from '@/components/AuditCard'
import { ProjectCard } from '@/components/ProjectCard'
import { I18nProvider } from '@/lib/i18n/context'

// Safe wrapper: Next.js may not re-encode an already-malformed slug (e.g. bare '%'),
// leaving the href attribute itself malformed for decodeURIComponent.
function tryDecode(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

describe('UI Card Components — property-based hardening', () => {
  it('AuditCard handles any string content without crashing', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          // Real slugs come from filenames and are URL-safe. Constrain so the
          // href assertion isn't invalidated by Next.js URL normalization.
          slug: fc.string({ minLength: 1 }).map((s) => s.replace(/[^a-zA-Z0-9_-]/g, '-') || 'x'),
          title: fc.string(),
          date: fc.string(),
          excerpt: fc.string(),
          content: fc.string(),
        }),
        (audit) => {
          const { unmount } = render(
            <I18nProvider>
              <AuditCard audit={audit} />
            </I18nProvider>
          )
          try {
            const link = screen.getByRole('link')
            expect(link).toBeInTheDocument()
            // Decode the href before comparing — the slug may contain characters that
            // Next.js URL-encodes (e.g. spaces become %20).
            const decodedHref = tryDecode(link.getAttribute('href') ?? '')
            expect(decodedHref).toContain(audit.slug)
          } finally {
            unmount()
          }
        }
      )
    )
  })

  it('ProjectCard handles any string content and tech stack without crashing', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          description: fc.string(),
          techStack: fc.array(fc.string()),
          link: fc.webUrl(),
          status: fc.constantFrom('Deployed', 'QA', 'Prototype', 'Research', 'Archived' as const),
          stats: fc.option(
            fc.array(
              fc.record({
                label: fc.string(),
                value: fc.string(),
              })
            ),
            { nil: undefined }
          ),
        }),
        (project) => {
          const { unmount } = render(
            <I18nProvider>
              <ProjectCard project={project} />
            </I18nProvider>
          )
          try {
            const item = screen.getByRole('listitem')
            expect(item).toBeInTheDocument()
            // The title must appear somewhere in the card.
            expect(item.textContent).toContain(project.title)
          } finally {
            unmount()
          }
        }
      )
    )
  })
})
