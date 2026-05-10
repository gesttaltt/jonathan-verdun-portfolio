export interface VFSNode {
  name: string
  type: 'file' | 'dir'
  content?: string
  children?: Record<string, VFSNode>
  permissions?: string
}

export class VirtualFileSystem {
  private root: VFSNode
  private currentPath: string[] = []

  constructor() {
    this.root = {
      name: '/',
      type: 'dir',
      children: {
        projects: {
          name: 'projects',
          type: 'dir',
          children: {},
          permissions: 'drwxr-xr-x',
        },
        research: {
          name: 'research',
          type: 'dir',
          children: {
            'p-adic-embeddings.md': {
              name: 'p-adic-embeddings.md',
              type: 'file',
              content:
                '# p-adic embeddings\nResearch into ultrametric spaces for DNA sequence analysis.',
              permissions: '-rw-r--r--',
            },
            'hyperbolic-vae.md': {
              name: 'hyperbolic-vae.md',
              type: 'file',
              content: '# Hyperbolic VAE\nDNA codon embedding in hyperbolic space via VAE.',
              permissions: '-rw-r--r--',
            },
          },
          permissions: 'drwxr-xr-x',
        },
        'README.md': {
          name: 'README.md',
          type: 'file',
          content: 'Jonathan Verdun Portfolio System. QA & Bioinformatics.',
          permissions: '-rw-r--r--',
        },
      },
      permissions: 'drwxr-xr-x',
    }
  }

  addProject(id: string, name: string) {
    if (this.root.children?.projects?.children) {
      this.root.children.projects.children[id] = {
        name: id,
        type: 'file',
        content: `Project details for ${name}. Status: QA-Ready.`,
        permissions: '-rw-r--r--',
      }
    }
  }

  getCurrentNode(): VFSNode {
    let node = this.root
    for (const part of this.currentPath) {
      if (node.children?.[part]) {
        node = node.children[part]
      }
    }
    return node
  }

  ls(path?: string): string {
    if (!path || path === '.') {
      const node = this.getCurrentNode()
      return this.formatNodeList(node)
    }

    // Temporary traversal for ls [path]
    let node = this.root
    const parts = path === '/' ? [] : path.split('/').filter(Boolean)
    for (const part of parts) {
      if (node.children?.[part]) {
        node = node.children[part]
      } else {
        return `ls: cannot access '${path}': No such file or directory`
      }
    }

    return this.formatNodeList(node)
  }

  private formatNodeList(node: VFSNode): string {
    if (!node.children) return ''
    return Object.values(node.children)
      .map((n) => {
        const perms = n.permissions || (n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--')
        return `${perms} 1 gestalt staff ${n.name}`
      })
      .join('\n')
  }

  cd(path: string): string | null {
    if (path === '..') {
      if (this.currentPath.length > 0) {
        this.currentPath.pop()
        return null
      }
      return 'Already at root'
    }

    if (path === '/') {
      this.currentPath = []
      return null
    }

    const node = this.getCurrentNode()
    if (node.children?.[path]) {
      if (node.children[path].type === 'dir') {
        this.currentPath.push(path)
        return null
      }
      return `cd: not a directory: ${path}`
    }
    return `cd: no such file or directory: ${path}`
  }

  cat(filename: string): string {
    const node = this.getCurrentNode()
    if (node.children?.[filename]) {
      if (node.children[filename].type === 'file') {
        return node.children[filename].content || ''
      }
      return `cat: ${filename}: Is a directory`
    }
    return `cat: ${filename}: No such file or directory`
  }

  pwd(): string {
    return '/' + this.currentPath.join('/')
  }
}
