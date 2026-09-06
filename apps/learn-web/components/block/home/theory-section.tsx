'use client'
import Link from 'next/link'

import { theoryTopics } from '@/data/topics'

import { Icon } from '../common/icons'
import { TopicCard } from '../common/topic-card'

export default function TheorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Theory</p>
          <h2 className="mt-2 font-display text-[32px] font-extrabold leading-[38px] tracking-tight text-foreground">
            Materi teori yang dirancang runtut
          </h2>
          <p className="mt-3 text-lg leading-8 text-muted-foreground">
            Pilih topik yang ingin kamu kuasai. Setiap topik dijelaskan step by step dengan pola,
            contoh kalimat, dan poin-poin penting.
          </p>
        </div>
        <Link
          href="/theory"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary/80"
        >
          Lihat semua teori
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {theoryTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} href={`/theory/${topic.slug}`} />
        ))}
      </div>
    </section>
  )
}
