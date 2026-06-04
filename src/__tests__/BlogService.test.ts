import fs from 'fs'
import { BlogService } from '@/lib/services/BlogService'

jest.mock('fs')

const mockedFs = fs as jest.Mocked<typeof fs>
const asReaddirResult = (entries: string[]) =>
  entries as unknown as ReturnType<typeof fs.readdirSync>

describe('BlogService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns empty list when content directory does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false)
    expect(BlogService.getAllPosts()).toEqual([])
  })

  it('returns sorted posts from valid mdx files only', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['old.mdx', 'notes.txt', 'new.mdx']))
    mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const file = String(filePath)
      if (file.endsWith('old.mdx')) {
        return `---\ntitle: Old\ndate: 2024-01-01\ntags: [qa]\ndescription: Old post\n---\nold content`
      }
      if (file.endsWith('new.mdx')) {
        return `---\ntitle: New\ndate: 2025-01-01\ntags: [automation, ci]\ndescription: New post\n---\nnew content`
      }
      return 'ignored'
    })

    const posts = BlogService.getAllPosts()
    expect(posts).toHaveLength(2)
    expect(posts[0]?.slug).toBe('new')
    expect(posts[1]?.slug).toBe('old')
    expect(posts[0]?.tags).toEqual(['automation', 'ci'])
  })

  it('filters out files with invalid frontmatter', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['invalid.mdx', 'valid.mdx']))
    mockedFs.readFileSync.mockImplementation((filePath: fs.PathOrFileDescriptor) => {
      const file = String(filePath)
      if (file.endsWith('invalid.mdx')) {
        return `---\ndescription: missing required fields\n---\ninvalid`
      }
      return `---\ntitle: Valid\ndate: 2025-01-01\n---\nvalid content`
    })

    const posts = BlogService.getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0]?.slug).toBe('valid')
  })

  it('returns empty list when no .mdx files exist in directory', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['notes.txt', 'readme.md']))
    expect(BlogService.getAllPosts()).toEqual([])
  })

  it('filters out files with no frontmatter delimiters at all', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['plain.mdx']))
    mockedFs.readFileSync.mockReturnValue('no frontmatter block here at all')
    expect(BlogService.getAllPosts()).toEqual([])
  })

  it('parses tags as string (no brackets) into empty array', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['post.mdx']))
    mockedFs.readFileSync.mockReturnValue(
      `---\ntitle: Post\ndate: 2026-01-01\ntags: qa\ndescription: Desc\n---\nbody`
    )
    const posts = BlogService.getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0]?.tags).toEqual([])
  })

  it('gracefully filters out files with malformed YAML frontmatter', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['post.mdx']))
    mockedFs.readFileSync.mockReturnValue(
      `---\ntitle: Post\ndate: 2026-01-01\ninvalid-no-colon-line\ndescription: Desc\n---\nbody`
    )
    // gray-matter/js-yaml throws on invalid YAML; file is silently skipped
    expect(BlogService.getAllPosts()).toHaveLength(0)
  })

  it('preserves apostrophes and special characters in metadata', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readdirSync.mockReturnValue(asReaddirResult(['post.mdx']))
    mockedFs.readFileSync.mockReturnValue(
      `---\ntitle: "It's Done"\ndate: 2026-01-01\ndescription: "Author's guide"\n---\nbody`
    )
    const posts = BlogService.getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0]?.title).toBe("It's Done")
    expect(posts[0]?.description).toBe("Author's guide")
  })

  describe('getPost — path traversal rejection', () => {
    it('returns null for slug containing .. without touching the filesystem', () => {
      expect(BlogService.getPost('../../../etc/passwd')).toBeNull()
      expect(mockedFs.existsSync).not.toHaveBeenCalled()
    })

    it('returns null for slug containing / without touching the filesystem', () => {
      expect(BlogService.getPost('../../secrets')).toBeNull()
      expect(mockedFs.existsSync).not.toHaveBeenCalled()
    })

    it('returns null for empty slug', () => {
      expect(BlogService.getPost('')).toBeNull()
      expect(mockedFs.existsSync).not.toHaveBeenCalled()
    })
  })

  it('returns null from getPost when file does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false)
    expect(BlogService.getPost('missing')).toBeNull()
  })

  it('returns null from getPost when frontmatter is invalid', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(`---\ndescription: no title/date\n---\nbody`)

    expect(BlogService.getPost('bad')).toBeNull()
  })

  it('returns post meta and strips frontmatter from content', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(
      `---\ntitle: Hello\ndate: 2026-05-01\ntags: [qa]\ndescription: Desc\n---\n# Body`
    )

    const post = BlogService.getPost('hello')
    expect(post).not.toBeNull()
    expect(post?.meta).toMatchObject({
      slug: 'hello',
      title: 'Hello',
      date: '2026-05-01',
      tags: ['qa'],
      description: 'Desc',
    })
    expect(post?.content).toBe('# Body')
  })
})
