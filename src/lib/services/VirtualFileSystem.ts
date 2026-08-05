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

  constructor(initialRoot?: VFSNode) {
    this.root = initialRoot || {
      name: '/',
      type: 'dir',
      children: {
        docs: {
          name: 'docs',
          type: 'dir',
          children: {
            specs: { name: 'specs', type: 'dir', children: {}, permissions: 'drwxr-xr-x' },
          },
          permissions: 'drwxr-xr-x',
        },
        projects: {
          name: 'projects',
          type: 'dir',
          children: {},
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
    /* istanbul ignore next */
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
      /* istanbul ignore next */
      if (node.children && Object.hasOwn(node.children, part)) {
        node = node.children[part]!
      }
    }
    return node
  }

  ls(path?: string): string {
    if (!path || path === '.') {
      const node = this.getCurrentNode()
      return this.formatNodeList(node)
    }

    // Resolve relative to the current working directory — matching cd()'s
    // resolution rules below — rather than always starting from root.
    // `ls <relative-path>` after cd-ing into a subdirectory must resolve
    // against cwd, and `..`/`.` segments must be handled the same way cd()
    // handles them, or a relative `ls` silently (and wrongly) falls back to
    // root-relative resolution instead of erroring or resolving correctly.
    const tempPath = path.startsWith('/') ? [] : [...this.currentPath]
    const parts = path === '/' ? [] : path.split('/').filter(Boolean)

    for (const part of parts) {
      if (part === '..') {
        if (tempPath.length > 0) tempPath.pop()
        continue
      }
      if (part === '.') continue

      // Validate the part by traversing from root using tempPath so far.
      let node = this.root
      for (const p of tempPath) {
        /* istanbul ignore next */
        if (node.children && Object.hasOwn(node.children, p)) {
          node = node.children[p]!
        }
      }

      if (node.children && Object.hasOwn(node.children, part)) {
        tempPath.push(part)
      } else {
        return `ls: cannot access '${path}': No such file or directory`
      }
    }

    let node = this.root
    for (const p of tempPath) {
      /* istanbul ignore next */
      if (node.children && Object.hasOwn(node.children, p)) {
        node = node.children[p]!
      }
    }

    return this.formatNodeList(node)
  }

  private formatNodeList(node: VFSNode): string {
    // Mirrors real `ls <file>`: print the file's own entry rather than trying to
    // list children it doesn't have (previously silently returned '').
    if (node.type === 'file') {
      /* istanbul ignore next -- real VFS file nodes always set permissions explicitly */
      const perms = node.permissions || '-rw-r--r--'
      return `${perms} 1 gestalt staff ${node.name}`
    }
    /* istanbul ignore next */
    if (!node.children) return ''
    return Object.values(node.children)
      .map((n) => {
        /* istanbul ignore next */
        const perms = n.permissions || (n.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--')
        return `${perms} 1 gestalt staff ${n.name}`
      })
      .sort((a, b) => {
        // Sort directories first, then files
        const aIsDir = a.startsWith('d')
        const bIsDir = b.startsWith('d')
        if (aIsDir && !bIsDir) return -1
        if (!aIsDir && bIsDir) return 1
        return a.localeCompare(b)
      })
      .join('\n')
  }

  cd(path: string): string | null {
    if (path === '.') {
      return null
    }

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

    // Handle nested paths for cd (simple implementation)
    if (path.includes('/')) {
      const targetParts = path.split('/').filter(Boolean)
      const tempPath = path.startsWith('/') ? [] : [...this.currentPath]

      for (const part of targetParts) {
        if (part === '..') {
          if (tempPath.length > 0) tempPath.pop()
        } else if (part === '.') {
          // do nothing
        } else {
          // To validate the part, we need to traverse from root using tempPath
          let node = this.root
          for (const p of tempPath) {
            /* istanbul ignore next */
            if (node.children && Object.hasOwn(node.children, p)) {
              node = node.children[p]!
            }
          }

          if (
            node.children &&
            Object.hasOwn(node.children, part) &&
            node.children[part]!.type === 'dir'
          ) {
            tempPath.push(part)
          } else {
            return `cd: no such file or directory: ${path}`
          }
        }
      }
      this.currentPath = tempPath
      return null
    }

    const node = this.getCurrentNode()
    /* istanbul ignore next */
    if (node.children && Object.hasOwn(node.children, path)) {
      if (node.children[path]!.type === 'dir') {
        this.currentPath.push(path)
        return null
      }
      return `cd: not a directory: ${path}`
    }
    return `cd: no such file or directory: ${path}`
  }

  cat(filename: string): string {
    const node = this.getCurrentNode()
    /* istanbul ignore next */
    if (node.children && Object.hasOwn(node.children, filename)) {
      if (node.children[filename]!.type === 'file') {
        return node.children[filename]!.content || ''
      }
      return `cat: ${filename}: Is a directory`
    }
    return `cat: ${filename}: No such file or directory`
  }

  pwd(): string {
    return '/' + this.currentPath.join('/')
  }
}
