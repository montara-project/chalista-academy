import type { Metadata } from 'next'

import TheoryContent from '@/components/block/theory/content'

export const metadata: Metadata = {
  title: 'Theory',
  description:
    'Kumpulan materi teori grammar bahasa Inggris: tenses, modal & auxiliary verbs, SEOM, ADA (articles, determiners, adjective), comparative degree, dan gerund.',
}

export default function TheoryPage() {
  return <TheoryContent />
}
