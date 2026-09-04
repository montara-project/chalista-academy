import app from './app.ts';
import type { Bindings } from './env.ts';

/**
 * Entry Cloudflare Workers — Hono instance langsung memenuhi kontrak
 * ExportedHandler karena punya method `fetch(request, env, ctx)`.
 */
export default app as ExportedHandler<Bindings>;
