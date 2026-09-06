'use client'

import Link from 'next/link'

import { practiceTopics } from '@/data/topics'

import { Icon } from '../common/icons'

export default function PracticeSection() {
  return (
    <section className="border-y-2 border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Practice</p>
            <h2 className="mt-2 font-display text-[32px] font-extrabold leading-[38px] tracking-tight text-foreground">
              Latihan langsung setelah belajar
            </h2>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">
              Teori saja tidak cukup. Asah kemampuanmu dengan dua kategori latihan berikut.
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary/80"
          >
            Lihat semua latihan
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {practiceTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/practice/${topic.slug}`}
              className="clay-card clay-press group p-8 hover:border-primary/60"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      index === 0 ? 'bg-secondary/50 text-accent' : 'bg-muted text-primary'
                    }`}
                  >
                    <Icon name={topic.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-card-foreground transition-colors duration-200 group-hover:text-primary">
                    {topic.title}
                  </h3>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-muted-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name="arrow-right" className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 leading-7 text-muted-foreground">{topic.short}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {topic.outline.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
