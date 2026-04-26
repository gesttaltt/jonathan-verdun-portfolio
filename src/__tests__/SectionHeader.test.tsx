import React from 'react'
import { render, screen } from '@testing-library/react'
import { MotionConfig } from 'framer-motion'
import { Code2, Database, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

const wrap = (ui: React.ReactElement) =>
  render(<MotionConfig reducedMotion="always">{ui}</MotionConfig>)

describe('SectionHeader', () => {
  it('renders the title as an h2', () => {
    wrap(<SectionHeader icon={<Code2 className="h-5 w-5" />} title="Projects" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
  })

  it('renders the icon node inside the badge', () => {
    wrap(
      <SectionHeader
        icon={<Code2 className="h-5 w-5" data-testid="icon-node" />}
        title="Projects"
      />
    )
    expect(screen.getByTestId('icon-node')).toBeInTheDocument()
  })

  it('renders the accent line when showAccentLine is true', () => {
    const { container } = wrap(
      <SectionHeader icon={<Database className="h-5 w-5" />} title="Arch" showAccentLine />
    )
    expect(container.querySelector('.bg-gradient-to-b')).toBeInTheDocument()
  })

  it('does not render the accent line by default', () => {
    const { container } = wrap(
      <SectionHeader icon={<Database className="h-5 w-5" />} title="Arch" />
    )
    expect(container.querySelector('.bg-gradient-to-b')).not.toBeInTheDocument()
  })

  it('applies border-bottom class when showBorderBottom is true', () => {
    const { container } = wrap(
      <SectionHeader icon={<ShieldCheck className="h-5 w-5" />} title="QA" showBorderBottom />
    )
    expect(container.querySelector('.border-b')).toBeInTheDocument()
  })

  it('does not apply border-bottom by default', () => {
    const { container } = wrap(
      <SectionHeader icon={<ShieldCheck className="h-5 w-5" />} title="QA" />
    )
    expect(container.querySelector('.border-b')).not.toBeInTheDocument()
  })

  it('applies the correct badge color class for each color prop', () => {
    const cases = [
      { color: 'blue' as const, expected: 'bg-blue-500/10' },
      { color: 'purple' as const, expected: 'bg-purple-500/10' },
      { color: 'cyan' as const, expected: 'bg-cyan-500/10' },
      { color: 'green' as const, expected: 'bg-green-500/10' },
    ]
    cases.forEach(({ color, expected }) => {
      const { container } = wrap(
        <SectionHeader icon={<Code2 className="h-5 w-5" />} title="Test" color={color} />
      )
      expect(container.querySelector(`.${CSS.escape(expected)}`)).toBeInTheDocument()
    })
  })

  it('renders without error when only required props are provided', () => {
    expect(() =>
      wrap(<SectionHeader icon={<Code2 className="h-5 w-5" />} title="Minimal" />)
    ).not.toThrow()
  })
})
