import { render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n/context'
import { siteConfig } from '@/lib/siteConfig'
import { ResumeTimeline } from '@/components/ResumeTimeline'
import { setMockPathname } from '../../jest.setup'

const renderTimeline = (hasResumePdf = false) =>
  render(
    <I18nProvider>
      <ResumeTimeline hasResumePdf={hasResumePdf} />
    </I18nProvider>
  )

describe('ResumeTimeline', () => {
  it('renders English resume title and job title', () => {
    setMockPathname('/resume')
    renderTimeline()

    expect(screen.getByRole('heading', { name: 'Resume' })).toBeInTheDocument()
    expect(screen.getByText(siteConfig.jobTitle)).toBeInTheDocument()
  })

  it('renders Spanish resume title in ES locale', () => {
    setMockPathname('/es/resume')
    renderTimeline()
    expect(screen.getByRole('heading', { name: 'Currículum' })).toBeInTheDocument()
  })

  it('renders PDF download button when resume file exists', () => {
    setMockPathname('/resume')
    renderTimeline(true)

    const downloadLink = screen.getByRole('link', { name: /download pdf/i })
    expect(downloadLink).toHaveAttribute('href', '/resume-jonathan-verdun.pdf')
    expect(downloadLink).toHaveAttribute('download')
  })

  it('renders email CTA with mailto href', () => {
    setMockPathname('/resume')
    renderTimeline()

    const emailLink = screen.getByRole('link', { name: /send message/i })
    expect(emailLink).toHaveAttribute('href', `mailto:${siteConfig.contact.email}`)
  })

  it('renders work history organizations and experience heading', () => {
    setMockPathname('/resume')
    renderTimeline()

    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
    for (const job of siteConfig.workHistory) {
      expect(screen.getByText(job.organization)).toBeInTheDocument()
    }
  })

  it('renders skills, certifications, and back link (EN)', () => {
    setMockPathname('/resume')
    renderTimeline()

    expect(screen.getByRole('heading', { name: /skills & technologies/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /certifications/i })).toBeInTheDocument()
    const backLink = screen.getByRole('link', { name: /back to home/i })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('renders Spanish back link destination', () => {
    setMockPathname('/es/resume')
    renderTimeline()

    const backLink = screen.getByRole('link', { name: /volver al inicio/i })
    expect(backLink).toHaveAttribute('href', '/es')
  })

  it('renders connecting line before last work history item but not after it', () => {
    setMockPathname('/resume')
    const { container } = renderTimeline()

    const gradientLineDivs = container.querySelectorAll('.bg-gradient-to-b.from-blue-500\\/30')
    expect(gradientLineDivs.length).toBe(siteConfig.workHistory.length - 1)
  })
})
