'use client'

import { practiceTopics } from '@/data/topics'

import { TopicCard } from '../common/topic-card'

export default function PracticeContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Practice</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground">
          Latihan soal bahasa Inggris
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Teori saja tidak cukup — asah kemampuanmu dengan latihan berikut. Kerjakan setelah membaca
          materi supaya hasilnya maksimal.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {practiceTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} href={`/practice/${topic.slug}`} />
        ))}
      </div>
    </div>
  )
}
