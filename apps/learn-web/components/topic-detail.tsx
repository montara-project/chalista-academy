import Link from 'next/link'

import { Icon } from '@/components/icons'
import type { Topic } from '@/lib/topics'

export function TopicDetail({
  topic,
  siblings,
  basePath,
  sectionLabel,
}: {
  topic: Topic
  siblings: Topic[]
  basePath: string
  sectionLabel: string
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href={basePath}
        className="clay-chip inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary/80"
      >
        <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
        Kembali ke {sectionLabel}
      </Link>

      <div className="mt-8 flex flex-wrap items-start gap-5">
        <span className="clay-card flex h-16 w-16 items-center justify-center !rounded-2xl text-primary">
          <Icon name={topic.icon} className="h-8 w-8" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{sectionLabel}</p>
          <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[40px]">
            {topic.title}
          </h1>
        </div>
      </div>

      <p className="mt-6 text-lg leading-8 text-muted-foreground">{topic.description}</p>

      <section className="clay-card mt-10 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-card-foreground">
          <Icon name="layers" className="h-5 w-5 text-primary" />
          Apa saja yang akan dipelajari?
        </h2>
        <ol className="mt-5 space-y-3.5">
          {topic.outline.map((item, index) => (
            <li key={item} className="flex items-start gap-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background font-display text-xs font-extrabold text-primary shadow-[inset_0_2px_3px_rgb(30_27_75/0.08)]">
                {index + 1}
              </span>
              <span className="pt-0.5 text-sm leading-6 text-muted-foreground">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="clay-panel mt-6 flex items-start gap-3 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card text-accent">
          <Icon name="hammer" className="h-5 w-5" />
        </span>
        <p className="pt-1.5 text-sm leading-6 text-muted-foreground">
          Materi lengkap untuk topik ini sedang disusun dan akan segera tersedia. Sementara itu, kamu bisa
          menjelajahi topik lainnya di bawah.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold text-card-foreground">
          Topik lainnya di {sectionLabel}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {siblings
            .filter((sibling) => sibling.slug !== topic.slug)
            .map((sibling) => (
              <Link
                key={sibling.slug}
                href={`${basePath}/${sibling.slug}`}
                className="clay-chip clay-press inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <Icon name={sibling.icon} className="h-4 w-4 text-primary" />
                {sibling.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
