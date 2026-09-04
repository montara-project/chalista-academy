# @chalista/learn — Web App Siswa

Frontend siswa ChalistA Academy, dibangun dengan **vinext** (Next.js-style di atas Vite, dari Cloudflare), **Tailwind CSS v4**, dan komponen **shadcn/ui** (new-york style, Tailwind v4 tokens).

## Menjalankan

```bash
pnpm --filter @chalista/learn dev     # http://localhost:3000
```

Server API (`apps/server`) sebaiknya jalan juga — bila tidak, halaman menampilkan data contoh dengan peringatan.

## Struktur

```
app/
├── layout.tsx          # Root layout (header, footer, globals.css)
├── page.tsx            # Landing
├── courses/page.tsx    # Katalog
├── courses/[slug]/     # Detail kursus + silabus + jadwal live
├── login/page.tsx      # Login (client)
├── my-learning/        # Dashboard siswa (client)
└── not-found.tsx
components/ui/          # Komponen shadcn (button, card, input, label, badge)
lib/                    # API helpers (server & browser) + mock fallback
```

## Menambah komponen shadcn

`components.json` sudah dikonfigurasi. Coba CLI:

```bash
pnpm dlx shadcn@latest add dialog
```

Jika CLI tidak mengenali vinext, salin source komponen dari [ui.shadcn.com](https://ui.shadcn.com/docs/components) ke `components/ui/` — style & tokens sudah lengkap di `app/globals.css`.

## Catatan vinext

- vinext masih beta; struktur `app/` memakai konvensi Next.js App Router standar sehingga mudah dimigrasi bila perlu.
- Deploy ke Cloudflare Workers: `npx @vinext/cloudflare deploy` (lihat docs vinext).
