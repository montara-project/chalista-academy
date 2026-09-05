# PRD — Chalista Academy

|                   |                  |
| ----------------- | ---------------- |
| **Produk**        | Chalista Academy |
| **Versi dokumen** | 1.0              |
| **Tanggal**       | 2026-09-04       |
| **Status**        | Draft MVP        |
| **Pemilik**       | Tim Chalista     |

---

## 1. Ringkasan Produk

**Chalista Academy** adalah platform kursus online yang menggabungkan pembelajaran mandiri (_self-paced_) dengan kelas live via Zoom. Siswa dapat menelusuri katalog kursus, mendaftar (enroll), belajar modul demi modul, dan menghadiri sesi live bersama instruktur melalui integrasi Zoom Meeting SDK. Instruktur/admin mengelola konten kursus dan jadwal kelas live.

### 1.1 Masalah

1. Pembelajaran mandiri saja sering kehilangan momentum — siswa butuh interaksi langsung dengan instruktur.
2. Platform kursus umumnya tidak punya fitur kelas live yang menyatu (siswa harus berpindah aplikasi ke Zoom).
3. Pengelola konten kursus + jadwal live tersebar di banyak alat (spreadsheet, grup chat, dsb).

### 1.2 Solusi

Satu platform dengan dua pengalaman inti:

- **Belajar mandiri** — katalog, enroll, progres modul.
- **Kelas live** — jadwal sesi Zoom yang bisa di-join langsung dari web (embed Meeting SDK), tanpa berpindah aplikasi.

## 2. Tujuan & Success Metrics

| Tujuan                                  | Metrik                                 | Target MVP |
| --------------------------------------- | -------------------------------------- | ---------- |
| Siswa bisa menemukan & mengikuti kursus | Jumlah enroll per bulan                | 50 enroll  |
| Kelas live diminati                     | % siswa join live dari yang terdaftar  | ≥ 60%      |
| Onboarding lancar                       | Waktu dari landing → enroll pertama    | < 5 menit  |
| Kualitas kode & DX                      | Build/lint/typecheck hijau di CI lokal | 100%       |

## 3. Persona

1. **Siswa (primary)** — ingin belajar skill baru, kadang butuh sesi live untuk bertanya langsung. Mengakses via desktop/mobile browser.
2. **Instruktur** — membuat kursus, modul, dan jadwal kelas live; menjadi host meeting Zoom.
3. **Admin** — mengelola pengguna, memublikasikan kursus, memantau enroll.

## 4. Ruang Lingkup MVP

MVP terdiri dari **3 aplikasi** dalam satu monorepo (lihat §7 Arsitektur).

### 4.1 `apps/learn` — Web App Siswa & Publik (vinext + Tailwind v4 + shadcn/ui)

Halaman & fitur:

| Halaman                           | Fitur                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| Landing                           | Hero, highlight kursus unggulan, CTA daftar                                             |
| Katalog (`/courses`)              | Daftar kartu kursus (thumbnail, judul, instruktur, jumlah modul), pencarian sederhana   |
| Detail kursus (`/courses/[slug]`) | Deskripsi, silabus (modul & pelajaran), tombol **Enroll**, daftar jadwal live terkait   |
| Login (`/login`)                  | Login email + password (MVP)                                                            |
| My Learning (`/my-learning`)      | Kursus yang diikuti, progres ringkas, jadwal live mendatang, tombol **Join Live Class** |

_Join Live Class_ membuka `apps/zoom-client` (atau embed) dengan membawa meeting number, passcode, dan nama siswa.

### 4.2 `apps/server` — API (hono, Cloudflare Workers)

| Endpoint                 | Metode             | Deskripsi                                                       |
| ------------------------ | ------------------ | --------------------------------------------------------------- |
| `/api/health`            | GET                | Health check                                                    |
| `/api/auth/login`        | POST               | Login email/password → JWT (stub user seed)                     |
| `/api/auth/me`           | GET                | Profil user dari token                                          |
| `/api/courses`           | GET, POST          | Daftar & buat kursus                                            |
| `/api/courses/:slug`     | GET, PATCH, DELETE | Detail / ubah / hapus kursus                                    |
| `/api/enrollments`       | GET, POST          | Daftar enroll milik user / enroll ke kursus                     |
| `/api/live-sessions`     | GET, POST          | Daftar & buat sesi live (meeting number, passcode, jadwal)      |
| `/api/live-sessions/:id` | GET, PATCH, DELETE | Detail / ubah / hapus sesi live                                 |
| `/api/zoom/signature`    | POST               | Generate signature Zoom Meeting SDK (HMAC, kredensial dari env) |

Catatan MVP:

- **Auth**: JWT sederhana (HMAC), user seed in-memory. Password hashing & refresh token menyusul.
- **Data**: repository in-memory dengan interface bersih — siap ditukar ke Cloudflare D1 di fase berikutnya.
- **Validasi**: semua payload divalidasi dengan skema zod bersama dari `@chalista/types`.

### 4.3 `apps/zoom-client` — Sandbox/Testbed SDK Zoom (vite + react)

Tujuan: **memvalidasi integrasi Zoom Meeting SDK** sebelum/bersamaan dipakai dari `learn`.

- Form: meeting number, passcode, nama, role (1 = host, 0 = attendee), pilihan tampilan **Client View** / **Component View**.
- Signature diminta ke `POST /api/zoom/signature` di `apps/server`.
- Menampilkan log status join/leave/error untuk debugging.
- `.env.example` berisi `VITE_API_URL`.

> **Prasyarat Zoom**: akun Zoom + SDK Key/SDK Secret dari [Zoom App Marketplace](https://marketplace.zoom.us/). Tanpa kredensial, seluruh alur lain tetap berjalan; langkah join gagal dengan pesan jelas.

### 4.4 User Stories (ringkas, dengan acceptance criteria)

**US-01 — Menelusuri katalog**
Sebagai siswa, saya ingin melihat daftar kursus agar bisa memilih yang sesuai.

- _AC:_ katalog menampilkan semua kursus `published`; kartu menunjukkan judul, instruktur, jumlah modul; klik kartu membuka detail.

**US-02 — Melihat detail kursus**
Sebagai siswa, saya ingin melihat silabus sebelum enroll.

- _AC:_ halaman detail menampilkan deskripsi + daftar modul/pelajaran + jadwal live terkait; tombol Enroll tersedia.

**US-03 — Enroll kursus**
Sebagai siswa, saya ingin mendaftar kursus agar bisa belajar.

- _AC:_ klik Enroll (harus login) → muncul di My Learning; enroll ganda ditolak dengan pesan ramah.

**US-04 — Login**
Sebagai siswa, saya ingin login agar enroll & progres saya tersimpan.

- _AC:_ login email/password valid → redirect ke My Learning; kredensial salah → pesan error; state login tersimpan (JWT).

**US-05 — Join kelas live**
Sebagai siswa, saya ingin mengikuti kelas live dari dalam web.

- _AC:_ di My Learning ada jadwal live mendatang; klik Join → zoom-client terbuka dengan data terisi → meeting ter-embed bila kredensial Zoom valid.

**US-06 — Mengelola kursus & sesi live (admin/instruktur)**
Sebagai instruktur, saya ingin membuat kursus dan menjadwalkan sesi live Zoom.

- _AC:_ `POST /api/courses` dan `POST /api/live-sessions` membuat data yang langsung tampil di katalog/My Learning (MVP: via API client seperti Hoppscotch; UI admin menyusul).

## 5. Non-Fungsional

- **Performance**: halaman publik di-cache; API < 200 ms (p95) di Workers.
- **Security**: JWT di httpOnly-capable flow, kredensial Zoom hanya di server env, CORS ketat untuk domain app.
- **Aksesibilitas**: komponen shadcn (Radix) + kontras WCAG AA.
- **Tooling**: lint `oxlint`, format `oxfmt`, typecheck `tsc --noEmit` — wajib lulus sebelum commit.

## 6. Out of Scope (Fase Berikutnya)

- Payment gateway & harga kursus (enroll MVP gratis).
- Database produksi (D1) — MVP in-memory/seed.
- UI admin/instruktur (MVP via API).
- Notifikasi email/kalender, recording playback, sertifikat, mobile app.
- Zoom REST API untuk auto-create meeting (MVP: meeting number diinput manual).

## 7. Arsitektur & Struktur Monorepo

```
chalista-academy/
├── apps/
│   ├── learn/          # vinext (Next.js-style di atas Vite) + Tailwind v4 + shadcn/ui
│   ├── server/         # hono di Cloudflare Workers (+ @hono/node-server utk dev Node)
│   └── zoom-client/    # vite + react + @zoom/meetingsdk (sandbox)
├── packages/
│   ├── config/         # @chalista/config — preset tsconfig
│   ├── types/          # @chalista/types — zod schemas + tipe domain bersama
│   ├── api-client/     # @chalista/api-client — fetch wrapper bertipe
│   └── ui/             # @chalista/ui — cn() + komponen React dasar bersama
├── docs/PRD.md
├── pnpm-workspace.yaml
├── .oxlintrc.json      # oxlint (root, satu config untuk semua)
└── .oxfmtrc.json       # oxfmt (root)
```

Alur data: `learn`/`zoom-client` → `@chalista/api-client` → `server` (hono) → (MVP) in-memory repo. Skema & tipe bersama hidup di `@chalista/types` dan dipakai server (validasi) dan client (tipe respons).

## 8. Tech Stack

| Lapisan  | Teknologi                                                       |
| -------- | --------------------------------------------------------------- |
| Monorepo | pnpm workspaces                                                 |
| Web app  | vinext (Cloudflare), React 19, Tailwind CSS v4, shadcn/ui       |
| API      | hono, zod, `@hono/zod-validator`, `@hono/node-server` (Node.js) |
| Zoom     | @zoom/meetingsdk (Web Meeting SDK v3)                           |
| Kualitas | oxlint, oxfmt, TypeScript strict                                |

## 9. Milestone

| Milestone       | Isi                                                        | Status     |
| --------------- | ---------------------------------------------------------- | ---------- |
| M0 — Fondasi    | Monorepo, tooling oxlint/oxfmt, packages, 3 app berjalan   | Sprint ini |
| M1 — API inti   | Auth, courses, enrollments, live-sessions, zoom signature  | Berikutnya |
| M2 — Web siswa  | Landing, katalog, detail, login, My Learning terhubung API | Berikutnya |
| M3 — Live class | zoom-client polish + embed dari learn, uji meeting nyata   | Berikutnya |
| M4 — Produksi   | D1 + migrasi data, deploy Workers, hardening auth          | Backlog    |

## 10. Risiko & Mitigasi

| Risiko                                      | Dampak                             | Mitigasi                                                                                   |
| ------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| vinext masih eksperimental                  | Fitur Next tertentu belum didukung | Gunakan subset fitur standar (App Router dasar); struktur `app/` tetap portabel ke Next.js |
| shadcn CLI tidak mendeteksi vinext          | Init gagal                         | Setup manual `components.json` + CSS variables; komponen diambil dari registry             |
| Zoom SDK butuh kredensial berbayar/akun     | Join tidak bisa diuji              | Sandbox zoom-client + server signature terpisah; alur lain tetap jalan tanpa kredensial    |
| In-memory store hilang saat Workers restart | Data demo hilang                   | Diterima untuk MVP; interface repo siap ditukar D1                                         |

## 11. Open Questions

1. Domain/branding final (logo, warna) — perlu input desain.
2. Apakah instruktur = host Zoom sendiri (SDK key milik akun instruktur) atau satu akun platform? — memengaruhi desain endpoint signature.
3. Kebutuhan multi-bahasa (id/en) untuk UI?
