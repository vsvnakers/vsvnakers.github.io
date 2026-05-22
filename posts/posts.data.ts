import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string | undefined
  frontmatter: Record<string, any>
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  render: true,
  includeSrc: false,
  transform(rawData): Post[] {
    return rawData
      .filter(page => !page.url.endsWith('/posts/'))
      .map(page => ({
        title: page.frontmatter.title || 'Untitled',
        url: page.url,
        date: page.frontmatter.date || '',
        tags: page.frontmatter.tags || [],
        excerpt: page.excerpt,
        frontmatter: page.frontmatter
      }))
  }
})
