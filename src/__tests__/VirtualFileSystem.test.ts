import * as fc from 'fast-check'
import { VirtualFileSystem } from '../lib/services/VirtualFileSystem'

describe('path traversal resilience', () => {
  it('cd("../../etc") from root does not escape root', () => {
    const vfs = new VirtualFileSystem()
    const result = vfs.cd('../../etc')
    // cd() only mutates currentPath on the null (success) branch, so a non-null
    // result guarantees pwd() is unchanged — assert both explicitly rather than
    // just the result's type, which would pass even if cd silently succeeded
    // into a bogus path.
    expect(result).toBe('cd: no such file or directory: ../../etc')
    expect(vfs.pwd()).toBe('/')
  })

  it('cd(".") is a no-op, not an error', () => {
    const vfs = new VirtualFileSystem()
    vfs.cd('docs')
    const result = vfs.cd('.')
    expect(result).toBeNull()
    expect(vfs.pwd()).toBe('/docs')
  })

  it('cd("/docs/../../../etc") does not escape root', () => {
    const vfs = new VirtualFileSystem()
    const result = vfs.cd('/docs/../../../etc')
    // The three '..'s pop back past root (each no-ops once tempPath is empty,
    // per cd()'s own guard) before 'etc' is checked against the real root
    // children, where it doesn't exist — assert the actual error and that pwd()
    // truly never left root, not just that *some* string came back.
    expect(result).toBe('cd: no such file or directory: /docs/../../../etc')
    expect(vfs.pwd()).toBe('/')
  })

  it('ls("../../etc") returns an error string, not crash', () => {
    const vfs = new VirtualFileSystem()
    expect(() => {
      const result = vfs.ls('../../etc')
      expect(typeof result).toBe('string')
    }).not.toThrow()
  })

  it('cat("../README.md") returns "No such file or directory" (no traversal)', () => {
    const vfs = new VirtualFileSystem()
    const result = vfs.cat('../README.md')
    expect(result).toContain('No such file or directory')
  })

  it('ls("   ") does not throw', () => {
    const vfs = new VirtualFileSystem()
    expect(() => vfs.ls('   ')).not.toThrow()
  })

  it('cd("   ") does not throw', () => {
    const vfs = new VirtualFileSystem()
    expect(() => vfs.cd('   ')).not.toThrow()
  })
})

describe('ls() cwd-relative resolution (regression)', () => {
  // ls() used to always traverse from root regardless of currentPath,
  // unlike cd()/cat() — so a relative `ls <path>` typed after `cd`-ing into a
  // subdirectory silently resolved against root instead of cwd.
  it('resolves a relative path against cwd, not root', () => {
    const vfs = new VirtualFileSystem({
      name: '/',
      type: 'dir',
      children: {
        docs: {
          name: 'docs',
          type: 'dir',
          children: {
            specs: {
              name: 'specs',
              type: 'dir',
              children: {
                'a.md': { name: 'a.md', type: 'file', content: 'A' },
              },
            },
          },
        },
      },
    })
    vfs.cd('docs')
    expect(vfs.ls('specs')).toContain('a.md')
  })

  it('resolves an absolute path from root, ignoring a non-root cwd', () => {
    // tempPath must start empty for an absolute path even when currentPath is
    // non-root — the leading '/' must always win over cwd, not be appended
    // to it (which would look for the nonexistent '/docs/projects').
    const atRoot = new VirtualFileSystem()
    const referenceListing = atRoot.ls('projects')

    const vfs = new VirtualFileSystem()
    vfs.cd('docs')
    expect(vfs.pwd()).toBe('/docs')
    expect(vfs.ls('/projects')).toBe(referenceListing)
  })

  it('ls("..") from a subdirectory lists the parent directory', () => {
    const vfs = new VirtualFileSystem()
    vfs.cd('docs')
    expect(vfs.ls('..')).toContain('README.md')
  })

  it('ignores "." path segments mid-path, matching cd()', () => {
    const vfs = new VirtualFileSystem()
    // './docs' from root and 'docs' from root must resolve identically.
    expect(vfs.ls('./docs')).toBe(vfs.ls('docs'))
  })

  it('does not leak a same-named root-level file into a subdirectory listing', () => {
    const vfs = new VirtualFileSystem()
    vfs.cd('docs')
    // Root has README.md; /docs does not — resolving against root instead of
    // cwd would incorrectly find and print root's copy.
    expect(vfs.ls('README.md')).toBe("ls: cannot access 'README.md': No such file or directory")
  })
})

describe('VirtualFileSystem', () => {
  it('initializes with default root if none provided', () => {
    const vfs = new VirtualFileSystem()
    expect(vfs.pwd()).toBe('/')
    expect(vfs.ls()).toContain('README.md')
  })

  it('initializes with custom root if provided', () => {
    const vfs = new VirtualFileSystem({
      name: '/',
      type: 'dir',
      children: {
        'test.txt': { name: 'test.txt', type: 'file', content: 'hello' },
      },
    })
    expect(vfs.ls()).toContain('test.txt')
    expect(vfs.ls()).not.toContain('README.md')
  })

  it('handles ".." at root in nested path', () => {
    const vfs = new VirtualFileSystem()
    vfs.cd('../../')
    expect(vfs.pwd()).toBe('/')
  })

  it('handles absolute nested path to file (error)', () => {
    const vfs = new VirtualFileSystem()
    const error = vfs.cd('/README.md/nested')
    expect(error).toContain('no such file or directory')
  })

  it('handles complex nested path with ".." correctly', () => {
    const vfs = new VirtualFileSystem()
    // Move to a subdirectory
    vfs.cd('docs')
    expect(vfs.pwd()).toBe('/docs')

    // Navigate back and forth
    const error = vfs.cd('specs/../../projects')
    expect(error).toBeNull()
    expect(vfs.pwd()).toBe('/projects')
  })
})

// ─── property-based fuzzing ───────────────────────────────────────────────────

describe('VirtualFileSystem — property-based path fuzzing', () => {
  it('ls never throws and always returns a string for any path input', () => {
    fc.assert(
      fc.property(fc.string(), (path) => {
        const vfs = new VirtualFileSystem()
        expect(() => vfs.ls(path)).not.toThrow()
        expect(typeof vfs.ls(path)).toBe('string')
      })
    )
  })

  it('cd never throws for any path input', () => {
    fc.assert(
      fc.property(fc.string(), (path) => {
        const vfs = new VirtualFileSystem()
        expect(() => vfs.cd(path)).not.toThrow()
      })
    )
  })

  it('cat never throws and always returns a string for any filename', () => {
    fc.assert(
      fc.property(fc.string(), (filename) => {
        const vfs = new VirtualFileSystem()
        expect(() => vfs.cat(filename)).not.toThrow()
        expect(typeof vfs.cat(filename)).toBe('string')
      })
    )
  })

  it('pwd always returns a string starting with / after any sequence of cd calls', () => {
    fc.assert(
      fc.property(fc.array(fc.string(), { maxLength: 6 }), (paths) => {
        const vfs = new VirtualFileSystem()
        for (const p of paths) {
          vfs.cd(p)
        }
        expect(vfs.pwd()).toMatch(/^\//)
      })
    )
  })

  it('prototype-key paths are rejected, not silently traversed', () => {
    const poisonPaths = ['__proto__', 'constructor', 'hasOwnProperty', 'toString', 'valueOf']
    fc.assert(
      fc.property(fc.constantFrom(...poisonPaths), (key) => {
        const vfs = new VirtualFileSystem()
        // ls must return an error string, not an empty string from a silent traversal
        expect(vfs.ls(key)).toContain('cannot access')
        // cat must return the not-found error, not empty content via Object.prototype
        expect(vfs.cat(key)).toContain('No such file or directory')
      })
    )
  })
})
