'use client'

import { Icon } from '../common/icons'
import { stats } from './mock-data'

export default function StatSection() {
  return (
    <section className="border-y-2 border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <span className="clay-panel flex h-12 w-12 shrink-0 items-center justify-center !rounded-2xl text-primary">
              <Icon name={stat.icon} className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-3xl font-extrabold leading-9 text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
