# @chalista/server — API Chalista Academy

API hono yang berjalan sebagai server **Node.js** biasa (via `@hono/node-server`), dengan data in-memory untuk MVP (lihat `docs/PRD.md` §4.2).

## Menjalankan

```bash
pnpm --filter @chalista/server dev          # http://localhost:8787
```

Setup kredensial dev:

```bash
cp .env.example .env   # lalu isi ZOOM_SDK_KEY / ZOOM_SDK_SECRET bila perlu
```

## Endpoint

| Endpoint                 | Metode               | Auth      | Deskripsi             |
| ------------------------ | -------------------- | --------- | --------------------- |
| `/api/health`            | GET                  | –         | Health check          |
| `/api/auth/login`        | POST                 | –         | Login → JWT           |
| `/api/auth/me`           | GET                  | ✅        | Profil user           |
| `/api/courses`           | GET / POST           | POST ✅   | Daftar & buat kursus  |
| `/api/courses/:slug`     | GET / PATCH / DELETE | mutasi ✅ | Detail / ubah / hapus |
| `/api/enrollments`       | GET / POST           | ✅        | Enroll milik user     |
| `/api/live-sessions`     | GET / POST           | POST ✅   | Jadwal kelas live     |
| `/api/live-sessions/:id` | GET / PATCH / DELETE | mutasi ✅ | Detail / ubah / hapus |
| `/api/zoom/signature`    | POST                 | ✅        | Signature Meeting SDK |

Akun seed: `admin@chalista.id / admin12345` dan `siswa@chalista.id / siswa12345`.

## Deploy

Jalankan sebagai proses Node biasa di server/VM/container pilihan:

```bash
pnpm --filter @chalista/server start
```

Set env var produksi (`JWT_SECRET`, `CORS_ORIGIN`, `ZOOM_SDK_KEY`, `ZOOM_SDK_SECRET`, `PORT`) lewat mekanisme hosting yang dipakai.
