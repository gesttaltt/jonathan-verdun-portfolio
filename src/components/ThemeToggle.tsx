'use client'

import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme/context'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (!mounted) return <div data-testid="theme-toggle-placeholder" className="h-9 w-9" />

  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      className="focus-visible:ring-offset-background group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <m.div
            key="sun"
            data-testid="theme-toggle-sun"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2, ease: 'circOut' }}
          >
            <Sun className="h-5 w-5" />
          </m.div>
        ) : (
          <m.div
            key="moon"
            data-testid="theme-toggle-moon"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2, ease: 'circOut' }}
          >
            <Moon className="h-5 w-5" />
          </m.div>
        )}
      </AnimatePresence>
    </button>
  )
}
