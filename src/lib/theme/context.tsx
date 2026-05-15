'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      // Use queueMicrotask to avoid synchronous setState in effect body
      queueMicrotask(() => {
        setTheme(savedTheme)
        document.documentElement.classList.toggle('light', savedTheme === 'light')
      })
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      queueMicrotask(() => {
        setTheme('light')
        document.documentElement.classList.add('light')
      })
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
