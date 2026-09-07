'use client'

import Link from 'next/link'

import { Icon } from '../common/icons'

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#6b5540] via-primary to-[#8a7357] px-6 py-14 text-center shadow-[0_24px_48px_-24px_rgb(95_76_57/0.55),inset_0_2px_0_rgb(255_255_255/0.25)] sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-[32px] font-extrabold leading-[38px] tracking-tight text-white sm:text-4xl">
            Siap meningkatkan kemampuan bahasa Inggrismu?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-primary-foreground/85">
            Mulai dari satu topik hari ini. Sedikit demi sedikit, rutin lebih baik daripada sekali
            duduk menghafal semuanya.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/theory"
              className="clay-btn-white clay-press inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-primary"
            >
              <Icon name="book-open" className="h-4 w-4" />
              Mulai dari Teori
            </Link>
            <Link
              href="/practice"
              className="clay-press inline-flex items-center gap-2 rounded-2xl border-2 border-white/50 px-6 py-3.5 text-sm font-bold text-white! transition-colors duration-200 hover:bg-white/10"
            >
              <Icon name="target" className="h-4 w-4" />
              Lihat Latihan
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
