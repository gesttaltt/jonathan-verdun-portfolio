import { useState, useEffect, useCallback, useRef } from 'react'
import { ICommandProcessor } from '@/lib/services/CommandProcessor'

export interface CommandEntry {
  id?: string
  text: string
  output: string
  delay?: number
  isUser?: boolean
}

export const useTerminal = (
  initialCommands: readonly CommandEntry[] | CommandEntry[],
  processor: ICommandProcessor
) => {
  const [history, setHistory] = useState<CommandEntry[]>([])
  const [isBooting, setIsBooting] = useState(true)
  // Capture commands once at mount so the boot sequence never re-runs on re-renders.
  const initialRef = useRef(initialCommands)
  const idCounter = useRef(0)
  const nextId = () => String(idCounter.current++)

  // Command history for Up/Down navigation — refs to avoid triggering re-renders.
  const commandHistoryRef = useRef<string[]>([])
  const historyIndexRef = useRef(-1) // -1 = at the live prompt, ≥0 = browsing history
  const draftRef = useRef('') // input saved before first ArrowUp press

  useEffect(() => {
    const commands = initialRef.current
    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 0

    const boot = () => {
      for (const cmd of commands) {
        const delay = cmd.delay ?? 800
        currentDelay += delay
        const id = nextId()
        const timeout = setTimeout(() => {
          setHistory((prev) => [...prev, { ...cmd, id, isUser: false }])
        }, currentDelay)
        timeouts.push(timeout)
      }

      const finishTimeout = setTimeout(() => {
        setIsBooting(false)
      }, currentDelay + 500)
      timeouts.push(finishTimeout)
    }

    boot()
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Returns the new input value after moving through history; caller owns setInputVal.
  const navigateHistory = useCallback((direction: 'up' | 'down', currentInput: string): string => {
    const hist = commandHistoryRef.current
    if (direction === 'up') {
      if (hist.length === 0) return currentInput
      // Save the live draft before the first navigation step.
      if (historyIndexRef.current === -1) draftRef.current = currentInput
      historyIndexRef.current = Math.min(historyIndexRef.current + 1, hist.length - 1)
      return hist[hist.length - 1 - historyIndexRef.current]
    } else {
      if (historyIndexRef.current === -1) return currentInput
      historyIndexRef.current -= 1
      return historyIndexRef.current === -1
        ? draftRef.current
        : hist[hist.length - 1 - historyIndexRef.current]
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

      if (['clear', 'limpiar'].includes(cmd.toLowerCase())) {
        setHistory([])
        return
      }

      const newEntry: CommandEntry = {
        id: nextId(),
        text: cmd,
        output: processor.process(cmd),
        isUser: true,
      }

      setHistory((prev) => [...prev, newEntry])
    },
    [processor]
  )

  return { history, isBooting, execute, navigateHistory }
}
