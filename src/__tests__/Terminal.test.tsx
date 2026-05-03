import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Terminal } from '@/components/Terminal'

describe('Terminal', () => {
  it('renders boot commands in the output log', async () => {
    render(<Terminal commands={[{ text: 'whoami', output: 'Jonathan Verdun', delay: 10 }]} />)
    expect(await screen.findByText('whoami')).toBeInTheDocument()
    expect(await screen.findByText('Jonathan Verdun')).toBeInTheDocument()
  })

  it('has role="log" with an accessible label on the output area', () => {
    render(<Terminal commands={[]} />)
    expect(screen.getByRole('log')).toHaveAttribute('aria-label', 'Terminal output')
  })

  it('shows the input field only after boot completes', async () => {
    render(<Terminal commands={[]} />)
    // Input is absent while isBooting — it appears once the 500ms finish timer fires
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    expect(input).toBeInTheDocument()
  })

  it('submitting a command via Enter appends it to history with processor output', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await user.type(input, 'help{Enter}')
    const log = screen.getByRole('log')
    expect(within(log).getByText('help')).toBeInTheDocument()
    expect(within(log).getByText(/available commands/i)).toBeInTheDocument()
  })

  it('typing "clear" resets history — prior boot output disappears', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[{ text: 'whoami', output: 'gestalt', delay: 10 }]} />)
    // Wait for both the boot output and the input (input appears 500ms after last boot command)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await user.type(input, 'clear{Enter}')
    expect(screen.queryByText('whoami')).not.toBeInTheDocument()
    expect(screen.queryByText('gestalt')).not.toBeInTheDocument()
  })

  it('ignores blank input — processor is not called for whitespace-only commands', async () => {
    const user = userEvent.setup({ delay: null })
    const mockProcessor = { process: jest.fn(() => '') }
    render(<Terminal commands={[]} processor={mockProcessor} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await user.type(input, '   {Enter}')
    expect(mockProcessor.process).not.toHaveBeenCalled()
  })
})
