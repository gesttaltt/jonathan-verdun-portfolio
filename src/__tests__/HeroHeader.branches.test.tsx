import React from 'react'
import { render, screen } from '@testing-library/react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { HeroHeader } from '@/components/HeroHeader'

// Mutable array — mutated per test so the getter always returns current state
const mockWorkHistory: Array<{
  organization: string
  url: string
  role?: string
  period?: string
}> = []

jest.mock('@/lib/siteConfig', () => ({
  siteConfig: {
    name: 'Jonathan Verdun',
    tagline: 'QA Engineer · Bioinformatics Researcher',
    jobTitle: 'QA Automation Engineer & Bioinformatics Researcher',
    socialLinks: {
      github: { url: 'https://github.com/gesttaltt', label: 'github.com/gesttaltt' },
      linkedin: {
        url: 'https://www.linkedin.com/in/jonathan-verdun/',
        label: 'linkedin.com/in/jonathan-verdun',
      },
    },
    get workHistory() {
      return mockWorkHistory
    },
    contact: { email: 'jonathan.verdun@gmail.com', ctaLabel: 'Get in Touch' },
  },
}))

const wrap = () =>
  render(
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="always">
        <HeroHeader />
      </MotionConfig>
    </LazyMotion>
  )

afterEach(() => {
  mockWorkHistory.length = 0
})

describe('HeroHeader — workHistory guard (L1)', () => {
  it('does not render the Work History card when workHistory is empty', () => {
    wrap()
    expect(screen.queryByText('Work History')).not.toBeInTheDocument()
  })

  it('renders the Work History card when workHistory has entries', () => {
    mockWorkHistory.push({ organization: 'Acme', url: 'https://acme.com', role: 'Engineer' })
    wrap()
    expect(screen.getByText('Work History')).toBeInTheDocument()
  })
})

describe('HeroHeader — role/period subtext branch (L4)', () => {
  it('does not render role/period subtext when entry has no role or period', () => {
    mockWorkHistory.push({ organization: 'Acme', url: 'https://acme.com' })
    const { container } = wrap()
    expect(container.querySelector('[data-testid="work-role-period"]')).toBeNull()
  })

  it('renders subtext with role only', () => {
    mockWorkHistory.push({ organization: 'Acme', url: 'https://acme.com', role: 'Engineer' })
    wrap()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
  })

  it('renders subtext with both role and period separated by ·', () => {
    mockWorkHistory.push({
      organization: 'Acme',
      url: 'https://acme.com',
      role: 'Engineer',
      period: '2024–2025',
    })
    wrap()
    expect(screen.getByText('Engineer · 2024–2025')).toBeInTheDocument()
  })
})
