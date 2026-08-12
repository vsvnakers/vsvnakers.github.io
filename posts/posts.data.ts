import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  description: string
  date: string
  tags: string[]
  url: string
  readingTime: number
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  transform(pages): Post[] {
    return pages
      .filter(page => !page.url.endsWith('/posts/'))
      .map(page => {
        const source = page.src ?? ''
        const rawDate = page.frontmatter.date
        const date = rawDate instanceof Date
          ? rawDate.toISOString().slice(0, 10)
          : String(rawDate ?? '1970-01-01')
        const words = source
          .replace(/^---[\s\S]*?---/, '')
          .replace(/```[\s\S]*?```/g, '')
          .replace(/<[^>]+>/g, '')
          .trim().length

        return {
          title: page.frontmatter.title ?? '未命名文章',
          description: page.frontmatter.description ?? '暂无摘要',
          date,
          tags: page.frontmatter.tags ?? [],
          url: page.url,
          readingTime: Math.max(1, Math.ceil(words / 500))
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }
})
