import { createContentLoader } from 'vitepress'

export interface Paper {
  title: string
  description: string
  date: string
  arxivId: string
  domain: string
  level: string
  tags: string[]
  originalUrl: string
  url: string
}

declare const data: Paper[]
export { data }

export default createContentLoader('papers/daily/**/*.md', {
  transform(pages): Paper[] {
    return pages
      .map(page => ({
        title: page.frontmatter.title ?? page.frontmatter.arxivId,
        description: page.frontmatter.description ?? 'DeepSeek 中文论文解读',
        date: String(page.frontmatter.date ?? ''),
        arxivId: page.frontmatter.arxivId ?? '',
        domain: page.frontmatter.domain ?? '综合',
        level: page.frontmatter.level ?? '未标注',
        tags: page.frontmatter.tags ?? [],
        originalUrl: page.frontmatter.originalUrl ?? '',
        url: page.url
      }))
      .sort((a, b) => b.date.localeCompare(a.date) || a.arxivId.localeCompare(b.arxivId))
  }
})
