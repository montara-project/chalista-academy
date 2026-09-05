import { serve } from "@hono/node-server";
import { createApp } from "./app.ts";
import { loadBindings } from "./env.ts";

/**
 * Entry point Node — jalankan API langsung dengan `node`/`tsx`, tanpa Cloudflare Workers.
 */
const app = createApp();
const port = Number(process.env.PORT ?? 8787);

serve(
  { fetch: (request) => app.fetch(request, loadBindings(), undefined), port },
  (info) => {
    console.log(`chalista-api berjalan di http://localhost:${info.port}`);
  },
);
