export const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, about, projects, contact, clear',
  about:
    'Jonathan Verdun. QA Automation Engineer and Bioinformatics Researcher. Specializing in TDD, resilient systems, and deep learning.',
  projects: 'Check out the Projects section above, or type "ls projects" to see a list.',
  contact: 'Reach out via LinkedIn or GitHub linked above.',
  'ls projects':
    'drwx------ 1 gestalt staff  QA-Arxiv-Mobile\n-rw-r--r-- 1 gestalt staff  Functionome-Atlas\n-rwxr-xr-x 1 gestalt staff  Gene-Functional-Pipeline',
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
    output:
      'drwx------ 1 gestalt staff  QA-Arxiv-Mobile\n-rw-r--r-- 1 gestalt staff  Functionome-Atlas\n-rwxr-xr-x 1 gestalt staff  Gene-Functional-Pipeline',
    delay: 700,
  },
  {
    text: 'help',
    output: 'Available commands: help, about, projects, contact, clear',
    delay: 600,
  },
]
