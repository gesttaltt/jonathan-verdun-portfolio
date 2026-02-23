import { INTERACTIVE_COMMANDS } from '../contracts/TerminalContract'

export interface ICommandProcessor {
  process(cmd: string): string
}

export class DefaultCommandProcessor implements ICommandProcessor {
  private readonly commands: Record<string, string>

  constructor(customCommands?: Record<string, string>) {
    this.commands = customCommands || INTERACTIVE_COMMANDS
  }

  process(cmd: string): string {
    const lowerCmd = cmd.toLowerCase().trim()
    if (this.commands[lowerCmd]) {
      return this.commands[lowerCmd]
    }
    return `bash: ${cmd}: command not found. Type 'help' for available commands.`
  }
}
