import type { Metadata } from 'next'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Chalista Academy — Belajar Bahasa Inggris',
    template: '%s — Chalista Academy',
  },
  description:
    'Platform belajar bahasa Inggris: teori grammar yang runtut — tenses, modal & auxiliary verbs, SEOM, ADA, comparative degree, gerund — plus latihan soal untuk menguji pemahamanmu.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
