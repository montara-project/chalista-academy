import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Chalista Academy — Belajar, Lalu Bisa',
  description: 'Platform kursus online dengan kelas live via Zoom.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-dvh">
        <header className="border-b bg-white">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
                CA
              </span>
              ChalistA
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/courses"
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Katalog
              </Link>
              <Link
                href="/my-learning"
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                My Learning
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Masuk
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          © 2026 ChalistA Academy — dibangun dengan vinext + hono + Zoom Meeting SDK.
        </footer>
      </body>
    </html>
  );
}
