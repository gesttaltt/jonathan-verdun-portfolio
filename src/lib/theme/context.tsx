'use client'

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function subscribe() {
  return () => {}
}

// Default to dark regardless of system preference — matches the design's brand default.
function getSnapshot(): Theme {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
}

function getServerSnapshot(): Theme {
  return 'dark'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Reads localStorage via useSyncExternalStore rather than a useState
  // initializer + effect — the initial client render must match the
  // static-exported server render (no localStorage, always 'dark'), and this
  // is the React-sanctioned way to swap in the real value right after
  // without a hydration mismatch or a visible one-paint-late icon flash.
  const storedTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [override, setOverride] = useState<Theme | null>(null)
  const theme = override ?? storedTheme

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setOverride(newTheme)
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
