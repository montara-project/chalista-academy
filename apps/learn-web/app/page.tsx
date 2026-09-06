import Link from 'next/link'

import { Icon } from '@/components/icons'
import { TopicCard } from '@/components/topic-card'
import { practiceTopics, theoryTopics } from '@/lib/topics'

const stats = [
  { icon: 'book-open', value: '6', label: 'Topik teori grammar' },
  { icon: 'target', value: '2', label: 'Kategori latihan' },
  { icon: 'hourglass', value: '16', label: 'Bentuk tenses dibahas' },
  { icon: 'layers', value: '30+', label: 'Poin materi & latihan' },
] as const

const features = [
  {
    icon: 'book-open',
    tint: 'bg-indigo-100/70 text-primary',
    title: 'Teori yang runtut',
    desc: 'Setiap topik dipecah menjadi materi ringkas berurutan, jadi kamu tahu harus mulai dari mana dan melangkah ke mana.',
  },
  {
    icon: 'pen-line',
    tint: 'bg-orange-100/80 text-accent',
    title: 'Banyak contoh nyata',
    desc: 'Setiap aturan disertai contoh kalimat yang sering dipakai sehari-hari — bukan cuma rumus yang menggantung.',
  },
  {
    icon: 'target',
    tint: 'bg-violet-100/80 text-violet-600',
    title: 'Langsung praktik',
    desc: 'Uji pemahamanmu lewat latihan pertanyaan dan pernyataan setelah membaca teori, supaya materi benar-benar nempel.',
  },
  {
    icon: 'clock',
    tint: 'bg-emerald-100/80 text-emerald-600',
    title: 'Akses kapan saja',
    desc: 'Belajar menurut tempomu sendiri — buka kapan pun, dari perangkat apa pun, tanpa perlu mendaftar.',
  },
] as const

const heroChips = ['Tanpa perlu mendaftar', 'Contoh kalimat lengkap', 'Latihan interaktif']

function HeroLessonCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="clay-chip absolute -left-4 -top-5 z-10 flex rotate-[-6deg] items-center gap-1.5 px-4 py-2 text-xs font-bold text-primary">
        <Icon name="hourglass" className="h-3.5 w-3.5" />
        Tenses
      </div>
      <div className="clay-chip absolute -right-3 bottom-16 z-10 flex rotate-[5deg] items-center gap-1.5 px-4 py-2 text-xs font-bold text-accent">
        <Icon name="puzzle" className="h-3.5 w-3.5" />
        Modal Verbs
      </div>

      <div className="clay-card relative p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs font-bold text-primary">
            <Icon name="book-open" className="h-3.5 w-3.5" />
            Materi hari ini
          </span>
          <span className="text-xs font-medium text-muted-foreground">Grammar</span>
        </div>

        <h3 className="mt-4 font-display text-[22px] font-extrabold text-card-foreground">
          Simple Present Tense
        </h3>

        <div className="clay-panel mt-3 px-4 py-3 font-mono text-sm font-medium text-primary">
          S + V1(-s/es) + O
        </div>

        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>
              She <b className="text-card-foreground">works</b> every day.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>
              They <b className="text-card-foreground">study</b> English.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="x" className="h-4 w-4 shrink-0 text-destructive" />
            <span className="text-muted-foreground/60 line-through">She work every day.</span>
          </li>
        </ul>

        <div className="mt-5">
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>Progres materi</span>
            <span>3/8</span>
          </div>
          <div className="mt-1.5 h-3 rounded-full bg-background shadow-[inset_0_2px_3px_rgb(30_27_75/0.1)]">
            <div className="h-3 w-[38%] rounded-full bg-gradient-to-r from-primary to-violet-400 shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
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
              <span className="relative inline-block text-primary">
                teori
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  className="absolute -bottom-1 left-0 w-full text-accent"
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
              Chalista Academy merangkum materi grammar — dari tenses, modal verbs, hingga gerund — dalam
              bahasa yang sederhana, lengkap dengan contoh dan latihan soal untuk menguji pemahamanmu.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/theory"
                className="clay-btn-primary clay-press inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground"
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
                <li key={chip} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Icon name="check-circle" className="h-4 w-4 text-emerald-500" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <HeroLessonCard />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y-2 border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="clay-panel flex h-12 w-12 shrink-0 items-center justify-center !rounded-2xl text-primary">
                <Icon name={stat.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-3xl font-extrabold leading-9 text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Theory */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Theory</p>
            <h2 className="mt-2 font-display text-[32px] font-extrabold leading-[38px] tracking-tight text-foreground">
              Materi teori yang dirancang runtut
            </h2>
            <p className="mt-3 text-lg leading-8 text-muted-foreground">
              Pilih topik yang ingin kamu kuasai. Setiap topik dijelaskan step by step dengan pola, contoh
              kalimat, dan poin-poin penting.
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

      {/* Practice */}
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
                        index === 0 ? 'bg-orange-100/80 text-accent' : 'bg-indigo-100/70 text-primary'
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

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Kenapa Chalista</p>
          <h2 className="mt-2 font-display text-[32px] font-extrabold leading-[38px] tracking-tight text-foreground">
            Belajar jadi lebih mudah dan terarah
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="clay-card p-6 text-center sm:text-left">
              <span
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tint} sm:mx-0`}
              >
                <Icon name={feature.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-violet-500 px-6 py-14 text-center shadow-[0_24px_48px_-24px_rgb(79_70_229/0.6),inset_0_2px_0_rgb(255_255_255/0.25)] sm:px-12">
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
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-indigo-100">
              Mulai dari satu topik hari ini. Sedikit demi sedikit, rutin lebih baik daripada sekali duduk
              menghafal semuanya.
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
                className="clay-press inline-flex items-center gap-2 rounded-2xl border-2 border-white/50 px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10"
              >
                <Icon name="target" className="h-4 w-4" />
                Lihat Latihan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
