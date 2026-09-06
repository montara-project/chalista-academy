'use client'

import Link from 'next/link'

import { Icon } from '../common/icons'
import HeroLessonCard from './hero-lession'
import { heroChips } from './mock-data'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="clay-chip inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-primary">
            <Icon name="graduation-cap" className="h-4 w-4" />
            Platform belajar bahasa Inggris
          </span>

          <h1 className="mt-5 font-display text-[44px] font-extrabold leading-[52px] tracking-tight text-foreground sm:text-5xl sm:leading-[52px]">
            Kuasai bahasa Inggris, mulai dari{' '}
            <span className="relative inline-block text-accent">
              teori
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                className="absolute -bottom-1 left-0 w-full text-secondary"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9c30-6 84-6 114-3"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            sampai praktik.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Chalista Academy merangkum materi grammar — dari tenses, modal verbs, hingga gerund —
            dalam bahasa yang sederhana, lengkap dengan contoh dan latihan soal untuk menguji
            pemahamanmu.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/theory"
              className="clay-btn-primary clay-press inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground!"
            >
              <Icon name="sparkles" className="h-4 w-4" />
              Mulai Belajar
            </Link>
            <Link
              href="/practice"
              className="clay-btn-white clay-press inline-flex items-center gap-2 rounded-2xl bg-card px-6 py-3.5 text-sm font-bold text-foreground"
            >
              <Icon name="target" className="h-4 w-4 text-accent" />
              Coba Latihan
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {heroChips.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
              >
                <Icon name="check-circle" className="h-4 w-4 text-primary" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <HeroLessonCard />
      </div>
    </section>
  )
}
