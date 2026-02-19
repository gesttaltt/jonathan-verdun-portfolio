import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock the InteractiveTopology component to avoid Three.js/ESM issues in Jest
jest.mock('@/components/InteractiveTopology', () => ({
  InteractiveTopology: () => (
    <div data-testid="interactive-topology-mock">Interactive Topology</div>
  ),
}))

describe('Home', () => {
  it('renders the name Jonathan Verdun in a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Jonathan Verdun/i })
    expect(heading).toBeInTheDocument()
  })
})
