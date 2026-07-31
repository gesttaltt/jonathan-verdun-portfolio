import { render, screen } from '@testing-library/react'
import { I18nProvider } from '@/lib/i18n/context'
import { ResumeTimeline } from '@/components/ResumeTimeline'
import { setMockPathname } from '../../jest.setup'

jest.mock('@/lib/siteConfig', () => {
  const actual = jest.requireActual('@/lib/siteConfig')
  return {
    siteConfig: { ...actual.siteConfig, basePath: '/jonathan-verdun-portfolio' },
  }
})

describe('ResumeTimeline under a non-empty basePath (GitHub Pages project deploy)', () => {
  it('prefixes the resume PDF download link with basePath', () => {
    setMockPathname('/resume')
    render(
      <I18nProvider>
        <ResumeTimeline hasResumePdf />
      </I18nProvider>
    )

    const downloadLink = screen.getByRole('link', { name: /download pdf/i })
    expect(downloadLink).toHaveAttribute(
      'href',
      '/jonathan-verdun-portfolio/resume-jonathan-verdun.pdf'
    )
  })
})
