import { INTERACTIVE_COMMANDS } from '../contracts/TerminalContract'

export interface ICommandProcessor {
  process(cmd: string): string
}

export class DefaultCommandProcessor implements ICommandProcessor {
  private readonly commands: Record<string, string>
  private readonly helpCmd: string

  constructor(customCommands?: Record<string, string>, helpCmd?: string) {
    this.commands = customCommands ?? INTERACTIVE_COMMANDS
    this.helpCmd = helpCmd ?? 'help'
  }

  process(cmd: string): string {
    const lowerCmd = cmd.toLowerCase().trim()
    // Object.hasOwn guards against prototype keys like __proto__ being treated as commands.
    if (Object.hasOwn(this.commands, lowerCmd)) {
      return this.commands[lowerCmd]
    }
    return `bash: ${cmd}: command not found. Type '${this.helpCmd}' for available commands.`
  }
}
