'use client'

import { theoryTopics } from '@/data/topics'

import { TopicCard } from '../common/topic-card'

export default function TheoryContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Theory</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground">
          Materi teori grammar
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Pilih topik yang ingin kamu pelajari. Setiap topik dijelaskan step by step dengan pola,
          contoh kalimat, dan poin-poin penting.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {theoryTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} href={`/theory/${topic.slug}`} />
        ))}
      </div>
    </div>
  )
}
