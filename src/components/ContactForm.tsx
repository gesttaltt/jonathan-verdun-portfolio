'use client'

import React, { useState, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
}

interface ValidationErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-xl border px-3 py-3 text-sm transition-all duration-200 outline-none ' +
  'bg-transparent border-white/10 text-text-primary placeholder:text-text-muted ' +
  'focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 ' +
  'light:border-border-subtle light:focus:border-blue-500/50 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed'

const labelBase = 'text-text-secondary text-xs font-bold tracking-wider uppercase'

const fieldErrorBase = 'text-red-400 light:text-red-600 text-[11px] font-medium mt-1'

export const ContactForm: React.FC = () => {
  const t = useTranslation()
  const ct = t.sections.contactForm

  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validate = useCallback((): boolean => {
    const next: ValidationErrors = {}
    if (!fields.name.trim()) next.name = ct.validationRequired
    if (!fields.email.trim()) {
      next.email = ct.validationRequired
    } else if (!EMAIL_RE.test(fields.email)) {
      next.email = ct.validationEmail
    }
    if (!fields.subject.trim()) next.subject = ct.validationRequired
    if (!fields.message.trim()) next.message = ct.validationRequired
    setErrors(next)
    return Object.keys(next).length === 0
  }, [fields, ct])

  const handleChange = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
    if (touched.has(field)) {
      // Re-validate on change for touched fields
      /* istanbul ignore next */
      setErrors((prev) => {
        const next = { ...prev }
        if (field === 'name' && value.trim()) delete next.name
        if (field === 'email' && EMAIL_RE.test(value.trim())) delete next.email
        if (field === 'subject' && value.trim()) delete next.subject
        if (field === 'message' && value.trim()) delete next.message
        return next
      })
    }
  }

  const handleBlur = (field: keyof FormFields) => {
    setTouched((prev) => new Set(prev).add(field))
    if (!fields[field].trim()) {
      setErrors((prev) => ({ ...prev, [field]: ct.validationRequired }))
    }
    if (field === 'email' && fields.email.trim() && !EMAIL_RE.test(fields.email)) {
      setErrors((prev) => ({ ...prev, email: ct.validationEmail }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formEndpoint) return
    if (!validate()) return

    setStatus('submitting')
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
      setTouched(new Set())
      setErrors({})
    } catch (err) {
      console.error('[ContactForm] submission failed:', err)
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrors({})
    setTouched(new Set())
  }

  const renderField = (
    field: keyof FormFields,
    label: string,
    placeholder: string,
    opts?: { type?: string; rows?: number }
  ) => {
    const isTextarea = opts?.rows !== undefined
    const Tag = isTextarea ? ('textarea' as const) : ('input' as const)
    return (
      <div className="space-y-1.5">
        <label htmlFor={`cf-${field}`} className={labelBase}>
          {label}
        </label>
        <Tag
          id={`cf-${field}`}
          name={field}
          type={opts?.type ?? 'text'}
          rows={opts?.rows}
          value={fields[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          placeholder={placeholder}
          disabled={status === 'submitting' || status === 'success' || !formEndpoint}
          aria-invalid={!!errors[field]}
          aria-describedby={errors[field] ? `cf-${field}-error` : undefined}
          className={`${inputBase} ${isTextarea ? 'min-h-[100px] resize-y' : ''}`}
        />
        <AnimatePresence mode="wait">
          {errors[field] && (
            <m.p
              key={`${field}-error`}
              id={`cf-${field}-error`}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={fieldErrorBase}
            >
              {errors[field]}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (!formEndpoint) {
    return (
      <div className="light:border-border-subtle rounded-xl border border-dashed border-white/10 p-4 text-center">
        <p className="text-text-muted text-xs font-medium">{ct.formDisabled}</p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <m.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3 py-4 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-text-primary text-base font-bold">{ct.successTitle}</p>
          <p className="text-text-tertiary text-sm">{ct.successMessage}</p>
          <button
            onClick={handleReset}
            className="text-text-muted hover:text-text-primary mt-2 text-xs font-medium underline transition-colors"
          >
            Send another message
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
          noValidate
          aria-label="Contact form"
        >
          {renderField('name', ct.nameLabel, ct.namePlaceholder)}
          {renderField('email', ct.emailLabel, ct.emailPlaceholder, { type: 'email' })}
          {renderField('subject', ct.subjectLabel, ct.subjectPlaceholder)}
          {renderField('message', ct.messageLabel, ct.messagePlaceholder, { rows: 4 })}

          {status === 'error' && (
            <m.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <p className="light:text-red-600 text-xs font-medium text-red-400">
                {ct.errorMessage}
              </p>
            </m.div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-label={status === 'submitting' ? ct.submittingLabel : ct.submitLabel}
            className="light:bg-zinc-950 light:hover:bg-black light:text-white focus-visible:ring-offset-background group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:scale-[1.05] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === 'submitting' ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>{ct.submittingLabel}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{ct.submitLabel}</span>
              </>
            )}
          </button>
        </m.form>
      )}
    </AnimatePresence>
  )
}
