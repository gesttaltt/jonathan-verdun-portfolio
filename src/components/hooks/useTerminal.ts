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

  const execute = useCallback(
    (input: string) => {
      const cmd = input.trim()
      if (!cmd) return

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

  return { history, isBooting, execute }
}
