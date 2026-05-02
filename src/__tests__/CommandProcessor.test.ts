import { DefaultCommandProcessor, ICommandProcessor } from '@/lib/services/CommandProcessor'

describe('DefaultCommandProcessor', () => {
  let processor: ICommandProcessor

  beforeEach(() => {
    processor = new DefaultCommandProcessor()
  })

  it('returns help text for the "help" command', () => {
    expect(processor.process('help')).toContain('Available commands')
  })

  it('is case-insensitive', () => {
    expect(processor.process('HELP')).toContain('Available commands')
  })

  it('trims leading and trailing whitespace', () => {
    expect(processor.process('  help  ')).toContain('Available commands')
  })

  it('returns a "command not found" message containing the unknown command name', () => {
    const result = processor.process('unknown_xyz')
    expect(result).toContain('command not found')
    expect(result).toContain('unknown_xyz')
  })

  it('handles multi-word commands like "ls projects"', () => {
    const result = processor.process('ls projects')
    expect(result).toContain('QA-Arxiv-Mobile')
    expect(result).toContain('3-Adic-ML')
  })

  it('returns correct responses for all built-in INTERACTIVE_COMMANDS', () => {
    expect(processor.process('about')).toContain('Jonathan Verdun')
    expect(processor.process('sudo')).toContain('sudoers')
    expect(processor.process('contact')).toContain('LinkedIn')
    expect(processor.process('projects')).toContain('Projects')
  })

  it('help output lists core commands', () => {
    const help = processor.process('help')
    expect(help).toContain('projects')
    expect(help).toContain('contact')
  })

  it('replaces all defaults when custom commands are injected via constructor', () => {
    const custom: Record<string, string> = { ping: 'pong' }
    const customProcessor = new DefaultCommandProcessor(custom)
    expect(customProcessor.process('ping')).toBe('pong')
    expect(customProcessor.process('help')).toContain('command not found')
  })
})
