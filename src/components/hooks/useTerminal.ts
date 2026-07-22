import { useState, useCallback, useRef } from 'react'
import { ICommandProcessor } from '@/lib/services/CommandProcessor'

export interface CommandEntry {
  id?: string
  text: string
  output: string
  isUser?: boolean
}

export const useTerminal = (
  initialCommands: readonly CommandEntry[] | CommandEntry[],
  processor: ICommandProcessor
) => {
  // Boot commands are seeded into history synchronously (not via a post-mount
  // effect + timers) so they're part of the very first render — including the
  // static-export HTML — instead of appearing only after client JS hydrates.
  // A prior version typed them in progressively; that made the hero terminal's
  // text the LCP element wait on client-side timers, adding seconds to LCP.
  const [history, setHistory] = useState<CommandEntry[]>(() =>
    initialCommands.map((cmd, index) => ({ ...cmd, id: String(index), isUser: false }))
  )
  const [currentPath, setCurrentPath] = useState('/')
  const idCounter = useRef(initialCommands.length)
  const nextId = () => String(idCounter.current++)

  // Command history for Up/Down navigation — refs to avoid triggering re-renders.
  const commandHistoryRef = useRef<string[]>([])
  const historyIndexRef = useRef(-1) // -1 = at the live prompt, ≥0 = browsing history
  const draftRef = useRef('') // input saved before first ArrowUp press

  // Returns the new input value after moving through history; caller owns setInputVal.
  const navigateHistory = useCallback((direction: 'up' | 'down', currentInput: string): string => {
    const hist = commandHistoryRef.current
    if (direction === 'up') {
      if (hist.length === 0) return currentInput
      // Save the live draft before the first navigation step.
      if (historyIndexRef.current === -1) draftRef.current = currentInput
      historyIndexRef.current = Math.min(historyIndexRef.current + 1, hist.length - 1)
      return hist[hist.length - 1 - historyIndexRef.current]!
    } else {
      if (historyIndexRef.current === -1) return currentInput
      historyIndexRef.current -= 1
      return historyIndexRef.current === -1
        ? draftRef.current
        : hist[hist.length - 1 - historyIndexRef.current]!
    }
  }, [])

  const execute = useCallback(
    (input: string) => {
      const cmd = input.trim()
      if (!cmd) return

      // Append to command history; skip consecutive duplicates (mirrors bash HISTCONTROL=ignoredups).
      const hist = commandHistoryRef.current
      if (hist[hist.length - 1] !== cmd) hist.push(cmd)
      // Reset navigation so the next ArrowUp starts from the freshest entry.
      historyIndexRef.current = -1
      draftRef.current = ''

      const response = processor.process(cmd)

      if (response.signal === 'clear') {
        setHistory([])
        return
      }

      if (response.signal === 'vfs_update' && processor.getCurrentPath) {
        setCurrentPath(processor.getCurrentPath())
      }

      /* istanbul ignore next */
      if (response.signal === 'redirect' && response.payload) {
        window.location.href = response.payload
      }

      const newEntry: CommandEntry = {
        id: nextId(),
        text: cmd,
        output: response.output,
        isUser: true,
      }

      setHistory((prev) => [...prev, newEntry])
    },
    [processor]
  )

  return { history, execute, navigateHistory, currentPath }
}
