import Link from 'next/link'

import { Icon } from '@/components/icons'
import { practiceTopics, theoryTopics } from '@/lib/topics'

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-[0_8px_16px_-6px_rgb(79_70_229/0.6),inset_0_2px_0_rgb(255_255_255/0.3)]">
              <Icon name="graduation-cap" className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
              Chalista <span className="text-primary">Academy</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Platform belajar bahasa Inggris dengan materi teori yang runtut dan latihan soal untuk menguji
            pemahamanmu — bisa diakses kapan saja.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
            Theory
          </p>
          <ul className="mt-4 space-y-2.5">
            {theoryTopics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/theory/${topic.slug}`}
                  className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
            Practice
          </p>
          <ul className="mt-4 space-y-2.5">
            {practiceTopics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/practice/${topic.slug}`}
                  className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Chalista Academy. Belajar bahasa Inggris jadi lebih mudah.
        </div>
      </div>
    </footer>
  )
}
