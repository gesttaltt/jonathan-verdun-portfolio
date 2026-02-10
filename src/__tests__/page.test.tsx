import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders the name Jonathan Verdun in a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Jonathan Verdun/i })
    expect(heading).toBeInTheDocument()
  })
})
