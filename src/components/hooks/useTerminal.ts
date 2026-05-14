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
  const [currentPath, setCurrentPath] = useState('/')
  // Capture commands once at mount so the boot sequence never re-runs on re-renders.
  const initialRef = useRef(initialCommands)
  const idCounter = useRef(0)
  const nextId = () => String(idCounter.current++)
  const bootTimeoutsRef = useRef<NodeJS.Timeout[]>([])

  // Command history for Up/Down navigation — refs to avoid triggering re-renders.
  const commandHistoryRef = useRef<string[]>([])
  const historyIndexRef = useRef(-1) // -1 = at the live prompt, ≥0 = browsing history
  const draftRef = useRef('') // input saved before first ArrowUp press

  const stopBooting = useCallback(() => {
    bootTimeoutsRef.current.forEach(clearTimeout)
    bootTimeoutsRef.current = []
    setIsBooting(false)
  }, [])

  useEffect(() => {
    const commands = initialRef.current
    let currentDelay = 0

    const boot = () => {
      for (const cmd of commands) {
        const delay = cmd.delay ?? 800
        currentDelay += delay
        const id = nextId()
        const timeout = setTimeout(() => {
          setHistory((prev) => [...prev, { ...cmd, id, isUser: false }])
        }, currentDelay)
        bootTimeoutsRef.current.push(timeout)
      }

      const finishTimeout = setTimeout(() => {
        setIsBooting(false)
      }, currentDelay + 500)
      bootTimeoutsRef.current.push(finishTimeout)
    }

    boot()
    return () => {
      bootTimeoutsRef.current.forEach(clearTimeout)
      bootTimeoutsRef.current = []
    }
  }, [])

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
        stopBooting()
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
    [processor, stopBooting]
  )

  return { history, isBooting, execute, navigateHistory, currentPath }
}
