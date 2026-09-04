# @chalista/zoom-client — Sandbox Zoom Meeting SDK

Testbed untuk memvalidasi integrasi **Zoom Meeting SDK Web** sebelum dipakai penuh dari `apps/learn` (PRD §4.3).

## Menjalankan

```bash
pnpm --filter @chalista/zoom-client dev   # http://localhost:5173
```

Prasyarat lain:

1. `apps/server` berjalan di `http://127.0.0.1:8787`.
2. Kredensial Meeting SDK diisi di `apps/server/.dev.vars` (`ZOOM_SDK_KEY`, `ZOOM_SDK_SECRET`) — buat aplikasi _Meeting SDK_ di [Zoom App Marketplace](https://marketplace.zoom.us/develop/create).

## Alur

1. **Login** (butuh JWT) — akun demo `siswa@chalista.id / siswa12345`.
2. Isi **meeting number, passcode, nama, role** — otomatis terisi bila URL punya query `?meetingNumber=…&passcode=…&name=…` (dipakai tombol _Join Live Class_ di `apps/learn`).
3. Pilih **Client View** (fullscreen ala Zoom web client) atau **Component View** (embed di halaman).
4. Klik **Join Meeting** — signature diminta dari `POST /api/zoom/signature`, lalu meeting ter-embed.
5. Log status join/leave/error tampil di panel bawah untuk debugging.

## Env

```bash
cp .env.example .env.local   # VITE_API_URL bila server di URL lain
```
