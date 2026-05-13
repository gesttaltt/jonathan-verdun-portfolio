import { VirtualFileSystem } from '../lib/services/VirtualFileSystem'

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
})
