import { renderHook, act } from '@testing-library/react'
import { useTerminal } from '@/components/hooks/useTerminal'
import type { ICommandProcessor } from '@/lib/services/CommandProcessor'

const makeProcessor = (): ICommandProcessor => ({
  process: jest.fn((cmd: string) => {
    if (cmd === 'clear' || cmd === 'limpiar') {
      return { output: '', signal: 'clear' }
    }
    return { output: `echo: ${cmd}` }
  }),
})

describe('useTerminal', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('starts in booting state with empty history', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    expect(result.current.isBooting).toBe(true)
    expect(result.current.history).toHaveLength(0)
  })

  it('replays boot commands sequentially using accumulated delays', () => {
    const commands = [
      { text: 'whoami', output: 'gestalt', delay: 100 },
      { text: 'ls', output: 'file.txt', delay: 200 },
    ]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]!.text).toBe('whoami')

    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current.history).toHaveLength(2)
    expect(result.current.history[1]!.text).toBe('ls')
  })

  it('marks isBooting false 500ms after the last command fires', () => {
    const commands = [{ text: 'boot', output: 'ok', delay: 100 }]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(100 + 499)
    })
    expect(result.current.isBooting).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isBooting).toBe(false)
  })

  it('execute() appends a user entry with processor output', () => {
    const processor = makeProcessor()
    const { result } = renderHook(() => useTerminal([], processor))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })

    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]!.text).toBe('help')
    expect(result.current.history[0]!.isUser).toBe(true)
    expect(processor.process).toHaveBeenCalledWith('help')
  })

  it('execute("clear") resets history to empty', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })
    expect(result.current.history).toHaveLength(1)

    act(() => {
      result.current.execute('clear')
    })
    expect(result.current.history).toHaveLength(0)
  })

  it('execute("clear") does not reset the current path', () => {
    const processor = makeProcessor()
    ;(processor.process as jest.Mock).mockReturnValue({ output: 'ok', signal: 'vfs_update' })
    processor.getCurrentPath = jest.fn(() => '/docs')

    const { result } = renderHook(() => useTerminal([], processor))
    act(() => {
      jest.runAllTimers()
    })

    // First, change path
    act(() => {
      result.current.execute('cd docs')
    })
    expect(result.current.currentPath).toBe('/docs')

    // Now clear
    ;(processor.process as jest.Mock).mockReturnValue({ output: '', signal: 'clear' })
    act(() => {
      result.current.execute('clear')
    })

    expect(result.current.history).toHaveLength(0)
    expect(result.current.currentPath).toBe('/docs')
  })

  it('stops boot sequence and clears timeouts when execute("clear") is called during boot', () => {
    const commands = [
      { text: 'cmd1', output: 'out1', delay: 100 },
      { text: 'cmd2', output: 'out2', delay: 100 },
    ]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    // Advance to first command
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.isBooting).toBe(true)

    // Clear during boot
    act(() => {
      result.current.execute('clear')
    })
    expect(result.current.history).toHaveLength(0)
    expect(result.current.isBooting).toBe(false)

    // Advance time further — no more boot commands should appear
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current.history).toHaveLength(0)
  })

  it('execute("limpiar") also resets history (ES alias for clear)', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('help')
    })
    expect(result.current.history).toHaveLength(1)

    act(() => {
      result.current.execute('limpiar')
    })
    expect(result.current.history).toHaveLength(0)
  })

  it('execute() is a no-op for blank/whitespace input', () => {
    const processor = makeProcessor()
    const { result } = renderHook(() => useTerminal([], processor))

    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('   ')
    })

    expect(result.current.history).toHaveLength(0)
    expect(processor.process).not.toHaveBeenCalled()
  })

  it('uses the 800ms fallback when a command has no delay (undefined)', () => {
    // delay ?? 800: undefined triggers the fallback; 0 does not.
    const commands = [{ text: 'boot', output: 'ok' }]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(799)
    })
    expect(result.current.history).toHaveLength(0)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]!.text).toBe('boot')
  })

  it('fires immediately when a command has delay: 0', () => {
    // delay ?? 800: 0 is a valid delay — command fires at position 0ms in the sequence.
    const commands = [{ text: 'instant', output: 'ok', delay: 0 }]
    const { result } = renderHook(() => useTerminal(commands, makeProcessor()))

    act(() => {
      jest.advanceTimersByTime(0)
    })
    expect(result.current.history).toHaveLength(1)
    expect(result.current.history[0]!.text).toBe('instant')
  })

  it('clears all pending timeouts on unmount', () => {
    const spy = jest.spyOn(global, 'clearTimeout')
    const commands = [{ text: 'cmd', output: 'out', delay: 500 }]
    const { unmount } = renderHook(() => useTerminal(commands, makeProcessor()))

    unmount()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('updates currentPath on vfs_update signal', () => {
    const processor = makeProcessor()
    ;(processor.process as jest.Mock).mockReturnValue({ output: 'ok', signal: 'vfs_update' })
    processor.getCurrentPath = jest.fn(() => '/new-path')

    const { result } = renderHook(() => useTerminal([], processor))
    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('cd somewhere')
    })
    expect(result.current.currentPath).toBe('/new-path')
  })

  it('does not update currentPath if signal is vfs_update but getCurrentPath is missing', () => {
    const processor = makeProcessor()
    ;(processor.process as jest.Mock).mockReturnValue({ output: 'ok', signal: 'vfs_update' })
    // getCurrentPath is missing

    const { result } = renderHook(() => useTerminal([], processor))
    act(() => {
      jest.runAllTimers()
    })
    act(() => {
      result.current.execute('cd somewhere')
    })
    expect(result.current.currentPath).toBe('/')
  })
})

describe('useTerminal — command history navigation', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  const boot = () => act(() => jest.runAllTimers())

  it('navigateHistory up returns currentInput when history is empty', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    expect(result.current.navigateHistory('up', 'draft')).toBe('draft')
  })

  it('navigateHistory up returns the most recently executed command', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => result.current.execute('help'))
    expect(result.current.navigateHistory('up', '')).toBe('help')
  })

  it('navigateHistory up steps backward through history on successive calls', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => {
      result.current.execute('cmd1')
      result.current.execute('cmd2')
    })
    expect(result.current.navigateHistory('up', '')).toBe('cmd2')
    expect(result.current.navigateHistory('up', 'cmd2')).toBe('cmd1')
  })

  it('navigateHistory up clamps at the oldest entry', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => result.current.execute('only'))
    result.current.navigateHistory('up', '')
    expect(result.current.navigateHistory('up', 'only')).toBe('only')
  })

  it('navigateHistory down at index -1 returns currentInput unchanged', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    expect(result.current.navigateHistory('down', 'typing')).toBe('typing')
  })

  it('navigateHistory down from index > 0 returns the newer history entry', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => {
      result.current.execute('cmd1')
      result.current.execute('cmd2')
    })
    result.current.navigateHistory('up', '') // index 0 → cmd2
    result.current.navigateHistory('up', 'cmd2') // index 1 → cmd1
    expect(result.current.navigateHistory('down', 'cmd1')).toBe('cmd2') // index 0
  })

  it('navigateHistory down after up restores the saved draft', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => result.current.execute('help'))
    result.current.navigateHistory('up', 'my draft')
    expect(result.current.navigateHistory('down', 'help')).toBe('my draft')
  })

  it('execute resets navigation so next ArrowUp starts from the freshest entry', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => {
      result.current.execute('cmd1')
      result.current.execute('cmd2')
    })
    result.current.navigateHistory('up', '')
    result.current.navigateHistory('up', 'cmd2')
    act(() => result.current.execute('cmd3'))
    expect(result.current.navigateHistory('up', '')).toBe('cmd3')
  })

  it('skips consecutive duplicate commands in history', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => {
      result.current.execute('help')
      result.current.execute('help')
    })
    result.current.navigateHistory('up', '')
    expect(result.current.navigateHistory('up', 'help')).toBe('help')
  })

  it('clear is recorded in history so it can be recalled with ArrowUp', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => result.current.execute('clear'))
    expect(result.current.navigateHistory('up', '')).toBe('clear')
  })

  it('ArrowUp past the oldest command stays at oldest command (no wrap-around)', () => {
    const { result } = renderHook(() => useTerminal([], makeProcessor()))
    boot()
    act(() => {
      result.current.execute('first')
      result.current.execute('second')
    })
    // Navigate to newest
    result.current.navigateHistory('up', '')        // → 'second'
    // Navigate to oldest
    result.current.navigateHistory('up', 'second') // → 'first'
    // Press ArrowUp again — should clamp at 'first', not wrap
    const clamped = result.current.navigateHistory('up', 'first')
    expect(clamped).toBe('first')
  })
})
