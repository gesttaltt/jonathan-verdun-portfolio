import { render, screen } from '@testing-library/react'
import { ContactForm } from '@/components/ContactForm'
import { I18nProvider } from '@/lib/i18n/context'

const renderWithI18n = (ui: React.ReactElement) => render(<I18nProvider>{ui}</I18nProvider>)

describe('ContactForm', () => {
  it('renders disabled state when Formspree is not configured', () => {
    renderWithI18n(<ContactForm />)
    expect(screen.getByText(/contact form is not configured/i)).toBeInTheDocument()
  })
})
