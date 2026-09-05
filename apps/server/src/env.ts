import "@dotenvx/dotenvx/config";

export interface Bindings {
  JWT_SECRET: string;
  /** Daftar origin yang diizinkan CORS, dipisah koma. */
  CORS_ORIGIN?: string;
  ZOOM_SDK_KEY?: string;
  ZOOM_SDK_SECRET?: string;
}

export interface AppVariables {
  userId?: string;
}

export type AppEnv = {
  Bindings: Bindings;
  Variables: AppVariables;
};

/** Baca konfigurasi dari `process.env` (Node) — dipakai `pnpm --filter @chalista/server dev`. */
export function loadBindings(): Bindings {
  return {
    JWT_SECRET: process.env.JWT_SECRET ?? "dev-secret-ganti-di-produksi",
    CORS_ORIGIN:
      process.env.CORS_ORIGIN ?? "http://localhost:3000,http://localhost:5173",
    ZOOM_SDK_KEY: process.env.ZOOM_SDK_KEY,
    ZOOM_SDK_SECRET: process.env.ZOOM_SDK_SECRET,
  };
}
