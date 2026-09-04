import { createApp } from "./app.ts";
import type { Bindings } from "./env.ts";

const app = createApp();

/**
 * Entry Cloudflare Workers — Hono instance langsung memenuhi kontrak
 * ExportedHandler karena punya method `fetch(request, env, ctx)`.
 */
export default app as ExportedHandler<Bindings>;
