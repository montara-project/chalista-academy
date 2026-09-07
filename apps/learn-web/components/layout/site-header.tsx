'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Icon } from '@/components/block/common/icons'
import { practiceTopics, theoryTopics } from '@/data/topics'

const navGroups = [
  { label: 'Theory', href: '/theory', topics: theoryTopics },
  { label: 'Practice', href: '/practice', topics: practiceTopics },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setExpandedGroup(null)
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
          <span className="clay-brandmark flex h-10 w-10 items-center justify-center rounded-2xl text-primary-foreground">
            <Icon name="graduation-cap" className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Chalista <span className="text-primary">Academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          <Link
            href="/"
            className={`rounded-xl px-3 py-2 text-sm font-bold transition-colors duration-200 ${
              pathname === '/'
                ? 'bg-card text-primary shadow-[0_4px_10px_-4px_rgb(30_27_75/0.25)]'
                : 'text-muted-foreground hover:bg-card/70 hover:text-foreground'
            }`}
          >
            Home
          </Link>

          {navGroups.map((group) => {
            const active = pathname.startsWith(group.href)
            return (
              <div key={group.href} className="group relative">
                <Link
                  href={group.href}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold transition-colors duration-200 ${
                    active
                      ? 'bg-card text-primary shadow-[0_4px_10px_-4px_rgb(30_27_75/0.25)]'
                      : 'text-muted-foreground hover:bg-card/70 hover:text-foreground'
                  }`}
                >
                  {group.label}
                  <Icon
                    name="chevron-down"
                    className="h-4 w-4 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>

                <div className="invisible absolute left-0 top-full z-20 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="clay-card w-96 p-2">
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {group.label} Topics
                    </p>
                    {group.topics.map((topic) => (
                      <Link
                        key={topic.slug}
                        href={`${group.href}/${topic.slug}`}
                        className="flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-background"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-primary">
                          <Icon name={topic.icon} className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          <span className="block font-display text-sm font-extrabold text-card-foreground">
                            {topic.title}
                          </span>
                          <span className="block text-xs leading-5 text-muted-foreground">
                            {topic.short}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/theory"
            className="clay-btn-primary clay-press inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground!"
          >
            <Icon name="sparkles" className="h-4 w-4" />
            Mulai Belajar
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border bg-card text-foreground shadow-[0_6px_12px_-8px_rgb(30_27_75/0.3),inset_0_2px_2px_rgb(255_255_255/0.9)] transition-colors duration-200 hover:bg-background md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t-2 border-border bg-background">
          <nav
            className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6"
            aria-label="Navigasi mobile"
          >
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block rounded-xl px-3 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              Home
            </Link>

            {navGroups.map((group) => {
              const expanded = expandedGroup === group.href
              return (
                <div key={group.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-display text-sm font-extrabold text-foreground transition-colors hover:bg-card"
                    onClick={() => setExpandedGroup(expanded ? null : group.href)}
                    aria-expanded={expanded}
                  >
                    {group.label}
                    <Icon
                      name="chevron-down"
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expanded && (
                    <div className="ml-3 space-y-0.5 border-l-2 border-border pl-3">
                      <Link
                        href={group.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-3 py-2 text-sm font-bold text-primary"
                      >
                        Lihat semua {group.label} →
                      </Link>
                      {group.topics.map((topic) => (
                        <Link
                          key={topic.slug}
                          href={`${group.href}/${topic.slug}`}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                        >
                          <Icon name={topic.icon} className="h-4 w-4 text-primary" />
                          {topic.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/theory"
              onClick={closeMobileMenu}
              className="clay-btn-primary clay-press mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-3 text-sm font-bold text-primary-foreground"
            >
              <Icon name="sparkles" className="h-4 w-4" />
              Mulai Belajar
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
