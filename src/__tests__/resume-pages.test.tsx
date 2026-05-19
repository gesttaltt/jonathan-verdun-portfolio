import { render, screen } from '@testing-library/react'
import EnResumePage, { metadata as enMetadata } from '@/app/(en)/resume/page'
import EsResumePage, { metadata as esMetadata } from '@/app/(es)/es/resume/page'
import { siteConfig } from '@/lib/siteConfig'

jest.mock('@/components/ResumeTimeline', () => ({
  ResumeTimeline: () => <div data-testid="resume-timeline">Timeline</div>,
}))

describe('Resume route wrappers', () => {
  it('exports EN metadata title and description', () => {
    expect(enMetadata.title).toBe(`Resume — ${siteConfig.name}`)
    expect(String(enMetadata.description)).toContain(siteConfig.jobTitle)
  })

  it('exports ES metadata title and description', () => {
    expect(esMetadata.title).toBe(`Currículum — ${siteConfig.name}`)
    expect(String(esMetadata.description)).toContain(siteConfig.jobTitle)
  })

  it('renders EN Resume page with ResumeTimeline', () => {
    render(<EnResumePage />)
    expect(screen.getByTestId('resume-timeline')).toBeInTheDocument()
  })

  it('renders ES Resume page with ResumeTimeline', () => {
    render(<EsResumePage />)
    expect(screen.getByTestId('resume-timeline')).toBeInTheDocument()
  })
})
