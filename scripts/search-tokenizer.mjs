const HAN = /\p{Script=Han}/u
const PARTS = /[\p{Script=Han}]+|[a-z\d][a-z\d+#._-]*/giu
const ZH_SEGMENTER = new Intl.Segmenter('zh-CN', { granularity: 'word' })

export function tokenizeSearchText(text) {
  return (text.normalize('NFKC').toLowerCase().match(PARTS) ?? []).flatMap((part) => {
    if (!HAN.test(part)) return [part]

    return [...ZH_SEGMENTER.segment(part)].flatMap(({ segment, isWordLike }) => {
      if (!isWordLike || segment.length < 3) return isWordLike ? [segment] : []
      return [segment, ...Array.from({ length: segment.length - 1 }, (_, index) => segment.slice(index, index + 2))]
    })
  })
}

if (process.argv[1]?.endsWith('search-tokenizer.mjs')) {
  const actual = tokenizeSearchText('现代 GPU/CUDA 编程与操作系统')
  const expected = ['现代', 'gpu', 'cuda', '编', '程', '与', '操作', '系统']
  if (actual.join('|') !== expected.join('|')) throw new Error(`Unexpected tokens: ${actual}`)
  console.log('Search tokenizer check passed.')
}
