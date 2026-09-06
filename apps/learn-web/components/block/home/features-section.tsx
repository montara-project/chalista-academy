'use client'

import { Icon } from '../common/icons'
import { features } from './mock-data'

export default function FeatureSection() {
  return (
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
  )
}
