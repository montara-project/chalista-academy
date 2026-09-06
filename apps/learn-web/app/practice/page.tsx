import type { Metadata } from 'next'

import PracticeContent from '@/components/block/practice/content'

export const metadata: Metadata = {
  title: 'Practice',
  description:
    'Kumpulan latihan bahasa Inggris: membentuk pertanyaan (questions) dan kalimat pernyataan (statements) yang benar.',
}

export default function PracticePage() {
  return <PracticeContent />
}
