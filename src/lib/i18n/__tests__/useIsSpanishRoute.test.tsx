import { render, screen } from '@testing-library/react'
import { useIsSpanishRoute } from '../useIsSpanishRoute'

jest.mock('../../siteConfig', () => ({
  siteConfig: { basePath: '/jonathan-verdun-portfolio' },
}))

function Probe() {
  const isEs = useIsSpanishRoute()
  return <span>{isEs ? 'es' : 'en'}</span>
}

describe('useIsSpanishRoute with a non-empty basePath', () => {
  it('detects /es routes served under a GitHub Pages project basePath', () => {
    window.history.pushState({}, '', '/jonathan-verdun-portfolio/es/some-path')
    render(<Probe />)
    expect(screen.getByText('es')).toBeInTheDocument()
  })

  it('does not false-positive on an English route under the same basePath', () => {
    window.history.pushState({}, '', '/jonathan-verdun-portfolio/some-path')
    render(<Probe />)
    expect(screen.getByText('en')).toBeInTheDocument()
  })
})
