import { serve } from '@hono/node-server';
import app from './app.ts';
import { localBindings } from './env.ts';

/**
 * Jalankan API di Node tanpa wrangler: `pnpm --filter @chalista/server dev:node`.
 * Kredensial dibaca dari process.env (mis. via .env milik shell).
 */
const port = Number(process.env.PORT ?? 8787);

serve({ fetch: (request) => app.fetch(request, localBindings(), undefined), port }, (info) => {
  console.log(`chalista-api (Node) berjalan di http://localhost:${info.port}`);
});
