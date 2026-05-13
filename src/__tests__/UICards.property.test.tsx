import * as fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import { AuditCard } from '@/components/AuditCard'
import { ProjectCard } from '@/components/ProjectCard'
import { I18nProvider } from '@/lib/i18n/context'

describe('UI Card Components — property-based hardening', () => {
  it('AuditCard handles any string content without crashing', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          slug: fc.string({ minLength: 1 }),
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
          expect(screen.getByRole('link')).toBeInTheDocument()
          unmount()
        }
      )
    )
  })

  it('ProjectCard handles any string content and tech stack without crashing', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          title: fc.string(),
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
          expect(screen.getByRole('listitem')).toBeInTheDocument()
          unmount()
        }
      )
    )
  })
})
