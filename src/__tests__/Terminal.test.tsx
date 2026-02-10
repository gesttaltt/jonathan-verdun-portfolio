import { render, screen } from '@testing-library/react'
import { Terminal } from '@/components/Terminal'

describe('Terminal', () => {
  it('renders the terminal with prompt and content', async () => {
    render(<Terminal commands={[{ text: 'whoami', output: 'Jonathan Verdun' }]} />)
    expect(await screen.findByText('whoami')).toBeInTheDocument()
    expect(await screen.findByText('Jonathan Verdun')).toBeInTheDocument()
  })
})
