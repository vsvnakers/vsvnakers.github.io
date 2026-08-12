import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const [, , sourceArg, destinationArg] = process.argv

if (!sourceArg || !destinationArg) {
  console.error('Usage: node scripts/sync-papers.mjs <essay_read> <papers/daily>')
  process.exit(1)
}

const root = process.cwd()
const source = path.resolve(root, sourceArg)
const destination = path.resolve(root, destinationArg)
const expectedDestination = path.resolve(root, 'papers/daily')

if (destination !== expectedDestination) {
  throw new Error(`Refusing to write outside papers/daily: ${destination}`)
}

function yaml(value) {
  return JSON.stringify(String(value))
}

function match(content, pattern, fallback = '') {
  return content.match(pattern)?.[1]?.trim() || fallback
}

function escapeGeneratedAngles(content) {
  const htmlTags = new Set([
    'a', 'abbr', 'b', 'blockquote', 'br', 'code', 'details', 'div', 'em',
    'figure', 'figcaption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i',
    'img', 'kbd', 'li', 'ol', 'p', 'pre', 'section', 'small', 'span', 'strong',
    'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul'
  ])

  return content.replace(/<\/?([A-Za-z][\w-]*)(?:\s[^<>]*)?>/g, (tag, name) => {
    return htmlTags.has(name.toLowerCase())
      ? tag
      : tag.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  })
}

function repairGeneratedControlCharacters(content) {
  return content
    .replace(/\u0008/g, '\\b')
    .replace(/\u000c/g, '\\f')
    .replace(/[\u0000-\u0007\u000b\u000e-\u001f]/g, '')
}

function parsePaper(content, date, filename) {
  content = repairGeneratedControlCharacters(content)
  const arxivId = path.basename(filename, '.md')
  const title = match(content, /^#\s+(.+)$/m, arxivId)
  const description = match(content, /^>\s+(.+)$/m, 'DeepSeek 生成的中文论文解读')
  const domain = match(content, /\|\s*\*\*学科方向\*\*\s*\|\s*([^|]+)\|/, '综合')
  const level = match(content, /\|\s*\*\*适用层次\*\*\s*\|\s*([^|]+)\|/, '未标注')
  const tags = match(content, /\|\s*\*\*标签\*\*\s*\|\s*([^|]+)\|/)
    .split(/[,，]/)
    .map(tag => tag.trim())
    .filter(Boolean)
    .slice(0, 5)

  const normalized = escapeGeneratedAngles(content
    .replace(/^#\s+.+$/m, '')
    .replace(
      /\|\s*\*\*PDF\*\*\s*\|[^\n]*/,
      `| **PDF** | [在线阅读](https://arxiv.org/pdf/${arxivId}) |`
    )
    .trim())

  const frontmatter = [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    `date: ${yaml(date)}`,
    `arxivId: ${yaml(arxivId)}`,
    `domain: ${yaml(domain)}`,
    `level: ${yaml(level)}`,
    `tags: ${JSON.stringify(tags)}`,
    `originalUrl: ${yaml(`https://arxiv.org/abs/${arxivId}`)}`,
    `sourceUrl: ${yaml(`https://github.com/vsvnakers/paper-daily/blob/master/essay_read/${date}/${filename}`)}`,
    '---',
    '',
    `# ${title}`,
    '',
    '> 本文由 paper-daily 使用 DeepSeek 自动生成，仅供快速了解论文；关键结论请以原文为准。',
    '',
    `[论文原文](https://arxiv.org/abs/${arxivId}) · [PDF](https://arxiv.org/pdf/${arxivId}) · [源文件](https://github.com/vsvnakers/paper-daily/blob/master/essay_read/${date}/${filename})`,
    ''
  ].join('\n')

  return `${frontmatter}\n${normalized}\n`
}

await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })

const dates = (await readdir(source, { withFileTypes: true }))
  .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
  .map(entry => entry.name)
  .sort()

let total = 0

for (const date of dates) {
  const sourceDate = path.join(source, date)
  const files = (await readdir(sourceDate, { withFileTypes: true }))
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => entry.name)
    .sort()
    .slice(0, 3)

  if (!files.length) continue

  const destinationDate = path.join(destination, date)
  await mkdir(destinationDate, { recursive: true })

  for (const filename of files) {
    const content = await readFile(path.join(sourceDate, filename), 'utf8')
    await writeFile(
      path.join(destinationDate, filename),
      parsePaper(content, date, filename),
      'utf8'
    )
    total += 1
  }
}

console.log(`Synced ${total} paper digests from ${dates.length} daily directories.`)
