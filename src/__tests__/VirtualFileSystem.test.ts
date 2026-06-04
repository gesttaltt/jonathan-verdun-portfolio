import { VirtualFileSystem } from '../lib/services/VirtualFileSystem'

describe('path traversal resilience', () => {
  it('cd("../../etc") from root does not escape root', () => {
    const vfs = new VirtualFileSystem()
    const result = vfs.cd('../../etc')
    // Either returns an error or stays at root — must not escape to a path above '/'
    if (result !== null) {
      expect(typeof result).toBe('string')
    } else {
      expect(vfs.pwd()).toBe('/')
    }
  })

  it('cd("/docs/../../../etc") does not escape root', () => {
    const vfs = new VirtualFileSystem()
    const result = vfs.cd('/docs/../../../etc')
    // Should return an error (etc doesn't exist) or stay within root
    if (result !== null) {
      expect(typeof result).toBe('string')
    } else {
      expect(vfs.pwd()).not.toContain('../')
      expect(vfs.pwd().startsWith('/')).toBe(true)
    }
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
