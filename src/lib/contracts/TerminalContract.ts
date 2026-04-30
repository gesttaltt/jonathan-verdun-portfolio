export const LS_PROJECTS_OUTPUT =
  'drwx------ 1 gestalt staff  QA-Arxiv-Mobile\n-rw-r--r-- 1 gestalt staff  Functionome-Atlas\n-rwxr-xr-x 1 gestalt staff  Gene-Functional-Pipeline'

export const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, about, projects, research, contact, clear',
  about:
    'Jonathan Verdun. QA Automation Engineer and Bioinformatics Researcher. Specializing in TDD, test automation, and computational biology.',
  projects: 'Check out the Projects section below, or type "ls projects" to see a list.',
  contact: 'Reach out via LinkedIn or GitHub linked above.',
  'ls projects': LS_PROJECTS_OUTPUT,
  research:
    'Bioinformatics Research section below — HIV antigen AI (p-adic) and Codon Encoder API (Hyperbolic VAE).',
  sudo: 'User is not in the sudoers file. This incident will be reported.',
}

export interface BootCommand {
  text: string
  output: string
  delay?: number
}

export const BOOT_COMMANDS: readonly BootCommand[] = [
  {
    text: 'whoami',
    output: 'jonathan.verdun — QA Automation · Bioinformatics Research',
    delay: 500,
  },
  {
    text: 'ls projects',
    output: LS_PROJECTS_OUTPUT,
    delay: 700,
  },
  {
    text: 'help',
    output: INTERACTIVE_COMMANDS.help,
    delay: 600,
  },
]
