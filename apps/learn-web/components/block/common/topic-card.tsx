import Link from 'next/link'

import type { Topic } from '@/data/topics'

import { Icon } from '@/components/block/common/icons'

export function TopicCard({ topic, href }: { topic: Topic; href: string }) {
  return (
    <Link
      href={href}
      className="clay-card clay-press group flex flex-col p-6 hover:border-primary/60"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-primary shadow-[inset_0_2px_3px_rgb(30_27_75/0.06)]">
        <Icon name={topic.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-[22px] font-extrabold leading-7 text-card-foreground transition-colors duration-200 group-hover:text-primary">
        {topic.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">{topic.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        Pelajari
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
