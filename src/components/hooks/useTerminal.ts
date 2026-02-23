import { useState, useEffect, useCallback } from 'react'
import { ICommandProcessor } from '@/lib/services/CommandProcessor'

export interface CommandEntry {
  text: string
  output: string | React.ReactNode
  delay?: number
  isUser?: boolean
}

export const useTerminal = (
  initialCommands: readonly CommandEntry[] | CommandEntry[],
  processor: ICommandProcessor
) => {
  const [history, setHistory] = useState<CommandEntry[]>([])
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 0

    const boot = async () => {
      for (const cmd of initialCommands) {
        const delay = cmd.delay || 800
        currentDelay += delay
        const timeout = setTimeout(() => {
          setHistory((prev) => [...prev, { ...cmd, isUser: false }])
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
  }, [initialCommands])

  const execute = useCallback(
    (input: string) => {
      const cmd = input.trim()
      if (!cmd) return

      if (cmd.toLowerCase() === 'clear') {
        setHistory([])
        return
      }

      const newEntry: CommandEntry = {
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
