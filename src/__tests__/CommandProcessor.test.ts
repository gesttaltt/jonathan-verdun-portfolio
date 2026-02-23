import { DefaultCommandProcessor, ICommandProcessor } from '@/lib/services/CommandProcessor'

describe('DefaultCommandProcessor', () => {
  let processor: ICommandProcessor

  beforeEach(() => {
    processor = new DefaultCommandProcessor()
  })

  it('should return help text for the "help" command', () => {
    const result = processor.process('help')
    expect(result).toContain('Available commands')
  })

  it('should be case-insensitive', () => {
    const result = processor.process('HELP')
    expect(result).toContain('Available commands')
  })

  it('should trim whitespace from input', () => {
    const result = processor.process('  help  ')
    expect(result).toContain('Available commands')
  })

  it('should return "command not found" for unknown commands', () => {
    const result = processor.process('unknown_xyz')
    expect(result).toContain('command not found')
    expect(result).toContain('unknown_xyz')
  })

  it('should accept custom commands via constructor injection', () => {
    const custom: Record<string, string> = {
      ping: 'pong',
    }
    const customProcessor = new DefaultCommandProcessor(custom)
    expect(customProcessor.process('ping')).toBe('pong')
    expect(customProcessor.process('help')).toContain('command not found')
  })

  it('should implement the ICommandProcessor interface', () => {
    expect(typeof processor.process).toBe('function')
  })
})
