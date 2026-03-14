import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  excerpt: true,
  render: true,
  includeSrc: true,
})
