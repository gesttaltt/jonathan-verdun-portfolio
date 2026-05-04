'use client'

import React, { createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { Translations } from './types'
import { en } from './en'
import { es } from './es'

const I18nContext = createContext<Translations | null>(null)

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() ?? '/'
  const translations = pathname.startsWith('/es') ? es : en
  return <I18nContext.Provider value={translations}>{children}</I18nContext.Provider>
}

export const useTranslation = (): Translations => {
  const ctx = useContext(I18nContext)
  if (ctx === null) {
    console.warn('[useTranslation] called outside I18nProvider — falling back to English')
  }
  return ctx ?? en
}
