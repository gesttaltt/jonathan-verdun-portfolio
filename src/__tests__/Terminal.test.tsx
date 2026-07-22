import { render, screen, within, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Terminal } from '@/components/Terminal'

describe('Terminal', () => {
  it('renders boot commands in the output log', async () => {
    render(<Terminal commands={[{ text: 'whoami', output: 'Jonathan Verdun' }]} />)
    expect(await screen.findByText('whoami')).toBeInTheDocument()
    expect(await screen.findByText('Jonathan Verdun')).toBeInTheDocument()
  })

  it('has role="log" with an accessible label on the output area', () => {
    render(<Terminal commands={[]} />)
    expect(screen.getByRole('log')).toHaveAttribute('aria-label', 'Terminal output')
  })

  it('input is enabled immediately, with no boot delay gating it', () => {
    render(<Terminal commands={[{ text: 'whoami', output: 'gestalt' }]} />)
    const input = screen.getByRole('textbox', { name: /terminal command input/i })
    expect(input).not.toBeDisabled()
  })

  it('submitting a command via Enter appends it to history with processor output', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())
    await user.type(input, 'help{Enter}')
    const log = screen.getByRole('log')
    expect(within(log).getByText('help')).toBeInTheDocument()
    expect(within(log).getByText(/available commands/i)).toBeInTheDocument()
  })

  it('typing "clear" resets history — prior boot output disappears', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[{ text: 'whoami', output: 'gestalt' }]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())
    await user.type(input, 'clear{Enter}')
    expect(screen.queryByText('whoami')).not.toBeInTheDocument()
    expect(screen.queryByText('gestalt')).not.toBeInTheDocument()
  })

  it('Ctrl+L keyboard shortcut clears history', async () => {
    render(<Terminal commands={[{ text: 'whoami', output: 'gestalt' }]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())

    // Shortcut should trigger clear
    fireEvent.keyDown(input, { key: 'l', ctrlKey: true })

    await waitFor(() => {
      expect(screen.queryByText('whoami')).not.toBeInTheDocument()
      expect(screen.queryByText('gestalt')).not.toBeInTheDocument()
    })
  })

  it('ignores blank input — processor is not called for whitespace-only commands', async () => {
    const user = userEvent.setup({ delay: null })
    const mockProcessor = { process: jest.fn(() => ({ output: '' })) }
    render(<Terminal commands={[]} processor={mockProcessor} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())
    await user.type(input, '   {Enter}')
    expect(mockProcessor.process).not.toHaveBeenCalled()
  })

  it('ArrowUp populates the input with the last executed command', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())
    await user.type(input, 'help{Enter}')
    await user.keyboard('{ArrowUp}')
    expect(input).toHaveValue('help')
  })

  it('ArrowDown after ArrowUp restores the draft input', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())
    await user.type(input, 'help{Enter}')
    await user.type(input, 'draft')
    await user.keyboard('{ArrowUp}')
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveValue('draft')
  })

  it('cd navigation survives across renders when no processor prop is passed (regression: the fallback processor must not be recreated per render)', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Terminal commands={[]} />)
    const input = await screen.findByRole('textbox', { name: /terminal command input/i })
    await waitFor(() => expect(input).not.toBeDisabled())

    // Each keystroke re-renders Terminal. If the fallback processor were
    // recreated per render (e.g. `processor = new DefaultCommandProcessor()`
    // as a prop default), this `cd` would silently lose its effect and the
    // VFS would be back at `/` by the time `ls` runs.
    await user.type(input, 'cd docs{Enter}')
    await user.type(input, 'ls{Enter}')

    const log = screen.getByRole('log')
    // docs/ contains only a `specs` subdirectory; root also contains
    // projects/ and README.md, so this distinguishes "still in docs/" from
    // "silently reset to /".
    expect(within(log).getAllByText(/specs/).length).toBeGreaterThan(0)
    expect(within(log).queryByText(/README\.md/)).not.toBeInTheDocument()
  })
})
