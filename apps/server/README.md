# @chalista/server — API Chalista Academy

API hono yang menargetkan **Cloudflare Workers**, dengan data in-memory untuk MVP (lihat `docs/PRD.md` §4.2).

## Menjalankan

```bash
# Cloudflare Workers lokal (direkomendasikan)
pnpm --filter @chalista/server dev          # http://localhost:8787

# Alternatif tanpa wrangler (Node)
pnpm --filter @chalista/server dev:node
```

Setup kredensial dev:

```bash
cp .dev.vars.example .dev.vars   # lalu isi ZOOM_SDK_KEY / ZOOM_SDK_SECRET
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

```bash
wrangler login
pnpm --filter @chalista/server deploy
wrangler secret put JWT_SECRET           # dan ZOOM_SDK_KEY / ZOOM_SDK_SECRET
```
