import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'
import { I18nProvider } from '@/lib/i18n/context'

const renderWithI18n = (ui: React.ReactElement) => {
  return render(<I18nProvider>{ui}</I18nProvider>)
}

const ORIGINAL_ENV = process.env

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

afterEach(() => {
  process.env = ORIGINAL_ENV
})

describe('ContactForm', () => {
  describe('disabled state', () => {
    it('renders disabled notice when Formspree is not configured', () => {
      delete process.env.NEXT_PUBLIC_FORMSPREE_ID
      renderWithI18n(<ContactForm />)
      expect(screen.getByText(/contact form is not configured/i)).toBeInTheDocument()
    })
  })

  describe('enabled state', () => {
    const mockFetch = jest.fn()

    beforeEach(() => {
      process.env.NEXT_PUBLIC_FORMSPREE_ID = 'test-id'
      mockFetch.mockReset()
      mockFetch.mockResolvedValue({ ok: true })
      global.fetch = mockFetch
    })

    const fillField = async (
      user: ReturnType<typeof userEvent.setup>,
      label: RegExp,
      value: string
    ) => {
      const input = screen.getByPlaceholderText(label)
      await user.clear(input)
      await user.type(input, value)
    }

    it('renders all form fields and submit button', () => {
      renderWithI18n(<ContactForm />)

      expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/you@example/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/what is this about/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/tell me about/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('shows validation errors on empty submit', async () => {
      const user = userEvent.setup()
      renderWithI18n(<ContactForm />)

      await user.click(screen.getByRole('button', { name: /send message/i }))

      const errors = await screen.findAllByText(/this field is required/i)
      expect(errors).toHaveLength(4)
    })

    it('shows email validation error for invalid email', async () => {
      const user = userEvent.setup()
      renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John')
      await fillField(user, /you@example/i, 'not-an-email')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test message')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument()
    })

    it('shows validation error on blur for empty required field', async () => {
      const user = userEvent.setup()
      renderWithI18n(<ContactForm />)

      const nameInput = screen.getByPlaceholderText(/your name/i)
      await user.click(nameInput)
      await user.tab()

      expect(await screen.findByText(/this field is required/i)).toBeInTheDocument()
    })

    it('submits successfully and shows success state', async () => {
      const user = userEvent.setup()
      const { container } = renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John Doe')
      await fillField(user, /you@example/i, 'john@example.com')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test message body')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1)
      })
      expect(mockFetch).toHaveBeenCalledWith(
        'https://formspree.io/f/test-id',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"name":"John Doe"'),
        })
      )

      expect(container.textContent).toContain('Message sent!')
    })

    it('shows submitting state while request is in flight', async () => {
      let resolvePromise!: (value: Response) => void
      mockFetch.mockReturnValue(
        new Promise<Response>((resolve) => {
          resolvePromise = resolve
        })
      )

      const user = userEvent.setup()
      const { container } = renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John Doe')
      await fillField(user, /you@example/i, 'john@example.com')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      expect(container.textContent).toContain('Sending')

      resolvePromise({ ok: true } as Response)
    })

    it('shows error state on submission failure (rejected fetch)', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const user = userEvent.setup()
      const { container } = renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John Doe')
      await fillField(user, /you@example/i, 'john@example.com')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      expect(container.textContent).toContain('Could not send your message')
    })

    it('shows error state on non-ok response', async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 500 } as Response)

      const user = userEvent.setup()
      const { container } = renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John Doe')
      await fillField(user, /you@example/i, 'john@example.com')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      expect(container.textContent).toContain('Could not send your message')
    })

    it('resets form after successful submission via "send another"', async () => {
      const user = userEvent.setup()
      const { container } = renderWithI18n(<ContactForm />)

      await fillField(user, /your name/i, 'John Doe')
      await fillField(user, /you@example/i, 'john@example.com')
      await fillField(user, /what is this about/i, 'Hello')
      await fillField(user, /tell me about/i, 'Test')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(container.textContent).toContain('Send another message')
      })
      await user.click(screen.getByRole('button', { name: /send another message/i }))

      await waitFor(() => {
        expect(container.textContent).toContain('Send Message')
      })
    })
  })
})
