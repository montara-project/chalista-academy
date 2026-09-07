'use client'

import { Icon } from '../common/icons'

export default function HeroLessonCard() {
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
            <Icon name="check-circle" className="h-4 w-4 shrink-0 text-accent" />
            <span>
              She <b className="text-card-foreground">works</b> every day.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check-circle" className="h-4 w-4 shrink-0 text-accent" />
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
            <div className="h-3 w-[38%] rounded-full bg-gradient-to-r from-primary to-secondary shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
